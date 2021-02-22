import SQLite from 'react-native-sqlite-storage';
export declare class SqlLite<T> {
    hasInit: boolean;
    dbName: string;
    db: SQLite.SQLiteDatabase | undefined;
    tableName: string;
    primaryKey: string;
    constructor();
    initTable(): void;
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
