import data from "C:\\Users\\AnkurSheel\\Downloads\\csvjson.json";
import moment from "moment";
import { Database } from "./shared/database";
import { UniqueConstraintError } from "./shared/unique-contraint-error";
import { accountNames } from "./types/accountNames";
import { Detail, Type } from "./types/details";

async function asyncForEach(array: any, callback: any) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export async function importJson(db: Database) {
    await db.clearTable();
    await asyncForEach(data, async (d: any) => {
        await addrecord(db, d);
    });
}

async function addrecord(db: Database, data: any) {
    const date = moment(data.Date, "MMM-YY").format("YYYY-MM-01");
    const record: Detail = new Detail();
    record.date = date;
    for (const [key, val] of Object.entries<string>(data)) {
        if (accountNames.includes(key)) {
            console.log(`Found ${key} - ${val}`);
            record.name = key;
            const currency = val.replace(/[$,]+/g, "");
            if (currency === "-") {
                continue;
            } else {
                record.amount = Number(currency);
            }
            record.type = Type.Asset;
            if (key.includes("Credit Card")) {
                record.type = Type.Debt;
                record.amount = -record.amount;
            }
            try {
                console.log(record);
                await db.addNewRecord(record);
                console.log(`Added record`);
            } catch (err) {
                if (err instanceof UniqueConstraintError) {
                    console.log("UniqueConstraintError");
                } else {
                    console.log("Error");
                }
            }
        } else {
            console.log(`Not Found ${key} - ${val}`);
        }
    }
}
