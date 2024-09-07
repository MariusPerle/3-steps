import { Database } from 'sqlite3';

export class foodDatabase {

    private db: Database;

    constructor() {
        // open db stored in file "inventory.db"
        this.db = new Database('inventory.db')

        // Drop table for testing only
        this.db.exec("DROP TABLE food")
        
        // if table food does not exist, create it
        this.db.exec(
            `CREATE TABLE IF NOT EXISTS food (
            id INT PRIMARY KEY,
            name VARCHAR(255),
            expiresAt VARCHAR(120),
            price REAL,
            weight VARCHAR(120),
            packagingUnit VARCHAR(120),
            available INTEGER,
            discountInPercent INTEGER DEFAULT 0 NOT NULL,
            claimed BOOL DEFAULT FALSE NOT NULL)`
        );

    }

    getConnection() {
        return this.db;
    }

    writeToDb(cmd: string) {
        this.db.exec(cmd);
    }

    insertIntoDb(id: number, name: string, expiresAt: string, price: number, weight: string, packagingUnit: string, available: number) {
        this.db.exec(`INSERT INTO food(id,name,expiresAt,price,weight,packagingUnit,available) VALUES (${id}, '${name}', '${expiresAt}', ${price}, '${weight}', '${packagingUnit}', ${available})`);
    }

}




