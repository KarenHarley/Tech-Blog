

const comment = document.querySelector("#commentText").value;
console.log("Js script is linked!")
const handleCommentSubmit = (event) => {
  event.preventDefault(); //you're supposed to receive an event object here.
  
//  console.log(comment + id);
  console.log(event.target.dataset.postId) //let's try this instead
};
