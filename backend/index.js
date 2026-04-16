import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./util/db.js";
import userRout from "./routes/user_route.js"
import companyRout from "./routes/company_route.js"
import jobRout from "./routes/job_route.js"
import applicantsRout from "./routes/application_route.js"
import messageRout from "./routes/message_route.js"
import socketHandler from "./socket/socket.js";

dotenv.config({})

const app = express();
const server = http.createServer(app);

// app.get("/home",(req,res)=>{
//     return res.status(200).json({
//         message:"im comming from frontend",
//         success: true
//     })
// });

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsoptions = {
    origin:'http://localhost:5173',
    credentials: true
}

app.use(cors(corsoptions))

const PORT = process.env.PORT || 3000

app.use("/api/v1/user",userRout)
app.use("/api/v1/company",companyRout)
app.use("/api/v1/job",jobRout)
app.use("/api/v1/application",applicantsRout)
app.use("/api/v1/message",messageRout)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
})

socketHandler(io)

server.listen(PORT,()=>{
    connectDB()
    console.log(`server running at port ${PORT}`);
})
