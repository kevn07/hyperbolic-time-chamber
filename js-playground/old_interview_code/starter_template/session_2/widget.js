console.log('JS loaded successfully!')


const demoElement = document.querySelector('.demo') 

const model = {
  foo: 'some text',
  ['favorite color: ']: 'blue',
};

function generate(model){
  for (const key in model) {
    const newElement = document.createElement("div")
    newElement.style.cssText = 'display: flex; flex-direction: row;';
    const modelKey = document.createElement("p")
    modelKey.textContent = `${key}`
    
    const keyValue = document.createElement("input")
    keyValue.dataset['key'] = key 
    keyValue.value = model[key]

    newElement.appendChild(modelKey)
    newElement.appendChild(keyValue)

    newElement.addEventListener('change', elementHandler)
    document.body.appendChild(newElement)
  }
}

function elementHandler(e) {
  const key = e.target.dataset.key
  let value = isNaN(e.target.value) ? e.target.value : parseInt(e.target.value)
  model[key] = value
  console.log(model)
} 

generate(model)
 
