import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { PLANS, PLAN_COMPARISON_ROWS, EXTRA_FEES } from '@/data/plans';
import { SERVICES } from '@/data/services';
import { PEOPLE } from '@/data/people';
import { INSIGHTS } from '@/data/insights';
import { CASE_STUDIES } from '@/data/caseStudies';
import { DEADLINES } from '@/data/deadlines';
import { QUESTIONS } from '@/data/questions';
import { OFFICES, isOfficeOpenNow, formatOfficeTime } from '@/data/offices';
import { BOOKING_PARTNERS, getUpcomingWeekdays } from '@/data/booking';
import {
  getServiceBySlug,
  getPersonBySlug,
  getPlanBySlug,
  getDeadlineBySlug,
  getInsightBySlug,
  getCaseStudyBySlug,
  getQuestionBySlug,
  getQuestionsForContext,
  getDeadlinesByJurisdiction,
} from '@/data/cmsRelations';

describe('Vika pricing matrix & billing logic', () => {
  it('defines all three retainer plans with exact 10-month yearly discount (AED & GBP)', () => {
    const retainers = PLANS.filter((p) => p.kind === 'retainer');
    expect(retainers.map((p) => p.slug)).toEqual(['essential', 'growth', 'group']);

    for (const plan of retainers) {
      expect(plan.prices.AED.monthly).toBeDefined();
      expect(plan.prices.AED.yearly).toBe((plan.prices.AED.monthly ?? 0) * 10);
      expect(plan.prices.GBP.monthly).toBeDefined();
      expect(plan.prices.GBP.yearly).toBe((plan.prices.GBP.monthly ?? 0) * 10);
    }

    const growth = getPlanBySlug('growth');
    expect(growth?.prices.AED.monthly).toBe(6000);
    expect(growth?.prices.AED.yearly).toBe(60000);
    expect(growth?.prices.GBP.monthly).toBe(1300);
    expect(growth?.prices.GBP.yearly).toBe(13000);
  });

  it('defines all three fixed-fee projects with AED and GBP fees', () => {
    const projects = PLANS.filter((p) => p.kind === 'project');
    expect(projects.map((p) => p.slug)).toEqual([
      'tax-registration',
      'statutory-audit',
      'due-diligence',
    ]);
    for (const proj of projects) {
      expect(proj.prices.AED.fixed).toBeGreaterThan(0);
      expect(proj.prices.GBP.fixed).toBeGreaterThan(0);
    }
  });

  it('contains comparison rows and extras', () => {
    expect(PLAN_COMPARISON_ROWS.length).toBeGreaterThanOrEqual(8);
    expect(EXTRA_FEES.length).toBeGreaterThanOrEqual(4);
  });
});

describe('Vika timezone office clocks & booking helpers', () => {
  it('computes Dubai open status on a Wednesday at 10:00 UTC (14:00 GST)', () => {
    // 2026-10-21 is a Wednesday
    const wed1000Utc = new Date('2026-10-21T10:00:00Z');
    expect(isOfficeOpenNow(OFFICES.dubai, wed1000Utc)).toBe(true);
    expect(isOfficeOpenNow(OFFICES.london, wed1000Utc)).toBe(true); // 11:00 BST

    const dubaiTime = formatOfficeTime(OFFICES.dubai.timezone, wed1000Utc);
    expect(dubaiTime.hour).toBe(14);
    expect(dubaiTime.minute).toBe(0);
  });

  it('marks offices closed outside hours and on weekends', () => {
    // 2026-10-24 is Saturday
    const sat1000Utc = new Date('2026-10-24T10:00:00Z');
    expect(isOfficeOpenNow(OFFICES.dubai, sat1000Utc)).toBe(false);
    expect(isOfficeOpenNow(OFFICES.london, sat1000Utc)).toBe(false);

    // Wednesday 22:00 UTC => 02:00 Thu in Dubai, 23:00 BST in London
    const wed2200Utc = new Date('2026-10-21T22:00:00Z');
    expect(isOfficeOpenNow(OFFICES.dubai, wed2200Utc)).toBe(false);
    expect(isOfficeOpenNow(OFFICES.london, wed2200Utc)).toBe(false);
  });

  it('generates Mon-Fri booking dates and covers all three partners', () => {
    expect(BOOKING_PARTNERS.map((p) => p.personSlug)).toEqual([
      'sara-lindqvist',
      'rami-nassar',
      'hannah-okoye',
    ]);
    const days = getUpcomingWeekdays('Asia/Dubai', 10);
    expect(days.length).toBe(10);
    for (const d of days) {
      expect(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']).toContain(d.weekday);
      expect(d.dayOfWeek).toBeGreaterThanOrEqual(1);
      expect(d.dayOfWeek).toBeLessThanOrEqual(5);
    }
  });
});

describe('Vika seven CMS collections referential & asset integrity', () => {
  it('resolves every cross-collection slug without orphans', () => {
    expect(SERVICES.length).toBe(3);
    expect(PEOPLE.length).toBe(6);
    expect(PLANS.length).toBe(6);
    expect(DEADLINES.length).toBe(7);
    expect(INSIGHTS.length).toBe(6);
    expect(CASE_STUDIES.length).toBe(4);
    expect(QUESTIONS.length).toBe(12);

    for (const plan of PLANS) {
      for (const s of plan.relatedServices) expect(getServiceBySlug(s)).toBeDefined();
      for (const q of plan.relatedQuestions) expect(getQuestionBySlug(q)).toBeDefined();
    }

    for (const srv of SERVICES) {
      expect(getPersonBySlug(srv.leadPersonSlug)).toBeDefined();
      for (const p of srv.relatedPlans) expect(getPlanBySlug(p)).toBeDefined();
      for (const q of srv.relatedQuestions) expect(getQuestionBySlug(q)).toBeDefined();
      for (const d of srv.relatedDeadlines) expect(getDeadlineBySlug(d)).toBeDefined();
      for (const cs of srv.relatedCaseStudies) expect(getCaseStudyBySlug(cs)).toBeDefined();
    }

    for (const insight of INSIGHTS) {
      expect(getPersonBySlug(insight.authorSlug)).toBeDefined();
      for (const rel of insight.relatedInsights) expect(getInsightBySlug(rel)).toBeDefined();
      for (const s of insight.relatedServices) expect(getServiceBySlug(s)).toBeDefined();
    }

    for (const deadline of DEADLINES) {
      expect(getServiceBySlug(deadline.relatedServiceSlug)).toBeDefined();
      expect(getPersonBySlug(deadline.leadPersonSlug)).toBeDefined();
    }

    for (const cs of CASE_STUDIES) {
      for (const p of cs.relatedPeople) expect(getPersonBySlug(p)).toBeDefined();
      for (const s of cs.relatedServices) expect(getServiceBySlug(s)).toBeDefined();
    }

    expect(getDeadlinesByJurisdiction('UAE').length).toBe(4);
    expect(getDeadlinesByJurisdiction('UK').length).toBe(3);
    expect(getQuestionsForContext('home').length).toBeGreaterThanOrEqual(4);
    expect(getQuestionsForContext('pricing').length).toBeGreaterThanOrEqual(4);
    expect(getQuestionsForContext('services').length).toBeGreaterThanOrEqual(4);
  });

  it('points all CMS image paths to existing files in public/assets/', () => {
    const publicDir = path.resolve(__dirname, '../../public');
    const pathsToCheck = [
      ...SERVICES.map((s) => s.image),
      ...PEOPLE.map((p) => p.portrait),
      ...INSIGHTS.map((i) => i.coverImage),
      ...CASE_STUDIES.flatMap((c) => [c.coverImage, c.secondaryImage]),
      OFFICES.dubai.image,
      OFFICES.london.image,
    ];

    for (const rel of pathsToCheck) {
      expect(rel.startsWith('/assets/')).toBe(true);
      const diskPath = path.join(publicDir, rel.replace(/^\//, ''));
      expect(fs.existsSync(diskPath), `Missing local asset: ${diskPath}`).toBe(true);
    }
  });
});
