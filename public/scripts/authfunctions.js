

function logout() {
    const user = {
        email: "",
        role: "",
    }

    sessionStorage.setItem("currentUser", false)
    window.location = BASE_URL + "/login.html"
}

function checkCredentials() {

    const isLogged = sessionStorage.getItem('currentUser')

    if ( isLogged ) {

    } else {
        logout()
    }
}

checkCredentials()