import React, { useState, useEffect } from 'react';
import bookingService from '../services/bookingService';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // פונקציה למשיכת ההזמנות של הנוסע המחובר
  const fetchPassengerBookings = async () => {
    const passengerId = localStorage.getItem('passengerId');
    
    if (!passengerId) {
      setError('אנא התחבר למערכת כדי לצפות בהזמנות שלך.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // פניה ל-Endpoint: /api/bookings/passenger/{passengerId}
      const data = await bookingService.getBookingsByPassenger(passengerId);
      setBookings(data);
    } catch (err) {
      setError('שגיאה בטעינת ההזמנות שלך מהשרת.');
    } finally {
      setLoading(false);
    }
  };

  // טעינת ההזמנות מיד עם העלאת המסך
  useEffect(() => {
    fetchPassengerBookings();
  }, []);

  // פונקציה לביטול הזמנה קיימת
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('האם אתה בטוח שברצונך לבטל הזמנה זו?')) {
      return;
    }

    try {
      // פניה ל-Endpoint: /api/bookings/{id} ברמת DELETE
      await bookingService.cancelBooking(bookingId);
      alert('ההזמנה בוטלה בהצלחה.');
      
      // רענון הרשימה במסך לאחר המחיקה
      setBookings(bookings.filter(b => b.id !== bookingId));
    } catch (err) {
      alert(err.response?.data?.message || 'שגיאה בביטול ההזמנה. נסה שוב מאוחר יותר.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>ההזמנות שלי 🎫</h2>

      {loading && <p style={{ textAlign: 'center' }}>טוען את ההזמנות שלך...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p style={{ textAlign: 'center' }}>עדיין לא ביצעת הזמנות לטיסות במערכת.</p>
      )}

      {/* טבלת ההזמנות של המשתמש */}
      {!loading && bookings.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', textAlign: 'right' }}>
          <thead>
            <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>קוד הזמנה</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>מספר טיסה</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>תאריך הזמנה</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.id}</td>
                {/* מציג את ה-flightId או flightNumber במידה וה-DTO מחזיר אובייקט שלם או רק מזהה */}
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.flightNumber || booking.flightId}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.bookingDate}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <button 
                    onClick={() => handleCancelBooking(booking.id)}
                    style={{ 
                      padding: '6px 12px', 
                      backgroundColor: '#e74c3c', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer' 
                    }}
                  >
                    ביטול כרטיס ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;