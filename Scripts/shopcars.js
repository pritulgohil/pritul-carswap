let placeholderDiv = document.getElementById("placeholder");
let mainDiv = document.getElementById("main");
let loginAlert = document.getElementById("heading-alert");
let profileName = document.getElementById("profile-name");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("User is signed in:", user.uid);

    firebase
      .database()
      .ref(`users/${user.uid}`)
      .once("value")
      .then((snapshot) => {
        const user = snapshot.val();
        console.log(user.firstName);
        profileName.textContent = `${user.firstName}'s Profile`;

        placeholderDiv.style.display = "block";
        setTimeout(function () {
          placeholderDiv.style.display = "none";
          mainDiv.style.display = "block";
        }, 3000);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
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
  logoutButton.textContent = "Logging Out...";

  setTimeout(function () {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("User signed out.");

        setTimeout(function () {
          window.location.href = "./login.html";
        }, 800);
      })
      .catch(function (error) {
        console.error("Sign out error:", error);
      });
  }, 800);
});
