import API from './api';

const flightService = {
  // קבלת כל הטיסות - פונה ל- /api/flights
  getAllFlights: async () => {
    const response = await API.get('/flights');
    return response.data; // מחזיר רשימה של FlightDTO
  },

  // קבלת טיסות זמינות לפי יעד - פונה ל- /api/flights/available?destination=XYZ
  getAvailableFlights: async (destination) => {
    const response = await API.get('/flights/available', {
      params: { destination }
    });
    return response.data; // מחזיר רשימה מסוננת של FlightDTO
  },

  // יצירת טיסה חדשה (לאדמין) - פונה ל- /api/flights ברמת POST
  createFlight: async (flightDTO) => {
    const response = await API.post('/flights', flightDTO);
    return response.data;
  }
};

export default flightService;