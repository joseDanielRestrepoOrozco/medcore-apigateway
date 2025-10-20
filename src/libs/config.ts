import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const authServiceUrl = process.env.AUTH_SERVICE_URL;
export const userServiceUrl = process.env.USER_SERVICE_URL;
export const patientServiceUrl = process.env.PATIENT_SERVICE_URL;
export const diagnosticServiceUrl = process.env.DIAGNOSTIC_SERVICE_URL;
