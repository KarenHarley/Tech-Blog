const comment = document.querySelector("#commentText");
const button = document.querySelector("#postBtn");
console.log("Js script is linked!");

const handleCommentSubmit = async (event) => {
  event.preventDefault();
  let belongs_to_post = event.target.getAttribute("data-postId");
  console.log(belongs_to_post);
  let content = comment.value;
  
  const response = await fetch("/new/comment", {
    method: "POST",

    body: JSON.stringify({
      belongs_to_post: belongs_to_post,
      content: content,

    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace(`/post/${belongs_to_post}`);
  } else {
    alert("Failed to add comment");
  }
};

button.addEventListener("click", handleCommentSubmit);
