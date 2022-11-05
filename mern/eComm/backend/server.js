// require('dotenv').config();
require('express-async-errors');

const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const winston = require("winston");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//servers
const { apolloServer } = require("./servers/apolloServer");
const { socketIOServer } = require('./servers/socketIOServer');

//  routers
//login will work on authentication file and rest will work on full-auth file
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
const cartRouter = require('./routes/cartRoutes');

//swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./api/swaggerCodingAddictApi.yaml');

// // middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

// database
const connectDB = require('./db/connect');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);
// const { format } = winston;
// const logger = winston.createLogger({
//   format: format.combine(
//     format.colorize(),
//     format.timestamp(),
//     format.printf((msg) => {
//       return `${msg.timestamp} [${msg.level}] ${msg.message}`;
//     })
//   ),
//   transports: [new winston.transports.Console({ level: 'http' })],
// });

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json({ limit: "10mb", extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("q4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D"));

app.use(express.static('./public'));
app.use(fileUpload());
app.use(morgan('combined', { stream: accessLogStream }));
// app.use(morgan(
//   ':method :url :status :res[content-length] - :response-time ms',
//   {
//     stream: {
//       write: (message) => logger.http(message.trim()),
//     },
//   }
// ));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/swagger-api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// app.use(notFoundMiddleware);//home route access will fail
// app.use(errorHandlerMiddleware);

// const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    const userName = encodeURIComponent("nikhilkhedekar");
    const password = encodeURIComponent("Abcd@1234");
    await connectDB(`mongodb+srv://${userName}:${password}@mernstack.ppizwtc.mongodb.net/mernStack?retryWrites=true&w=majority`);
    app.get('/', (req, res) => {
      // res.send("Server is listening on port 8080...")
      res.send("<h1>Jobs API</h1><a href='/swagger-api-docs'>Swagger Documentation</a>")
    }).listen(8080, () =>
      console.log(`Server is listening on port 8080... with pid ${process.pid}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
apolloServer();
// socketIOServer;