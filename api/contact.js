const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3000;

const buckets = globalThis.__contactRateLimitBuckets ?? new Map();
globalThis.__contactRateLimitBuckets = buckets;

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
};

const getClientIp = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket?.remoteAddress ?? "unknown";
};

const isRateLimited = (key) => {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { count: 0, resetAt: now + WINDOW_MS };

  if (bucket.resetAt <= now) {
    bucket.count = 0;
    bucket.resetAt = now + WINDOW_MS;
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  return bucket.count > MAX_REQUESTS;
};

const readJsonBody = async (req) => {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  if (rawBody.length > 10_000) {
    throw new Error("Request body too large");
  }

  return JSON.parse(rawBody || "{}");
};

const validateBody = ({ name, email, message, company }) => {
  if (company) {
    return { ok: false, reason: "Message rejected" };
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return { ok: false, reason: "Invalid message" };
  }

  const clean = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
  };

  if (
    clean.name.length === 0 ||
    clean.email.length === 0 ||
    clean.message.length === 0 ||
    clean.name.length > MAX_NAME_LENGTH ||
    clean.email.length > MAX_EMAIL_LENGTH ||
    clean.message.length > MAX_MESSAGE_LENGTH
  ) {
    return { ok: false, reason: "Invalid message" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
    return { ok: false, reason: "Invalid email" };
  }

  return { ok: true, clean };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed" });
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return json(res, 500, { error: "Contact service is not configured" });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return json(res, 429, { error: "Too many messages. Try again later." });
  }

  try {
    const body = await readJsonBody(req);
    const validation = validateBody(body);

    if (!validation.ok) {
      return json(res, 400, { error: validation.reason });
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: validation.clean,
      }),
    });

    if (!response.ok) {
      return json(res, 502, { error: "Contact service failed" });
    }

    return json(res, 200, { ok: true });
  } catch {
    return json(res, 400, { error: "Invalid request" });
  }
}
