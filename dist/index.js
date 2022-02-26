"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToYup = void 0;
const yup = require("yup");
const yupMap = {
    string: yup.string,
    number: yup.number,
    boolean: yup.boolean,
    array: yup.array,
    mixed: yup.mixed,
    date: yup.date,
    object: yup.object,
};
const yupSchema = (attribute) => {
    if (!yupMap[attribute.type])
        throw new Error(`No type found in ${JSON.stringify(attribute)}`);
    let yupFn = yupMap[attribute.type]();
    Object.keys(attribute).forEach((property) => {
        const value = attribute[property];
        switch (property) {
            case "type": {
                break;
            }
            case "of": {
                if (value.type === "object") {
                    yupFn = yupFn.of((0, exports.jsonToYup)(value.shape));
                }
                else {
                    yupFn = yupFn.of(yupSchema(value));
                }
                break;
            }
            case "when": {
                const when = attribute[property];
                const then = when.then ? yupSchema(when.then) : undefined;
                const otherwise = when.otherwise
                    ? yupSchema(when.otherwise)
                    : undefined;
                yupFn = yupFn.when(when.anyOf, {
                    is: when.is,
                    otherwise,
                    then,
                });
                break;
            }
            default: {
                if (typeof value === "boolean") {
                    if (value)
                        yupFn = yupFn[property]();
                }
                else if (value && value.message) {
                    yupFn[property](value.value, value.message);
                }
                else {
                    yupFn = yupFn[property](value);
                }
            }
        }
    });
    return yupFn;
};
const jsonToYup = (js) => {
    const fields = {};
    Object.keys(js).forEach((attributeName) => {
        const attribute = js[attributeName];
        fields[attributeName] = yupSchema(attribute);
    });
    return yup.object().shape(fields);
};
exports.jsonToYup = jsonToYup;
exports.default = {
    jsonToYup: exports.jsonToYup,
};
//# sourceMappingURL=index.js.map