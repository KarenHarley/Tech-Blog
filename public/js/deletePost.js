const deletePost = document.querySelector("#deletePostBtn");
const form = document.querySelector("#updatingPost");

const handleDelete = async (event) => {
    event.preventDefault();

     const id = form.getAttribute("data-postId");
     console.log(id)
    const response = await fetch(`/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
   
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
  };
 
  deletePost.addEventListener("click", handleDelete);