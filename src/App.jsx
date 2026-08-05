import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import SoftLaunchGate from '@/components/SoftLaunchGate';
import ProtectedRoute from '@/components/ProtectedRoute';
// Add page imports here
import { Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import Courses from './pages/Courses';
import UnderstandingAfricanEconomies from './pages/UnderstandingAfricanEconomies';
import Module1Economics from './pages/Module1Economics';
import Module2Economics from './pages/Module2Economics';
import Module3Economics from './pages/Module3Economics';
import Module4Economics from './pages/Module4Economics';
import Module5Economics from './pages/Module5Economics';
import Module6Economics from './pages/Module6Economics';
import InterculturalAILeadershipLab from './pages/InterculturalAILeadershipLab';
import Resources from './pages/Resources';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import Articles from './pages/Articles';
import TheRealCostOfAlwaysAchieving from './pages/articles/TheRealCostOfAlwaysAchieving';
import WhyTherapyIsntEnough from './pages/articles/WhyTherapyIsntEnough';
import CanPolicyMakeUsHappier from './pages/articles/CanPolicyMakeUsHappier';
import WhoControlsTheGlobalEconomy from './pages/articles/WhoControlsTheGlobalEconomy';
import IsTheICCBiasedAgainstAfricaArticle from './pages/articles/IsTheICCBiasedAgainstAfrica';
import AfterTheGunsGoSilentArticle from './pages/articles/AfterTheGunsGoSilent';
import ClimateIsAMentalHealthCrisisArticle from './pages/articles/ClimateIsAMentalHealthCrisis';
import Privacy from './pages/Privacy';
import Academy from './pages/Academy';
import PartnershipInquiry from './pages/PartnershipInquiry';
import UbuntuMentalHealth from './pages/UbuntuMentalHealth';
import MhModule1 from './pages/MhModule1';
import MhModule2 from './pages/MhModule2';
import MhModule3 from './pages/MhModule3';
import MhModule4 from './pages/MhModule4';
import MhModule5 from './pages/MhModule5';
import MhModule6 from './pages/MhModule6';
import MhModule7 from './pages/MhModule7';
import MhCourseCompletion from './pages/MhCourseCompletion';
import MhCertificate from './pages/MhCertificate';
import MhInsights from './pages/MhInsights';
import EconomicsCourseCompletion from './pages/EconomicsCourseCompletion';
import EconomicsCertificate from './pages/EconomicsCertificate';
import MyCourses from './pages/MyCourses';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
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
      <Route path="/courses" element={<Courses />} />
      {/* Protected Routes — login required for all curriculum access */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system" element={<UnderstandingAfricanEconomies />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-1" element={<Module1Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-2" element={<Module2Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-3" element={<Module3Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-4" element={<Module4Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-5" element={<Module5Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/module-6" element={<Module6Economics />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/completion" element={<EconomicsCourseCompletion />} />
        <Route path="/courses/understanding-african-economies-and-the-global-system/certificate" element={<EconomicsCertificate />} />
        <Route path="/courses/mental-health-community-and-culture" element={<UbuntuMentalHealth />} />
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
      </Route>
      {/* Retired mental health course slug — redirect to corrected course identity */}
      <Route path="/courses/ubuntu-and-mental-health" element={<Navigate to="/courses/mental-health-community-and-culture" replace />} />
      <Route path="/programmes/intercultural-ai-leadership-lab" element={<InterculturalAILeadershipLab />} />
      <Route path="/resources" element={<Resources />} />
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
      <Route path="/insights" element={<Navigate to="/resources" replace />} />
      <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <MotionConfig reducedMotion="user">
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </MotionConfig>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App