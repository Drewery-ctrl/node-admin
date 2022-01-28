import express, {} from "express";
import cors from "cors";
import {routes} from "./routes/routes";
import {Connection} from "typeorm";
import {sqlConnection} from "./ormconfig";

const PORT = process.env.PORT || 3000;

sqlConnection.connect().then((connection: Connection) => {
    console.log("Database connected: ", connection.isConnected);
    const app = express();
    app.use(express.json());
    app.use(cors({credentials: true, origin: "http://localhost:3000"}));

    routes(app);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

