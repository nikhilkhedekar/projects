const { createAgent } = require('@forestadmin/agent');
const { createMongooseDataSource } = require('@forestadmin/datasource-mongoose');
//Retrieve express app
const { app } = require("./server");
// Retrieve your mongoose connection
const connection = require('./models');

// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
const FOREST_ENV_SECRET = "ffd171ed4a42f32cdd6a939855f5dcb4024580c49fda1fa38e65217d6cbd1345";
const FOREST_AUTH_SECRET = "f2f98010cbdc546d9174f0a9b0e27d697e3659d0a65cc569";

createAgent({
    authSecret: FOREST_AUTH_SECRET,
    envSecret: FOREST_ENV_SECRET,
    isProduction: false

})
    // Create your Mongoose datasource
    .addDataSource(createMongooseDataSource(connection))
    // Replace "myExpressApp" by your Express application
    .mountOnExpress(app)
    .start();

    // npm install @forestadmin/agent @forestadmin/datasource-mongoose
