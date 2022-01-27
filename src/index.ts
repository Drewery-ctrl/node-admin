import express, { } from "express";
import cors from "cors";
import {routes} from "./routes/routes";
import {Connection, createConnection} from "typeorm";

const PORT = process.env.PORT || 3000;

createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "admin",
    "entities": [
        "src/entity/*.ts"
    ],
    "synchronize": true,
    "logging": false
}).then((connection: Connection) => {
    console.log("Database connected: ", connection.isConnected);
    const app = express();
    app.use(express.json());
    app.use(cors({origin: "http://localhost:3000"}));

    routes(app);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

