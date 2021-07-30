
async function loadData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const body = await response.json()
    document.getElementById("title").innerHTML += body.id
    document.getElementById("demo").innerHTML = body.title
  } catch (error) {
    console.log(error)
  }
  
}

loadData()