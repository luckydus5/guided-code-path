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
      try {
        // Check if we're in an iframe environment (like Lovable)
        const isInIframe = window !== window.top;
        
        // Check if Pyodide is already loaded globally
        if ((window as any).loadPyodide) {
          try {
            const pyodide = await (window as any).loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
              stdout: (text: string) => onStdout?.(text),
              stderr: (text: string) => onStderr?.(text),
            });

            if (cancelled) return;
            pyodideRef.current = pyodide;
            setReady(true);
            return;
          } catch (iframeError) {
            console.warn("Pyodide failed to load in iframe environment:", iframeError);
            if (isInIframe) {
              onStderr?.("Python runtime is not available in preview mode. Code execution is simulated.\n");
              // Set a mock ready state for iframe environments
              setReady(true);
              return;
            }
          }
        }

        // Load Pyodide script if not already available
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        script.onload = async () => {
          try {
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
            if (isInIframe) {
              onStderr?.("Python runtime is not available in preview mode. Code execution is simulated.\n");
              setReady(true);  // Still set ready for mock execution
            } else {
              onStderr?.("Failed to load Python runtime. Please refresh the page and try again.\n");
            }
          }
        };
        
        script.onerror = () => {
          console.error("Failed to load Pyodide script");
          if (isInIframe) {
            onStderr?.("Python runtime is not available in preview mode. Code execution is simulated.\n");
            setReady(true);  // Still set ready for mock execution
          } else {
            onStderr?.("Failed to load Python runtime. Please refresh the page and try again.\n");
          }
        };
        
        document.head.appendChild(script);
      } catch (e) {
        console.error("Error in Pyodide loading:", e);
        onStderr?.("Failed to initialize Python runtime. Please refresh the page and try again.\n");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [onStdout, onStderr]);

  const runPython = async (code: string) => {
    if (!pyodideRef.current) {
      // If Pyodide isn't available (e.g., in iframe), provide mock execution
      const isInIframe = window !== window.top;
      if (isInIframe) {
        // Simulate Python execution for preview environments
        return "Code execution simulated in preview mode";
      }
      throw new Error("Python runtime not ready yet");
    }
    return await pyodideRef.current.runPythonAsync(code);
  };

  return { ready, runPython };
}
