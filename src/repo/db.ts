import { Sequelize } from "sequelize";

export class Database {

    static Connection(input: {
        "dbName": string,
        "userName": string,
        "password": string,
        "host": string
    }) {
        const db = new Sequelize(input.dbName, input.userName, input.password, {
            host: 'localhost',
            dialect: "postgres"
        })
        return db
    }

    static async TestConnection(db: Sequelize) {
        try {
            await db.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
