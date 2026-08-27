// Plain HTML/CSS, not an <img>: the site's global aged-photo filter applies
// to every img/video, which would just muddy a technical diagram (learned
// the hard way trying to reuse it for website screenshots). This stays
// crisp and uses the real design tokens directly.

import { T } from "@/lib/i18n";
import type { Localized } from "@/lib/dict";

// This diagram's copy is specific to one project's page (not reusable UI
// chrome), so it lives here rather than in src/lib/dict.ts, following the
// same "content near where it's used" pattern as src/data/*.ts.
const copy = {
  input: {
    en: "Mainframe screenshot + business rules",
    pt: "Screenshot do Mainframe + regras de negócio",
  },
  orchestrator: { en: "Orchestrator agent", pt: "Agente orquestrador" },
  orchestratorCaption: {
    en: "Manages the loop between the two agents below until the review passes.",
    pt: "Gerencia o loop entre os dois agentes abaixo até a revisão passar.",
  },
  orchestrationRules: {
    en: "Orchestration rules: when to end the loop, when to keep going",
    pt: "Regras de orquestração: quando encerrar o loop, quando continuar",
  },
  businessLogicPlan: {
    en: "Drafts a business-logic plan from the screenshot",
    pt: "Redige um plano da lógica de negócio a partir do screenshot",
  },
  confirmsThePlan: { en: "Confirms the plan with you", pt: "Confirma o plano com você" },
  checkIn: {
    en: "⇄ Quick check-in with you on the business logic",
    pt: "⇄ Um check-in rápido com você sobre a lógica de negócio",
  },
  loopStarts: { en: "Loop starts", pt: "Loop começa" },
  translator: { en: "Translator agent", pt: "Agente tradutor" },
  translatorCaption: {
    en: "Writes the component, then rewrites it whenever the reviewer sends back an issue.",
    pt: "Escreve o componente e reescreve sempre que o revisor aponta um problema.",
  },
  frontEndPatternFile: {
    en: "General front-end code-pattern steering file",
    pt: "Arquivo geral de padrões de código front-end",
  },
  skillFilePerComponent: {
    en: "A skill file for each component in the UI library",
    pt: "Um arquivo de skill para cada componente da UI library",
  },
  reviewer: { en: "Reviewer agent", pt: "Agente revisor" },
  reviewerCaption: {
    en: "Checks the code and the rendered UI against the other Micro Frontends and every reference screenshot of Portal Gestor.",
    pt: "Verifica o código e a UI renderizada em relação aos outros Micro Frontends e a cada screenshot de referência do Portal Gestor.",
  },
  playwrightMcp: {
    en: "Playwright MCP: sees what's actually rendered",
    pt: "Playwright MCP: vê o que foi realmente renderizado",
  },
  samePatternFiles: {
    en: "Same code-pattern files, to catch what the translator missed",
    pt: "Os mesmos arquivos de padrões de código, para pegar o que o tradutor deixou passar",
  },
  changesRequested: {
    en: "↺ Changes requested, back to the translator (repeats until approved)",
    pt: "↺ Mudanças solicitadas, volta para o tradutor (repete até ser aprovado)",
  },
  approved: {
    en: "✓ Approved by the reviewer agent",
    pt: "✓ Aprovado pelo agente revisor",
  },
  reactComponent: {
    en: "React / TypeScript component",
    pt: "Componente React / TypeScript",
  },
  output: {
    en: "Micro Frontend → Portal Gestor",
    pt: "Micro Frontend → Portal Gestor",
  },
  longTermMemoryLabel: {
    en: "Session memory",
    pt: "Memória de sessão",
  },
  longTermMemoryBlurb: {
    en: "Every time an agent is called, it starts from a brand-new context: on its own, the reviewer wouldn't know which pass of the loop it's on, what it flagged last time, or whether that got fixed. Each call forgets the one before it.",
    pt: "Toda vez que um agente é chamado, ele começa com um contexto totalmente novo: sozinho, o revisor não saberia em qual passagem do loop está, o que apontou da última vez, ou se aquilo foi corrigido. Cada chamada esquece a anterior.",
  },
  longTermMemoryCaption: {
    en: "The review-history file is what carries that across calls: the reviewer writes to it every pass, and folds what it learns back into the translator's steering, so the system remembers even though no single agent call does.",
    pt: "O arquivo de histórico de revisões é o que carrega isso entre as chamadas: o revisor escreve nele a cada passagem e incorpora o que aprende de volta no steering do tradutor, para que o sistema se lembre mesmo que nenhuma chamada individual do agente se lembre.",
  },
  agent: { en: "Agent", pt: "Agente" },
  loopLabel: { en: "Loop", pt: "Loop" },
  agentCaption: {
    en: "Same reviewer, brand-new context every time.",
    pt: "Mesmo revisor, contexto totalmente novo a cada vez.",
  },
  writesFindingsTo: { en: "After each review, writes to", pt: "Após cada revisão, escreve em" },
  reviewHistoryFile: {
    en: "Review history file",
    pt: "Arquivo de histórico de revisões",
  },
  reviewHistoryCaption: {
    en: "External memory for the reviewer agent.",
    pt: "Memória externa do agente revisor.",
  },
  translatorSteeringUpdate: {
    en: "Translator steering files",
    pt: "Arquivos de steering do tradutor",
  },
  translatorSteeringUpdateCaption: {
    en: "Fed to the translator agent, separately.",
    pt: "Alimenta o agente tradutor, separadamente.",
  },
  infiniteLoopLabel: { en: "Infinite loop", pt: "Loop infinito" },
  infiniteLoopBlurb: {
    en: "Nothing guarantees the reviewer approves on the first, or the fifth, attempt. Left alone, the translator/reviewer loop could keep running forever if the review never passes. To bound it, there's a hard cap of 5 passes: if the reviewer still hasn't approved by then, the orchestrator stops the loop and asks for your intervention.",
    pt: "Nada garante que o revisor aprove na primeira tentativa, ou na quinta. Sem limite, o loop entre tradutor e revisor poderia rodar para sempre se a revisão nunca passasse. Para limitar isso, existe um teto rígido de 5 passagens: se o revisor ainda não tiver aprovado até lá, o orquestrador para o loop e pede a sua intervenção.",
  },
} satisfies Record<string, Localized>;

// `step` places a single-beat element (an arrow, a label) in the diagram's
// traveling pulse (see .diagram-flow-arrow in globals.css) — every one
// shares the same 12s loop, staggered by animation-delay so the red light
// chases the real order the beats happen in. The translator/reviewer boxes
// and the connector between them flash *twice* per cycle instead (once per
// review pass) via their own dedicated two-pulse keyframes further down in
// globals.css, since a single flowProps beat can't repeat mid-cycle.
function flowProps(step?: number) {
  if (step === undefined) return {};
  return {
    className: "diagram-flow-arrow",
    style: { animationDelay: `${step}s` } as React.CSSProperties,
  };
}

function Box({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-faint bg-surface px-4 py-3 text-center font-mono text-xs tracking-[0.1em] text-ink uppercase ${className}`}
    >
      {children}
    </div>
  );
}

function Caption({ text }: { text: Localized }) {
  return (
    <p className="max-w-52 text-center font-mono text-[0.65rem] leading-relaxed normal-case text-muted">
      <T text={text} />
    </p>
  );
}

// Plain document outline: no curves, matches the site's squared-off icon
// language (same rule as the timeline's square markers).
function FileIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className="mt-px shrink-0"
    >
      <path d="M3.5 1.5H9L12.5 5V14.5H3.5V1.5Z" />
      <path d="M9 1.5V5H12.5" />
    </svg>
  );
}

// A small server rack: two stacked units with a status square each, standing
// in for "a connector/server the agent talks to" (the MCP).
function McpIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className="mt-px shrink-0"
    >
      <rect x="1.5" y="2" width="13" height="5" />
      <rect x="1.5" y="9" width="13" height="5" />
      <rect x="3.7" y="4" width="1.3" height="1.3" fill="currentColor" stroke="none" />
      <rect x="3.7" y="11" width="1.3" height="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

type SteeringFile = { label: Localized; mcp?: boolean };

// Each agent's steering files/config, shown as a compact stack of chips.
function SteeringFiles({ files }: { files: SteeringFile[] }) {
  return (
    <ul className="flex w-full max-w-52 flex-col gap-1">
      {files.map(({ label, mcp }) => (
        <li
          key={label.en}
          className="flex items-start gap-1.5 border border-faint bg-paper px-2 py-1 text-left font-mono text-[0.6rem] leading-snug normal-case text-muted"
        >
          <span className="text-accent">{mcp ? <McpIcon /> : <FileIcon />}</span>
          <T text={label} />
        </li>
      ))}
    </ul>
  );
}

function Arrow({ label, step }: { label?: Localized; step?: number }) {
  const flow = flowProps(step);
  return (
    <div aria-hidden className="flex flex-col items-center gap-1">
      {label && (
        <span
          className={`font-mono text-[0.6rem] tracking-[0.15em] uppercase ${flow.className ?? "text-muted"}`}
          style={flow.style}
        >
          <T text={label} />
        </span>
      )}
      <span
        className={`text-sm ${flow.className ?? "text-muted"}`}
        style={flow.style}
      >
        ↓
      </span>
    </div>
  );
}

// Translator ⇄ Reviewer handoff, drawn as two directional arrows rather than
// one bidirectional symbol. Only one is ever lit at a time, in the order the
// real flow takes: forward (submit to reviewer) fires twice, back (sent back
// to the translator) fires once in between — see connector-flow-forward/-back
// in globals.css for the exact timing. The pair is always laid out
// perpendicular to the direction it points, so the two tips never meet
// head-on: side by side in a row on mobile (↓ ↑, stacked boxes above/below),
// stacked in a column on sm:+ (→ over ←, boxes side by side) — mirroring how
// the ⇄ glyph itself is drawn.
function Connector() {
  return (
    <span
      aria-hidden
      className="flex flex-row items-center justify-center gap-1.5 text-lg sm:flex-col sm:gap-0 sm:leading-none"
    >
      <span className="connector-flow-forward sm:hidden">↓</span>
      <span className="connector-flow-back sm:hidden">↑</span>
      <span className="connector-flow-forward hidden sm:inline">→</span>
      <span className="connector-flow-back hidden sm:inline">←</span>
    </span>
  );
}

export function MainframeAgentsDiagram() {
  return (
    <div className="my-10 flex flex-col items-center gap-3">
        <Box>
          <T text={copy.input} />
        </Box>
        <Arrow step={0} />

        <Box>
          <T text={copy.orchestrator} />
        </Box>
        <Caption text={copy.orchestratorCaption} />
        <SteeringFiles
          files={[
            { label: copy.orchestrationRules },
            { label: copy.businessLogicPlan },
          ]}
        />
        <Arrow label={copy.confirmsThePlan} step={1} />

        <div className="border border-faint px-4 py-2 text-center font-mono text-[0.65rem] tracking-[0.05em] text-muted normal-case">
          <T text={copy.checkIn} />
        </div>
        <Arrow label={copy.loopStarts} step={2} />

        <div className="flex w-full flex-col items-stretch gap-4 border border-dashed border-faint p-4 sm:flex-row sm:items-start">
          <div className="flex flex-1 flex-col items-center gap-2">
            <Box className="w-full translator-flow">
              <T text={copy.translator} />
            </Box>
            <Caption text={copy.translatorCaption} />
            <SteeringFiles
              files={[
                { label: copy.frontEndPatternFile },
                { label: copy.skillFilePerComponent },
              ]}
            />
          </div>
          <Connector />
          <div className="flex flex-1 flex-col items-center gap-2">
            <Box className="w-full reviewer-flow">
              <T text={copy.reviewer} />
            </Box>
            <Caption text={copy.reviewerCaption} />
            <SteeringFiles
              files={[
                { label: copy.playwrightMcp, mcp: true },
                { label: copy.samePatternFiles },
              ]}
            />
          </div>
        </div>

        <p
          aria-hidden
          className="diagram-flow-arrow font-mono text-[0.6rem] tracking-[0.15em] uppercase"
          style={{ animationDelay: "6s" }}
        >
          <T text={copy.changesRequested} />
        </p>

        <Arrow label={copy.approved} step={10} />
        <Box>
          <T text={copy.reactComponent} />
        </Box>
        <Arrow step={11} />
        <Box>
          <T text={copy.output} />
        </Box>
      </div>
  );
}

// Rendered after the closing detail paragraph (see the `credits`/
// `afterDiagramParagraphs` split in the project page): the loop above resets
// per component, so this is deliberately a separate beat, not a continuation
// of it — the memory that survives across components lives here instead.
export function MainframeAgentsMemoryDiagram() {
  return (
    <>
      {/* Outside the per-component loop above: a persistent file the reviewer
          writes to every pass, distilled back into the translator's steering
          files so the *next* component starts ahead of where this one did.
          Regular prose, not the diagram's small mono type — the small type
          is for the diagram itself, not for reading paragraphs. */}
      <div className="prose mt-14 border-t border-faint pt-10">
        <p className="text-xs tracking-[0.2em] text-muted uppercase">
          <span className="text-accent">→</span>{" "}
          <T text={copy.longTermMemoryLabel} />
        </p>
        <p>
          <T text={copy.longTermMemoryBlurb} />
        </p>
        <p>
          <T text={copy.longTermMemoryCaption} />
        </p>
      </div>

      {/* The row (loop column / arrow / file column) is a fixed ~500px wide
          layout that only really fits from sm: up. Below that, rather than
          wrapping it into a broken multi-line layout, it's scaled down as a
          whole (origin-top) so it stays one row at every width instead of
          reflowing into something that no longer matches the desktop version.
          Centered with flex `justify-center`, not `mx-auto`: auto margins
          collapse to 0 (not negative) once the child is wider than its
          parent, which left-aligns it instead of centering it — the scale's
          shrink-toward-center then no longer lines up with the viewport's
          center, clipping the right side. Flex still centers correctly even
          when the child overflows both edges. */}
      <div className="mt-8 flex w-full justify-center overflow-x-hidden">
        {/* `transform: scale` shrinks the paint, not the reserved layout box —
            without correcting for that, the row still reserves its full
            unscaled height below, leaving a dead gap before the next section.
            The negative margin below pulls that reserved space back in to
            match what's actually visible; only needed below sm:, where the
            scale-down applies. */}
        <div className="-mb-24 w-[500px] max-w-none origin-top scale-[0.62] sm:mb-0 sm:scale-100">
          <div className="flex flex-row items-end justify-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <Caption text={copy.agentCaption} />
              {[1, 2, 3].map((n) => (
                <Box key={n} className="w-40">
                  <span className="mb-1 block text-[0.55rem] tracking-[0.15em] text-muted normal-case">
                    <T text={copy.loopLabel} /> {n}
                  </span>
                  <T text={copy.agent} />
                </Box>
              ))}
            </div>

            <div
              aria-hidden
              className="flex max-w-32 flex-col items-center gap-1 self-center text-muted"
            >
              <span className="text-center font-mono text-[0.6rem] tracking-[0.15em] uppercase">
                <T text={copy.writesFindingsTo} />
              </span>
              <span className="text-sm">→</span>
            </div>

            {/* Two separate destinations, not a pipeline — the reviewer
                writes to both after every pass, but neither feeds the other. */}
            <div className="flex flex-col items-center gap-3">
              <Box className="w-40">
                <T text={copy.reviewHistoryFile} />
                <span className="mt-1 block text-[0.55rem] tracking-[0.1em] text-muted normal-case">
                  <T text={copy.reviewHistoryCaption} />
                </span>
              </Box>
              <Box className="w-40">
                <T text={copy.translatorSteeringUpdate} />
                <span className="mt-1 block text-[0.55rem] tracking-[0.1em] text-muted normal-case">
                  <T text={copy.translatorSteeringUpdateCaption} />
                </span>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <div className="prose mt-14 border-t border-faint pt-10">
        <p className="text-xs tracking-[0.2em] text-muted uppercase">
          <span className="text-accent">→</span>{" "}
          <T text={copy.infiniteLoopLabel} />
        </p>
        <p>
          <T text={copy.infiniteLoopBlurb} />
        </p>
      </div>
    </>
  );
}
