const githubLoginButton = document.getElementById("github-login")
const googleLoginButton = document.getElementById("google-login")
const authBaseURL = "http://localhost:8081/oauth2/authorization"

githubLoginButton.addEventListener('click',()=>{
    window.location.href = `${authBaseURL}/github`
})

googleLoginButton.addEventListener('click',()=>{
    window.location.href = `${authBaseURL}/google`
})