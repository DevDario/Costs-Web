const logoutButton = document.getElementById("logout")

logoutButton.addEventListener("click",(e)=>{
    e.preventDefault()

    fetch("http://localhost:8081/logout",{
        method:"POST",
        credentials:"include"
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "http://localhost:3333/Auth/login";
        } else {
            console.error("Logout failed");
        }
    })
    .catch(error => console.error("Error during logout:", error))
})