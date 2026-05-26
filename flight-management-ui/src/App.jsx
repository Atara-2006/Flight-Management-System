import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Flights from './pages/Flights';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookings from './pages/Bookings'; // ייבוא דף ההזמנות האמיתי

function App() {
  return (
    <Router>
      <div dir="rtl" style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        {/* סרגל ניווט */}
        <nav style={{
          padding: '15px 30px', 
          backgroundColor: '#2c3e50', 
          color: 'white',
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>✈️ טיסות זמינות</Link>
          <Link to="/my-bookings" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🎫 ההזמנות שלי</Link>
          
          <div style={{ marginRight: 'auto', display: 'flex', gap: '20px' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>התחברות 🔐</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>הרשמה 📝</Link>
          </div>
        </nav>

        {/* האזור המרכזי שמשתנה לפי הכתובת */}
        <main style={{ minHeight: '80vh', backgroundColor: '#f9f9f9', paddingBottom: '4px' }}>
          <Routes>
            <Route path="/" element={<Flights />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-bookings" element={<Bookings />} />
          </Routes>
        </main>

        {/* פוטר תחתון */}
        <footer style={{ textAlign: 'center', padding: '15px', backgroundColor: '#2c3e50', color: 'white' }}>
          <p>© 2026 מערכת ניהול טיסות - כל הזכויות שמורות</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;