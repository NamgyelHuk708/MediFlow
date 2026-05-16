import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './App.css';

import Welcome from './screens/Welcome';
import Dashboard from './screens/Dashboard';
import SymptomChecker from './screens/SymptomChecker';
import BookAppointment from './screens/BookAppointment';
import QueueStatus from './screens/QueueStatus';
import FamilyHealth from './screens/FamilyHealth';
import AdminPortal from './screens/AdminPortal';
import MedicineReminder from './screens/MedicineReminder';
import Telemedicine from './screens/Telemedicine';
import HomeRemedy from './screens/HomeRemedy';
import Nutrition from './screens/Nutrition';

import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';

function AppShell() {
  const location = useLocation();
  const isWelcome = location.pathname === '/';
  const isAdmin   = location.pathname === '/admin';
  const showShell = !isWelcome && !isAdmin;

  return (
    <>
      {/* Sidebar — only on tablet+ for non-welcome, non-admin routes */}
      {showShell && <SideNav />}

      {/* Central content wrapper — shifts right of sidebar on tablet+ */}
      <div className={showShell ? 'app-content' : ''}>
        <Routes>
          <Route path="/"                  element={<Welcome />} />
          <Route path="/dashboard"         element={<Dashboard />} />
          <Route path="/symptom-checker"   element={<SymptomChecker />} />
          <Route path="/book-appointment"  element={<BookAppointment />} />
          <Route path="/queue-status"      element={<QueueStatus />} />
          <Route path="/family-health"     element={<FamilyHealth />} />
          <Route path="/admin"             element={<AdminPortal />} />
          <Route path="/medicine-reminder" element={<MedicineReminder />} />
          <Route path="/telemedicine"      element={<Telemedicine />} />
          <Route path="/home-remedy"       element={<HomeRemedy />} />
          <Route path="/nutrition"         element={<Nutrition />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppShell />
      </Router>
    </AppProvider>
  );
}

export default App;
