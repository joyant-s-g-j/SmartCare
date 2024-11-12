const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    const signUp = document.querySelector(".sign-up");
    const signIn = document.querySelector(".sign-in");

    // Set the sign-up form visible and hide the sign-in form
    signUp.style.opacity = "1";
    signUp.style.zIndex = "5";
    signIn.style.opacity = "0";
    signIn.style.zIndex = "1";
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    const signUp = document.querySelector(".sign-up");
    const signIn = document.querySelector(".sign-in");

    // Set the sign-in form visible and hide the sign-up form
    signIn.style.opacity = "1";
    signIn.style.zIndex = "5";
    signUp.style.opacity = "0";
    signUp.style.zIndex = "1";
});
