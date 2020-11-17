
async function loadData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {mode: "cors"});
    const body = await response.json()
    document.getElementById("title").textContent += body.id
    document.getElementById("body").innerHTML = body.title
  } catch (error) {
    console.log(error)
  }
  
}

loadData()