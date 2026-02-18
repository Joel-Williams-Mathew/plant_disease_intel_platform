import { useState, useEffect } from 'react';
import { auth } from './services/firebase'; // Ensure this file exists with your API key
import { onAuthStateChanged } from 'firebase/auth';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import LocationBar from './components/ui/LocationBar';
import VisionAgentPanel from './components/panels/VisionAgentPanel';
import ClimateAgentPanel from './components/panels/ClimateAgentPanel';
import SatelliteAgentPanel from './components/panels/SatelliteAgentPanel';
import OrchestrationPanel from './components/panels/OrchestrationPanel';
import RecommendationPanel from './components/panels/RecommendationPanel';
import ROICalculator from './components/panels/ROICalculator';
import LoginPage from './components/panels/LoginPage'; // New Import

const pageConfig = {
  home: { title: 'Home Dashboard', subtitle: 'Welcome to AgriIntel — your smart farming command center' },
  market: { title: 'Market Intelligence', subtitle: 'Real-time crop pricing & market trend analysis' },
  community: { title: 'Community', subtitle: 'Connect with farmers, experts & agronomists' },
  'dev-planner': { title: 'Dev Planner', subtitle: 'Plan and track your development cycles' },
  'ai-assistant': { title: 'AI Assistant', subtitle: 'Chat with your intelligent farming advisor' },
  dashboard: { title: 'Outbreak Analysis', subtitle: 'Real-time multi-agent disease detection & monitoring' },
  'crop-planning': { title: 'Crop Planning', subtitle: 'Smart crop rotation & seasonal planning' },
  'roi-calculator': { title: 'ROI Calculator', subtitle: 'Estimate returns on your farming investments' },
  'econ-dashboard': { title: 'Econ Dashboard', subtitle: 'Economic indicators & farm financial health' },
};

const LIVE_PAGES = new Set(['dashboard', 'roi-calculator']);

function ComingSoonView({ title }) {
  return (
    <div className="coming-soon-wrapper">
      <div className="coming-soon-card">
        <div className="coming-soon-icon">🚧</div>
        <h2>{title}</h2>
        <p>This feature is currently under development and will be available soon.</p>
        <div className="coming-soon-badge">Coming Soon</div>
      </div>
    </div>
  );
}

function OutbreakAnalysisView() {
  return (
    <>
      <LocationBar />
      <div className="panel-grid">
        <VisionAgentPanel />
        <ClimateAgentPanel />
        <SatelliteAgentPanel />
      </div>
      <div className="panel-grid">
        <OrchestrationPanel />
      </div>
      <div className="panel-grid">
        <RecommendationPanel />
      </div>
    </>
  );
}

function AppContent() {
  const [activeNav, setActiveNav] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const config = pageConfig[activeNav];

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const renderPanel = () => {
    if (!LIVE_PAGES.has(activeNav)) {
      return <ComingSoonView title={config.title} />;
    }

    switch (activeNav) {
      case 'dashboard':
        return <OutbreakAnalysisView />;
      case 'roi-calculator':
        return <ROICalculator />;
      default:
        return <ComingSoonView title={config.title} />;
    }
  };

  // 1. Show Spinner while Firebase checks session
  if (loading) {
    return (
      <div className="app-layout" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // 2. Default View: If no user is logged in, show only the LoginPage
  if (!user) {
    return <LoginPage />;
  }

  // 3. Authenticated View: Show Sidebar and Main Dashboard
  return (
    <div className="app-layout">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} user={user} />
      <MainContent title={config.title} subtitle={config.subtitle}>
        {renderPanel()}
      </MainContent>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}