import SQLite, { ResultSet } from 'react-native-sqlite-storage';

/**
 * Code util
 */
export class CodeTool {

    static isStringEmpty(str?: string) {
        if (str && typeof str == "string" && str.length > 0) {
            return false;
        }
        return true;
    }

    static waitTime(time: number | 0) {
        return new Promise((resolve: any, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    }
}

/**
 * Base class from components to extend
 */
export class SqlLite<T> {
    hasInit: boolean;
    dbName: string;
    db: SQLite.SQLiteDatabase | undefined;
    tableName: string;
    primaryKey: string;
    createTableSql: string;
    constructor() {
        SQLite.DEBUG(false);
        this.dbName = "default.db";
        this.tableName = "";
        this.createTableSql = "";
        this.primaryKey = "id";
        this.hasInit = false;
        this.init();
    }
    async initTable() {
        return await this.createTable(this.createTableSql);
    }
    async executeSql(sql: string, isInit?: boolean) {
        if (!isInit && this.hasInit == false) {
            await CodeTool.waitTime(2000);
        }
        return new Promise((resolve, reject) => {
            this.db?.executeSql(sql, [], (res) => {
                resolve(res);
            }, (err) => {
                reject(err);
            })
        })
    }
    async init() {
        this.db = await this.open(this.dbName);
        await this.initTable();
        this.hasInit = true;
    }
    open(dbName: string) {
        return SQLite.openDatabase({ name: dbName, location: 'default' }, () => {
        }, () => { });
    }
    createTable(createTableSql: string) {
        return this.executeSql(createTableSql, true)
    }
    async checkAndCreateColumn(columnName: string, createColumnSql: string): Promise<boolean> {
        if (CodeTool.isStringEmpty(columnName) || CodeTool.isStringEmpty(createColumnSql)) {
            return false;
        }
        let exitFlag = true;
        try {
            await this.selectOne(`${columnName} is  null`);
        } catch (e) {
            exitFlag = false;
        }
        if (!exitFlag) {
            try {
                this.executeSql(createColumnSql);
            } catch (e) {
            }
        }
        return true;
    }
    insert(item: T) {
        let property = "";
        let values = "";
        for (const key in item) {
            if (item[key] == undefined || item[key] == null) {
                continue;
            }
            property += key + ",";
            if (typeof item[key] == 'string') {
                values += `'${item[key]}',`
            } else {
                values += `${item[key]},`
            }
        }
        property = property.substring(0, property.length - 1);
        values = values.substring(0, values.length - 1);
        return this.executeSql(`INSERT INTO ${this.tableName} (${property}) VALUES (${values})`)
    }

    async updateByCondition(newParams: T, conditionParams: T): Promise<boolean> {
        let property = "";
        let conditions = "";
        for (let key in newParams) {
            if (newParams[key] == undefined || newParams[key] == null) {
                continue;
            }
            property = property + key + "=" + newParams[key] + ",";
        }
        for (let key in conditionParams) {
            if (conditionParams[key] == undefined) {
                continue;
            }
            if (typeof conditionParams[key] == 'string') {
                conditions = conditions + `${key}='${conditionParams[key]}' AND `;
            } else {
                conditions = conditions + key + "=" + conditionParams[key] + " AND ";
            }
        }
        property = property.substring(0, property.length - 1);
        conditions = conditions.substring(0, conditions.length - 5);
        const updateResult: ResultSet | any = await this.executeSql(`UPDATE ${this.tableName}  SET (${property}) WHERE ${conditions}`);
        if (updateResult && updateResult.rowsAffected) {
            return true;
        }
        return false;
    }

    async updateByPrimaryKey(newParams: T | any): Promise<boolean> {
        if (newParams == undefined || newParams[this.primaryKey] == undefined) {
            return false;
        }
        let primaryVal = newParams[this.primaryKey];
        delete newParams[this.primaryKey];
        let property = "";
        for (let key in newParams) {
            if (newParams[key] == undefined || newParams[key] == null) {
                continue;
            }
            if (typeof newParams[key] == 'string') {
                property = property + `${key}='${newParams[key]}'` + ",";
            } else {
                property = property + `${key}=${newParams[key]}` + ",";
            }
        }
        property = property.substring(0, property.length - 1);
        const updateResult: ResultSet | any = this.executeSql(`UPDATE ${this.tableName}  SET ${property} WHERE ${this.primaryKey}=${primaryVal}`);
        if (updateResult && updateResult.rowsAffected) {
            return true;
        }
        return false;
    }

    async deleteByPrimaryKey(primaryValue: any): Promise<boolean> {
        const delResult: ResultSet | any = this.executeSql(`DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ${primaryValue} `);
        if (delResult && delResult.rows && delResult.rows.length) {
            return true;
        }
        return false;
    }

    async selectByPrimaryKey(primaryValue: string | undefined | null) {
        if (!primaryValue) {
            return null;
        }
        const result = await this.select(`${this.primaryKey}=${primaryValue}`);
        return result[0] ? result[0] : null;
    }

    async select(selectSql?: string, orderSql?: string): Promise<[] | T[]> {
        if (CodeTool.isStringEmpty(selectSql)) {
            selectSql = " 1=1 ";
        }
        let sql = `SELECT * FROM ${this.tableName} WHERE ${selectSql}`;
        if (orderSql) {
            sql += ` order by ${orderSql} `
        }
        const selectResult: ResultSet | any = await this.executeSql(sql);
        if (selectResult && selectResult.rows && selectResult.rows.length) {
            return selectResult.rows.raw();
        }
        return [];
    }

    async selectBySql(selectSql: string) {
        const selectResult: ResultSet | any = await this.executeSql(selectSql);
        if (selectResult && selectResult.rows && selectResult.rows.length) {
            return selectResult.rows.raw();
        }
        return [];
    }

    async selectOne(selectSql?: string): Promise<T | null> {
        let sql = "";
        if (CodeTool.isStringEmpty(selectSql)) {
            sql = `SELECT * FROM ${this.tableName}  limit 1`;
        } else {
            sql = `SELECT * FROM ${this.tableName}  WHERE ${selectSql} limit 1`;
        }
        const selectResult: ResultSet | any = await this.executeSql(sql);
        if (selectResult && selectResult.rows && selectResult.rows.length) {
            return selectResult.rows.raw()[0];
        }
        return null;
    }

}
