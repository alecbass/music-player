import { useEffect, useState } from "react";

export function useWasm() {
  const [wasm, setWasm] = useState<typeof import("music-player-wasm")>(null!);

  useEffect(() => {
    async function loadWasm() {
      const wasm = await import("music-player-wasm");
      setWasm(wasm);
    }

    loadWasm();
  }, []);

  return wasm;
}