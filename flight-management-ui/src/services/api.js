import axios from 'axios';

// יצירת קליינט עם כתובת הבסיס של שרת ה-Spring Boot שלך
const API = axios.create({
  baseURL: 'http://localhost:8080/api', // שנה את ה-Port או ה-URL במידת הצורך בהתאם ל-application.properties
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor אופציונלי: אם תוסיף בעתיד אבטחת JWT, כאן נצמיד את ה-Token לכל בקשה
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;