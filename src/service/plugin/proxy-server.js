import httpProxy from 'http-proxy'
export const proxyServer = httpProxy.createProxyServer({})

proxyServer.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  })
  console.log({ err })
  res.end('Something went wrong. And we are reporting a custom error message.')
})

