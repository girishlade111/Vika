import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { LayoutProvider } from '@/context/LayoutContext';
import { PricingProvider } from '@/context/PricingContext';
import { BookingProvider } from '@/context/BookingContext';

import { ClassicHome } from '@/pages/home/ClassicHome';
import { CinematicHome } from '@/pages/home/CinematicHome';
import { StatementHome } from '@/pages/home/StatementHome';

import { ClassicStudio } from '@/pages/studio/ClassicStudio';
import { CinematicStudio } from '@/pages/studio/CinematicStudio';
import { StatementStudio } from '@/pages/studio/StatementStudio';

import { ClassicContact } from '@/pages/contact/ClassicContact';
import { CinematicContact } from '@/pages/contact/CinematicContact';
import { StatementContact } from '@/pages/contact/StatementContact';

import { ServicesPage } from '@/pages/shared/ServicesPage';
import { PricingPage } from '@/pages/shared/PricingPage';
import { InsightsPage } from '@/pages/shared/InsightsPage';
import { TeamPage } from '@/pages/shared/TeamPage';
import { CaseStudiesPage } from '@/pages/shared/CaseStudiesPage';

import { ServiceDetailPage } from '@/pages/detail/ServiceDetailPage';
import { CaseStudyDetailPage } from '@/pages/detail/CaseStudyDetailPage';
import { InsightDetailPage } from '@/pages/detail/InsightDetailPage';
import { PersonDetailPage } from '@/pages/detail/PersonDetailPage';
import { PlanDetailPage } from '@/pages/detail/PlanDetailPage';
import { DeadlineDetailPage } from '@/pages/detail/DeadlineDetailPage';
import { QuestionDetailPage } from '@/pages/detail/QuestionDetailPage';

import { OverviewPage } from '@/pages/utility/OverviewPage';
import { StyleGuidePage } from '@/pages/utility/StyleGuidePage';
import { InstructionsPage } from '@/pages/utility/InstructionsPage';
import { LicensesPage } from '@/pages/utility/LicensesPage';
import { ChangelogPage } from '@/pages/utility/ChangelogPage';
import { PrivacyPolicyPage } from '@/pages/utility/PrivacyPolicyPage';
import { PasswordPage } from '@/pages/utility/PasswordPage';
import { NotFoundPage } from '@/pages/utility/NotFoundPage';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'auto' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <PricingProvider>
          <BookingProvider>
            <ScrollManager />
            <Routes>
              {/* Classic Layout Family */}
              <Route path="/" element={<ClassicHome />} />
              <Route path="/studio" element={<ClassicStudio />} />
              <Route path="/contact" element={<ClassicContact />} />

              {/* Cinematic Layout Family */}
              <Route path="/cinematic/home-cinematic" element={<CinematicHome />} />
              <Route path="/cinematic/studio-cinematic" element={<CinematicStudio />} />
              <Route path="/cinematic/contact-cinematic" element={<CinematicContact />} />
              <Route path="/home-cinematic" element={<CinematicHome />} />
              <Route path="/studio-cinematic" element={<CinematicStudio />} />
              <Route path="/contact-cinematic" element={<CinematicContact />} />

              {/* Statement Layout Family */}
              <Route path="/statement/home-statement" element={<StatementHome />} />
              <Route path="/statement/studio-statement" element={<StatementStudio />} />
              <Route path="/statement/contact-statement" element={<StatementContact />} />
              <Route path="/home-statement" element={<StatementHome />} />
              <Route path="/studio-statement" element={<StatementStudio />} />
              <Route path="/contact-statement" element={<StatementContact />} />

              {/* Shared Practice Pages */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />

              {/* Seven Interconnected CMS Detail Routes */}
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/insights/:slug" element={<InsightDetailPage />} />
              <Route path="/people/:slug" element={<PersonDetailPage />} />
              <Route path="/plans/:slug" element={<PlanDetailPage />} />
              <Route path="/deadlines/:slug" element={<DeadlineDetailPage />} />
              <Route path="/questions/:slug" element={<QuestionDetailPage />} />

              {/* Utility & System Pages */}
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/style-guide" element={<StyleGuidePage />} />
              <Route path="/instructions" element={<InstructionsPage />} />
              <Route path="/licenses" element={<LicensesPage />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/401" element={<PasswordPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BookingProvider>
        </PricingProvider>
      </LayoutProvider>
    </BrowserRouter>
  );
}

export default App;
