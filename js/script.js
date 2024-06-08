//Login Page
var loginPage = document.querySelector('.login-page')
var loginA = document.querySelector('.signin-a')
var signinButton = document.querySelector('#signin-btn')

//Sign up Page
var signupPage = document.querySelector('.signup-page')
var signupA = document.querySelector('.signup-a')
var signupButton = document.querySelector('#signup-btn')
var signupInputs = document.querySelectorAll('.signup-page input')

//Home Page
var homePage = document.querySelector('.home-page')

//Regex
const signupRegex = {

    nameRegex: /^[a-zA-Z0-9_]{3,16}$/,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    passRegex: /.{3,20}/

}


var usersList = [];
var usersName = [];
var usersEmail = [];
var usersPassword = [];


//Check UserList
if (localStorage.getItem('userList') == null) {



}
else {
    //Push Emails to List
    usersList = JSON.parse(localStorage.getItem('userList'))
    explodeIntoLists()

    console.log(usersName)
    console.log(usersEmail)
    console.log(usersPassword)


}


//Go To Sign up Form
signupA.addEventListener('click', () => {

    signupPage.classList.remove('d-none')

})
//Go To Login Form
loginA.addEventListener('click', () => {

    signupPage.classList.add('d-none')

})




//Signup
signupButton.addEventListener('click', () => {


    //Get All inputs
    signupInputs = document.querySelectorAll('.signup-page input')


    if (usersEmail.includes(signupInputs[1].value)) {


        showSingupWarning()

    }

    else {

        var user = {
            username: signupInputs[0].value
            , useremail: signupInputs[1].value
            , userpassword: signupInputs[2].value

        }

        //Push New into User List
        usersList.push(user)


        //Save userList to local storage
        localStorage.setItem('userList', JSON.stringify(usersList))

        //Push Item into Users Email
        explodeIntoLists()

        showSignupSuccses()
        clear()
        putInvalidInputs()
    }





})

//Regex Signup
signupInputs[0].addEventListener('input', () => {
    validation(signupRegex.nameRegex, signupInputs[0].value, 'username-warning', 'uernNme')
    isValidSignupInputs()
})
signupInputs[1].addEventListener('input', () => {
    validation(signupRegex.emailRegex, signupInputs[1].value, 'email-warning', 'userEmail')
    isValidSignupInputs()
})
signupInputs[2].addEventListener('input', () => {
    validation(signupRegex.passRegex, signupInputs[2].value, 'pass-warning', 'uerPassword')
    isValidSignupInputs()
})




//Login
signinButton.addEventListener('click', () => {





    var inputs = document.querySelectorAll('.login-page input')

    if (usersEmail.includes(inputs[0].value)) {
        var index = usersEmail.indexOf(inputs[0].value)

        if (usersPassword[index] !== inputs[1].value) {
            showloginPassWarning()
        }
        else {

            addHomePage(index)
        }
    }
    else {
        showloginEmalWarning()

    }


})



//Warnings
function showloginEmalWarning() {
    document.querySelector('.login-page .show-warning-email').classList.replace('d-none', 'd-block')
    document.querySelector('.login-page .show-warning-password').classList.replace('d-block', 'd-none')




}


function showloginPassWarning() {
    document.querySelector('.login-page .show-warning-password').classList.replace('d-none', 'd-block')
    document.querySelector('.login-page .show-warning-email').classList.replace('d-block', 'd-none')




}

function showSingupWarning() {
    document.querySelector('signup-page .show-warning').classList.replace('d-none', 'd-block')
    document.querySelector('signup-page .show-created').classList.replace('d-block', 'd-none')


}

function showSignupSuccses() {
    document.querySelector('.show-created').classList.replace('d-none', 'd-block')
    document.querySelector('.show-warning').classList.replace('d-block', 'd-block')

}

//Explode userList
function explodeIntoLists() {
    for (var i = 0; i < usersList.length; i++) {

        usersName.push(usersList[i].username)
        usersEmail.push(usersList[i].useremail)
        usersPassword.push(usersList[i].userpassword)


    }
}

//Clear Inputs
function clear() {
    var inputs = document.querySelectorAll('input')
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
    }
}

//When sign in show home page
function addHomePage(index) {
    homePage.classList.remove('d-none')
    loginPage.classList.add('d-none')

    homePage.innerHTML = `<div class="home-page d-flex flex-row justify-content-center w-100 vh-100 ">
<div class="pt-5 mt-5">

    <h2>Welcome ${usersName[index]}</h2>

</div>
</div>`

}

//Validations
function validation(regex, value, warningclassName, inputId) {
    if (regex.test(value)) {


        document.querySelector(`.${warningclassName}`).classList.replace('d-block', 'd-none')
        document.querySelector(`#${inputId}`).classList.replace('is-invalid', 'is-valid')

    }
    else {
        document.querySelector(`.${warningclassName}`).classList.replace('d-none', 'd-block')
        document.querySelector(`#${inputId}`).classList.replace('is-valid', 'is-invalid')

    }




}

function isValidSignupInputs() {

    const isValid = document.querySelector('#uernNme').classList.contains('is-valid') &
        document.querySelector('#userEmail').classList.contains('is-valid') &
        document.querySelector('#uerPassword').classList.contains('is-valid')


    if (isValid) {
        document.querySelector('#signup-btn').classList.remove('disabled')
    }
    else {
        if (!document.querySelector('#signup-btn').classList.contains('disabled')) {
            document.querySelector('#signup-btn').classList.add('disabled')

        }

    }


}

function putInvalidInputs(){
    document.querySelector('#signup-btn').classList.add('disabled')
    document.querySelector('#uernNme').classList.add('is-invalid')
    document.querySelector('#userEmail').classList.add('is-invalid')
    document.querySelector('#uerPassword').classList.add('is-invalid')


}