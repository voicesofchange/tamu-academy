import { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/i18n';
import { DisplayModeProvider } from '@/lib/display-mode';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProfileCompletionPrompt from '@/components/profile/ProfileCompletionPrompt';
import SoftLaunchGate from '@/components/SoftLaunchGate';
import AppLoadingSpinner from '@/components/AppLoadingSpinner';
import AppErrorBoundary from '@/components/errors/AppErrorBoundary';
import ProtectedRoute from '@/components/ProtectedRoute';
// Add page imports here
import { Navigate } from 'react-router-dom';
// The homepage and the sign-in / sign-up screens ship in the main bundle.
// Every other page is split out and fetched when its route is opened
// (see src/lib/lazy-pages.js).
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import {
  About,
  Academy,
  AfterTheGunsGoSilentArticle,
  Articles,
  BuildingWealthModule,
  BuildingWealthTogether,
  CanPolicyMakeUsHappier,
  CertificateDesignSample,
  ClimateIsAMentalHealthCrisisArticle,
  CommunityInsights,
  Contact,
  Courses,
  EconomicsCertificate,
  EconomicsCourseCompletion,
  GuideCredits,
  GuideInsights,
  GuidePrint,
  GuideSection,
  InterculturalAILeadershipLab,
  IsTheICCBiasedAgainstAfricaArticle,
  LearnerStories,
  LearnersGuide,
  LearningHub,
  MhCertificate,
  MhCourseCompletion,
  MhInsights,
  MhModule1,
  MhModule2,
  MhModule3,
  MhModule4,
  MhModule5,
  MhModule6,
  MhModule7,
  Module1Economics,
  Module2Economics,
  Module3Economics,
  Module4Economics,
  Module5Economics,
  Module6Economics,
  MotivationCoach,
  MyCourses,
  PartnershipInquiry,
  Privacy,
  Profile,
  ProgressDashboard,
  RemotePathway,
  Resources,
  SautiZaSoko,
  SokoCertificate,
  SokoCourseCompletion,
  SokoModule,
  SokoPeerFacilitator,
  TheRealCostOfAlwaysAchieving,
  UbuntuMentalHealth,
  UnderstandingAfricanEconomies,
  TranslationReview,
  TemplateCourseModule,
  DiasporaRemittanceEconomy,
  Videos,
  WaiyakiCertificate,
  WaiyakiCourseCompletion,
  WaiyakiModule,
  WaiyakiWaHinga,
  WealthCapstone,
  WealthCertificate,
  WealthCourseCompletion,
  Welcome,
  WhoControlsTheGlobalEconomy,
  WhyTherapyIsntEnough,
} from '@/lib/lazy-pages';
import { SokoLabelsProvider } from '@/components/courses/soko/SokoLabelsProvider';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return <AppLoadingSpinner />;
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<SoftLaunchGate />}>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      {/* Auth routes — public, no authentication required */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Public course catalog and course overview pages — no login required to read about courses */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/understanding-african-economies-and-the-global-system" element={<UnderstandingAfricanEconomies />} />
      {/* Building Wealth Together — Economics and Development. The overview is public;
          the modules, the capstone, the completion room and the certificate require signing in. */}
      <Route path="/courses/building-wealth-together" element={<BuildingWealthTogether />} />
      <Route path="/courses/mental-health-community-and-culture" element={<UbuntuMentalHealth />} />
      {/* Waiyaki wa Hinga — Heritage and Leadership Collection. The overview is public;
          the modules, the completion room and the certificate require signing in. */}
      <Route path="/courses/waiyaki-wa-hinga" element={<WaiyakiWaHinga />} />
      {/* Sauti za Soko — wrapped in SokoLabelsProvider so the pathway renders
          in the learner's selected language, including the lesson interface. */}
      <Route path="/courses/sauti-za-soko" element={<SokoLabelsProvider><SautiZaSoko /></SokoLabelsProvider>} />
      {/* The Diaspora Remittance Economy — the first course built with the course
          template. The overview is public; its modules are served by the single
          template module route inside the protected block below. */}
      <Route path="/courses/diaspora-remittance-economy" element={<DiasporaRemittanceEconomy />} />
      <Route path="/courses/sauti-za-soko/peer-facilitator" element={<SokoLabelsProvider><SokoPeerFacilitator /></SokoLabelsProvider>} />
      {/* Protected Routes — login required for module content, progress, and certificates */}
      <Route element={<ProtectedRoute />}>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/my-progress" element={<ProgressDashboard />} />
        <Route path="/learning-hub" element={<LearningHub />} />
        <Route path="/motivation-coach" element={<MotivationCoach />} />
        <Route path="/insights" element={<CommunityInsights />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-1" element={<Module1Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-2" element={<Module2Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-3" element={<Module3Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-4" element={<Module4Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-5" element={<Module5Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-6" element={<Module6Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/completion" element={<EconomicsCourseCompletion />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/certificate" element={<EconomicsCertificate />} />
        {/* Building Wealth Together — four static routes declared before the module
            route so they always win. */}
        <Route path="/courses/building-wealth-together/completion" element={<WealthCourseCompletion />} />
        <Route path="/courses/building-wealth-together/certificate" element={<WealthCertificate />} />
        <Route path="/courses/building-wealth-together/capstone" element={<WealthCapstone />} />
        <Route path="/courses/building-wealth-together/:moduleRoute" element={<BuildingWealthModule />} />
        {/* Course template — the single module page for every course registered in
            base44/shared/course-template-config.js. The page 404s any slug the
            registry does not hold, and the course's own static routes above always
            win over this one. */}
        <Route path="/courses/:courseSlug/:moduleRoute" element={<TemplateCourseModule />} />
        <Route path="/courses/mental-health-community-and-culture/module-1" element={<MhModule1 />} />
        <Route path="/courses/mental-health-community-and-culture/module-2" element={<MhModule2 />} />
        <Route path="/courses/mental-health-community-and-culture/module-3" element={<MhModule3 />} />
        <Route path="/courses/mental-health-community-and-culture/module-4" element={<MhModule4 />} />
        <Route path="/courses/mental-health-community-and-culture/module-5" element={<MhModule5 />} />
        <Route path="/courses/mental-health-community-and-culture/module-6" element={<MhModule6 />} />
        <Route path="/courses/mental-health-community-and-culture/module-7" element={<MhModule7 />} />
        <Route path="/courses/mental-health-community-and-culture/completion" element={<MhCourseCompletion />} />
        <Route path="/courses/mental-health-community-and-culture/certificate" element={<MhCertificate />} />
        <Route path="/courses/mental-health-community-and-culture/insights" element={<MhInsights />} />
        {/* Sauti za Soko — completion, certificate and the optional Peer Facilitator track.
            These static routes are declared before the module route so they always win. */}
        <Route path="/courses/sauti-za-soko/completion" element={<SokoLabelsProvider><SokoCourseCompletion /></SokoLabelsProvider>} />
        <Route path="/courses/sauti-za-soko/certificate" element={<SokoLabelsProvider><SokoCertificate /></SokoLabelsProvider>} />
        <Route path="/courses/sauti-za-soko/peer-facilitator/certificate" element={<SokoLabelsProvider><SokoCertificate courseSlug="sauti-za-soko-peer-facilitator" /></SokoLabelsProvider>} />
        <Route path="/courses/sauti-za-soko/:moduleRoute" element={<SokoLabelsProvider><SokoModule /></SokoLabelsProvider>} />
        {/* Waiyaki wa Hinga — the five modules, the completion room and the certificate.
            The static routes are declared before the module route so they always win. */}
        <Route path="/courses/waiyaki-wa-hinga/completion" element={<WaiyakiCourseCompletion />} />
        <Route path="/courses/waiyaki-wa-hinga/certificate" element={<WaiyakiCertificate />} />
        <Route path="/courses/waiyaki-wa-hinga/:moduleRoute" element={<WaiyakiModule />} />
        {/* Safari ya Utu Learner's Guide — private to the signed-in learner */}
        <Route path="/learners-guide" element={<LearnersGuide />} />
        <Route path="/learners-guide/insights" element={<GuideInsights />} />
        <Route path="/learners-guide/credits" element={<GuideCredits />} />
        <Route path="/learners-guide/print" element={<GuidePrint />} />
        <Route path="/learners-guide/:sectionId" element={<GuideSection />} />
        {/* Administrator-only review sheet for the official certificate design.
            Demonstration data only — no certificate record is created. */}
        <Route path="/admin/certificate-design" element={<CertificateDesignSample />} />
        {/* Administrator-only review of the cached course translations */}
        <Route path="/admin/translation-review" element={<TranslationReview />} />
      </Route>
      {/* Retired mental health course slug — redirect to corrected course identity */}
      <Route path="/courses/ubuntu-and-mental-health" element={<Navigate to="/courses/mental-health-community-and-culture" replace />} />
      <Route path="/programmes/intercultural-ai-leadership-lab" element={<InterculturalAILeadershipLab />} />
      <Route path="/resources" element={<Resources />} />
      {/* The Remote Learner journey — text-first study, offline material, and the pathway to a certificate */}
      <Route path="/remote-pathway" element={<RemotePathway />} />
      <Route path="/stories" element={<LearnerStories />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/academy" element={<Academy />} />
      <Route path="/partnership-inquiry" element={<PartnershipInquiry />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/the-real-cost-of-always-achieving" element={<TheRealCostOfAlwaysAchieving />} />
      <Route path="/articles/why-therapy-isnt-enough" element={<WhyTherapyIsntEnough />} />
      <Route path="/articles/can-policy-make-us-happier" element={<CanPolicyMakeUsHappier />} />
      <Route path="/articles/who-controls-the-global-economy" element={<WhoControlsTheGlobalEconomy />} />
      <Route path="/articles/is-the-icc-biased-against-africa" element={<IsTheICCBiasedAgainstAfricaArticle />} />
      <Route path="/articles/after-the-guns-go-silent" element={<AfterTheGunsGoSilentArticle />} />
      <Route path="/articles/climate-is-a-mental-health-crisis" element={<ClimateIsAMentalHealthCrisisArticle />} />
      {/* Retired routes — redirects */}
      <Route path="/programmes" element={<Navigate to="/courses" replace />} />
      <Route path="/learning-areas" element={<Navigate to="/courses#learning-areas" replace />} />
      <Route path="/partner" element={<Navigate to="/contact?type=partnership" replace />} />
      <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <LanguageProvider>
    <DisplayModeProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <MotionConfig reducedMotion="user">
          <Router>
            <ScrollToTop />
            {/* The short, skippable profile prompt after a learner's first enrollment */}
            <ProfileCompletionPrompt />
            {/* Pages are code-split: the same loading spinner covers the
                session check and the download of a page's code. */}
            <AppErrorBoundary>
              <Suspense fallback={<AppLoadingSpinner />}>
                <AuthenticatedApp />
              </Suspense>
            </AppErrorBoundary>
          </Router>
          <Toaster />
        </MotionConfig>
      </QueryClientProvider>
    </AuthProvider>
    </DisplayModeProvider>
    </LanguageProvider>
  )
}

export default App