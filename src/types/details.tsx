export enum Type {
    Unknown = "unknown",
    Asset = "Asset",
    Debt = "Debt",
}

export class Detail {
    public id: number;
    public name: string;
    public type: Type;
    public amount: number;
    public date: string;
}
