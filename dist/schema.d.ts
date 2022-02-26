import { JsonString } from "./string";
import { JsonNumber } from "./number";
import { JsonBoolean } from "./boolean";
import { JsonDate } from "./date";
import { JsonArray } from "./array";
import { JsonObject } from "./object";
export declare type JsonDataType = "string" | "number" | "object" | "date" | "boolean" | "mixed" | "array";
export interface JsonData<T extends JsonDataType> {
    type: T;
}
export declare type JsonType = JsonString | JsonNumber | JsonBoolean | JsonDate | JsonArray | JsonObject;
export interface JsonSchema {
    [key: string]: JsonType;
}
