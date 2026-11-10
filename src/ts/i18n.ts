/**
 * i18n module — locale detection, persistence, DOM translation.
 *
 * Any element with `data-i18n="some-key-name"` gets its text replaced by
 * `translations[locale][toKey('some-key-name')]`. Translations containing
 * HTML markup (e.g. <strong>) are applied via innerHTML, plain strings via
 * textContent.
 */

export type Locale = 'pt-BR' | 'en' | 'es';
export type Theme = 'light' | 'dark' | 'auto';
type Dict = Record<string, string>;

export const THEME_LABEL_KEYS: Record<Theme, string> = {
  light: 'themeLight',
  dark: 'themeDark',
  auto: 'themeAuto',
};

  const translations: Record<Locale, Dict> = {
    'pt-BR': {
      heroLabel: 'Desenvolvedor de Software Full Stack',
      heroTitle: 'Construo software sustentável e sistemas de missão crítica.',
      heroSubtitle: 'React · React Native · Angular · Next.js · Node.js · NestJS',
      heroDescription:
        'Especializado no desenvolvimento de aplicações web, ecossistemas mobile whitelabel, BFFs e APIs. Foco na sustentação de sistemas críticos com alta disponibilidade, automação de CI/CD e evolução arquitetural.',
      heroBtnPrimary: 'Soluções Entregues',
      heroBtnSecondary: 'Entrar em contato',

      themeLight: 'Claro',
      themeDark: 'Escuro',
      themeAuto: 'Auto',

      navAbout: 'Sobre',
      navSolutions: 'Soluções Entregues',
      navExperience: 'Experiência',
      navContact: 'Vamos conversar',
      navAboutMobile: 'Sobre',
      navSolutionsMobile: 'Projetos',
      navExperienceMobile: 'Experiência',
      navContactMobile: 'Contato',

      methodologySectionLabel: 'Metodologia',
      methodologyTitle: 'Abordagem de Engenharia',
      pillar1Title: 'Visão de Produto & Negócio',
      pillar1Desc:
        'Compreender a necessidade do cliente e o impacto operacional antes de desenhar a solução técnica.',
      pillar2Title: 'Resiliência em Legados',
      pillar2Desc:
        'Manutenção e evolução de sistemas financeiros, bancários e comerciais sem interromper operações críticas.',
      pillar3Title: 'Arquitetura Escalável',
      pillar3Desc:
        'Construção de aplicações Multi-tenant, BFFs dedicados, desacoplamento por contratos e padrões de Clean Architecture.',
      pillar4Title: 'Automação & Observabilidade',
      pillar4Desc:
        'Pipelines de CI/CD (GitHub Actions, Jenkins), self-hosted runners, Docker, Terraform e qualidade contínua.',

      solutionsSectionLabel: 'Projetos Reais & Casos de Uso',
      solutionsTitle: 'Soluções Desenvolvidas',

      project1Title: 'Ecossistema Mobile para Indústria Têxtil (Globals)',
      project1Badge: 'Produção (Android & iOS)',
      project1Desc:
        'Desenvolvimento de dois aplicativos voltados para o setor têxtil. O primeiro consiste em uma aplicação <strong>offline-first</strong> para força de vendas de produtos têxteis via QR Code em feiras e eventos. O segundo aplicativo foca na gestão interna da empresa, englobando controle de funcionários, comissões, vendas e operações corporativas.',
      project1Technical:
        '<strong>Decisões e Engenharia:</strong> Sincronização robusta de dados em cenários de conectividade instável (offline-first) e arquitetura modular orientada à performance em campo.',
      project1Tech1: 'React Native',
      project1Tech2: 'Offline-First',
      project1Tech3: 'QR Code Scanning',
      project1Tech4: 'TypeScript',
      project1Tech5: 'APIs REST',

      project2Title: 'Aplicativo Bancário Whitelabel Multi-Tenant (Globals)',
      project2Badge: 'Produção / Desenvolvedor Principal',
      project2Desc:
        'Atuação inicial na sustentação de aplicativo bancário legado multi-tenant. Posteriormente, liderança técnica e desenvolvimento do zero de uma nova versão moderna do aplicativo white-label com suporte multi-tenant, multi-layout e multi-tema por cliente. Integração com esteiras de CI/CD automatizadas para build e publicação em lojas (Android e iOS).',
      project2Technical:
        '<strong>Decisões e Engenharia:</strong> Desacoplamento estrutural de temas e layouts dinâmicos, garantindo escalabilidade na entrega de múltiplos produtos bancários a partir de uma base de código unificada.',
      project2Tech1: 'React Native',
      project2Tech2: 'Whitelabel',
      project2Tech3: 'Multi-Tenant / Multi-Theme',
      project2Tech4: 'CI/CD Mobile',

      project3Title: 'Plataforma Web Fitness — Newon (Globals)',
      project3Badge: 'Em Produção',
      project3Link: 'newon.com.br',
      project3Desc:
        'Desenvolvimento de aplicação web voltada para o segmento fitness e gestão de treinos/operações, entregando alta performance, usabilidade refinada e integração direta com serviços e APIs de backend.',
      project3Technical:
        '<strong>Decisões e Engenharia:</strong> Estruturação de componentes reutilizáveis, gerenciamento de estado eficiente e foco na experiência do usuário final.',
      project3Tech1: 'Angular',
      project3Tech2: 'TypeScript',
      project3Tech3: 'Web Application',
      project3Tech4: 'APIs REST',

      project4Title: 'Sistema de Gestão de Navios com BFF (Globals)',
      project4Badge: 'Solução Corporativa',
      project4Desc:
        'Desenvolvimento de aplicação web para gestão de navios, contando com uma camada dedicada de BFF (Backend For Frontend) construída para orquestrar e integrar de forma segura e performática com um provedor de dados externo.',
      project4Technical:
        '<strong>Decisões e Engenharia:</strong> Abstração de contratos complexos de APIs externas na camada BFF, reduzindo o acoplamento do frontend e garantindo segurança no tráfego de dados.',
      project4Tech1: 'BFF Pattern',
      project4Tech2: 'Node.js / NestJS',
      project4Tech3: 'TypeScript',
      project4Tech4: 'Integração Externa',

      project5Title: 'Sistema Whitelabel para Gestão de Condomínios (Globals)',
      project5Badge: 'Ambiente Operacional',
      project5Desc:
        'Manutenção e evolução de aplicação legada white-label voltada para o mercado de condomínios, servindo simultaneamente a dois públicos distintos: moradores (gestão de avisos, áreas comuns e portaria) e seguranças (controle de acesso e rondas).',
      project5Technical:
        '<strong>Decisões e Engenharia:</strong> Refatoração segura de código legado e adaptação de regras multi-tenant para atender diferentes condomínios com customizações visuais e funcionais.',
      project5Tech1: 'Full Stack',
      project5Tech2: 'Whitelabel',
      project5Tech3: 'Multi-Tenant',
      project5Tech4: 'Legacy Modernization',

      project6Title: 'Plataforma de Antecipação de Recebíveis Multi-Tenant (Globals)',
      project6Badge: 'Projeto Corporativo Integrado',
      project6Desc:
        'Arquitetura e desenvolvimento de aplicação web corporativa em Next.js para operação financeira de antecipação de recebíveis. Estruturada em modelo multi-tenant com suporte completo a cargos e permissões (RBAC) e hierarquia complexa entre entidades do sistema (Root → Tenant → Company → Branch).',
      project6Technical:
        '<strong>Decisões e Engenharia:</strong> Modelagem de autorização granular, isolamento rigoroso de contexto entre empresas e filiais e interface consistente.',
      project6Tech1: 'Next.js',
      project6Tech2: 'React',
      project6Tech3: 'TypeScript',
      project6Tech4: 'Java',
      project6Tech5: 'Multi-Tenant Architecture',
      project6Tech6: 'RBAC / Permissões',

      project7Title: 'Portal Interno BFF para Otimização com IA Generativa (Rozac)',
      project7Badge: 'Em Uso Operacional',
      project7Desc:
        'Criação de portal interno composto por um frontend moderno e uma camada de BFF (Backend For Frontend). Desenvolvido para integrar com ferramentas de IA Generativa e viabilizar a otimização de processos internos, permitindo consultas inteligentes e rápidas diretamente nos dados do ERP da empresa.',
      project7Technical:
        '<strong>Decisões e Engenharia:</strong> Aplicação escalável para comportar múltiplos setores da empresa e regras de negócio voláteis.',
      project7Tech1: 'TypeScript',
      project7Tech2: 'BFF Pattern',
      project7Tech3: 'IA Generativa',
      project7Tech4: 'Integração ERP',
      project7Tech5: 'Node.js / NestJS',

      project8Title: 'Sustentação e Evolução de Sistemas de Missão Crítica (Globals & Rozac)',
      project8Badge: 'Zero Downtime',
      project8Desc:
        'Atuação direta na manutenção corretiva e evolutiva de sistemas legados vitais para o negócio — incluindo o sistema financeiro BaaS (Bank as a Service) na Globals e o Portal de Vendas na Rozac. Projetados para operação ininterrupta, recebem refatorações arquiteturais, novas funcionalidades e correções de alto valor sem comprometer a estabilidade do produto.',
      project8Technical:
        '<strong>Decisões e Engenharia:</strong> Implementação de esteiras de CI/CD, diagnóstico rápido de causas-raiz via consulta estruturada de logs, conteinerização com Docker e refatorações orientadas à manutenibilidade.',
      project8Tech1: 'BaaS / Financeiro',
      project8Tech2: 'Portal de Vendas',
      project8Tech3: 'Docker',
      project8Tech4: 'CI/CD',
      project8Tech5: 'Observabilidade / Logs',
      project8Tech6: 'Bancos de Dados',

      aboutSectionLabel: 'Trajetória',
      aboutTitle: 'Sobre Mim',
      aboutText1:
        'Desenvolvedor de software Full Stack com cerca de 3 anos de experiência profissional no ecossistema de desenvolvimento, construindo desde ecossistemas mobile robustos (offline-first, whitelabel multi-tenant) até plataformas web corporativas e portais integrados com BFF e IA.',
      aboutText2:
        'Com sólida bagagem na sustentação e evolução de sistemas de missão crítica (sistemas financeiros BaaS, aplicações portuárias, portais comerciais e soluções industriais), trago como diferencial a preocupação constante com a estabilidade do negócio, arquitetura limpa, automação avançada de infraestrutura e pipelines de CI/CD.',
      aboutText3:
        'Formado em <strong>Análise e Desenvolvimento de Sistemas</strong> (2024), resido em Americana/SP. Atuo com comunicação clara com equipes internas e externas, auxiliando desde a concepção do produto até a entrega de valor em produção.',

      skillsGroupFrontend: 'Linguagens & Frontend / Mobile',
      skillsGroupBackend: 'Backend, APIs & Integração',
      skillsGroupDevops: 'DevOps, Nuvem & Ferramentas',
      skillJavascript: 'JavaScript',
      skillReact: 'React',
      skillNextjs: 'Next.js',
      skillVite: 'Vite',
      skillNodejs: 'Node.js',
      skillNestjs: 'NestJS',
      skillBff: 'BFF (Backend For Frontend)',
      skillRelationalDatabases: 'Bancos de Dados Relacionais',
      skillJavaQuarkus: 'Java Quarkus (Básico)',
      skillCicd: 'CI/CD (GitHub Actions / Jenkins)',
      skillSelfHostedRunners: 'Self-Hosted Runners',
      skillCloudHosting: 'Hospedagem Local & Cloud',
      skillTerraformBasic: 'Terraform (Básico)',
      skillAzureAwsBasic: 'Azure DevOps / AWS (Básico)',

      experienceSectionLabel: 'Histórico',
      experienceTitle: 'Experiência Profissional',

      experience1Company: 'Rozac Comércio e Exportação',
      experience1Role: 'Desenvolvedor de Software Full Stack',
      experience1Period: 'Maio de 2026 — Outubro de 2026',
      experience1Bullet1:
        'Desenvolvimento e arquitetura do Portal Interno BFF integrado a soluções de IA Generativa para otimização de fluxos de trabalho e consultas inteligentes ao ERP da empresa.',
      experience1Bullet2:
        'Manutenção evolutiva e refatoração do Portal de Vendas da empresa (sistema crítico de negócio), entregando melhorias arquiteturais e correções pontuais sem interrupção de operação.',
      experience1Bullet3:
        'Construção e manutenção de pipelines de CI/CD, conteinerização com Docker, monitoramento de logs, além de comunicação direta com times internos e parceiros externos.',

      experience2Company: 'Globals',
      experience2Role: 'Desenvolvedor de Software Full Stack',
      experience2Period: 'Maio de 2024 — Abril de 2026',
      experience2Bullet1:
        'Desenvolvimento de aplicativos mobile para o setor têxtil: solução offline-first para vendas via QR Code em feiras e aplicativo de gestão interna de funcionários, comissões e vendas.',
      experience2Bullet2:
        'Atuação principal no desenvolvimento do novo aplicativo bancário whitelabel multi-tenant (multi-layout e multi-tema) e sustentação de versão legada prévia.',
      experience2Bullet3:
        'Desenvolvimento da plataforma web fitness em Angular para a Newon (newon.com.br) e sistema web de gestão de navios integrado via BFF a provedor externo.',
      experience2Bullet4:
        'Sustentação de sistema legado white-label voltado a condomínios (atendendo moradores e seguranças) e de plataforma Next.js multi-tenant de antecipação de recebíveis (com RBAC e hierarquia Root → Tenant → Company → Branch).',
      experience2Bullet5:
        'Criação e estruturação de projetos internos de CI/CD abrangendo todo o ecossistema: GitHub Actions, Jenkins, Terraform, Docker, hospedagem local, configuração de self-hosted runners e pipelines automatizados.',

      experience3Company: 'SoftHouse',
      experience3Role: 'Desenvolvedor Estagiário',
      experience3Period: 'Setembro de 2023 — Maio de 2024',
      experience3Bullet1:
        'Implementação e deploy de sistemas de Gestão Eletrônica de Documentos (GED/EDM) em organizações públicas, incluindo prefeituras, câmaras municipais e empresas de utilities (energia, água e eletricidade).',
      experience3Bullet2:
        'Suporte técnico, configuração e troubleshooting durante as implementações on-site.',

      contactSectionLabel: 'Contato',
      contactTitle: 'Vamos conversar?',
      contactDesc:
        'Estou à disposição para detalhar minhas experiências, discutir decisões técnicas e entender como minhas competências podem apoiar a missão da empresa.',
      contactBtnEmail: 'Enviar E-mail',
      contactBtnGithub: 'GitHub',
      contactBtnLinkedin: 'LinkedIn',

      footerCopyright: '© {year} Italo Almeida. Americana, SP — Brasil.',
      footerLinkGithub: 'GitHub',
      footerLinkLinkedin: 'LinkedIn',
    },

    en: {
      heroLabel: 'Full Stack Software Developer',
      heroTitle: 'I build sustainable software and mission-critical systems.',
      heroSubtitle: 'React · React Native · Angular · Next.js · Node.js · NestJS',
      heroDescription:
        'Specialized in web applications, whitelabel mobile ecosystems, BFFs, and APIs. Focused on maintaining critical systems with high availability, CI/CD automation, and architectural evolution.',
      heroBtnPrimary: 'View Projects',
      heroBtnSecondary: 'Contact Me',

      themeLight: 'Light',
      themeDark: 'Dark',
      themeAuto: 'Auto',

      navAbout: 'About',
      navSolutions: 'Projects',
      navExperience: 'Experience',
      navContact: 'Contact',
      navAboutMobile: 'About',
      navSolutionsMobile: 'Projects',
      navExperienceMobile: 'Experience',
      navContactMobile: 'Contact',

      methodologySectionLabel: 'Methodology',
      methodologyTitle: 'Engineering Approach',
      pillar1Title: 'Product & Business Vision',
      pillar1Desc:
        'Understanding client needs and operational impact before designing technical solutions.',
      pillar2Title: 'Legacy System Resilience',
      pillar2Desc:
        'Maintaining and evolving financial, banking, and commercial systems without interrupting critical operations.',
      pillar3Title: 'Scalable Architecture',
      pillar3Desc:
        'Building multi-tenant applications, dedicated BFFs, contract-based decoupling, and clean architecture patterns.',
      pillar4Title: 'Automation & Observability',
      pillar4Desc:
        'CI/CD pipelines (GitHub Actions, Jenkins), self-hosted runners, Docker, Terraform, and continuous quality.',

      solutionsSectionLabel: 'Real Projects & Use Cases',
      solutionsTitle: 'Developed Solutions',

      project1Title: 'Textile Industry Mobile Ecosystem (Globals)',
      project1Badge: 'In Production (Android & iOS)',
      project1Desc:
        'Development of two applications for the textile sector. The first is an <strong>offline-first</strong> app for sales force using QR codes at trade shows and events. The second focuses on internal company management, covering employee control, commissions, sales, and corporate operations.',
      project1Technical:
        '<strong>Engineering Decisions:</strong> Robust data synchronization in unstable connectivity scenarios (offline-first) and modular architecture oriented to field performance.',
      project1Tech1: 'React Native',
      project1Tech2: 'Offline-First',
      project1Tech3: 'QR Code Scanning',
      project1Tech4: 'TypeScript',
      project1Tech5: 'REST APIs',

      project2Title: 'Multi-Tenant Whitelabel Banking App (Globals)',
      project2Badge: 'In Production / Lead Developer',
      project2Desc:
        'Initial role maintaining the legacy multi-tenant banking app. Later, technical leadership and building from scratch a new modern whitelabel version with multi-tenant, multi-layout, and multi-theme support per client. Integration with automated CI/CD pipelines for building and publishing to stores (Android and iOS).',
      project2Technical:
        '<strong>Engineering Decisions:</strong> Structural decoupling of themes and dynamic layouts, ensuring scalability in delivering multiple banking products from a unified codebase.',
      project2Tech1: 'React Native',
      project2Tech2: 'Whitelabel',
      project2Tech3: 'Multi-Tenant / Multi-Theme',
      project2Tech4: 'Mobile CI/CD',

      project3Title: 'Fitness Web Platform — Newon (Globals)',
      project3Badge: 'In Production',
      project3Link: 'newon.com.br',
      project3Desc:
        'Development of a web application for the fitness segment and training/operations management, delivering high performance, refined usability, and direct integration with backend services and APIs.',
      project3Technical:
        '<strong>Engineering Decisions:</strong> Reusable component structure, efficient state management, and focus on the end-user experience.',
      project3Tech1: 'Angular',
      project3Tech2: 'TypeScript',
      project3Tech3: 'Web Application',
      project3Tech4: 'REST APIs',

      project4Title: 'Ship Management System with BFF (Globals)',
      project4Badge: 'Corporate Solution',
      project4Desc:
        'Web application development for ship management, featuring a dedicated BFF (Backend For Frontend) layer designed to orchestrate and securely integrate with an external data provider.',
      project4Technical:
        '<strong>Engineering Decisions:</strong> Abstraction of complex external API contracts in the BFF layer, reducing frontend coupling and ensuring data traffic security.',
      project4Tech1: 'BFF Pattern',
      project4Tech2: 'Node.js / NestJS',
      project4Tech3: 'TypeScript',
      project4Tech4: 'External Integration',

      project5Title: 'Whitelabel Condo Management System (Globals)',
      project5Badge: 'Production Environment',
      project5Desc:
        'Maintenance and evolution of legacy white-label application for the condominium market, serving two distinct audiences: residents (announcements, common areas, lobby management) and security staff (access control and patrols).',
      project5Technical:
        '<strong>Engineering Decisions:</strong> Safe legacy code refactoring and multi-tenant rule adaptation to serve different condominiums with visual and functional customizations.',
      project5Tech1: 'Full Stack',
      project5Tech2: 'Whitelabel',
      project5Tech3: 'Multi-Tenant',
      project5Tech4: 'Legacy Modernization',

      project6Title: 'Multi-Tenant Receivables Anticipation Platform (Globals)',
      project6Badge: 'Integrated Corporate Project',
      project6Desc:
        'Architecture and development of a corporate web application in Next.js for receivables anticipation financial operations. Structured as multi-tenant with full support for roles and permissions (RBAC) and complex hierarchy between system entities (Root → Tenant → Company → Branch).',
      project6Technical:
        '<strong>Engineering Decisions:</strong> Granular authorization modeling, strict context isolation between companies and branches, and consistent interface.',
      project6Tech1: 'Next.js',
      project6Tech2: 'React',
      project6Tech3: 'TypeScript',
      project6Tech4: 'Java',
      project6Tech5: 'Multi-Tenant Architecture',
      project6Tech6: 'RBAC / Permissions',

      project7Title: 'Internal BFF Portal for Generative AI Optimization (Rozac)',
      project7Badge: 'In Operational Use',
      project7Desc:
        'Creation of an internal portal with a modern frontend and a BFF (Backend For Frontend) layer. Built to integrate with Generative AI tools and enable optimization of internal processes, allowing intelligent and fast queries directly on company ERP data.',
      project7Technical:
        '<strong>Engineering Decisions:</strong> Scalable application to accommodate multiple company departments and volatile business rules.',
      project7Tech1: 'TypeScript',
      project7Tech2: 'BFF Pattern',
      project7Tech3: 'Generative AI',
      project7Tech4: 'ERP Integration',
      project7Tech5: 'Node.js / NestJS',

      project8Title: 'Mission-Critical Systems Maintenance & Evolution (Globals & Rozac)',
      project8Badge: 'Zero Downtime',
      project8Desc:
        'Direct involvement in corrective and evolutionary maintenance of legacy systems vital to the business — including the BaaS financial system (Bank as a Service) at Globals and the Sales Portal at Rozac. Designed for uninterrupted operation, they receive architectural refactorings, new features, and high-value fixes without compromising product stability.',
      project8Technical:
        '<strong>Engineering Decisions:</strong> CI/CD pipeline implementation, fast root-cause diagnosis via structured log queries, Docker containerization, and maintainability-oriented refactorings.',
      project8Tech1: 'BaaS / Financial',
      project8Tech2: 'Sales Portal',
      project8Tech3: 'Docker',
      project8Tech4: 'CI/CD',
      project8Tech5: 'Observability / Logs',
      project8Tech6: 'Databases',

      aboutSectionLabel: 'Background',
      aboutTitle: 'About Me',
      aboutText1:
        'Full Stack Software Developer with around 3 years of professional experience in the development ecosystem, building from robust mobile ecosystems (offline-first, whitelabel multi-tenant) to corporate web platforms and portals integrated with BFF and AI.',
      aboutText2:
        'With solid experience in maintaining and evolving mission-critical systems (BaaS financial systems, port applications, commercial portals, and industrial solutions), I bring as a differentiator constant concern for business stability, clean architecture, advanced infrastructure automation, and CI/CD pipelines.',
      aboutText3:
        '<strong>Systems Analysis and Development</strong> graduate (2024), based in Americana/SP. I work with clear communication with internal and external teams, assisting from product conception to value delivery in production.',

      skillsGroupFrontend: 'Languages & Frontend / Mobile',
      skillsGroupBackend: 'Backend, APIs & Integration',
      skillsGroupDevops: 'DevOps, Cloud & Tools',
      skillJavascript: 'JavaScript',
      skillReact: 'React',
      skillNextjs: 'Next.js',
      skillVite: 'Vite',
      skillNodejs: 'Node.js',
      skillNestjs: 'NestJS',
      skillBff: 'BFF (Backend For Frontend)',
      skillRelationalDatabases: 'Relational Databases',
      skillJavaQuarkus: 'Java Quarkus (Basic)',
      skillCicd: 'CI/CD (GitHub Actions / Jenkins)',
      skillSelfHostedRunners: 'Self-Hosted Runners',
      skillCloudHosting: 'Local & Cloud Hosting',
      skillTerraformBasic: 'Terraform (Basic)',
      skillAzureAwsBasic: 'Azure DevOps / AWS (Basic)',

      experienceSectionLabel: 'Experience',
      experienceTitle: 'Professional Experience',

      experience1Company: 'Rozac Comércio e Exportação',
      experience1Role: 'Full Stack Software Developer',
      experience1Period: 'May 2026 — October 2026',
      experience1Bullet1:
        'Development and architecture of the Internal BFF Portal integrated with Generative AI solutions for workflow optimization and intelligent queries to the company ERP.',
      experience1Bullet2:
        'Evolutionary maintenance and refactoring of the Sales Portal (critical business system), delivering architectural improvements and targeted fixes without operational interruption.',
      experience1Bullet3:
        'Building and maintaining CI/CD pipelines, Docker containerization, log monitoring, plus direct communication with internal teams and external partners.',

      experience2Company: 'Globals',
      experience2Role: 'Full Stack Software Developer',
      experience2Period: 'May 2024 — April 2026',
      experience2Bullet1:
        'Development of mobile applications for the textile sector: offline-first solution for QR Code sales at trade shows and internal management app for employees, commissions, and sales.',
      experience2Bullet2:
        'Main role in developing the new whitelabel multi-tenant banking app (multi-layout and multi-theme) and maintaining the legacy version.',
      experience2Bullet3:
        'Development of the Newon fitness web platform (newon.com.br) in Angular and a ship management web system integrated via BFF with external providers.',
      experience2Bullet4:
        'Maintenance of legacy white-label system for condominiums (serving residents and security) and a Next.js multi-tenant receivables anticipation platform (with RBAC and hierarchy Root → Tenant → Company → Branch).',
      experience2Bullet5:
        'Creation and structuring of internal CI/CD projects covering the entire ecosystem: GitHub Actions, Jenkins, Terraform, Docker, local hosting, self-hosted runners configuration, and automated pipelines.',

      experience3Company: 'SoftHouse',
      experience3Role: 'Software Developer Intern',
      experience3Period: 'September 2023 — May 2024',
      experience3Bullet1:
        'Implementation and deployment of Electronic Document Management Systems (GED/EDM) in public organizations, including city halls, municipal councils, and utility companies (energy, water, and electricity).',
      experience3Bullet2:
        'Technical support, configuration, and troubleshooting during on-site implementations.',

      contactSectionLabel: 'Contact',
      contactTitle: "Let's Connect",
      contactDesc:
        "I'm available to discuss my experience, technical decisions, and how my skills can support the company's mission.",
      contactBtnEmail: 'Send Email',
      contactBtnGithub: 'GitHub',
      contactBtnLinkedin: 'LinkedIn',

      footerCopyright: '© {year} Italo Almeida. Americana, São Paulo — Brazil.',
      footerLinkGithub: 'GitHub',
      footerLinkLinkedin: 'LinkedIn',
    },

    es: {
      heroLabel: 'Desarrollador de Software Full Stack',
      heroTitle: 'Construyo software sostenible y sistemas críticos para misión.',
      heroSubtitle: 'React · React Native · Angular · Next.js · Node.js · NestJS',
      heroDescription:
        'Especializado en aplicaciones web, ecosistemas móviles whitelabel multi-inquilino, BFFs y APIs. Enfocado en mantener sistemas críticos con alta disponibilidad, automatización de CI/CD y evolución arquitectural.',
      heroBtnPrimary: 'Ver Proyectos',
      heroBtnSecondary: 'Contáctame',

      themeLight: 'Claro',
      themeDark: 'Oscuro',
      themeAuto: 'Auto',

      navAbout: 'Sobre',
      navSolutions: 'Proyectos',
      navExperience: 'Experiencia',
      navContact: 'Contacto',
      navAboutMobile: 'Sobre',
      navSolutionsMobile: 'Proyectos',
      navExperienceMobile: 'Experiencia',
      navContactMobile: 'Contacto',

      methodologySectionLabel: 'Metodología',
      methodologyTitle: 'Enfoque de Ingeniería',
      pillar1Title: 'Visión de Producto y Negocio',
      pillar1Desc:
        'Comprender las necesidades del cliente y el impacto operativo antes de diseñar soluciones técnicas.',
      pillar2Title: 'Resiliencia en Sistemas Legados',
      pillar2Desc:
        'Mantenimiento y evolución de sistemas financieros, bancarios y comerciales sin interrumpir operaciones críticas.',
      pillar3Title: 'Arquitectura Escalable',
      pillar3Desc:
        'Construcción de aplicaciones multi-inquilino, BFFs dedicados, desacoplamiento por contratos y patrones de Clean Architecture.',
      pillar4Title: 'Automatización y Observabilidad',
      pillar4Desc:
        'Pipelines de CI/CD (GitHub Actions, Jenkins), runners auto-gestionados, Docker, Terraform y calidad continua.',

      solutionsSectionLabel: 'Proyectos Reales y Casos de Uso',
      solutionsTitle: 'Soluciones Desarrolladas',

      project1Title: 'Ecosistema Móvil para Industria Textil (Globals)',
      project1Badge: 'En Producción (Android & iOS)',
      project1Desc:
        'Desarrollo de dos aplicaciones para el sector textil. La primera es una aplicación <strong>offline-first</strong> para fuerza de ventas mediante QR Code en ferias y eventos. La segunda se enfoca en la gestión interna de la empresa, incluyendo control de empleados, comisiones, ventas y operaciones corporativas.',
      project1Technical:
        '<strong>Decisiones e Ingeniería:</strong> Sincronización robusta de datos en escenarios de conectividad inestable (offline-first) y arquitectura modular orientada al rendimiento en campo.',
      project1Tech1: 'React Native',
      project1Tech2: 'Offline-First',
      project1Tech3: 'Escaneo QR Code',
      project1Tech4: 'TypeScript',
      project1Tech5: 'APIs REST',

      project2Title: 'Aplicativo Bancario Whitelabel Multi-Inquilino (Globals)',
      project2Badge: 'En Producción / Desarrollador Principal',
      project2Desc:
        'Rol inicial en el mantenimiento del aplicativo bancario multi-inquilino legado. Posteriormente, liderazgo técnico y desarrollo desde cero de una nueva versión moderna white-label con soporte multi-inquilino, multi-layout y multi-tema por cliente. Integración con esteiras de CI/CD automatizadas para build y publicación en tiendas (Android e iOS).',
      project2Technical:
        '<strong>Decisiones e Ingeniería:</strong> Desacoplamiento estructural de temas y layouts dinámicos, garantizando escalabilidad en la entrega de múltiples productos bancarios a partir de una base de código unificada.',
      project2Tech1: 'React Native',
      project2Tech2: 'Whitelabel',
      project2Tech3: 'Multi-Inquilino / Multi-Tema',
      project2Tech4: 'CI/CD Móvil',

      project3Title: 'Plataforma Web Fitness — Newon (Globals)',
      project3Badge: 'En Producción',
      project3Link: 'newon.com.br',
      project3Desc:
        'Desarrollo de aplicación web para el segmento fitness y gestión de entrenamientos/operaciones, entregando alto rendimiento, usabilidad refinada e integración directa con servicios y APIs de backend.',
      project3Technical:
        '<strong>Decisiones e Ingeniería:</strong> Estructuración de componentes reutilizables, gestión de estado eficiente y enfoque en la experiencia del usuario final.',
      project3Tech1: 'Angular',
      project3Tech2: 'TypeScript',
      project3Tech3: 'Aplicación Web',
      project3Tech4: 'APIs REST',

      project4Title: 'Sistema de Gestión de Navíos con BFF (Globals)',
      project4Badge: 'Solución Corporativa',
      project4Desc:
        'Desarrollo de aplicación web para gestión de navíos, contando con una capa dedicada de BFF (Backend For Frontend) construida para orquestar e integrar de forma segura y eficiente con un proveedor externo de datos.',
      project4Technical:
        '<strong>Decisiones e Ingeniería:</strong> Abstracción de contratos complejos de APIs externas en la capa BFF, reduciendo el acoplamiento del frontend y garantizando seguridad en el tráfico de datos.',
      project4Tech1: 'Patrón BFF',
      project4Tech2: 'Node.js / NestJS',
      project4Tech3: 'TypeScript',
      project4Tech4: 'Integración Externa',

      project5Title: 'Sistema Whitelabel para Gestión de Condominios (Globals)',
      project5Badge: 'Ambiente Operacional',
      project5Desc:
        'Mantenimiento y evolución de aplicación legado white-label para el mercado de condominios, sirviendo simultáneamente a dos públicos distintos: residentes (gestión de avisos, áreas comunes y portero) y personal de seguridad (control de acceso y rondas).',
      project5Technical:
        '<strong>Decisiones e Ingeniería:</strong> Refactorización segura de código legado y adaptación de reglas multi-inquilino para atender diferentes condominios con personalizaciones visuales y funcionales.',
      project5Tech1: 'Full Stack',
      project5Tech2: 'Whitelabel',
      project5Tech3: 'Multi-Inquilino',
      project5Tech4: 'Modernización de Legado',

      project6Title: 'Plataforma Multi-Inquilino de Anticipación de Recibibles (Globals)',
      project6Badge: 'Proyecto Corporativo Integrado',
      project6Desc:
        'Arquitectura y desarrollo de aplicación web corporativa en Next.js para operación financiera de anticipación de recibibles. Estructurada en modelo multi-inquilino con soporte completo a cargos y permisos (RBAC) e jerarquía compleja entre entidades del sistema (Root → Tenant → Company → Branch).',
      project6Technical:
        '<strong>Decisiones e Ingeniería:</strong> Modelado de autorización granular, aislamiento riguroso de contexto entre empresas y sucursales e interfaz consistente.',
      project6Tech1: 'Next.js',
      project6Tech2: 'React',
      project6Tech3: 'TypeScript',
      project6Tech4: 'Java',
      project6Tech5: 'Arquitectura Multi-Inquilino',
      project6Tech6: 'RBAC / Permisos',

      project7Title: 'Portal Interno BFF para Optimización con IA Generativa (Rozac)',
      project7Badge: 'En Uso Operacional',
      project7Desc:
        'Creación de portal interno compuesto por frontend moderno y capa de BFF (Backend For Frontend). Desarrollado para integrar con herramientas de IA Generativa y habilitar la optimización de procesos internos, permitiendo consultas inteligentes y rápidas directamente en los datos del ERP de la empresa.',
      project7Technical:
        '<strong>Decisiones e Ingeniería:</strong> Aplicación escalable para albergar múltiples sectores de la empresa y reglas de negocio volátiles.',
      project7Tech1: 'TypeScript',
      project7Tech2: 'Patrón BFF',
      project7Tech3: 'IA Generativa',
      project7Tech4: 'Integración ERP',
      project7Tech5: 'Node.js / NestJS',

      project8Title: 'Mantenimiento y Evolución de Sistemas Críticos para Misión (Globals & Rozac)',
      project8Badge: 'Cero Tiempo Inactivo',
      project8Desc:
        'Participación directa en mantenimiento correctivo y evolutivo de sistemas legados vitales para el negocio — incluyendo el sistema financiero BaaS (Bank as a Service) en Globals y el Portal de Ventas en Rozac. Diseñados para operación ininterrumpida, reciben refactorizaciones arquitectónicas, nuevas funcionalidades y correcciones de alto valor sin comprometer la estabilidad del producto.',
      project8Technical:
        '<strong>Decisiones e Ingeniería:</strong> Implementación de esteiras de CI/CD, diagnóstico rápido de causas raíz mediante consultas estructuradas de logs, contenerización con Docker y refactorizaciones orientadas a la mantenibilidad.',
      project8Tech1: 'BaaS / Financiero',
      project8Tech2: 'Portal de Ventas',
      project8Tech3: 'Docker',
      project8Tech4: 'CI/CD',
      project8Tech5: 'Observabilidad / Logs',
      project8Tech6: 'Bases de Datos',

      aboutSectionLabel: 'Antecedentes',
      aboutTitle: 'Sobre Mí',
      aboutText1:
        'Desarrollador de software Full Stack con cerca de 3 años de experiencia profesional en el ecosistema de desarrollo, construyendo desde ecosistemas móviles robustos (offline-first, whitelabel multi-inquilino) hasta plataformas web corporativas y portales integrados con BFF e IA.',
      aboutText2:
        'Con sólida experiencia en mantenimiento y evolución de sistemas críticos para misión (sistemas financieros BaaS, aplicaciones portuarias, portales comerciales y soluciones industriales), traigo como diferencial la constante preocupación por la estabilidad del negocio, arquitectura limpia, automatización avanzada de infraestructura y pipelines de CI/CD.',
      aboutText3:
        'Graduado en <strong>Análisis y Desarrollo de Sistemas</strong> (2024), resido en Americana/SP. Trabajo con comunicación clara con equipos internos y externos, ayudando desde la concepción del producto hasta la entrega de valor en producción.',

      skillsGroupFrontend: 'Lenguajes & Frontend / Móvil',
      skillsGroupBackend: 'Backend, APIs e Integración',
      skillsGroupDevops: 'DevOps, Nube & Herramientas',
      skillJavascript: 'JavaScript',
      skillReact: 'React',
      skillNextjs: 'Next.js',
      skillVite: 'Vite',
      skillNodejs: 'Node.js',
      skillNestjs: 'NestJS',
      skillBff: 'BFF (Backend For Frontend)',
      skillRelationalDatabases: 'Bases de Datos Relacionales',
      skillJavaQuarkus: 'Java Quarkus (Básico)',
      skillCicd: 'CI/CD (GitHub Actions / Jenkins)',
      skillSelfHostedRunners: 'Self-Hosted Runners',
      skillCloudHosting: 'Hospedaje Local y en la Nube',
      skillTerraformBasic: 'Terraform (Básico)',
      skillAzureAwsBasic: 'Azure DevOps / AWS (Básico)',

      experienceSectionLabel: 'Experiencia',
      experienceTitle: 'Experiencia Profesional',

      experience1Company: 'Rozac Comercio y Exportación',
      experience1Role: 'Desarrollador de Software Full Stack',
      experience1Period: 'Mayo de 2026 — Octubre de 2026',
      experience1Bullet1:
        'Desarrollo y arquitectura del Portal Interno BFF integrado con soluciones de IA Generativa para optimización de flujos de trabajo y consultas inteligentes al ERP de la empresa.',
      experience1Bullet2:
        'Mantenimiento evolutivo y refactorización del Portal de Ventas (sistema crítico de negocio), entregando mejoras arquitectónicas y correcciones puntuales sin interrupción de operación.',
      experience1Bullet3:
        'Construcción y mantenimiento de pipelines de CI/CD, contenerización con Docker, monitoreo de logs, además de comunicación directa con equipos internos y socios externos.',

      experience2Company: 'Globals',
      experience2Role: 'Desarrollador de Software Full Stack',
      experience2Period: 'Mayo de 2024 — Abril de 2026',
      experience2Bullet1:
        'Desarrollo de aplicaciones móviles para el sector textil: solución offline-first para ventas vía QR Code en ferias y aplicación de gestión interna de empleados, comisiones y ventas.',
      experience2Bullet2:
        'Rol principal en el desarrollo del nuevo aplicativo bancario whitelabel multi-inquilino (multi-layout y multi-tema) y mantenimiento de la versión legada previa.',
      experience2Bullet3:
        'Desarrollo de la plataforma web fitness para Newon (newon.com.br) en Angular y sistema web de gestión de barcos integrado vía BFF con proveedores externos.',
      experience2Bullet4:
        'Mantenimiento de sistema legado white-label para condominios (atendiendo residentes y seguridad) y plataforma Next.js multi-inquilino de anticipación de recibibles (con RBAC e jerarquía Root → Tenant → Company → Branch).',
      experience2Bullet5:
        'Creación y estructuración de proyectos internos de CI/CD abarcando todo el ecosistema: GitHub Actions, Jenkins, Terraform, Docker, hospedaje local, configuración de runners auto-gestionados y pipelines automatizados.',

      experience3Company: 'SoftHouse',
      experience3Role: 'Desarrollador Estudiante',
      experience3Period: 'Septiembre de 2023 — Mayo de 2024',
      experience3Bullet1:
        'Implementación y despliegue de sistemas de Gestión Electrónica de Documentos (GED/EDM) en organizaciones públicas, incluyendo prefecturas, cámaras municipales y empresas de servicios públicos (energía, agua y electricidad).',
      experience3Bullet2:
        'Soporte técnico, configuración y troubleshooting durante implementaciones on-site.',

      contactSectionLabel: 'Contacto',
      contactTitle: 'Hablemos',
      contactDesc:
        'Estoy disponible para discutir mi experiencia, decisiones técnicas y cómo mis habilidades pueden apoyar la misión de la empresa.',
      contactBtnEmail: 'Enviar Correo',
      contactBtnGithub: 'GitHub',
      contactBtnLinkedin: 'LinkedIn',

      footerCopyright: '© {year} Italo Almeida. Americana, São Paulo — Brasil.',
      footerLinkGithub: 'GitHub',
      footerLinkLinkedin: 'LinkedIn',
    },
  };

const LOCALE_STORAGE_KEY = 'portfolio-locale';
const VALID_LOCALES = Object.keys(translations) as Locale[];
let currentLocale: Locale = 'pt-BR';

export function getTranslations(locale: Locale): Dict {
  return translations[locale] ?? translations['pt-BR'];
}

export function t(key: string): string {
  const value = getTranslations(currentLocale)[key];
  return value !== undefined ? value : '';
}

function toKey(attr: string): string {
  return attr
    .split('-')
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}

function detectLocale(browserLang: string): Locale {
  const lower = browserLang.toLowerCase();
  if (lower.startsWith('pt')) return 'pt-BR';
  if (lower.startsWith('es')) return 'es';
  return 'en';
}

function readStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return stored && VALID_LOCALES.includes(stored as Locale) ? (stored as Locale) : null;
  } catch {
    return null;
  }
}

const LANG_META: Record<Locale, { flag: string; name: string }> = {
  'pt-BR': { flag: '🇧🇷', name: 'Português' },
  en: { flag: '🇺🇸', name: 'English' },
  es: { flag: '🇪🇸', name: 'Español' },
};

function initLocale(): void {
  const params = new URLSearchParams(window.location.search);
  const urlLocale = params.get('lang');

  if (urlLocale && VALID_LOCALES.includes(urlLocale as Locale)) {
    currentLocale = urlLocale as Locale;
  } else {
    const stored = readStoredLocale();
    currentLocale = stored ?? detectLocale(navigator.language || 'en');
  }

  document.documentElement.lang = currentLocale;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, currentLocale);
  } catch {
    /* storage unavailable */
  }
}

export function setLocale(locale: string): void {
  if (!(locale in translations)) return;
  currentLocale = locale as Locale;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, currentLocale);
  } catch {
    /* storage unavailable */
  }
  updateAllTranslations();
  syncLanguageSelector();
}

function updateAllTranslations(): void {
  const dict = getTranslations(currentLocale);

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const attr = el.dataset.i18n;
    if (!attr) return;
    const value = dict[toKey(attr)];
    if (value === undefined) return;
    if (value.includes('<')) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll<HTMLElement>('.theme-menu [data-theme]').forEach((option) => {
    const theme = option.dataset.theme;
    if (!theme) return;
    const key = THEME_LABEL_KEYS[theme as Theme];
    if (key) {
      const label = option.querySelector<HTMLElement>('.selector-option-label');
      if (label) label.textContent = t(key);
    }
  });

  const themeName = document.getElementById('theme-name');
  if (themeName) {
    const selected = document.querySelector<HTMLElement>('.theme-menu [aria-selected="true"]');
    const themeValue = (selected?.dataset.theme ?? 'auto') as Theme;
    themeName.textContent = t(THEME_LABEL_KEYS[themeValue] ?? 'themeAuto');
  }

  document.title = dict['metaTitle'] || document.title;
}

function syncLanguageSelector(): void {
  const meta = LANG_META[currentLocale];
  const flagEl = document.querySelector<HTMLElement>('.lang-selector [data-role="flag"]');
  const nameEl = document.querySelector<HTMLElement>('.lang-selector [data-role="name"]');
  if (flagEl) flagEl.textContent = meta.flag;
  if (nameEl) nameEl.textContent = meta.name;

  document.querySelectorAll<HTMLElement>('.lang-selector .selector-option').forEach((option) => {
    const isActive = option.dataset.lang === currentLocale;
    option.classList.toggle('active', isActive);
    option.setAttribute('aria-selected', String(isActive));
  });
}

function setupLanguageSelector(): void {
  document.querySelectorAll<HTMLElement>('.lang-selector .selector-option').forEach((option) => {
    option.addEventListener('click', () => {
      const lang = option.dataset.lang;
      if (lang) setLocale(lang);
    });
  });
}

export function initI18n(): void {
  initLocale();
  updateAllTranslations();
  setupLanguageSelector();
  syncLanguageSelector();
}

declare global {
  interface Window {
    portfolioI18n?: {
      setLocale(locale: string): void;
      getLocale(): Locale;
      t(key: string): string;
    };
  }
}

window.portfolioI18n = {
  setLocale,
  getLocale: () => currentLocale,
  t,
};
