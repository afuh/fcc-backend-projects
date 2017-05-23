exports.siteName = `FCC API Projects`;

exports.dump = obj => JSON.stringify(obj, null, 2);

exports.menu = [
  { url: '/timestamp', title: 'Timestamp'},
  { url: '/whoami', title: 'Who am I'},
  { url: '/shrink', title: 'URL Shortener '},
];
