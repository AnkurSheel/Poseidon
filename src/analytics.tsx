import { app } from "electron";
import { JSONStorage } from "node-localstorage";
import ua, { Visitor } from "universal-analytics";
import uuid from "uuid";

export class Analytics {
    private user: Visitor;

    constructor() {
        const nodeStorage = new JSONStorage(app.getPath("userData"));
        const userId = nodeStorage.getItem("userid") || uuid();
        nodeStorage.setItem("userid", userId);
        this.user = ua(process.env.GOOGLE_ANALYTICS, userId);
        this.user.set("uid", userId);
    }

    public timing = (category: string, action: string, duration: number) => {
        this.user.timing(category, action, duration).send();
    }
}
