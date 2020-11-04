function stringify(jsonBody) {
  if (!jsonBody) {
    return "null"
  }
  switch (typeof jsonBody) {
    case "object": 
      let jsonString = "";
      jsonString += "{";
      const lastKey = Object.keys(jsonBody).pop()
      for (const key in jsonBody) {
        jsonString += `"${key}":${stringify(jsonBody[key])}`
        if (key !== lastKey) {
          jsonString += ","
        }
      }
      jsonString += "}";
      return jsonString
    case "string":
      return `"${jsonBody}"`;
    case "number": 
      return `${jsonBody}`;
    case "boolean": 
      return jsonBody.toString();
    default: 
      return
  }
} 

const sampleObj = {
  name: "Juan",
  age: 19,
  address: {
    street: "hello",
    number: 3
  },
  test: null,
  boolean: true
}
const result = stringify(sampleObj)

// console.log(JSON.stringify(sampleObj))