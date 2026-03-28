import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BusResults from './pages/BusResults';
import BusExperience from './pages/BusExperience';
import BusSeatSelection from './pages/BusSeatSelection';
import BusBoarding from './pages/BusBoarding';
import BusPayment from './pages/BusPayment';
import TrainResults from './pages/TrainResults';
import FlightResults from './pages/FlightResults';
import HotelResults from './pages/HotelResults';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/BookingPage';
import TrainBooking from './pages/TrainBooking';
import TrainPayment from './pages/TrainPayment';
import TrainTicket from './pages/TrainTicket';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buses" element={<BusResults />} />
          <Route path="/bus/seat-page" element={<BusSeatSelection />} />
          <Route path="/bus/boarding" element={<BusBoarding />} />
          <Route path="/bus/payment" element={<BusPayment />} />
          <Route path="/bus-experience" element={<BusExperience />} />
          <Route path="/trains" element={<TrainResults />} />
          <Route path="/flights" element={<FlightResults />} />
          <Route path="/hotels" element={<HotelResults />} />
          <Route 
            path="/booking/:type/:id" 
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/train/booking" 
            element={<TrainBooking />} 
          />
          <Route 
            path="/train/payment" 
            element={<TrainPayment />} 
          />
          <Route 
            path="/train/ticket" 
            element={<TrainTicket />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<div className="p-10 text-center text-2xl font-bold">404 - Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
