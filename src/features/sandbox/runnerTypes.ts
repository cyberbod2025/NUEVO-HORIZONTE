export interface CodeRunRequest {
  runId: string;
  code: string;
}

export interface CodeRunResponse {
  type: 'result';
  runId: string;
  logs: string[];
  error: string | null;
}

export interface CodeRunResult {
  logs: string[];
  error: string | null;
  timedOut: boolean;
}
