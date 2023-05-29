const http = require('http')
const url = require('url')

const hostname = '0.0.0.0'
const port = 80

const links = [
  { name: 'NodeJS', url: 'https://nodejs.org/' },
  { name: 'GatsbyJS', url: 'https://www.gatsbyjs.com/' },
  { name: 'NextJS', url: 'https://nextjs.org/' },
  { name: 'Netlify', url: 'https://www.netlify.com/' }
]

const server = http.createServer((req, res) => {

  const { pathname } = url.parse(req.url)

  switch (pathname) {

    case '/json':
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.write(JSON.stringify(links))
      break;

    case '/html':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.write(parseHtml(links))
      break;

    default:
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.write(links.map(val => `${val.name} (${val.url})`).join('\n'))
  }

  res.end()
})

server.listen(port, hostname, () => {
  console.log(`O servidor está sendo executado em http://${hostname}:${port}/`)
})


function parseHtml(data) {
  return `
  <html>
  <head><title>Primeira Atividade</title></head>
  <body>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Endereço</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(val => `
          <tr>
            <td>${val.name}<td>
            <td><a href="${val.url}" target="_blank">${val.url}</a><td>
          </tr>
        `).join('')}
      </tbody>
    <table>
  <body>
  </html>
  `
}
