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
        // Dynamically import Pyodide from CDN
        // deno-lint-ignore no-explicit-any
        const pyodideMod: any = await import(
          "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.mjs"
        );

        const py = await pyodideMod.loadPyodide({
          stdout: (text: string) => onStdout?.(text),
          stderr: (text: string) => onStderr?.(text),
        });

        if (cancelled) return;
        pyodideRef.current = py;
        setReady(true);
      } catch (e) {
        console.error("Failed to load Pyodide:", e);
        onStderr?.("Failed to load Python runtime. Check your network and try again.\n");
      }
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
