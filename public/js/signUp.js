const signUp = document.querySelector(".signup-form");

const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("hello");
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users/signUp", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to sign up.");
      }
    }
  };
  
  
  signUp.addEventListener("submit", signupFormHandler);
  