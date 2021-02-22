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
