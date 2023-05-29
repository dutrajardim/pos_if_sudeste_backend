const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const hostname = '0.0.0.0'
const port = 80

const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  woff: "font/woof",
  svg: "image/svg+xml"
}

const publicDir = [
  ...process.cwd().split(path.sep).slice(0, -1),
  "public"
].join(path.sep)

const indexDir = [publicDir, "index.html"].join(path.sep)

http.createServer((req, res) => {
  const acesso_uri = url.parse(req.url).pathname


  const caminho_recurso = path.join(publicDir, decodeURI(acesso_uri))
  console.log(caminho_recurso)

  let recurso

  try {
    // get information about the given working directory path
    recurso = fs.lstatSync(caminho_recurso)

  } catch (error) {
    recurso = fs.lstatSync(indexDir)
    // return error message if was not possible read the path
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': recurso.size
    })

    let fluxo_arquivo = fs.createReadStream(indexDir)
    return fluxo_arquivo.pipe(res)
  }

  if (recurso.isFile()) { // resource is a file
    let mimeType = mimeTypes[path.extname(caminho_recurso).substring(1)]

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': recurso.size
    })

    let fluxo_arquivo = fs.createReadStream(caminho_recurso)
    return fluxo_arquivo.pipe(res)

  } else if (recurso.isDirectory()) { // resource is a directory

    res.writeHead(302, { 'Location': 'index.html' })
    return res.end()

  } else { // resource is something else

    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.write('500: Erro interno do servidor!')
    return res.end()

  }

}).listen(port, hostname, () => {
  // print message about the server
  console.log(`Server is running at https://${hostname}/${port}/`)
})