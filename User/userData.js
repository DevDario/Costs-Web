const HTMLElements = {
    avatar: document.getElementById("letter"),
    name: document.getElementById("username"),
    email: document.getElementById("email")
}

window.onload = () =>{

    fetch("http://localhost:8081/api/user/",{
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((response)=> response.json())
    .then((details)=>{
        
        localStorage.setItem('user',JSON.stringify(details))
        let userDetails = JSON.parse(localStorage.getItem('user')) ?? []

        HTMLElements.avatar.innerHTML = `${userDetails.name[0].toUpperCase()}`
        HTMLElements.name.innerHTML = `${userDetails.name}`
        HTMLElements.email.innerHTML = `${userDetails.email}`

    })
    .catch((err)=> {console.log("error while fetching user details ->", err)})

}