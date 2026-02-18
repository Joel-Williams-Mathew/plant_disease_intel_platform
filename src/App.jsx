import { useState } from 'react';
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

// Added 'roi-calculator' to the LIVE_PAGES set
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
  const config = pageConfig[activeNav];

  // Helper function to handle conditional rendering of panels
  const renderPanel = () => {
    // If the page isn't marked as "Live", show Coming Soon immediately
    if (!LIVE_PAGES.has(activeNav)) {
      return <ComingSoonView title={config.title} />;
    }

    // Render the specific component for live pages
    switch (activeNav) {
      case 'dashboard':
        return <OutbreakAnalysisView />;
      case 'roi-calculator':
        return <ROICalculator />;
      default:
        return <ComingSoonView title={config.title} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
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