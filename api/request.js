const { randomUUID } = require('crypto');
const { SERVICES } = require('./_lib/services-data');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};
  const { serviceId, name, email, phone } = body;

  const errors = [];
  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) errors.push('Please select a valid service.');
  if (!name || String(name).trim().length < 2) errors.push('Please enter your name.');
  if (!email || !EMAIL_RE.test(String(email))) errors.push('Please enter a valid email address.');
  if (!phone || String(phone).trim().length < 6) errors.push('Please enter a valid phone number.');

  if (errors.length > 0) {
    res.status(400).json({ ok: false, errors });
    return;
  }

  // No database or email provider is configured yet - this only confirms
  // that the request was received and validated. Wire up storage/email here later.
  res.status(200).json({
    ok: true,
    requestId: randomUUID(),
    message: `Thanks ${String(name).trim()}! We received your ${service.name.toLowerCase()} request and will contact you shortly.`,
  });
};
