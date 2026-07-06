import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import { Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import Programmes from './pages/Programmes';
import InterculturalAILeadershipLab from './pages/InterculturalAILeadershipLab';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

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
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/programmes" element={<Programmes />} />
      <Route path="/programmes/intercultural-ai-leadership-lab" element={<InterculturalAILeadershipLab />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/contact" element={<Contact />} />
      {/* Retired routes — redirects */}
      <Route path="/learning-areas" element={<Navigate to="/programmes#learning-areas" replace />} />
      <Route path="/partner" element={<Navigate to="/contact?type=partnership" replace />} />
      <Route path="/insights" element={<Navigate to="/resources" replace />} />
      <Route path="*" element={<PageNotFound />} />
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