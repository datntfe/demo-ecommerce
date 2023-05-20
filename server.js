const { createServer } = require('http')
const fs = require('fs');
const { parse } = require('url')
const next = require('next')
 
NODE_TLS_REJECT_UNAUTHORIZED=0


const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3005

const app = next({ dev })
const handle = app.getRequestHandler()
 
const httpsOptions = {
  key: fs.readFileSync("./https_cert/localhost+1-key.pem"),
  cert: fs.readFileSync("./https_cert/localhost+1.pem")
};
 
 
app.prepare().then(() => {
  createServer(httpsOptions,(req, res) => {
       
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
 
    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
