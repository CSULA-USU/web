import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export const jotformContactRatelimit = new Ratelimit({
  redis,
  // 5 submissions per 10 minutes per IP (tweak as needed)
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  analytics: true,
  prefix: 'ratelimit:contact',
});
