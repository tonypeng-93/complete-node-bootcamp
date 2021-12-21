//http module gives networking capabilities such as building http server
const http = require("http")
const fs = require("fs")
const { dirname } = require("path")

// api goal: read the data from dev-data/data.json, then parse JSON into JavaScript, and then send back that result to the client.

//create a server
const server = http.createServer((request, response) => {
  //   console.log(request.url)
  const pathName = request.url
  //for different paths now have different actions
  if (pathName === "/" || pathName === "/overview") {
    response.end("this is the overview page")
  } else if (pathName === "/product") {
    response.end("this is the product page")
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data)
      console.log(productData)
    })
    response.end("api")
  } else {
    //return http status code, can be see in console
    //send http header.
    response.writeHead(404, {
      // parse the response msg to be in html format
      "Content-type": "text/html",
    })
    response.end("<h1>page no found</h1>")
  }
})

// start listening for incoming request from clients
server.listen(8000, "127.0.0.1", () => {
  console.log("start listening to requests on port 8000")
})
