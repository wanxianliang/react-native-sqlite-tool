# react-native-sqlite-tool

This repository is based on *[react-native-sqlite-storage](https://www.npmjs.com/package/react-native-sqlite-storage)*, you should install and link react-native-sqlite-storage first

# Installation

```js
 npm install --save react-native-sqlite-tool
```

Then follow the instructions to use react-native-sqlite-tool;



#### Steps

1. Create a class for one table

   ```js
   import { SqlLite } from "react-native-sqlite-tool";
   //if you use typescript
   export interface T {
       //primary key
       id?: string;
       value?: string;
   }
   //Set primaryKey dbName tableName createTableSql
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
           //important
           this.init();
       }
   }
   
   export const DemoSqlInstance = new DemoSql();
   ```
   
   
   
2. You can use follow apis

   

   insert(item: T): Promise<boolean>;

   ```js
   import { demoSqlInstance } from "./Demo";
   export interface T {
       //primary key
       id?: string;
       value?: string;
   }
   class Todo {
       insert(item: T) {
           return demoSqlInstance.insert(item);
       }
   }
   ```

   

   updateByCondition(newParams: T, conditionParams: T): Promise<boolean>;

   ```js
   const item={value:"new value"}
   demoSqlInstance.updateByCondition(item,{id:"123"})
   ```

   

   updateByPrimaryKey(newParams:T): Promise<boolean>

   ```js
   const item = { id: "123", value: "new value" }
   demoSqlInstance.updateByPrimaryKey(item);
   ```

   deleteByPrimaryKey(primaryValue: any): Promise<boolean>

   ```js
   demoSqlInstance.deleteByPrimaryKey("123")
   ```

   

   selectByPrimaryKey(primaryValue: any): Promise<T | null>

   ```js
   demoSqlInstance.selectByPrimaryKey("123")
   ```

   

   select(selectSql?: string, orderSql?: string): Promise<[] | T[]>

   ```js
   demoSqlInstance.select()
   demoSqlInstance.select("id=123")
   demoSqlInstance.select("id=123","create_time desc")
   ```

   

   selectOne(selectSql?: string): Promise<T | null>

   ```js
   demoSqlInstance.selectOne("id=123")
   ```

   

   selectBySql(selectSql: string): Promise<T[]>

   ```js
   demoSqlInstance.selectBySql("select * from todo where id='123' order by create_time desc")
   ```

   

   executeSql(sql: string): Promise<ResultSet>

   ```js
   demoSqlInstance.executeSql("select * from todo where id='123' order by create_time desc")
   ```

   

If you like this tool, please add a star to [my Github Repo](https://github.com/wanxianliang/react-native-sqlite-tool). Thanks!

That's all. Enjoy! :)
