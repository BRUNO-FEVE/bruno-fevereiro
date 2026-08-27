// Plain HTML/CSS, not an <img>: same reasoning as the other diagrams in this
// folder — the site's global aged-photo filter would just muddy a technical
// diagram, and plain divs get to use the real design tokens and real,
// localizable, selectable text instead of a flat image.

import { T } from "@/lib/i18n";
import type { Localized } from "@/lib/dict";

const copy = {
  problemLabel: { en: "Problem", pt: "Problema" },
  problemBlurb1: {
    en: "At Bradesco Seguros, a pull request used to sit in the review queue for close to an hour before anyone even looked at it. Reviewers are busy, so a PR would wait, and once someone finally opened it, a good chunk of what they wrote back was the same handful of comments they'd already made on a dozen other PRs that week.",
    pt: "No Bradesco Seguros, um pull request ficava na fila de revisão por quase uma hora até alguém sequer olhar para ele. Os revisores estão ocupados, então o PR esperava, e quando alguém finalmente abria, boa parte do que escrevia de volta eram os mesmos poucos comentários que já tinha feito em uma dezena de outros PRs naquela semana.",
  },
  problemBlurb2: {
    en: "An off-the-shelf AI review bot doesn't fix that: it reviews against generic best practices, not this project's own conventions, so it either misses what actually matters here or flags things the team does on purpose. What was missing wasn't more review, it was a reviewer that already knew these codebases.",
    pt: "Um bot de revisão de IA pronto não resolve isso: ele revisa contra boas práticas genéricas, não as convenções do próprio projeto, então ou deixa passar o que realmente importa aqui ou aponta coisas que o time faz de propósito. O que faltava não era mais revisão, era um revisor que já conhecesse esses códigos.",
  },
  discoverLabel: { en: "Discover", pt: "Descoberta" },
  discoverBlurb1: {
    en: "Before writing a single review rule, I had the agent map every repository we had, not just one: a whole constellation of Micro Frontends and Micro Services. The folder structure, the architecture, how logic and API calls are actually written, the types, the config files, the CI/CD setup, how errors are actually handled, which libs get used and how, per repo. Not a style guide someone wrote once and let go stale, the patterns each codebase actually follows most consistently, today.",
    pt: "Antes de escrever uma única regra de revisão, fiz o agente mapear todos os repositórios que tínhamos, não só um: uma constelação inteira de Micro Frontends e Micro Services. A estrutura de pastas, a arquitetura, como a lógica e as chamadas de API são realmente escritas, os tipos, os arquivos de configuração, o setup de CI/CD, como os erros são tratados, quais libs são usadas e como, por repositório. Não um guia de estilo que alguém escreveu uma vez e deixou ficar desatualizado, os padrões que cada código realmente segue com mais consistência, hoje.",
  },
  discoverBlurb2: {
    en: "The other half came from the team's own history: I went through previous pull requests, across those same repos, and pulled out the issues reviewers asked for most often, the recurring feedback that never got written down anywhere, just repeated PR after PR. Between the two, the agent's actual rulebook wasn't something I guessed at, it was learned from these specific projects and this specific team.",
    pt: "A outra metade veio do próprio histórico do time: percorri os pull requests anteriores, nesses mesmos repositórios, e extraí os problemas que os revisores mais pediam para corrigir, o feedback recorrente que nunca ficou escrito em lugar nenhum, só repetido PR após PR. Entre os dois, o manual de regras do agente não foi algo que eu chutei, foi aprendido a partir desses projetos específicos e desse time específico.",
  },
  discoverCodebase: { en: "Repos (Micro Frontends & Micro Services)", pt: "Repos (Micro Frontends & Micro Services)" },
  discoverCodebaseCaption: {
    en: "Folder structure, architecture, API call patterns, types, config, CI/CD, error handling, libs usage, per repo",
    pt: "Estrutura de pastas, arquitetura, padrões de chamada de API, tipos, config, CI/CD, tratamento de erros, uso de libs, por repositório",
  },
  discoverPrevPrs: { en: "Previous PR reviews", pt: "Revisões de PRs anteriores" },
  discoverPrevPrsCaption: {
    en: "The issues reviewers asked for most often",
    pt: "Os problemas que os revisores mais pediam",
  },
  discoverArrowLabel: {
    en: "Discover, once, ahead of time",
    pt: "Descoberta, uma vez, antecipadamente",
  },
  patternFiles: { en: "Code pattern files", pt: "Arquivos de padrões de código" },
  solutionLabel: { en: "Solution & results", pt: "Solução & resultados" },
  solutionBlurb1: {
    en: "That's what runs today: a custom review agent built on the Claude API and AWS Kiro, paired with an MCP server that pulls only the PR's diff, never the whole repository behind it, so the context window never overflows, whichever of the many Micro Frontend or Micro Service repos the PR happens to be in. The same MCP layer also reads the build status from Bamboo and the static-analysis report from SonarQube, so the agent isn't reviewing code in isolation.",
    pt: "É isso que roda hoje: um agente de revisão personalizado construído com a Claude API e o AWS Kiro, junto com um servidor MCP que busca apenas o diff do PR, nunca o repositório inteiro por trás dele, então a janela de contexto nunca estoura, seja qual for, entre os vários repositórios de Micro Frontend ou Micro Service, aquele em que o PR está. A mesma camada de MCP também lê o status do build no Bamboo e o relatório de análise estática do SonarQube, então o agente não revisa o código isolado.",
  },
  solutionBlurb2: {
    en: "Checked against the patterns and the recurring issues from the discovery step, it posts both inline comments on the specific lines and a general comment summarizing the review, directly on the Bitbucket pull request.",
    pt: "Verificado contra os padrões e os problemas recorrentes da etapa de descoberta, ele publica tanto comentários inline nas linhas específicas quanto um comentário geral resumindo a revisão, diretamente no pull request do Bitbucket.",
  },
  solutionResultPart1: {
    en: "The result: review time dropped from close to an hour to under ten minutes, a ",
    pt: "O resultado: o tempo de revisão caiu de quase uma hora para menos de dez minutos, uma ",
  },
  solutionResultCut: { en: "~90% cut", pt: "redução de ~90%" },
  solutionResultPart2: {
    en: ". It wasn't a side experiment that stayed on my machine, either, ",
    pt: ". Também não foi um experimento paralelo que ficou só na minha máquina, ",
  },
  solutionResultAdoption: {
    en: "the whole engineering team adopted it",
    pt: "toda a equipe de engenharia adotou",
  },
  solutionResultPart3: {
    en: " as part of the actual review process, and it's been submitted for a talk at ",
    pt: " como parte do processo real de revisão, e o projeto foi inscrito para uma apresentação no ",
  },
  solutionResultSummit: {
    en: "AWS Summit São Paulo 2026",
    pt: "AWS Summit São Paulo 2026",
  },
  solutionResultPart4: { en: ".", pt: "." },
  newPr: { en: "New pull request", pt: "Novo pull request" },
  mcp: { en: "MCP: PR diff only", pt: "MCP: apenas o diff do PR" },
  mcpCaption: {
    en: "Keeps the context window from overflowing, across many repos",
    pt: "Evita que a janela de contexto estoure, entre muitos repositórios",
  },
  agent: { en: "Custom review agent", pt: "Agente de revisão personalizado" },
  agentCaption: {
    en: "Checks the diff against the discovered patterns, the build status, and the static-analysis report",
    pt: "Verifica o diff em relação aos padrões descobertos, ao status do build e ao relatório de análise estática",
  },
  patternFilesChip: { en: "Code pattern files", pt: "Arquivos de padrões de código" },
  bambooChip: { en: "Bamboo build status", pt: "Status do build no Bamboo" },
  sonarChip: { en: "SonarQube report", pt: "Relatório do SonarQube" },
  inlineComments: { en: "MCP: Inline comments", pt: "MCP: Comentários inline" },
  generalComment: { en: "MCP: General comment", pt: "MCP: Comentário geral" },
  bitbucketPr: {
    en: "Posted on the Bitbucket pull request",
    pt: "Publicado no pull request do Bitbucket",
  },
} satisfies Record<string, Localized>;

// `step` places a single-beat element in the diagram's traveling pulse (see
// .diagram-flow-arrow in globals.css): a shared 12s loop, staggered by
// animation-delay so the red light chases the real order of the live
// per-PR review flow. The discovery diagram further down never uses this —
// it happens once, ahead of time, not on a repeating cadence, so animating
// it on the same loop would fabricate a beat that isn't real.
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

// text-center!: this diagram's sections live inside a `.prose` wrapper
// (unlike the other diagrams, which render as prose siblings), and the
// global `.prose p { text-align: justify }` rule outranks a plain
// `text-center` utility on specificity alone, so it has to be forced.
function Caption({ text }: { text: Localized }) {
  return (
    <p className="max-w-52 text-center! font-mono text-[0.65rem] leading-relaxed normal-case text-muted">
      <T text={text} />
    </p>
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
      <span className={`text-sm ${flow.className ?? "text-muted"}`} style={flow.style}>
        ↓
      </span>
    </div>
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

// A small server rack, standing in for "a system the agent reads from" (a
// build server, a static-analysis dashboard) via MCP.
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

type Chip = { label: Localized; mcp?: boolean };

// list-none!/pl-0!/mt-0!: same `.prose` bleed as Caption's text-center! above
// — `.prose ul` adds list-style + 1.5rem left padding, and `.prose li + li`
// adds its own margin-top on top of this list's own flex `gap-1`, both of
// which outrank a plain utility class on specificity alone.
function Chips({ items }: { items: Chip[] }) {
  return (
    <ul className="flex max-w-52 flex-col gap-1 pl-0! list-none!">
      {items.map(({ label, mcp }) => (
        <li
          key={label.en}
          className="mt-0! flex items-start gap-1.5 border border-faint bg-paper px-2 py-1 text-left font-mono text-[0.6rem] leading-snug normal-case text-muted"
        >
          <span className="text-accent">{mcp ? <McpIcon /> : <FileIcon />}</span>
          <T text={label} />
        </li>
      ))}
    </ul>
  );
}

export function ProblemSection() {
  return (
    <div className="prose">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        <span className="text-accent">→</span> <T text={copy.problemLabel} />
      </p>
      <p>
        <T text={copy.problemBlurb1} />
      </p>
      <p>
        <T text={copy.problemBlurb2} />
      </p>
    </div>
  );
}

// Static, no traveling pulse: this mapping happens once, ahead of time, not
// on the live per-PR cadence the Solution diagram below actually repeats.
function DiscoverDiagram() {
  return (
    <div className="my-10 flex flex-col items-center gap-3">
      <div className="flex w-full flex-col items-stretch gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col items-center gap-2">
          <Box className="w-full">
            <T text={copy.discoverCodebase} />
          </Box>
          <Caption text={copy.discoverCodebaseCaption} />
        </div>
        <div className="flex flex-1 flex-col items-center gap-2">
          <Box className="w-full">
            <T text={copy.discoverPrevPrs} />
          </Box>
          <Caption text={copy.discoverPrevPrsCaption} />
        </div>
      </div>
      <Arrow label={copy.discoverArrowLabel} />
      <Box>
        <T text={copy.patternFiles} />
      </Box>
    </div>
  );
}

export function DiscoverSection() {
  return (
    <div className="prose mt-14 border-t border-faint pt-10">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        <span className="text-accent">→</span> <T text={copy.discoverLabel} />
      </p>
      <p>
        <T text={copy.discoverBlurb1} />
      </p>
      <p>
        <T text={copy.discoverBlurb2} />
      </p>
      <DiscoverDiagram />
    </div>
  );
}

// The live pipeline: this one gets the traveling pulse, since it's a real,
// repeating event that fires on every new pull request, not a one-off.
function SolutionDiagram() {
  return (
    <div className="my-10 flex flex-col items-center gap-3">
      <Box>
        <T text={copy.newPr} />
      </Box>
      <Arrow step={0} />
      <Box className="w-full sm:w-auto">
        <T text={copy.mcp} />
      </Box>
      <Caption text={copy.mcpCaption} />
      <Arrow step={2} />
      <div className="flex flex-col items-center gap-2">
        <Box>
          <T text={copy.agent} />
        </Box>
        <Chips
          items={[
            { label: copy.sonarChip, mcp: true },
            { label: copy.bambooChip, mcp: true },
            { label: copy.patternFilesChip },
          ]}
        />
        <Caption text={copy.agentCaption} />
      </div>
      <Arrow step={5} />
      <div className="flex w-full flex-col items-stretch gap-4 border border-dashed border-faint p-4 sm:flex-row">
        <Box className="flex-1">
          <T text={copy.inlineComments} />
        </Box>
        <Box className="flex-1">
          <T text={copy.generalComment} />
        </Box>
      </div>
      <Caption text={copy.bitbucketPr} />
    </div>
  );
}

export function SolutionSection() {
  return (
    <div className="prose mt-14 border-t border-faint pt-10">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        <span className="text-accent">→</span> <T text={copy.solutionLabel} />
      </p>
      <p>
        <T text={copy.solutionBlurb1} />
      </p>
      <SolutionDiagram />
      <p>
        <T text={copy.solutionBlurb2} />
      </p>
      <p>
        <T text={copy.solutionResultPart1} />
        <span className="text-accent italic">
          <T text={copy.solutionResultCut} />
        </span>
        <T text={copy.solutionResultPart2} />
        <span className="text-accent italic">
          <T text={copy.solutionResultAdoption} />
        </span>
        <T text={copy.solutionResultPart3} />
        <span className="text-accent italic">
          <T text={copy.solutionResultSummit} />
        </span>
        <T text={copy.solutionResultPart4} />
      </p>
    </div>
  );
}

export function AiCodeReviewAgentSections() {
  return (
    <>
      <ProblemSection />
      <DiscoverSection />
      <SolutionSection />
    </>
  );
}
