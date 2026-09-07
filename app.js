class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center max-w-md">
            <div className="icon-circle-alert text-6xl text-red-500 mb-4 mx-auto"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Interface Error</h1>
            <p className="text-gray-600 mb-6">We encountered an issue loading the dashboard. Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-lg shadow-blue-200">Refresh Page</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [activeTab, setActiveTab] = React.useState('Prices');

  const renderContent = () => {
    switch (activeTab) {
      case 'Prices':
        return <BundlePriceList />;
      case 'Users':
        return <UserManagement />;
      case 'Analytics':
        return <AnalyticsView />;
      case 'Settings':
        return <Settings />;
      case 'Help Center':
        return <HelpCenter />;
      case 'Security':
        return <Security />;
      default:
        return <BundlePriceList />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50" data-name="app-root" data-file="app.js">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto max-h-screen">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4" data-name="app-header">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{activeTab}</h1>
            <p className="text-slate-500 mt-1">
                {activeTab === 'Prices' && "Configure data bundle plans and pricing across networks."}
                {activeTab === 'Users' && "Manage registered users and their transaction history."}
                {activeTab === 'Analytics' && "Detailed insights into sales and network performance."}
                {activeTab === 'Settings' && "System configurations and payment gateway integration."}
                {activeTab === 'Help Center' && "Knowledge base and administrative documentation."}
                {activeTab === 'Security' && "Account protection and platform security logs."}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
                {[4, 5, 6].map(i => (
                    <img 
                        key={i}
                        src={`https://i.pravatar.cc/150?u=${i}`} 
                        className="w-8 h-8 rounded-full border-2 border-white"
                        alt="admin"
                    />
                ))}
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors">
                <div className="icon-bell text-xl"></div>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
        </div>
        
        <footer className="mt-12 py-6 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
            <p>© 2026 MDP BundleHub. All rights reserved.</p>
            <div className="flex gap-4">
                <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
                <a href="#" className="hover:text-blue-600 transition-colors">API Support</a>
            </div>
        </footer>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><App /></ErrorBoundary>);