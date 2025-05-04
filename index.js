import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/Database.js";
// import petugasRoutes from "./routes/petugasRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import petugasRoutes from "./routes/petugasRoutes.js";
// import Gerbong from "./models/GerbongModel.js";
// import Jadwal from "./models/JadwalModel.js";
// import Kereta from "./models/KeretaModel.js";
// import Kursi from "./models/KursiModel.js";
// import OrderTicket from "./models/OrderTicketModel.js";
// import OrderDetail from "./models/OrderDetailModel.js";
// import Pelanggan from "./models/PelangganModel.js";
// import Petugas from "./models/PetugasModel.js";
// import User from "./models/UserModel.js";
const app = express();
dotenv.config();

// try {
//     await db.authenticate();
//     console.log("Database connect");
//     // await db.sync();
//     await db.sync({ alter: true });
// } catch (error) {
//     console.error(error);
// }

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(cookieParser());
app.use(express.json());
app.use(petugasRoutes);
app.use(userRoutes);

app.listen(8000, () => {
    console.log("sever run at port 80000");
})