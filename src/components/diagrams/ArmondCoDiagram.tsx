// The workflow diagram below is plain HTML/CSS, not an <img>: the site's
// global aged-photo filter would just muddy a technical diagram. The two
// real screenshots further down are the opposite case — actual photos of
// the site, so they get the filter like any other image on the page.

import { Polaroid } from "@/components/Polaroid";
import { T } from "@/lib/i18n";
import type { Localized } from "@/lib/dict";

const copy = {
  draft: { en: "New article (draft)", pt: "Novo artigo (rascunho)" },
  loopStarts: { en: "Loop starts", pt: "Loop começa" },
  columnist: { en: "Columnist", pt: "Colunista" },
  columnistCaption: {
    en: "Writes and edits their own drafts. Can never publish, and can never sign another columnist's byline.",
    pt: "Escreve e edita os próprios rascunhos. Nunca pode publicar, e nunca pode assinar como outro colunista.",
  },
  admin: { en: "Admin", pt: "Administrador" },
  adminCaption: {
    en: "The only role that can flip an article to published. Gets an email the moment one is submitted for review.",
    pt: "O único papel que pode marcar um artigo como publicado. Recebe um email assim que uma matéria é submetida para revisão.",
  },
  sentBackToDraft: {
    en: "↺ Sent back to draft for changes (repeats until approved)",
    pt: "↺ Devolvido para rascunho para ajustes (repete até ser aprovado)",
  },
  approved: { en: "✓ Approved", pt: "✓ Aprovado" },
  published: {
    en: "Published, live on site",
    pt: "Publicado, ao vivo no site",
  },
  adminExperienceLabel: {
    en: "Admin experience",
    pt: "Experiência do administrador",
  },
  adminBlockBuilderBlurb: {
    en: "Building a page itself is drag-and-drop: an admin adds blocks from a library, each with its own thumbnail preview in the picker, reorders them freely, and edits every block's own fields directly, its text, images, colors, even which font a paragraph uses, without touching a line of code.",
    pt: "Montar uma página em si é arrastar e soltar: um administrador adiciona blocos de uma biblioteca, cada um com sua própria miniatura de prévia no seletor, reordena livremente, e edita os próprios campos de cada bloco diretamente, o texto, as imagens, as cores, até qual fonte um parágrafo usa, sem tocar em uma linha de código.",
  },
  adminRoleUiBlurb: {
    en: "The admin panel itself adapts to who's logged in: there are two roles, admin and columnist, and a columnist's sidebar only shows what they actually need, their own news entries and their own public profile. Categories and the full user list stay out of their way entirely, even though the underlying access rules already prevent them from touching either.",
    pt: "O próprio painel de administração se adapta a quem está logado: existem dois papéis, administrador e colunista, e a barra lateral de um colunista só mostra o que ele realmente precisa, suas próprias notícias e o próprio perfil público. Categorias e a lista completa de usuários ficam totalmente fora do caminho dele, mesmo que as regras de acesso já impeçam que ele mexa em qualquer uma delas.",
  },
  adminAccountBlurb: {
    en: "Every user manages their own account, including their own password, but only an admin can assign roles or link a login to a columnist's public profile, so nobody can promote themselves to admin or start signing someone else's articles.",
    pt: "Cada usuário gerencia a própria conta, incluindo a própria senha, mas só um administrador pode atribuir papéis ou ligar um login a um perfil público de colunista, então ninguém consegue se promover a administrador ou passar a assinar os artigos de outra pessoa.",
  },
  adminLivePreviewBlurb: {
    en: "Before publishing anything, an admin can open a live preview and see exactly how a page or article will render, at mobile, tablet, and desktop breakpoints, right inside the same panel, no separate staging environment needed.",
    pt: "Antes de publicar qualquer coisa, um administrador pode abrir um preview ao vivo e ver exatamente como uma página ou artigo vai renderizar, nos breakpoints mobile, tablet e desktop, direto dentro do mesmo painel, sem precisar de um ambiente de staging separado.",
  },
  seoConversionLabel: {
    en: "SEO & conversion",
    pt: "SEO & conversão",
  },
  seoBlurb: {
    en: "SEO wasn't a checkbox here, it was the point: an editorial site lives or dies by how well its articles rank, and every article page is image-heavy, with a hero photo plus inline images. That combination is exactly what tanks Core Web Vitals if you get it wrong, so every article is server-rendered with per-page metadata for search engines, and images run through Next.js's built-in optimizer instead of shipping full-resolution files to the client.",
    pt: "SEO não era um item de checklist aqui, era o ponto central: um site editorial vive ou morre pelo quão bem seus artigos rankeiam, e cada página de artigo é pesada em imagens, com uma foto de destaque mais imagens no corpo do texto. Essa combinação é exatamente o que destrói o Core Web Vitals quando mal feita, por isso cada artigo é renderizado no servidor com metadados próprios para os mecanismos de busca, e as imagens passam pelo otimizador nativo do Next.js em vez de serem enviadas em resolução total para o cliente.",
  },
  conversionBlurb: {
    en: "The last piece ties content back to business: a newsletter signup wired to Substack, and a WhatsApp contact button, so an article that hooks a reader turns into a lead or a subscriber instead of a dead end.",
    pt: "A última peça conecta conteúdo de volta ao negócio: uma inscrição de newsletter integrada ao Substack e um botão de contato via WhatsApp, para que um artigo que prenda o leitor vire um lead ou um assinante em vez de um beco sem saída.",
  },
  architectureLabel: {
    en: "Headless architecture",
    pt: "Arquitetura headless",
  },
  architectureBlurb1: {
    en: "Payload isn't a separate service somewhere else, it's a library running inside the same Next.js app, on Vercel. Pages call it through Payload's Local API, direct in-process function calls, not an HTTP request over a network to some other backend, which is what most \"headless CMS\" setups actually do under the hood.",
    pt: "O Payload não é um serviço separado rodando em outro lugar, é uma biblioteca dentro do mesmo app Next.js, na Vercel. As páginas chamam ele pela Local API do Payload, chamadas diretas de função no mesmo processo, não uma requisição HTTP pela rede até outro backend, que é o que a maioria dos setups de \"CMS headless\" realmente faz por baixo dos panos.",
  },
  architectureBlurb2: {
    en: "Every collection is fetched through a small caching layer on top of that Local API: results are cached and tagged per collection, and Payload's own hooks call Next.js's revalidateTag the moment something changes, so publishing an article or editing a page invalidates the cache immediately instead of waiting for it to expire. The database is MongoDB, and every uploaded image goes to Vercel Blob storage instead of the filesystem, since Vercel's serverless functions don't keep local files around between requests.",
    pt: "Cada coleção é buscada através de uma pequena camada de cache em cima dessa Local API: os resultados ficam em cache marcados por coleção, e os próprios hooks do Payload chamam o revalidateTag do Next.js no momento em que algo muda, então publicar um artigo ou editar uma página invalida o cache imediatamente em vez de esperar ele expirar. O banco de dados é MongoDB, e toda imagem enviada vai para o Vercel Blob storage em vez do sistema de arquivos, já que as funções serverless da Vercel não mantêm arquivos locais entre requisições.",
  },
} satisfies Record<string, Localized>;

// `step` places a single-beat element in the diagram's traveling pulse (see
// .diagram-flow-arrow in globals.css) — shared 12s loop, staggered by
// animation-delay so the red light chases the real order of events.
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

// Columnist ⇄ Admin handoff, same shape as MainframeAgentsDiagram's
// translator/reviewer Connector and reusing its exact keyframes: forward
// (submit for review) fires twice per 12s cycle, back (sent back to draft)
// fires once in between, since the real loop here has the same rhythm
// (submit, get sent back once, revise, resubmit, then approved).
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

export function ArmondEditorialWorkflowDiagram() {
  return (
    <div className="my-10 flex flex-col items-center gap-3">
      <Box>
        <T text={copy.draft} />
      </Box>
      <Arrow label={copy.loopStarts} step={2} />

      <div className="flex w-full flex-col items-stretch gap-4 border border-dashed border-faint p-4 sm:flex-row sm:items-start">
        <div className="flex flex-1 flex-col items-center gap-2">
          <Box className="w-full translator-flow">
            <T text={copy.columnist} />
          </Box>
          <Caption text={copy.columnistCaption} />
        </div>
        <Connector />
        <div className="flex flex-1 flex-col items-center gap-2">
          <Box className="w-full reviewer-flow">
            <T text={copy.admin} />
          </Box>
          <Caption text={copy.adminCaption} />
        </div>
      </div>

      <p
        aria-hidden
        className="diagram-flow-arrow font-mono text-[0.6rem] tracking-[0.15em] uppercase"
        style={{ animationDelay: "6s" }}
      >
        <T text={copy.sentBackToDraft} />
      </p>

      <Arrow label={copy.approved} step={10} />
      <Box>
        <T text={copy.published} />
      </Box>
    </div>
  );
}

// Real screenshots, not diagram boxes, at their own intrinsic aspect ratio
// rather than cropped to fit, since a stretched screenshot reads as fake.
// The desktop shot opens the page (the homepage, the site's first
// impression); the mobile shot lands mid-article, next to the workflow it's
// illustrating (an actual article page, on a phone).
export function ArmondTopScreenshot() {
  return (
    <div className="mt-10">
      <Polaroid
        src="/armond-co-desktop.png"
        alt="Armond & Co homepage, viewed on desktop"
        width={1090}
        height={721}
        priority
      />
    </div>
  );
}

function MobileScreenshot() {
  return (
    <div className="my-8 mx-auto w-full max-w-xs">
      <Polaroid
        src="/armond-co-mobile.png"
        alt="Armond & Co article page, viewed on mobile"
        width={1507}
        height={2000}
        rotate={2}
      />
    </div>
  );
}

function AdminExperienceSection() {
  return (
    <div className="prose mt-14 border-t border-faint pt-10">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        <span className="text-accent">→</span> <T text={copy.adminExperienceLabel} />
      </p>
      <p>
        <T text={copy.adminBlockBuilderBlurb} />
      </p>
      <p>
        <T text={copy.adminRoleUiBlurb} />
      </p>
      <p>
        <T text={copy.adminAccountBlurb} />
      </p>
      <p>
        <T text={copy.adminLivePreviewBlurb} />
      </p>
    </div>
  );
}

function SeoConversionSection() {
  return (
    <div className="prose mt-14 border-t border-faint pt-10">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        <span className="text-accent">→</span> <T text={copy.seoConversionLabel} />
      </p>
      <p>
        <T text={copy.seoBlurb} />
      </p>
      <MobileScreenshot />
      <p>
        <T text={copy.conversionBlurb} />
      </p>
    </div>
  );
}

function HeadlessArchitectureSection() {
  return (
    <div className="prose mt-14 border-t border-faint pt-10">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        <span className="text-accent">→</span> <T text={copy.architectureLabel} />
      </p>
      <p>
        <T text={copy.architectureBlurb1} />
      </p>
      <p>
        <T text={copy.architectureBlurb2} />
      </p>
    </div>
  );
}

// Rendered after the closing detail paragraph: three standalone sections,
// each with its own heading rather than folding into plain prose.
export function ArmondCoAfterSections() {
  return (
    <>
      <AdminExperienceSection />
      <SeoConversionSection />
      <HeadlessArchitectureSection />
    </>
  );
}
