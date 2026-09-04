// Edit this file to add, remove, or reorder your projects.
// `featured: true` puts a project on the home page (first three shown).

import type { Localized } from "@/lib/dict";
import { slugify } from "@/lib/slug";
import type { GalleryPhoto } from "@/components/PhotoGallery";

export type Project = {
  title: string;
  year: string;
  description: Localized;
  /** Longer body for the project's dedicated /projects/[slug] page — one
      entry per paragraph. Falls back to `description` alone when omitted. */
  details?: Localized[];
  role: Localized;
  link?: string;
  featured?: boolean;
  /** Screenshots shown as a film-roll gallery on the project's dedicated
      page, right below the intro. Same pattern as `experience.ts`'s
      per-job galleries: drop files in public/, list them here. */
  photos?: GalleryPhoto[];
  /** Short badge shown next to the title wherever this project appears,
      for a stand-out achievement (an award, a conference selection, etc.). */
  highlight?: Localized;
  /** Matches an `experience` company name — surfaces the project as a card
      under that job in the "Where I've worked" section. */
  company?: string;
  /** Slugs of related articles in content/writing/ — rendered as
      "Read the story" links under the project, and the article pages
      link back here automatically. */
  articles?: string[];
  /** Books, articles, docs, etc. that shaped the work — shown as a
      "Resources used" section on the project's dedicated page. */
  resources?: { title: string; author?: string; link?: string }[];
  /** People to credit on the project's dedicated page (a lead, a
      collaborator) — name is a real link, not scrambled/localized like
      the prose, matching how `resources` authors are handled.
      `afterDetailIndex` merges the credit into that `details` paragraph
      (same sentence flow) instead of giving it its own paragraph;
      `position` picks which end of that paragraph it attaches to. */
  credits?: {
    name: string;
    link?: string;
    note: Localized;
    afterDetailIndex?: number;
    position?: "before" | "after";
  }[];
  /** A short phrase (same in both languages, e.g. a proper noun) highlighted
      in accent color at the end of a `details` paragraph. */
  emphases?: { phrase: string; afterDetailIndex: number }[];
  /** How many leading `details` paragraphs render before the project's
      diagram (see `diagrams` in `[slug]/page.tsx`); the rest render after
      it. Defaults to `details.length - 1` (diagram before the closing
      paragraph only), matching the original single-diagram layout. */
  diagramAfterDetailIndex?: number;
};

/** URL slug for a project's dedicated /projects/[slug] page. */
export function projectSlug(title: string) {
  return slugify(title);
}

export const projects: Project[] = [
  {
    title: "AI Code Review Agent",
    year: "2025",
    description: {
      en: "An AI agent built on the Claude API, AWS Kiro and MCP servers that reviews pull requests end to end, wired into Bitbucket, Bamboo and SonarQube. Cut review time from an hour to under ten minutes, was adopted by the whole team, and was submitted for presentation at AWS Summit São Paulo 2026.",
      pt: "Um agente de IA construído com a Claude API, AWS Kiro e servidores MCP que revisa pull requests de ponta a ponta, integrado ao Bitbucket, Bamboo e SonarQube. Reduziu o tempo de revisão de uma hora para menos de dez minutos, foi adotado por toda a equipe e foi inscrito para apresentação no AWS Summit São Paulo 2026.",
    },
    details: [],
    role: {
      en: "Engineering · Bradesco Seguros",
      pt: "Engenharia · Bradesco Seguros",
    },
    featured: true,
    company: "Bradesco Seguros",
  },
  {
    title: "Mainframe Modernization Agents",
    year: "2025",
    description: {
      en: "A distributed system of three AI agents (an orchestrator coordinating a reviewer and a translator) that autonomously turns Mainframe screenshots into a Micro Frontend that conforms to the design system. Selected to be showcased at AWS Summit São Paulo 2026.",
      pt: "Um sistema distribuído de três agentes de IA (um orquestrador coordenando um revisor e um tradutor) que transforma screenshots de Mainframe em um Micro Frontend conforme ao design system, de forma autônoma. Selecionado para ser apresentado no AWS Summit São Paulo 2026.",
    },
    highlight: {
      en: "★ Selected for AWS Summit São Paulo 2026",
      pt: "★ Selecionado para o AWS Summit São Paulo 2026",
    },
    details: [
      {
        en: "Early in 2026, AWS brought in a dedicated team to help drive the migration.",
        pt: "No início de 2026, a AWS trouxe um time dedicado para ajudar a conduzir a migração.",
      },
      {
        en: "AWS Transform handled converting the Mainframe backend to Java, and I was in charge of the Micro Frontend part: three AI agents that learn the actual Mainframe screen patterns well enough to rebuild them as modern UI.",
        pt: "O AWS Transform cuidou da conversão do backend de Mainframe para Java, e eu fui responsável pela parte do Micro Frontend: três agentes de IA que aprendem os padrões reais das telas de Mainframe o suficiente para reconstruí-las como UI moderna.",
      },
      {
        en: "Doing this migration by hand, one Mainframe screen at a time, wasn't realistic at Bradesco Seguros' scale. So I started with a loop, and at the beginning I was part of it myself: writing a component, checking it against the real screen, and manually feeding corrections back in. As I refined that process, the manual checking turned into a fully automated loop instead.",
        pt: "Fazer essa migração na mão, uma tela de Mainframe por vez, não era viável na escala do Bradesco Seguros. Por isso comecei com um loop, e no início eu mesmo fazia parte dele: escrevia um componente, conferia contra a tela real e alimentava as correções manualmente de volta. Conforme fui refinando esse processo, a conferência manual virou um loop totalmente automatizado.",
      },
      {
        en: "That's the loop the three agents run today. An orchestrator agent starts the process by validating the business rules it reads from the screenshot with a person: me, another developer, or even a business analyst. Once that's confirmed, the loop begins. A translator agent reads the Mainframe screenshot, including the business rules baked into it, and writes a first version of the React/TypeScript component. A reviewer agent then checks that component against the design system and the other Micro Frontends; if it doesn't hold up, it sends the issue back, the translator rewrites, and the cycle repeats until the component actually conforms, not just looks close.",
        pt: "Esse é o loop que os três agentes rodam hoje. Um agente orquestrador inicia o processo validando as regras de negócio que lê no screenshot com uma pessoa: eu, outro desenvolvedor, ou até um analista de negócio. Validada essa informação, o loop começa. Um agente tradutor lê o screenshot do Mainframe, incluindo as regras de negócio embutidas nele, e escreve uma primeira versão do componente React/TypeScript. Um agente revisor então verifica esse componente em relação ao design system e aos outros Micro Frontends; se não estiver correto, ele devolve o problema, o tradutor reescreve, e o ciclo se repete até o componente realmente seguir o design system, não só parecer com ele.",
      },
      {
        en: "The output is a Micro Frontend meant to be appended directly to Portal Gestor, with every screen translated to the modern UI library. The project was selected to be showcased at",
        pt: "O resultado é um Micro Frontend feito para ser incorporado diretamente ao Portal Gestor, com todas as telas traduzidas para a UI library moderna. O projeto foi selecionado para ser apresentado no",
      },
    ],
    credits: [
      {
        name: "Douglas Ramos",
        link: "https://www.linkedin.com/in/douglasrogerioramos/",
        note: {
          en: "led the team on this migration, on the mainframe and backend side.",
          pt: "liderou o time nessa migração, no lado do mainframe e backend.",
        },
        afterDetailIndex: 1,
        position: "before",
      },
    ],
    emphases: [{ phrase: "AWS Summit São Paulo 2026.", afterDetailIndex: 4 }],
    resources: [
      {
        title: "AI Engineering",
        author: "Chip Huyen",
        link: "https://www.amazon.com.br/AI-Engineering-Building-Applications-Foundation/dp/1098166302",
      },
    ],
    role: {
      en: "Architecture & engineering · Bradesco Seguros",
      pt: "Arquitetura & engenharia · Bradesco Seguros",
    },
    featured: true,
    company: "Bradesco Seguros",
  },
  {
    title: "Armond & Co",
    year: "2025",
    description: {
      en: "A high-performance website for a luxury consultancy: Next.js, TypeScript and Payload CMS with server-side rendering tuned for SEO and Core Web Vitals, plus a custom CMS so the team edits everything themselves.",
      pt: "Um site de alta performance para uma consultoria de luxo: Next.js, TypeScript e Payload CMS com SSR otimizado para SEO e Core Web Vitals, além de um CMS personalizado para o time editar tudo sozinho.",
    },
    details: [
      {
        en: "A luxury market consultancy came to me needing a site that actually ranks and loads fast, not just looks expensive, so I built it on Next.js and TypeScript, with server-side rendering tuned specifically for SEO and Core Web Vitals, and Payload CMS underneath.",
        pt: "Uma consultoria de mercado de luxo me procurou precisando de um site que realmente rankeasse bem e carregasse rápido, não só parecesse caro, por isso construí em Next.js e TypeScript, com SSR ajustado especificamente para SEO e Core Web Vitals, com Payload CMS por baixo.",
      },
      {
        en: "The site isn't a single landing page, it's a full editorial operation: a trending carousel, a latest-news grid, an editor's picks section, columnist profiles, articles tagged across six categories (market, finance, fashion, lifestyle, branding, real estate), and an embedded video channel. Every one of those had to become a reusable content type in Payload, not a one-off page, so a new article or columnist slots into the right carousel, grid, and category filter automatically.",
        pt: "O site não é uma landing page única, é uma operação editorial completa: um carrossel de destaques, uma grade de últimas notícias, uma seção de seleção do editor, perfis de colunistas, artigos marcados em seis categorias (mercado, finanças, moda, lifestyle, branding, imóveis) e um canal de vídeos incorporado. Cada um desses precisou virar um tipo de conteúdo reutilizável no Payload, não uma página avulsa, para que um novo artigo ou colunista se encaixe automaticamente no carrossel certo, na grade e no filtro de categoria.",
      },
      {
        en: "The part I'm most proud of isn't visible on the site, it's the newsroom behind it: columnists get their own login and can write and edit their own articles, but they can only submit a piece for review, not publish it. Only an admin can flip an article to published, and the moment a columnist submits one, every admin gets an email so nothing sits unreviewed. A columnist also can't sign someone else's byline, that's locked server-side to their own profile.",
        pt: "A parte de que mais me orgulho não aparece no site, é a redação por trás dele: colunistas têm login próprio e podem escrever e editar seus próprios artigos, mas só conseguem submeter uma matéria para revisão, não publicá-la. Só um administrador pode marcar um artigo como publicado, e no momento em que um colunista submete um, todo administrador recebe um email para que nada fique sem revisão. Um colunista também não consegue assinar como outro colunista, isso é travado no servidor e vinculado ao próprio perfil.",
      },
      {
        en: "On top of that workflow sits the part that mattered most to the client: her admins edit everything themselves, approving articles, adding columnists, swapping the homepage carousel, without ever needing to ping me for a content change.",
        pt: "Em cima desse workflow fica a parte que mais importava para a cliente: os administradores dela editam tudo sozinhos, aprovando artigos, adicionando colunistas, trocando o carrossel da home, sem nunca precisar me chamar para uma mudança de conteúdo.",
      },
    ],
    role: {
      en: "Design, development & software architecture · freelance",
      pt: "Design, desenvolvimento & arquitetura de software · freelance",
    },
    link: "https://armondco.com",
    featured: true,
    company: "Armond & Co",
    diagramAfterDetailIndex: 3,
  },
  {
    title: "Micro Frontend Platform",
    year: "2024–2025",
    description: {
      en: "The first in-house Micro Frontend architecture and project template at Bradesco Seguros (React, TypeScript, Webpack, Module Federation). Cut project setup time by ~75% for the 8 teams that adopted it directly.",
      pt: "A primeira arquitetura e template de Micro Frontend construídos internamente no Bradesco Seguros (React, TypeScript, Webpack, Module Federation). Reduziu o tempo de setup de projeto em ~75% para as 8 equipes que adotaram diretamente.",
    },
    details: [
      {
        en: "This started as the first React/Webpack Micro Frontend architecture built entirely in-house at Bradesco Seguros. Before it existed, every team wired up their own module federation setup from scratch. I turned it into a project template so new Micro Frontends start from a working setup instead of a blank repo.",
        pt: "Isso começou como a primeira arquitetura de Micro Frontend em React/Webpack construída inteiramente internamente no Bradesco Seguros. Antes dela existir, cada time configurava sua própria integração de module federation do zero. Transformei isso em um template de projeto para que novos Micro Frontends comecem de uma base funcional em vez de um repositório vazio.",
      },
      {
        en: "At the center of it is an orchestrator that decides what to mount: it reads the logged-in user's permission profile and loads, dynamically, only the Micro Frontends that profile is allowed to see, alongside a fixed set that always loads regardless of role: the menu, login, and home page.",
        pt: "No centro dele está um orquestrador que decide o que montar: ele lê o perfil de permissão do usuário logado e carrega, dinamicamente, apenas os Micro Frontends que esse perfil pode ver, junto com um conjunto fixo que sempre carrega independente do perfil: o menu, o login e a página inicial.",
      },
      {
        en: "It's now used directly by 8 teams, cutting project setup time by ~75%.",
        pt: "Hoje é usado diretamente por 8 equipes, reduzindo o tempo de setup de projeto em ~75%.",
      },
    ],
    resources: [
      {
        title: "Building Micro-Frontends",
        author: "Luca Mezzalira",
        link: "https://www.amazon.com.br/Building-Micro-Frontends-Distributed-Systems-Frontend/dp/1098170784",
      },
    ],
    role: {
      en: "Engineering · Bradesco Seguros",
      pt: "Engenharia · Bradesco Seguros",
    },
    company: "Bradesco Seguros",
  },
  {
    title: "Mainframe Mapping & Graph Dashboard",
    year: "2024",
    description: {
      en: "A JavaScript automation tool that mapped 30+ cost centers and 9,000+ Mainframe jobs, cutting a 76-day process down to 16, plus an Angular graph-visualization dashboard so stakeholders explore the map themselves.",
      pt: "Uma automação em JavaScript que mapeou 30+ centros de custo e 9.000+ jobs de Mainframe, reduzindo um processo de 76 dias para 16, além de um dashboard Angular com visualização em grafo para os stakeholders explorarem o mapa.",
    },
    details: [
      {
        en: "Mapping which cost centers depended on which Mainframe jobs used to be a 76-day manual process. I wrote a JavaScript automation tool using Robot.js that did it in 16 days instead, 4.75x faster, covering 30+ cost centers and over 9,000 Mainframe jobs.",
        pt: "Mapear quais centros de custo dependiam de quais jobs de Mainframe era um processo manual de 76 dias. Escrevi uma automação em JavaScript usando Robot.js que fazia isso em 16 dias, 4,75x mais rápido, cobrindo 30+ centros de custo e mais de 9.000 jobs de Mainframe.",
      },
      {
        en: "The map itself was useless locked in a spreadsheet, so I built an Angular dashboard with graph visualization on top of it, so stakeholders who weren't engineers could explore the dependencies themselves and make faster, better-informed migration decisions.",
        pt: "O mapa em si não servia de muito preso numa planilha, então construí um dashboard em Angular com visualização em grafo por cima dele, para que stakeholders que não eram engenheiros pudessem explorar as dependências sozinhos e tomar decisões de migração mais rápidas e mais bem informadas.",
      },
    ],
    role: {
      en: "Engineering · Bradesco Seguros",
      pt: "Engenharia · Bradesco Seguros",
    },
    company: "Bradesco Seguros",
  },
  {
    title: "Dev Community Portal",
    year: "2022–2024",
    description: {
      en: "The internal portal for a community of 33 developers, recognized as the organization's most successful initiative.",
      pt: "O portal interno para uma comunidade de 33 desenvolvedores, reconhecido como a iniciativa mais bem-sucedida da organização.",
    },
    highlight: {
      en: "★ Outstanding Member, Dev Community Mauá (2024)",
      pt: "★ Membro Destaque, Dev Community Mauá (2024)",
    },
    details: [
      {
        en: "I led development of the internal portal for Dev Community Mauá, a 33-member student developer community, built with Clean Architecture, React, TypeScript and Tailwind CSS, with a deliberate focus on performance and scalability rather than just shipping something that worked.",
        pt: "Liderei o desenvolvimento do portal interno da Dev Community Mauá, uma comunidade estudantil de 33 desenvolvedores, construído com Clean Architecture, React, TypeScript e Tailwind CSS. O foco desde o início foi performance e escalabilidade, não só entregar algo que funcionasse.",
      },
      {
        en: "It ended up recognized as the organization's most successful initiative, a reflection of the community as much as of the code behind it.",
        pt: "Acabou reconhecido como a iniciativa mais bem-sucedida da organização, um reflexo tanto da comunidade quanto do código por trás dela.",
      },
    ],
    role: {
      en: "Lead & development · Dev Community Mauá",
      pt: "Liderança & desenvolvimento · Dev Community Mauá",
    },
    company: "Dev Community Mauá",
  },
  {
    title: "Rugby Billing Automation",
    year: "2024",
    description: {
      en: "An automated WhatsApp and e-mail billing system built with Next.js for the rugby team. It raised payment compliance by 80%.",
      pt: "Um sistema automatizado de cobrança por WhatsApp e e-mail feito com Next.js para o time de rugby. Aumentou a conformidade de pagamentos em 80%.",
    },
    details: [
      {
        en: "Chasing down teammates for monthly dues used to eat 3+ hours of manual follow-ups. I built an automated billing system with Next.js that handles it over WhatsApp and email instead, reminders and all, turning it into a single automated action instead of a recurring chore.",
        pt: "Cobrar a mensalidade dos companheiros de time consumia 3+ horas de follow-up manual por mês. Construí um sistema de cobrança automatizado com Next.js que faz isso por WhatsApp e e-mail, lembretes inclusos, transformando isso em uma única ação automática em vez de uma tarefa recorrente.",
      },
      {
        en: "Payment compliance went up 80%. Turns out people pay faster when the reminder actually reaches them on time, every time.",
        pt: "A conformidade de pagamento subiu 80%. Parece que as pessoas pagam mais rápido quando o lembrete realmente chega na hora certa, sempre.",
      },
    ],
    role: {
      en: "Design & development · Rugby Mauá",
      pt: "Design & desenvolvimento · Rugby Mauá",
    },
    company: "Rugby Mauá",
  },
  {
    title: "WorklogBar",
    year: "2025",
    description: {
      en: "A macOS menu bar app for logging what you worked on, written in Swift. Lives quietly in the corner of the screen and stays out of the way until you need it.",
      pt: "Um app de barra de menus para macOS para registrar o que você trabalhou, escrito em Swift. Vive quieto no canto da tela e não atrapalha até você precisar dele.",
    },
    role: {
      en: "Design & development · personal",
      pt: "Design & desenvolvimento · pessoal",
    },
  },
  {
    title: "This website",
    year: "2026",
    description: {
      en: "The site you are looking at. Next.js, MDX articles kept as plain files in the repo, and just enough motion to feel alive.",
      pt: "O site que você está vendo. Next.js, artigos em MDX guardados como arquivos no repositório e movimento na medida certa para parecer vivo.",
    },
    details: [
      {
        en: "Everything on this site is a plain file in this repo: articles are MDX in content/writing, projects and work history are typed data files, and the whole thing builds to fully static HTML, with no database, no CMS, and nothing to keep online besides Vercel.",
        pt: "Tudo neste site é um arquivo simples neste repositório: artigos são MDX em content/writing, projetos e histórico profissional são arquivos de dados tipados, e tudo é compilado para HTML totalmente estático, sem banco de dados, sem CMS e nada para manter no ar além da Vercel.",
      },
      {
        en: "The design leans hard into one idea: every image looks like an old photo, film grain runs across the whole page, and even the browser-tab icon is generated from the same serif italic wordmark in the header. Publishing a new article is just a markdown file and a git push.",
        pt: "O design aposta forte em uma ideia: toda imagem parece uma foto antiga, grão de filme percorre a página inteira, e até o ícone da aba do navegador é gerado a partir do mesmo logotipo serifado itálico do cabeçalho. Publicar um artigo novo é só um arquivo markdown e um git push.",
      },
    ],
    role: { en: "Everything", pt: "Tudo" },
  },
];

/** Reverse lookup: the project a given article slug belongs to. */
export function projectForArticle(slug: string) {
  return projects.find((p) => p.articles?.includes(slug));
}
