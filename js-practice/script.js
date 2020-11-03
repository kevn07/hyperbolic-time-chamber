
async function loadData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {mode: "cors"});
    const body = await response.json()
    console.log(body)
    document.getElementById("title").innerHTML += body.id
    document.getElementById("body").innerHTML = body.title
  } catch (error) {
    console.log(error)
  }
  
}

loadData()