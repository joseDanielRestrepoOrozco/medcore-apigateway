import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const authServiceUrl = process.env.AUTH_SERVICE_URL;
export const userServiceUrl = process.env.USER_SERVICE_URL;
export const patientServiceUrl = process.env.PATIENT_SERVICE_URL;
export const diagnosticServiceUrl = process.env.DIAGNOSTIC_SERVICE_URL;
export const frontendServiceUrl = process.env.FRONTEND_SERVICE_URL;
export const appointmentServiceUrl =
  process.env.APPOINTMENT_SERVICE_URL || "http://localhost:3003";

// Orígenes permitidos para CORS.
// - Si se proporciona la variable de entorno `ALLOWED_ORIGINS`, puede ser
//   una lista separada por comas (ej: "https://app.example.com,http://localhost:5173").
// - Si no, se usa `FRONTEND_SERVICE_URL` cuando esté disponible.
// Esto expone `allowedOrigins` para que `src/index.ts` lo consuma.
export const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : frontendServiceUrl
  ? [frontendServiceUrl]
  : ["http://localhost:5173"];
