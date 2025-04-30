const API_URL =
  process.env.NODE_ENV === "production"
    ? "PRODUCTION_URL" // Production IP and port
    : "http://localhost:5173"; // Local development server

export default API_URL;
