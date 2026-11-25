import { SERVICES } from './services';
import { PEOPLE } from './people';
import { PLANS } from './plans';
import { DEADLINES } from './deadlines';
import { INSIGHTS } from './insights';
import { CASE_STUDIES } from './caseStudies';
import { QUESTIONS } from './questions';

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getPersonBySlug(slug: string) {
  return PEOPLE.find((p) => p.slug === slug);
}

export function getPlanBySlug(slug: string) {
  return PLANS.find((p) => p.slug === slug);
}

export function getDeadlineBySlug(slug: string) {
  return DEADLINES.find((d) => d.slug === slug);
}

export function getInsightBySlug(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug);
}

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getQuestionBySlug(slug: string) {
  return QUESTIONS.find((q) => q.slug === slug);
}

export function getQuestionsForContext(ctx: 'home' | 'services' | 'pricing') {
  return QUESTIONS.filter((q) => q.contexts.includes(ctx));
}

export function getDeadlinesByJurisdiction(jurisdiction: 'UAE' | 'UK') {
  return DEADLINES.filter((d) => d.jurisdiction === jurisdiction);
}

export function getInsightsByAuthor(personSlug: string) {
  return INSIGHTS.filter((i) => i.authorSlug === personSlug);
}

export function getCaseStudiesByPerson(personSlug: string) {
  return CASE_STUDIES.filter((c) => c.relatedPeople.includes(personSlug));
}
