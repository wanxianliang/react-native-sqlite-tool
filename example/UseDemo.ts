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

    updateByCondition(newParams: T, conditionParams: T) {
        const item = { value: "new value" }
        return demoSqlInstance.updateByCondition(item, { id: "123123" });
    }

    updateByPrimaryKey(newParams: T) {
        const item = { id: "123", value: "new value" }
        return demoSqlInstance.updateByPrimaryKey(item);
    }

    deleteByPrimaryKey() {
        return demoSqlInstance.deleteByPrimaryKey("123");
    }
}