const titleInput = document.querySelector("#titleInput");
const contentInput = document.querySelector("#contentInput");
const form = document.querySelector("#newPost");
const handleSubmit = async (event) => {
    event.preventDefault();
   
    const title = titleInput.value;
    const content = contentInput.value;
 
    const response = await fetch('/create', {
      method: "POST",
      body: JSON.stringify({ title,content }),
      headers: { "Content-Type": "application/json" },
    });
   
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
  };
 
  form.addEventListener("submit", handleSubmit);