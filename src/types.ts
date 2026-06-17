export interface Pilar {
  title: string;
  desc: string;
  icon: string;
}

export interface Diagnosis {
  bioloop: string;
  chemical: string;
  protocolName: string;
  chapter: string;
  solution: string;
}

export interface TopicCard {
  title: string;
  desc: string;
}

export interface FAQRowItem {
  question: string;
  answer: string;
}

export interface AppContent {
  paymentUrl: string;
  bookCoverUrl?: string;
  adsenseClientId?: string;
  soporteEmail?: string;
  hero: {
    badgeText: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaButton: string;
    features: string[];
  };
  about: {
    badgeText: string;
    title: string;
    paragraphs: string[];
    quote: string;
    columnTitle: string;
    pilares: Pilar[];
  };
  diagnoser: {
    badgeText: string;
    title: string;
    desc: string;
    options: { key: string; label: string }[];
    protocols: Record<string, Diagnosis>;
  };
  topics: {
    badgeText: string;
    title: string;
    subtitle: string;
    cards: TopicCard[];
    indexLinkText: string;
  };
  target: {
    badgeText: string;
    title: string;
    subtitle: string;
    yesTitle: string;
    yesItems: string[];
    noTitle: string;
    noItems: string[];
  };
  author: {
    badgeText: string;
    title: string;
    paragraphs: string[];
    socialText: string;
    socialHandle: string;
    socialUrl: string;
  };
  faqs: {
    badgeText: string;
    title: string;
    rows: FAQRowItem[];
  };
  finalCta: {
    badgeText: string;
    title: string;
    subtitle: string;
    ctaButton: string;
    fomoText: string;
  };
  footer: {
    text: string;
    footerLinks: { text: string; url: string }[];
  };
}
