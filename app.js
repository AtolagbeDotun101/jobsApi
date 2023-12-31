require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit')
const express = require('express');
const app = express();

//connect database
const connectDB = require('./db/connect')
// route
const authenticate = require('./middleware/authentication')
const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs')

app.set('trust proxy', 1)
app.use(rateLimiter({windowMs:15 * 60 * 1000, max:100}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss())


app.get('/', (req, res) => {
  res.send('<h1>JOBS API</h1>');
});
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs',authenticate, jobsRoute)


// extra packages


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}.....`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
