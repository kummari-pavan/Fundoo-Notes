// config/redisConfig.ts
import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379', // Update this if you have different Redis connection details
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));


   redisClient.connect();


export { redisClient };
