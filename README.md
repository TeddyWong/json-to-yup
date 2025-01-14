# JSON to YUP

## Updated! - Teddy Wong

## Installation

    yarn add j2y
/

    npm install j2y

## What is Yup?
YUP is an amazing library for validation of object shapes.

## What does this library do?
This library saves YUP validation schemas in plain Json objects.

Typescript types are included so that you can write them by hand with autocompletion.

## Example:
`Schema JSON`:
```typescript
const schema: JsonSchema = {
  marketingConsent: {
    type: "boolean",
  },
  email: {
    type: "string",
    nullable: true,
    lowercase: true,
    email: "This is not a valid email format",
    when: {
      anyOf: ["marketingConsent"],
      is: true,
      then: {
        type: "string",
        lowercase: true,
        required: "Please supply your email if you want us to market to you",
      },
    },
  },
};
```

`Data JSON`:
```json
{
  "marketingConsent": true,
  "email": "NOBODY@NOWHERE.COM"
}
```

`Result`"

```typescript
import {jsonToYup} from "j2y";
import data from "./data.json";

jsonToYup(schema).isValidSync(data);
```


