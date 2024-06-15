let placeholderDiv = document.getElementById("placeholder");
let mainDiv = document.getElementById("main");
let loginAlert = document.getElementById("heading-alert");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("User is signed in:", user.uid);
    placeholderDiv.style.display = "block";
    setTimeout(function () {
      placeholderDiv.style.display = "none";
      main.style.display = "block";
    }, 3000);
  } else {
    console.log("No user is signed in.");
    setTimeout(function () {
      window.location.href = "./login.html";
    }, 3000);
    setTimeout(function () {
      console.log("Login required");
      loginAlert.textContent = "Login Required!";
      loginAlert.style.color = "red";
    }, 1000);
  }
});

let logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", function () {
  logoutButton.disabled = true;
  logoutButton.textContent = "Signing Out...";

  setTimeout(function () {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("User signed out.");

        setTimeout(function () {
          window.location.href = "./login.html";
        }, 3000);
      })
      .catch(function (error) {
        console.error("Sign out error:", error);
      });
  }, 3000);
});
