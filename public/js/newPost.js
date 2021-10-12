const titleInput = document.querySelector("#titleInput");
const contentInput = document.querySelector("#contentInput");
const form = document.querySelector("#newPost");


const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Helloooo")
    const title = titleInput.value;
    const content = contentInput.value;
  
    const response = fetch('/create', {
      method: "POST",
      body: JSON.stringify({ title,content }),
      headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Error creating Post');
      }
  };
  
  form.addEventListener("submit", handleSubmit);
  