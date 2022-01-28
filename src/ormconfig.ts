import {ConnectionManager} from "typeorm";

const connectionManager = new ConnectionManager();
export const sqlConnection = connectionManager.create({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "admin",
    entities: [
        "src/entity/*.ts"
    ],
    synchronize: true,
    logging: false
});
