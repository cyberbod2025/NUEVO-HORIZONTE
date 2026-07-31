import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

type MonacoEnvironment = {
  getWorker: (_moduleId: string, label: string) => Worker;
};

(self as typeof self & { MonacoEnvironment: MonacoEnvironment }).MonacoEnvironment = {
  getWorker: (_moduleId, label) => {
    if (label === 'typescript' || label === 'javascript') return new tsWorker();
    return new editorWorker();
  },
};

loader.config({ monaco });

interface SandboxEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SandboxEditor({ value, onChange }: SandboxEditorProps) {
  return (
    <div className="h-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <Editor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={value}
        onChange={(nextValue) => onChange(nextValue ?? '')}
        loading={<div className="h-full grid place-items-center text-xs text-slate-500">Cargando editor profesional...</div>}
        options={{
          ariaLabel: 'Editor de código JavaScript',
          automaticLayout: true,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: 13,
          lineHeight: 21,
          minimap: { enabled: false },
          padding: { top: 14, bottom: 14 },
          scrollBeyondLastLine: false,
          tabSize: 2,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}
