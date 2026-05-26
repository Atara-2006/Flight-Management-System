import API from './api';

const bookingService = {
  // קבלת כל ההזמנות במערכת - פונה ל- /api/bookings
  getAllBookings: async () => {
    const response = await API.get('/bookings');
    return response.data;
  },

  // קבלת הזמנות של נוסע ספציפי - פונה ל- /api/bookings/passenger/{passengerId}
  getBookingsByPassenger: async (passengerId) => {
    const response = await API.get(`/bookings/passenger/${passengerId}`);
    return response.data;
  },

  // יצירת הזמנה חדשה - פונה ל- /api/bookings ברמת POST
  createBooking: async (bookingDTO) => {
    // מקבל BookingDTO שמכיל שדות כמו flightId, passengerId וכדומה
    const response = await API.post('/bookings', bookingDTO);
    return response.data;
  },

  // ביטול הזמנה - פונה ל- /api/bookings/{id} ברמת DELETE
  cancelBooking: async (id) => {
    const response = await API.delete(`/bookings/${id}`);
    return response.data;
  }
};

export default bookingService;