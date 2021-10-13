const editForm = document.querySelector('#updatingPost');

const titleInput = document.querySelector("#titleInput");
const contentInput = document.querySelector("#contentInput");


const handleEdit = (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const content = contentInput.value;
    const id = event.target.getAttribute("data-postId");
    const editObject = {};
     console.log(id)
    if(title) editObject.title = title;
    if(content) editObject.content = content;


    fetch(`/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(editObject),
        headers: { "Content-Type": "application/json" },
    })
        .then(function (response) {
          //  console.log('success');
            document.location.replace("/dashboard");
        })
        .catch((err) => {
            console.log('catched error');
            console.log(err);
        });

//   titleInput.value = '';
//    contentInput.value = '';
   
};

editForm.addEventListener('submit', handleEdit);