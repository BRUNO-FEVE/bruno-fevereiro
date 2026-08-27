// Plain HTML/CSS, not an <img>: the site's global aged-photo filter applies
// to every img/video, which would just muddy a technical diagram.

import { T } from "@/lib/i18n";
import type { Localized } from "@/lib/dict";

const copy = {
  appLoads: { en: "User opens the app", pt: "Usuário abre o app" },
  orchestrator: { en: "Orchestrator", pt: "Orquestrador" },
  orchestratorCaption: {
    en: "The host app. Every screen request goes through it first.",
    pt: "O host app. Toda requisição de tela passa por ele primeiro.",
  },
  permissionCheck: {
    en: "Checks the user's permission profile",
    pt: "Verifica o perfil de permissão do usuário",
  },
  alwaysLoaded: { en: "Always loaded", pt: "Sempre carregados" },
  alwaysLoadedCaption: {
    en: "Mounted for every user, regardless of role.",
    pt: "Montados para todo usuário, independente do perfil.",
  },
  menu: { en: "Menu", pt: "Menu" },
  login: { en: "Login", pt: "Login" },
  homePage: { en: "Home page", pt: "Página inicial" },
  roleBased: { en: "Role-based", pt: "Baseado no perfil" },
  roleBasedCaption: {
    en: "Mounted dynamically: only the Micro Frontends this profile is allowed to see.",
    pt: "Montados dinamicamente: só os Micro Frontends que esse perfil pode ver.",
  },
  rendered: { en: "Rendered in the shell", pt: "Renderizado no shell" },
  componentLibraryLabel: {
    en: "Shared component & utils library",
    pt: "Biblioteca compartilhada de componentes & utils",
  },
  componentLibraryBlurb1: {
    en: "Every Micro Frontend at Bradesco Seguros pulls its UI components, default configs, and cross-cutting utilities from one shared library instead of reimplementing them per team: a component set built with Storybook, plus utility functions like checking access permissions and pulling the current session.",
    pt: "Todo Micro Frontend do Bradesco Seguros puxa seus componentes de UI, configs padrão e utilitários transversais de uma única biblioteca compartilhada em vez de reimplementá-los por equipe: um conjunto de componentes construído com Storybook, além de funções utilitárias como checagem de permissão de acesso e obtenção da sessão atual.",
  },
  componentLibraryBlurb2: {
    en: "It's used across 11 teams, and having one shared source for auth and session plumbing and UI components sped up component development by 60% overall.",
    pt: "É usada por 11 equipes, e ter uma única fonte compartilhada para a parte de autenticação e sessão e para os componentes de UI acelerou o desenvolvimento de componentes em 60% no geral.",
  },
} satisfies Record<string, Localized>;

// `step` places a single-beat element in the diagram's traveling pulse (see
// .diagram-flow-arrow in globals.css): one red flash per 12s loop, staggered
// by animation-delay so it chases the real order of events. This diagram is
// a straight line (load → check → branch → render), no loop, so every beat
// only needs to fire once — no dedicated multi-pulse keyframes required.
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

function Chip({ text }: { text: Localized }) {
  return (
    <li className="border border-faint bg-paper px-2 py-1 text-center font-mono text-[0.6rem] leading-snug normal-case text-muted">
      <T text={text} />
    </li>
  );
}

export function MicroFrontendPlatformDiagram() {
  return (
    <div className="my-10 flex flex-col items-center gap-3">
      <Box>
        <T text={copy.appLoads} />
      </Box>
      <Arrow step={0} />

      <Box>
        <T text={copy.orchestrator} />
      </Box>
      <Caption text={copy.orchestratorCaption} />
      <Arrow label={copy.permissionCheck} step={1} />

      <div className="flex w-full flex-col items-stretch gap-4 border border-dashed border-faint p-4 sm:flex-row sm:items-start">
        <div className="flex flex-1 flex-col items-center gap-2">
          <Box className="w-full">
            <T text={copy.alwaysLoaded} />
          </Box>
          <Caption text={copy.alwaysLoadedCaption} />
          <ul className="flex w-full max-w-52 flex-col gap-1">
            <Chip text={copy.menu} />
            <Chip text={copy.login} />
            <Chip text={copy.homePage} />
          </ul>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2">
          <Box className="w-full">
            <T text={copy.roleBased} />
          </Box>
          <Caption text={copy.roleBasedCaption} />
        </div>
      </div>

      <Arrow step={2} />
      <Box>
        <T text={copy.rendered} />
      </Box>
    </div>
  );
}

// Rendered after the closing detail paragraph: the shared component/utils
// library built alongside the orchestrator, folded in here as a section
// rather than kept as its own project page since the two are one effort.
export function MicroFrontendPlatformAfterSections() {
  return (
    <div className="prose mt-14 border-t border-faint pt-10">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        <span className="text-accent">→</span> <T text={copy.componentLibraryLabel} />
      </p>
      <p>
        <T text={copy.componentLibraryBlurb1} />
      </p>
      <p>
        <T text={copy.componentLibraryBlurb2} />
      </p>
    </div>
  );
}
