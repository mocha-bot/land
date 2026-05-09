export type SolutionFeature = {
  title: string;
  body: string;
};

export type Solution = {
  slug: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  features: [SolutionFeature, SolutionFeature, SolutionFeature];
  relatedSlugs: [string, string, string];
};

export const solutions: Solution[] = [
  {
    slug: 'gaming',
    emoji: '🎮',
    title: 'Gaming Communities',
    tagline: 'Find teammates across every server',
    description:
      'Five different Discord servers all play the same game but stay siloed. With Mocha, each server links a channel to a shared room — players find teammates, share clips, and coordinate events across every server at once.',
    features: [
      {
        title: 'Cross-server LFG in one room',
        body: 'Create a shared Looking for Group room that every partner server can join. Players post, respond, and party up without leaving their home server.',
      },
      {
        title: 'Coordinate events across communities',
        body: 'Schedule tournaments, scrims, and game nights in a single Mocha room. Announcements reach every connected server simultaneously.',
      },
      {
        title: 'Shared clip and highlight channels',
        body: 'Bridge highlight channels across servers so the best plays reach the widest audience — no re-posting, no missing out.',
      },
    ],
    relatedSlugs: ['fan-clubs', 'events', 'creator-networks'],
  },
  {
    slug: 'study-groups',
    emoji: '📚',
    title: 'Study Groups',
    tagline: 'Collaborate across universities',
    description:
      'Students from different universities create their own servers but want to collaborate on the same subject. A Mocha room connects all of them — questions get answers from a much wider pool of people.',
    features: [
      {
        title: 'Wider knowledge pool, same server',
        body: 'Link subject-specific channels from universities worldwide. One question gets answers from hundreds of students without anyone leaving their server.',
      },
      {
        title: 'Shared resource drops',
        body: 'Post notes, papers, and revision guides once and have them appear in every connected server\'s channel instantly.',
      },
      {
        title: 'Cross-campus study sessions',
        body: 'Coordinate group study sessions in a shared room. Students from any connected server can join, ask questions, and collaborate in real time.',
      },
    ],
    relatedSlugs: ['open-source', 'professional-networks', 'developer-communities'],
  },
  {
    slug: 'open-source',
    emoji: '🛠️',
    title: 'Open Source Projects',
    tagline: 'Unite distributed contributors',
    description:
      'A project has contributors spread across many communities. Linking a #contributors channel from each server into one Mocha room keeps discussion, PRs, and announcements visible to everyone without forcing a server migration.',
    features: [
      {
        title: 'No more missed announcements',
        body: 'Pipe release notes, CI alerts, and PR pings into a Mocha room. Every contributor, regardless of which server they call home, sees them instantly.',
      },
      {
        title: 'Contributor discussion across servers',
        body: 'Keep architecture discussions, RFC reviews, and roadmap chats in a shared room that contributors from any community can participate in.',
      },
      {
        title: 'Onboarding without server migration',
        body: 'New contributors join via their own community server. They get access to the project room without leaving their familiar environment.',
      },
    ],
    relatedSlugs: ['developer-communities', 'study-groups', 'professional-networks'],
  },
  {
    slug: 'creator-networks',
    emoji: '🎨',
    title: 'Creator Networks',
    tagline: 'Connect fan servers worldwide',
    description:
      'Content creators each run their own fan server. A Mocha room lets them bridge a collab channel — fans from every server interact, discover new creators, and cross-pollinate communities organically.',
    features: [
      {
        title: 'Cross-pollinate without losing identity',
        body: 'Create a collab room that fans from any partner server can join. Each server keeps its own brand and rules — only the conversation is shared.',
      },
      {
        title: 'Collab drops reach everyone at once',
        body: 'Announce joint projects, livestreams, and merch drops in one room. Fans across every connected server see it simultaneously.',
      },
      {
        title: 'Fan discovery built in',
        body: 'Fans naturally discover adjacent creators through shared rooms — organic growth without paid promotion.',
      },
    ],
    relatedSlugs: ['fan-clubs', 'gaming', 'events'],
  },
  {
    slug: 'regional-communities',
    emoji: '🌏',
    title: 'Regional Communities',
    tagline: 'Bridge global brand communities',
    description:
      'A brand or game has one server per region. A global Mocha room unifies them for announcements and cross-region events, while each regional server keeps its own language channels separate.',
    features: [
      {
        title: 'Global announcements, local servers',
        body: 'Broadcast product launches, patches, and news into every regional server at once — without maintaining separate announcement bots.',
      },
      {
        title: 'Cross-region events',
        body: 'Run global tournaments and community events in a Mocha room that every regional server participates in, regardless of language.',
      },
      {
        title: 'Preserve regional identity',
        body: 'Each region keeps its own channels, moderation, and culture. Only the global room is shared — everything else stays local.',
      },
    ],
    relatedSlugs: ['events', 'gaming', 'professional-networks'],
  },
  {
    slug: 'events',
    emoji: '🏢',
    title: 'Events & Conferences',
    tagline: 'Attendee chat across communities',
    description:
      'Organizers spin up an event room, then every participating community server joins. Attendees chat, ask speakers questions, and share resources — all from their home server without switching.',
    features: [
      {
        title: 'Event chat without a new server',
        body: 'Organizers create a Mocha room for the event. Every participating community connects their channel — no one needs to join yet another Discord server.',
      },
      {
        title: 'Live Q&A across communities',
        body: 'Speaker Q&A happens in a shared room. Questions and answers reach every attendee, regardless of which server they joined from.',
      },
      {
        title: 'Resource sharing post-event',
        body: 'Slides, recordings, and follow-up links posted in the room appear in every connected server — no hunting across multiple channels.',
      },
    ],
    relatedSlugs: ['regional-communities', 'creator-networks', 'gaming'],
  },
  {
    slug: 'developer-communities',
    emoji: '💻',
    title: 'Developer Communities',
    tagline: 'Link devs across tool ecosystems',
    description:
      'Framework authors, library maintainers, and tooling teams each run separate servers. A Mocha room connects #help and #showcase channels so the right experts see every question, wherever it\'s asked.',
    features: [
      {
        title: 'Help channels with ecosystem reach',
        body: 'Link #help channels across related tool servers. A question about a framework-plugin integration reaches experts from both communities automatically.',
      },
      {
        title: 'Showcase to the whole ecosystem',
        body: 'Developers share projects in one room and reach audiences across every connected community — not just their primary server.',
      },
      {
        title: 'Release radar across the stack',
        body: 'A single room for release announcements across the ecosystem. Developers stay informed without monitoring a dozen separate servers.',
      },
    ],
    relatedSlugs: ['open-source', 'study-groups', 'professional-networks'],
  },
  {
    slug: 'fan-clubs',
    emoji: '🌟',
    title: 'Fan Clubs & Fandoms',
    tagline: 'Unite fans across every server',
    description:
      'Every fandom has dozens of Discord servers — official, regional, ship-specific, era-specific. Mocha connects them so fans can find each other, share news, and celebrate together without constant server-hopping.',
    features: [
      {
        title: 'One room for every corner of the fandom',
        body: 'Link fan servers of every kind into a shared room. Fans from official servers, regional groups, and niche communities all interact in one place.',
      },
      {
        title: 'News reaches every server instantly',
        body: 'Drop comeback announcements, tour dates, and content releases in a single room — every connected fan server sees them at the same moment.',
      },
      {
        title: 'Fan events that span communities',
        body: 'Birthday projects, streaming parties, and chart-push events run in a shared room, amplifying participation across every connected server.',
      },
    ],
    relatedSlugs: ['creator-networks', 'gaming', 'events'],
  },
  {
    slug: 'dao-web3',
    emoji: '⛓️',
    title: 'DAO & Web3',
    tagline: 'Govern across chains together',
    description:
      'DAOs, protocols, and Web3 projects attract communities spread across ecosystems, chains, and regions. Mocha brings governance discussions, proposal alerts, and community calls into one shared room without fracturing identity.',
    features: [
      {
        title: 'Governance across the ecosystem',
        body: 'Link governance channels from every partner community. Proposals, votes, and discussions reach the whole ecosystem simultaneously — not just one server.',
      },
      {
        title: 'Cross-chain collaboration rooms',
        body: 'Projects building across multiple chains connect their communities in a shared room — developers, token holders, and contributors coordinate in one place.',
      },
      {
        title: 'Protocol announcements, everywhere at once',
        body: 'Security updates, upgrade announcements, and launch news posted once reach every community that has joined the room.',
      },
    ],
    relatedSlugs: ['open-source', 'professional-networks', 'developer-communities'],
  },
  {
    slug: 'professional-networks',
    emoji: '💼',
    title: 'Professional Networks',
    tagline: 'Connect industry peers everywhere',
    description:
      'Industry groups, alumni networks, freelancer collectives, and professional communities each have their own servers. Mocha connects them in shared rooms for job postings, mentorship, and knowledge sharing.',
    features: [
      {
        title: 'Job board that spans communities',
        body: 'Post opportunities in a shared room that reaches professionals across every connected server — candidates and employers find each other across the whole network.',
      },
      {
        title: 'Mentorship without server migration',
        body: 'Mentors from senior communities and mentees from junior ones connect through a shared room — no one needs to abandon their home server.',
      },
      {
        title: 'Industry knowledge, pooled',
        body: 'Resources, articles, and insights shared in one room surface across every connected professional community simultaneously.',
      },
    ],
    relatedSlugs: ['open-source', 'study-groups', 'developer-communities'],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getRelatedSolutions(slugs: [string, string, string]): Solution[] {
  return slugs.map((slug) => solutions.find((s) => s.slug === slug)).filter(Boolean) as Solution[];
}
