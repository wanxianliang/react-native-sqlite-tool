import SQLite from 'react-native-sqlite-storage';
/**
 * Code util
 */
export declare class CodeTool {
    static isStringEmpty(str?: string): boolean;
    static waitTime(time: number | 0): Promise<unknown>;
}
/**
 * Base class from components to extend
 */
export declare class SqlLite<T> {
    hasInit: boolean;
    dbName: string;
    db: SQLite.SQLiteDatabase | undefined;
    tableName: string;
    primaryKey: string;
    createTableSql: string;
    constructor();
    initTable(): Promise<unknown>;
    executeSql(sql: string, isInit?: boolean): Promise<unknown>;
    init(): Promise<void>;
    open(dbName: string): SQLite.SQLiteDatabase;
    createTable(createTableSql: string): Promise<unknown>;
    checkAndCreateColumn(columnName: string, createColumnSql: string): Promise<boolean>;
    insert(item: T): Promise<unknown>;
    updateByCondition(newParams: T, conditionParams: T): Promise<boolean>;
    updateByPrimaryKey(newParams: T | any): Promise<boolean>;
    deleteByPrimaryKey(primaryValue: any): Promise<boolean>;
    selectByPrimaryKey(primaryValue: string | undefined | null): Promise<T | null>;
    select(selectSql?: string, orderSql?: string): Promise<[] | T[]>;
    selectBySql(selectSql: string): Promise<any>;
    selectOne(selectSql?: string): Promise<T | null>;
}
