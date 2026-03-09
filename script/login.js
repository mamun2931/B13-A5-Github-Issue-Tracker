document.getElementById("login-btn").addEventListener("click", function() {
const userName = document.getElementById("user");
const userValue = userName.value;

const pin = document.getElementById("pin");
const pinValue = pin.value;
console.log(pinValue);

if (userValue === "admin" && pinValue === "admin123") {
    alert("Login successful!");
    // window.location.replace("/home.html");
    window.location.assign("/home.html");
}
    else{
        alert("Invalid user and pin. Please try again.");
        return;
    }
});