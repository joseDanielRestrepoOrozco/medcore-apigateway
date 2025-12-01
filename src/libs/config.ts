import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const authServiceUrl = process.env.AUTH_SERVICE_URL;
export const userServiceUrl = process.env.USER_SERVICE_URL;
export const patientServiceUrl = process.env.PATIENT_SERVICE_URL;
export const diagnosticServiceUrl = process.env.DIAGNOSTIC_SERVICE_URL;
export const frontendServiceUrl = process.env.FRONTEND_SERVICE_URL;
export const appointmentServiceUrl = process.env.APPOINTMENT_SERVICE_URL || 'http://localhost:3003';
export const prescriptionServiceUrl = process.env.PRESCRIPTION_SERVICE_URL || 'http://localhost:3005';
export const medicalOrdersServiceUrl = process.env.MEDICAL_ORDERS_SERVICE_URL || 'http://localhost:3006';
