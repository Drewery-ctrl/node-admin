import express, {Request, Response} from "express";
import cors from "cors";
import {routes} from "./routes/routes";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));

routes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});