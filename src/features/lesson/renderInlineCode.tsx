import type { ReactNode } from 'react';

/**
 * Convierte segmentos entre backticks (`código`) en <code> con estilo monoespaciado.
 * No es un parser de Markdown completo a propósito: el contenido pedagógico v2 solo
 * usa backticks para código inline, y sumar una librería de Markdown para eso no se
 * justifica todavía (ver docs/adr/0004-lesson-v2-pedagogical-contract.md).
 */
export function renderInlineCode(text: string): ReactNode {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.length > 1 && part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
