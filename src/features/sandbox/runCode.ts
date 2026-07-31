import CodeRunnerWorker from './codeRunner.worker?worker';
import type { CodeRunResponse, CodeRunResult } from './runnerTypes';

const DEFAULT_TIMEOUT_MS = 2_000;

export function runJavaScript(code: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<CodeRunResult> {
  return new Promise((resolve) => {
    const worker = new CodeRunnerWorker();
    const runId = crypto.randomUUID();
    let settled = false;

    const finish = (result: CodeRunResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      worker.terminate();
      resolve(result);
    };

    const timeout = window.setTimeout(() => {
      finish({
        logs: [],
        error: `Tiempo agotado: el código superó ${timeoutMs} ms. Revisa si existe un bucle infinito.`,
        timedOut: true,
      });
    }, timeoutMs);

    worker.onmessage = (event: MessageEvent<CodeRunResponse>) => {
      const response = event.data;
      if (response?.type !== 'result' || response.runId !== runId) return;
      finish({ logs: response.logs, error: response.error, timedOut: false });
    };

    worker.onerror = (event) => {
      finish({ logs: [], error: event.message || 'El Worker no pudo ejecutar el código.', timedOut: false });
    };

    worker.postMessage({ runId, code });
  });
}
