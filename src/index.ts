import gateway from 'fast-gateway';
import helmet from 'helmet';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import type { IncomingMessage, ServerResponse } from 'http';
import {
  authServiceUrl,
  diagnosticServiceUrl,
  userServiceUrl,
} from './libs/config.js';

const rateLimiter = new RateLimiterMemory({
  points: 1000, // 1000 requests
  duration: 60 * 60, // por 1 hora
});

const rateLimiterMiddleware = async (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): Promise<void> => {
  try {
    const ip =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      'unknown';
    await rateLimiter.consume(ip);
    next();
  } catch {
    res.statusCode = 429;
    res.end('Too Many Requests');
  }
};

const server = gateway({
  middlewares: [helmet(), rateLimiterMiddleware],
  routes: [
    /**
     * RUTAS DUPLICADAS CON Y SIN BARRA FINAL
     *
     * Las rutas están duplicadas para manejar ambos casos:
     * - Con barra final: "/api/v1/auth/"
     * - Sin barra final: "/api/v1/auth"
     *
     * Esto es necesario porque:
     * 1. Los clientes pueden hacer peticiones con o sin barra final de manera inconsistente
     * 2. fast-gateway es estricto con el matching de rutas y no maneja automáticamente esta normalización
     * 3. Sin estas rutas duplicadas, requests como "/api/v1/auth" y "/api/v1/auth/"
     *    podrían resultar en 404 dependiendo de cómo el cliente construya la URL
     * 4. Esto garantiza compatibilidad total independientemente del formato usado por el frontend
     */

    {
      prefix: '/api/v1/auth',
      target: `${authServiceUrl}`,
      prefixRewrite: '/api/v1/auth',
    },
    {
      prefix: '/api/v1/auth/',
      target: `${authServiceUrl}`,
      prefixRewrite: '/api/v1/auth',
    },
    {
      prefix: '/api/v1/users',
      target: `${userServiceUrl}`,
      prefixRewrite: '/api/v1/users',
    },
    {
      prefix: '/api/v1/users/',
      target: `${userServiceUrl}`,
      prefixRewrite: '/api/v1/users',
    },
    {
      prefix: '/api/v1/diagnostics',
      target: `${diagnosticServiceUrl}`,
      prefixRewrite: '/api/v1/diagnostics',
    },
    {
      prefix: '/api/v1/diagnostics/',
      target: `${diagnosticServiceUrl}`,
      prefixRewrite: '/api/v1/diagnostics',
    },
    {
      prefix: '/api/v1/especialties',
      target: `${authServiceUrl}`,
      prefixRewrite: '/api/v1/especialties',
    },
    {
      prefix: '/api/v1/especialties/',
      target: `${authServiceUrl}`,
      prefixRewrite: '/api/v1/especialties',
    },
    {
      prefix: '/api/v1/departments',
      target: `${authServiceUrl}`,
      prefixRewrite: '/api/v1/departments',
    },
    {
      prefix: '/api/v1/departments/',
      target: `${authServiceUrl}`,
      prefixRewrite: '/api/v1/departments',
    },
  ],
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

server.start(PORT).then(() => {
  console.log(`API Gateway is running on port ${PORT}`);
});
