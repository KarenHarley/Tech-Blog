const comment = document.querySelector("#commentText");
const button = document.querySelector("#postBtn");
console.log("Js script is linked!");

const handleCommentSubmit = async (event) => {
  event.preventDefault();
  console.log(comment.value);
  console.log(event.target.dataset.postId);
  console.log(event);
  let belongs_to_post = 1;
  let content = comment.value;
  //let writer = req.session.id;
  const response = await fetch("/new/comment", {
    method: "POST",
    body: JSON.stringify({
      belongs_to_post: belongs_to_post,
      content: content,
    //  writer: writer,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

button.addEventListener("click", handleCommentSubmit);
