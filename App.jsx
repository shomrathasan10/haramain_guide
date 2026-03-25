import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RtlWrapper from "./components/RtlWrapper";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Hajj from "./pages/Hajj";
import Umrah from "./pages/Umrah";
import Live from "./pages/Live";
import Qibla from "./pages/Qibla";
import Tasbi from "./pages/Tasbi";
import Tools from "./pages/Tools";
import HistoricalPlaces from "./pages/HistoricalPlaces";
import Hospitals from "./pages/Hospitals";
import Hotels from "./pages/Hotels";
import LostFound from "./pages/LostFound";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLive from "./pages/AdminLive";
import AdminHajj from "./pages/AdminHajj";
import AdminUmrah from "./pages/AdminUmrah";
import AdminHospitals from "./pages/AdminHospitals";
import AdminHotels from "./pages/AdminHotels";
import AdminHistoricalPlaces from "./pages/AdminHistoricalPlaces";
import AdminMessages from "./pages/AdminMessages";
import AdminDonations from "./pages/AdminDonations";
import AdminLostFound from "./pages/AdminLostFound";

export default function App() {
  return (
    <RtlWrapper>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hajj" element={<Hajj />} />
        <Route path="/umrah" element={<Umrah />} />
        <Route path="/live" element={<Live />} />
        <Route path="/qibla" element={<Qibla />} />
        <Route path="/tasbi" element={<Tasbi />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/historical-places" element={<HistoricalPlaces />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/live" element={<ProtectedRoute><AdminLive /></ProtectedRoute>} />
        <Route path="/admin/hajj" element={<ProtectedRoute><AdminHajj /></ProtectedRoute>} />
        <Route path="/admin/umrah" element={<ProtectedRoute><AdminUmrah /></ProtectedRoute>} />
        <Route path="/admin/hospitals" element={<ProtectedRoute><AdminHospitals /></ProtectedRoute>} />
        <Route path="/admin/hotels" element={<ProtectedRoute><AdminHotels /></ProtectedRoute>} />
        <Route path="/admin/historical-places" element={<ProtectedRoute><AdminHistoricalPlaces /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        <Route path="/admin/donations" element={<ProtectedRoute><AdminDonations /></ProtectedRoute>} />
        <Route path="/admin/lost-found" element={<ProtectedRoute><AdminLostFound /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </RtlWrapper>
  );
}