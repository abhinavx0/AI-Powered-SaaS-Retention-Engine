import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UserSegments from './components/UserSegments';
import CampaignBuilder from './components/CampaignBuilder';
import UserView from './components/UserView';
import Performance from './components/Performance';
import UsersTable from './components/UsersTable';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            onViewChange={setCurrentView}
            onUserSelect={setSelectedUserId}
          />
        );
      case 'segments':
        return <UserSegments onViewChange={setCurrentView} />;
      case 'campaigns':
        return <CampaignBuilder onViewChange={setCurrentView} />;
      case 'users':
        return (
          <UsersTable 
            onUserSelect={setSelectedUserId}
            onViewChange={setCurrentView}
          />
        );
      case 'performance':
        return <Performance onViewChange={setCurrentView} />;
      case 'user-detail':
        return (
          <UserView 
            userId={selectedUserId}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return (
          <Dashboard 
            onViewChange={setCurrentView}
            onUserSelect={setSelectedUserId}
          />
        );
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default App;