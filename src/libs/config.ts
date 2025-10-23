import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const authServiceUrl = process.env.AUTH_SERVICE_URL;
export const userServiceUrl = process.env.USER_SERVICE_URL;
export const patientServiceUrl = process.env.PATIENT_SERVICE_URL;
export const diagnosticServiceUrl = process.env.DIAGNOSTIC_SERVICE_URL;

// CORS: orígenes permitidos para el frontend
export const allowedOrigins: string[] =
  (process.env.CORS_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean) ?? [
    'http://localhost:5173',
    'http://localhost:8080',
  ]);
