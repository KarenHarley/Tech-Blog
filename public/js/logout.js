
const logout = async () => {
    console.log("Hi i work!!!")
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');//admin/user/login
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);