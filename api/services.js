const { SERVICES } = require('./_lib/services-data');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  res.status(200).json({ services: SERVICES });
};
