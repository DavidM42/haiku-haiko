import "reflect-metadata";

import type { Point } from "geojson";
import { Connection, createConnection } from "typeorm";

import { Haiku } from "../models/haiku";

const environmentSQLServerUrl = process.env['DATABASE_URL'];

function isLocalHostConnection() {
    return process.env["DB_HOST"] === "localhost" || process.env["DB_HOST"] === '127.0.0.1';
}

const databaseBaseConfig = {
    type: "mysql",
    entities: [
        Haiku
    ],
    synchronize: true,
    logging: false,
    // security meh use ssl but accept every cert
    // just to get it to work for now
    ssl:  !isLocalHostConnection(),
    extra: isLocalHostConnection() ? {} :   {
        ssl: {
            rejectUnauthorized: false
        }
    }
};


export class Database {
    public connection: Connection;

    private async connect(): Promise<Connection> {
        let databaseConfig = databaseBaseConfig;
        if (environmentSQLServerUrl) {
            databaseConfig['url'] = environmentSQLServerUrl;
        } else {
            const additionalConfig = {
                host: process.env['DB_HOST'],
                port: process.env['DB_PORT'],
                username: process.env['DB_USER'],
                password: process.env['DB_PASSWORD'],
                database: process.env['DB_DATABASE'],
            };
            databaseConfig = Object.assign(databaseBaseConfig, additionalConfig); 
        }
        
        console.log(databaseConfig);
        // TODO better typing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any 
        this.connection = await createConnection(databaseConfig as any);
        return this.connection;
    }

    private async ensureConnection() {
        if (!this.connection) {
            await this.connect();
        }
    }

    public async createHaiku(lineOne: string, lineTwo: string, lineThree: string, location?: Point): Promise<Haiku> {
        await this.ensureConnection();

        const newHaiku: Haiku = new Haiku();
        newHaiku.createdOn = new Date();
        newHaiku.lineOne = lineOne;
        newHaiku.lineTwo = lineTwo;
        newHaiku.lineThree = lineThree;

        if (location) {
            newHaiku.location = location;
        }
        return await this.connection.manager.save(newHaiku);
    }

    /**
     * Get newest or oldest haikus
     * @param limit Limit of Haikus wanted
     * @param order Order or request if newest first or oldest first
     */
    public async getHaikusByDate(limit = 50, order: 'DESC' | 'ASC' = 'DESC'): Promise<Array<Haiku>> {
        await this.ensureConnection();

        const allHaikus = await this.connection.manager.find(Haiku, {
            order: {
                createdOn: order 
            },
            take: limit
        });
        return allHaikus;
    }

    public async removeHaiku(haiku: Haiku): Promise<Haiku> {
        await this.ensureConnection();
        return await this.connection.manager.remove(haiku);
    }

}

export const db = new Database();

