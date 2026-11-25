export type LayoutFamily = 'classic' | 'cinematic' | 'statement';
export type Jurisdiction = 'UAE' | 'UK';
export type Currency = 'AED' | 'GBP';
export type BillingPeriod = 'Monthly' | 'Yearly';

export interface SeoMetadata {
  title: string;
  description: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceNote {
  number: string;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  number: string;
  name: string;
  tagline: string;
  shortSummary: string;
  description: string;
  startingPrice: {
    AED: number;
    GBP: number;
  };
  priceUnit: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
  steps: ServiceStep[];
  notes: ServiceNote[];
  leadPersonSlug: string;
  relatedPlans: string[];
  relatedQuestions: string[];
  relatedDeadlines: string[];
  relatedCaseStudies: string[];
  seo: SeoMetadata;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  credential: string;
  role: string;
  tier: 'partner' | 'manager';
  office: 'Dubai' | 'London';
  portrait: string;
  quote: string;
  shortBiography: string;
  biography: string[];
  practiceAreas: string;
  sectors: string;
  languages: string;
  qualifications: string;
  memberships: string;
  joinedYear: string;
  yearsInPractice: string;
  phone: string;
  email: string;
  takingNewClients: boolean;
  relatedServices: string[];
  relatedInsights: string[];
  relatedCaseStudies: string[];
  seo: SeoMetadata;
}

export interface Plan {
  id: string;
  slug: string;
  name: string;
  kind: 'retainer' | 'project';
  description: string;
  badge?: string;
  highlighted?: boolean;
  pricePrefix: string;
  prices: {
    AED: {
      monthly?: number;
      yearly?: number;
      fixed?: number;
    };
    GBP: {
      monthly?: number;
      yearly?: number;
      fixed?: number;
    };
  };
  unitLabelMonthly?: string;
  unitLabelYearly?: string;
  unitLabelFixed?: string;
  noteMonthly?: string;
  noteYearly?: string;
  deliverables: string[];
  whoItIsFor: string;
  howItWorks: string[];
  notIncluded: string[];
  teamSummary: string;
  turnaround: string;
  addOns: string;
  terms: string;
  relatedServices: string[];
  relatedQuestions: string[];
  seo: SeoMetadata;
}

export interface PlanComparisonRow {
  label: string;
  essential: string | boolean;
  essentialUk?: string;
  growth: string | boolean;
  group: string | boolean;
}

export interface ExtraFeeItem {
  name: string;
  description: string;
  priceAED: string;
  priceGBP: string;
}

export interface Deadline {
  id: string;
  slug: string;
  jurisdiction: Jurisdiction;
  practice: string;
  title: string;
  date: string;
  isoDate: string;
  summary: string;
  releasedBy: string;
  period: string;
  sendRecordsBy: string;
  lastChecked: string;
  whatItIs: string;
  whatIsNew: string;
  whoItAppliesTo: string;
  whatWeDo: string[];
  clientRequirements: string[];
  consequences: string;
  officialSourceLabel: string;
  officialSourceUrl: string;
  relatedServiceSlug: string;
  leadPersonSlug: string;
  seo: SeoMetadata;
}

export interface InsightSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callouts?: string[];
}

export interface Insight {
  id: string;
  slug: string;
  title: string;
  category: 'Tax' | 'Accounting' | 'Audit' | 'Studio';
  publicationDate: string;
  readingTime: number;
  excerpt: string;
  leadParagraph: string;
  coverImage: string;
  coverAlt: string;
  authorSlug: string;
  sections: InsightSection[];
  closingNote: string;
  disclaimer: string;
  relatedInsights: string[];
  relatedServices: string[];
  seo: SeoMetadata;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  sector: string;
  location: string;
  year: string;
  engagement: string;
  practice: string;
  title: string;
  summary: string;
  coverImage: string;
  coverAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
  primaryMetric: CaseStudyMetric;
  metrics: CaseStudyMetric[];
  inShort: string;
  challenge: string[];
  whatWeDid: string[];
  outcome: string[];
  quotation: string;
  attribution: string;
  teamSummary: string;
  practicesSummary: string;
  relatedPeople: string[];
  relatedServices: string[];
  seo: SeoMetadata;
}

export interface Question {
  id: string;
  slug: string;
  question: string;
  answer: string;
  contexts: ('home' | 'services' | 'pricing')[];
  relatedServices: string[];
  relatedPlans: string[];
  seo: SeoMetadata;
}

export interface OfficeInfo {
  id: 'dubai' | 'london';
  city: 'Dubai' | 'London';
  timezone: 'Asia/Dubai' | 'Europe/London';
  tzLabel: string;
  hoursLabel: string;
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  addressLines: string[];
  shortAddress: string;
  phone: string;
  phoneHref: string;
  email: string;
  image: string;
  imageAlt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  markVariant: 'is-sans' | 'is-caps' | 'is-italic' | 'is-light' | 'is-mono';
  clientSince: string;
  scope: string;
}
