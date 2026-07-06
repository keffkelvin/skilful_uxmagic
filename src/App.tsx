import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrderForm from './pages/OrderForm';
import CustomerDashboard from './pages/CustomerDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-1 px-4 h-12">
        <NavLink to="/" className={({ isActive }) => isActive ? 'px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary' : 'px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground'}>Home</NavLink>
        <NavLink to="/order" className={({ isActive }) => isActive ? 'px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary' : 'px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground'}>Order Now</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary' : 'px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground'}>Dashboard</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
