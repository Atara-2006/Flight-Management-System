import React, { useState, useEffect } from 'react';
import flightService from '../services/flightService';
import bookingService from '../services/bookingService';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // פונקציה למשיכת הטיסות (כל הטיסות או לפי סינון יעד)
  const fetchFlights = async (searchDest = '') => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (searchDest.trim() !== '') {
        // שימוש ב-Endpoint המסונן: /api/flights/available?destination=...
        data = await flightService.getAvailableFlights(searchDest);
      } else {
        // שימוש ב-Endpoint הכללי: /api/flights
        data = await flightService.getAllFlights();
      }
      setFlights(data);
    } catch (err) {
      setError('שגיאה בטעינת הטיסות מהשרת.');
    } finally {
      setLoading(false);
    }
  };

  // טעינה ראשונית של הטיסות ברגע שהמסך עולה
  useEffect(() => {
    fetchFlights();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights(destination);
  };

  const handleClearSearch = () => {
    setDestination('');
    fetchFlights('');
  };

  // פונקציה לביצוע הזמנה (Booking) עבור הטיסה שנבחרה
  const handleBookFlight = async (flightId) => {
    const passengerId = localStorage.getItem('passengerId');
    
    if (!passengerId) {
      alert('עליך להתחבר למערכת כדי להזמין טיסה!');
      return;
    }

    try {
      // בניית אובייקט ה-BookingDTO לשליחה ב-RequestBody לשרת
      const bookingDTO = {
        flightId: flightId,
        passengerId: parseInt(passengerId),
        bookingDate: new Date().toISOString().split('T')[0] // תאריך של היום בפורמט YYYY-MM-DD
      };

      await bookingService.createBooking(bookingDTO);
      alert('הטיסה הוזמנה בהצלחה! תוכל לראות אותה במסך "ההזמנות שלי".');
    } catch (err) {
      alert(err.response?.data?.message || 'שגיאה בביצוע ההזמנה. ייתכן שהטיסה מלאה.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>לוח טיסות זמינות ✈️</h2>

      {/* טופס חיפוש/סינון לפי יעד */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <input 
          type="text" 
          placeholder="חפש לפי יעד (למשל: New York)..." 
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>חפש</button>
        {destination && (
          <button type="button" onClick={handleClearSearch} style={{ padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>נקה</button>
        )}
      </form>

      {/* הצגת הודעות טעינה או שגיאה */}
      {loading && <p style={{ textAlign: 'center' }}>טוען טיסות מהשרת...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {/* רשימת הטיסות כרטיס אחר כרטיס */}
      {!loading && flights.length === 0 && <p style={{ textAlign: 'center' }}>לא נמצאו טיסות זמינות.</p>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {flights.map((flight) => (
          <div key={flight.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>טיסה מספר: {flight.flightNumber}</h3>
            <p><strong>מאיפה:</strong> {flight.origin}</p>
            <p><strong>יעד:</strong> {flight.destination}</p>
            <p><strong>תאריך ושעה:</strong> {flight.departureTime}</p>
            <p><strong>מקומות פנויים:</strong> {flight.availableSeats}</p>
            <p><strong>מחיר:</strong> ${flight.price}</p>
            <button 
              onClick={() => handleBookFlight(flight.id)}
              style={{ width: '100%', padding: '10px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
            >
              הזמן כרטיס עכשיו 🎫
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flights;