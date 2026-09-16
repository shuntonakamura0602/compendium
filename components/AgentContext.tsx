"use client";

import { useEffect, useState } from "react";
import { trackCopyContext } from "@/lib/analytics";

type CopyState = "idle" | "copied" | "error";

/**
 * "Copy Context" card (spec §11, §30). Receives the pre-generated Markdown from
 * the server component so the generator never ships to the client.
 */
export default function AgentContext({
  competition,
  markdown,
}: {
  competition: string;
  markdown: string;
}) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setState("copied");
      trackCopyContext(competition, markdown.length);
    } catch {
      setState("error");
    }
  }

  const label =
    state === "copied" ? "Copied!" : state === "error" ? "Copy failed" : "Copy Context";

  return (
    <section
      id="agent"
      className="scroll-mt-28 border-t border-border py-10"
      aria-labelledby="agent-heading"
    >
      <div className="rounded-lg border border-accent/40 bg-accent/5 p-6">
        <h2 id="agent-heading" className="text-xl font-semibold tracking-tight">
          Use this competition with an AI coding agent
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-foreground/80">
          Get a structured context containing the problem, evaluation, data,
          important discussions and solutions. Paste it into Claude Code, Codex,
          Cursor or any other agent.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className={`h-10 rounded-md px-4 text-sm font-medium transition-colors ${
              state === "copied"
                ? "bg-accent-strong text-white"
                : state === "error"
                  ? "bg-red-600 text-white"
                  : "bg-foreground text-background hover:bg-foreground/85"
            }`}
          >
            {label}
          </button>
          <span className="text-xs text-muted">
            {markdown.length.toLocaleString("en-US")} characters · Markdown
          </span>
        </div>

        <details className="mt-5 group">
          <summary className="cursor-pointer text-sm text-muted select-none hover:text-foreground">
            Preview
          </summary>
          <pre className="mt-3 max-h-96 overflow-auto rounded-md border border-border bg-background p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {markdown}
          </pre>
        </details>
      </div>
    </section>
  );
}
