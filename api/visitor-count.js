// @ts-check

/**
 * Vercel Serverless Function: Anonymous Cross-Visitor Counter
 * Communicates directly with Upstash Redis REST API using native fetch.
 *
 * Supported Environment Variables:
 * 1. UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN (Primary)
 * 2. KV_REST_API_URL & KV_REST_API_TOKEN (Vercel KV Fallback)
 */
export default async function handler(req, res) {
  // Set anti-caching headers so client always gets fresh count
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Content-Type', 'application/json');

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!redisUrl || !redisToken) {
    // Fail gracefully with null count if environment variables are not yet configured
    return res.status(200).json({
      count: null,
      message: 'Redis environment variables are not configured.'
    });
  }

  const cleanUrl = redisUrl.replace(/\/$/, '');
  const key = 'wce_visitor_count';

  try {
    if (req.method === 'POST') {
      // Increment visitor counter by 1
      const response = await fetch(`${cleanUrl}/incr/${key}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${redisToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Upstash returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const count = typeof data.result === 'number' ? data.result : parseInt(data.result, 10) || 1;

      return res.status(200).json({ count });
    } else {
      // GET request: retrieve current count without incrementing
      const response = await fetch(`${cleanUrl}/get/${key}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${redisToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Upstash returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const count = data.result !== null && data.result !== undefined ? parseInt(data.result, 10) : 0;

      return res.status(200).json({ count: isNaN(count) ? 0 : count });
    }
  } catch (error) {
    // Fail gracefully so the frontend simply hides the badge instead of breaking
    return res.status(200).json({ count: null });
  }
}
