const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
const host = window.location.host

export const CONNECTION_URL = `${protocol}//${host}/connect`
