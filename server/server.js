// backend/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/UserRoutes.js';
import connectDB from './config/Db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from frontend origin
const corsOptions = {
    origin: [ 'http://localhost:5173','https://game-app-ten-vert.vercel.app',],
    methods: ["POST","GET","PUT","DELETE"],
    CredentialS : true
  };
  
  app.use(cors(corsOptions));
  

app.use(express.json());


app.use('/api/users', router);

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the server!' });
  });


connectDB().then(()=>{
    app.listen(PORT,(req, res)=>{
    console.log("server is running")
})
})


