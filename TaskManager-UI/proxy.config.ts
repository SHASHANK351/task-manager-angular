const PROXY_CONFIG = [
  {
    context: ['/'],
    target: 'http://localhost:3006',
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
