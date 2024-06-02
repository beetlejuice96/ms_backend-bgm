import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'local',
    server: {
      port: process.env.PORT,
    },
    api: {
      authServiceBaseUrl: process.env.AUTH_SERVICE_BASE_URL,
    },
    redis: {
      redisHost: process.env.REDIS_HOST,
      redisPort: Number(process.env.REDIS_PORT),
      redisPassword: process.env.REDIS_PASSWORD,
    },
  };
});
