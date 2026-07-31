/// <reference lib="webworker" />

import type { CodeRunRequest, CodeRunResponse } from './runnerTypes';

const MAX_LOGS = 100;
const MAX_LOG_LENGTH = 1_000;

function serialize(value: unknown) {
  if (typeof value === 'string') return value;
  if (typeof value === 'undefined') return 'undefined';

  try {
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  } catch {
    return String(value);
  }
}

self.onmessage = async (event: MessageEvent<CodeRunRequest>) => {
  const { runId, code } = event.data;
  const logs: string[] = [];

  const addLog = (prefix: string, values: unknown[]) => {
    if (logs.length >= MAX_LOGS) return;
    const line = `${prefix}${values.map(serialize).join(' ')}`;
    logs.push(line.slice(0, MAX_LOG_LENGTH));
  };

  const sandboxConsole = Object.freeze({
    log: (...values: unknown[]) => addLog('', values),
    error: (...values: unknown[]) => addLog('[Error] ', values),
    warn: (...values: unknown[]) => addLog('[Aviso] ', values),
  });

  let error: string | null = null;

  try {
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    const execute = new AsyncFunction('console', `"use strict";\n${code}`);
    await execute(sandboxConsole);
    await new Promise((resolve) => setTimeout(resolve, 0));
  } catch (caughtError) {
    const message = caughtError instanceof Error ? `${caughtError.name}: ${caughtError.message}` : String(caughtError);
    error = message.slice(0, MAX_LOG_LENGTH);
  }

  const response: CodeRunResponse = { type: 'result', runId, logs, error };
  self.postMessage(response);
};

export {};
