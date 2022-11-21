const homeController = (req, res) => {
    // res.send("Server is listening on port 8080...")
    res.send("<h1>Jobs API</h1><a href='/swagger-api-docs'>Swagger Documentation</a>")
}

module.exports = { 
    homeController
}