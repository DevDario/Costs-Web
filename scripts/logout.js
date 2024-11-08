const logoutButton = document.getElementById("logout")

logoutButton.addEventListener("click",(e)=>{
    e.preventDefault()

    fetch("http://localhost:8081/logout",{
        method:"POST",
        credentials:"include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "http://localhost:3333/Auth/login";
        } else {
            console.error("Logout failed", response);
        }
    })
    .catch(error => console.error("Error during logout:", error))
})