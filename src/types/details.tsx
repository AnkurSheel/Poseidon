import * as moment from "moment";

export enum Type {
    Unknown = 0,
    Asset,
    Debt,
}

export class Detail {
    public id: number;
    public name: string;
    public type: Type;
    public amount: number;
    public date: moment.Moment;
}
