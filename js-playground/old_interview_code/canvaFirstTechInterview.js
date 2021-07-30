```
  Code By: Kevin He
  Description: Code written for first technical interview for Canva
    T1: https://gist.github.com/sylvaincanva/312a2c9a5b8cedfa29d101827e66bb50
    T2: https://gist.github.com/sylvaincanva/bd18e5e14d8dbf315f5b923e38e6f2cb
    T3: https://gist.github.com/sylvaincanva/a05dddfecc2c16fc4093fd15a24d173b
  Last Updated: 10/11/2020
```

function fetch(url) {
  return new Promise(resolve => {
      setTimeout(() => resolve({
        designId: url,
        shapes: [
          {shapeId: 'basic-shape', color: { r: 55, g: 40, b: 255 }, children: []},
          {shapeId: 'duck', color: { r: 255, g: 255, b: 252 }, children: [
            {shapeId: 'duck-bill', color: { r: 255, g: 255, b: 255 }, children: []},
            {shapeId: 'duck-body', color: { r: 205, g: 255, b: 252 }, children: []},
            {shapeId: 'duck-legs', color: { r: 100, g: 255, b: 252 }, children: []},
          ]},
          {shapeId: 'zigzag-polygon', color: { r: 205, g: 255, b: 252 }, children: []},
          {shapeId: 'fish', color: { r: 205, g: 255, b: 252 }, children: [
            {shapeId: 'fish-eyes', color: { r: 255, g: 255, b: 255 }, children: []},
            {shapeId: 'fish-fin', color: { r: 100, g: 66, b: 74 }, children: [
              {shapeId: 'fish-fin-part-1', color: { r: 93, g: 54, b: 55 }, children: []},
              {shapeId: 'fish-fin-part-2', color: { r: 33, g: 255, b: 255 }, children: []},
              {shapeId: 'fish-fin-part-3', color: { r: 128, g: 53, b: 255 }, children: []},
            ]},
            {shapeId: 'fish-tail', color: { r: 255, g: 5, b: 255 }, children: []},
          ]},
          {shapeId: 'duck', color: { r: 255, g: 255, b: 252 }, children: [
            {shapeId: 'duck-bill', color: { r: 255, g: 255, b: 255 }, children: []},
            {shapeId: 'duck-body', color: { r: 205, g: 255, b: 252 }, children: []},
            {shapeId: 'duck-legs', color: { r: 100, g: 255, b: 252 }, children: []},
          ]},
        ]
      }), Math.random() * 4000);
  });
}

class APIclass {
  constructor(_baseURL) {
    this.baseURL = _baseURL
  }

  get(id) {
    const fetchURL = this.baseURL + `/design/${id}`
    const responsePromise = fetch(fetchURL)
    return responsePromise //returns promise
  }
}

function retrieveDesigns(ids) {
  const apiClass = new APIclass('https://www.example.com')
  let promiseArray = []
  for (const id of ids) {
    const result = apiClass.get(id).then((value) => {
      const colourObject = retrieveColourValues(value.shapes)
      const avgColour = calculateAvg(colourObject)
      return avgColour
      }
    ).catch(() => {
      throw new Error('error occurred during retrieval of designs')
    })
    promiseArray.push(result)
  }
  return promiseArray
}

function retrieveColourValues(shapesArray) {
  const totalColours = shapesArray.reduce((acc, curr) => {
    let childObject = {
      r: 0,
      g: 0,
      b: 0,
      total: 0
    }
    if (curr.children.length > 0) {
      childObject = retrieveColourValues(curr.children)
    }
    acc.r += curr.color.r + childObject.r
    acc.g += curr.color.g + childObject.g
    acc.b += curr.color.b + childObject.b
    acc.total += 1 + childObject.total
    return acc
  }, {
    r: 0,
    g: 0,
    b: 0,
    total: 0
  })
  return totalColours
}


function calculateAvg(coloursObject) {
  return {
    r: coloursObject.r / coloursObject.total,
    g: coloursObject.g / coloursObject.total,
    b: coloursObject.b / coloursObject.total
  }
}

Promise.all(retrieveDesigns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).then(values => {
  console.log(values)
})
