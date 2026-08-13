const express = require("express")
const cookieparser = require('cookie-parser')
const authRouter = require("./routes/authRoute.js")
const foodRouter = require("./routes/foodRoute.js")
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cookieparser())

// Define your allowed domains
const allowedOrigins = [
 "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
credentials:true
};

app.use(cors(corsOptions));


app.use("/auth/api",authRouter)
app.use("/food/api",foodRouter)

module.exports = app;