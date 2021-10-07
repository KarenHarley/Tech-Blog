const comment = document.querySelector("#commentText").value;
const button = document.querySelector("#postBtn")
console.log("Js script is linked!");

const handleCommentSubmit = (event) => {
  event.preventDefault(); //you're supposed to receive an event object here.

  //  console.log(comment + id);
  console.log(event.target.dataset.postId); //let's try this instead
  console.log("Hi i work");
  console.log(event);
  console.log("You clicked ", event.target);
};

button.addEventListener("click", handleCommentSubmit)