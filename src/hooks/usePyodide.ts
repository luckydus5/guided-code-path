import { useEffect, useRef, useState } from "react";

interface UsePyodideOptions {
  onStdout?: (text: string) => void;
  onStderr?: (text: string) => void;
}

export function usePyodide({ onStdout, onStderr }: UsePyodideOptions = {}) {
  const [ready, setReady] = useState(false);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // First, load the Pyodide script from CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
      script.async = true;
      
      script.onload = async () => {
        try {
          // Load from different CDN version that's more stable
          const pyodide = await (window as any).loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
            stdout: (text: string) => onStdout?.(text),
            stderr: (text: string) => onStderr?.(text),
          });

          if (cancelled) return;
          pyodideRef.current = pyodide;
          setReady(true);
        } catch (e) {
          console.error("Failed to load Pyodide:", e);
          onStderr?.("Failed to load Python runtime. Check your network and try again.\n");
        }
      };
      
      script.onerror = () => {
        console.error("Failed to load Pyodide script");
        onStderr?.("Failed to load Python runtime. Check your network and try again.\n");
      };
      
      document.head.appendChild(script);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [onStdout, onStderr]);

  const runPython = async (code: string) => {
    if (!pyodideRef.current) throw new Error("Python runtime not ready yet");
    return await pyodideRef.current.runPythonAsync(code);
  };

  return { ready, runPython };
}
