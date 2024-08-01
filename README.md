# JSON Config

JSON Store.

## Quick start

### Add environment variable

```env
JSON_CONFIG_ID=...
```

### Install package

```bash
npm install @yz13-lab/json-config
```

### Use in code

This example uses Next.js. It will create a page with the retrieved value from the JSON store.

```javascript
import { get } from "@yz13-lab/json-config"

const page = () => {
  const name = await get<string>("name")
  return name // YZ13
}

export default page
```
