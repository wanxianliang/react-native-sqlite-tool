import { SqlLite } from "../index";
//if you use typescript
export interface T {
    //primary key
    id?: string;
    value?: string;
}
class DemoSql extends SqlLite<T> {
    primaryKey = "id";
    dbName = "default.db";
    tableName = "todo";
    createTableSql = `CREATE TABLE IF NOT EXISTS todo (
        id  varchar(32) NOT NULL,
        value varchar(255) DEFAULT NULL,
        PRIMARY KEY (id)
    )`;
    constructor() {
        super();
    }
}

export const demoSqlInstance = new DemoSql();