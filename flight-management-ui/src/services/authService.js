import API from './api';

const authService = {
  // התחברות - פונה ל- /api/passengers/login
  login: async (loginRequest) => {
    // loginRequest מכיל email ו-password לפי LoginRequestDTO
    const response = await API.post('/passengers/login', loginRequest);
    if (response.data.passengerId) {
      // נשמור את ה-ID של המשתמש המחובר כדי לבצע הזמנות בשמו בהמשך
      localStorage.setItem('passengerId', response.data.passengerId);
    }
    return response.data; // מחזיר LoginResponseDTO
  },

  // הרשמה - פונה ל- /api/passengers/register
  register: async (passengerData) => {
    // מכין את אובייקט ה-Passenger שנשלח ב-RequestBody
    const response = await API.post('/passengers/register', passengerData);
    return response.data;
  },

  // קבלת פרטי נוסע לפי מזהה - פונה ל- /api/passengers/{id}
  getPassengerById: async (id) => {
    const response = await API.get(`/passengers/${id}`);
    return response.data; // מחזיר PassengerDTO
  },

  // התנתקות מהמערכת
  logout: () => {
    localStorage.removeItem('passengerId');
  }
};

export default authService;