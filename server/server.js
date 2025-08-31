import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({path:"./src/config/.env"});

const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log(`Server Running on Port ${PORT}`))

