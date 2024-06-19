let profileData = document.getElementById("profile-data");
let profileCard = document.getElementById("profile-card");
let saveButton = document.getElementById("save-button");
let profileName = document.getElementById("profile-name");
let profileUserName = document.getElementById("profile-username");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");

let emailInput = document.getElementById("emailInput");

let cityName = document.getElementById("city-name");

let provinceDropdown = document.getElementById("province-dropdown");

let editProfileButton = document.getElementById("edit-btn");
let profileSection = document.getElementById("profile-section");
let editButton = document.getElementById("edit-button");

let editProfile = document.getElementById("edit-profile");
let saveBtn = document.getElementById("save-btn");
let cancelBtn = document.getElementById("cancel");

// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     let uid = user.uid;
//     firebase
//       .database()
//       .ref(`users/${uid}`)
//       .on("value", (snapshot) => {
//         const userData = snapshot.val();
//         console.log(userData);
//       });
//   }
// });

// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     let uid = user.uid;
//     firebase
//       .database()
//       .ref(`users/${uid}`)
//       .on(
//         "value",
//         (snapshot) => {
//           const userName = snapshot.val();
//           console.log(userName);

//           profileData.innerHTML = `<p>First Name: ${userName.firstName}</p>
//               <p>Last Name: ${userName.lastName}</p>
//               <p>Email: ${userName.email}</p>
//               <p>City: ${userName.cityName}</p>
//               <p>Province: ${userName.province}</p>
//               <button type="button" id="edit-button" class="btn btn-warning">Edit Profile</button>
// `;
//           firstName.value = userName.firstName;
//           lastName.value = userName.lastName;
//           emailInput.value = userName.email;
//           cityName.value = userName.cityName;
//           provinceDropdown.value = userName.province;
//           let editButton = document.getElementById("edit-button");
//           editButton.addEventListener("click", function () {
//             form.style.display = "block";
//             avatar.style.display = "none";
//             profileCard.style.border = "none";
//             profileData.style.display = "none";
//           });
//           console.log(editButton);
//         },
//         (error) => {
//           console.error("Error reading data:", error);
//         }
//       );
//   } else {
//     console.log("No user signed in");
//   }
// });

// let form = document.getElementById("signup-form");
// let avatar = document.getElementById("avatar");
// avatar.style.display = "flex";
// form.style.display = "none";
// profileCard.style.border = "block";
// profileData.style.display = "block";

// form.addEventListener("submit", function (event) {
//   event.preventDefault();
// });

// saveButton.addEventListener("click", saveUserData);

// function saveUserData() {
//   let user = firebase.auth().currentUser;
//   if (user) {
//     let uid = user.uid;
//     let userData = {
//       firstName: firstName.value,
//       lastName: lastName.value,
//       email: emailInput.value,
//       cityName: cityName.value,
//       province: provinceDropdown.value,
//     };

//     firebase
//       .database()
//       .ref(`users/${uid}`)
//       .set(userData)
//       .then(() => {
//         console.log("User data updated successfully");
//         form.style.display = "none";
//         profileCard.style.border = "1px solid rgb(200, 200, 200";
//         profileData.style.display = "block";
//         avatar.style.display = "block";
//       })
//       .catch((error) => {
//         console.error("Error updating user data:", error);
//       });
//   } else {
//     console.log("No user is signed in");
//   }
// }

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
        profileUserName.innerHTML = `${user.firstName} ${user.lastName}`;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  } else {
    console.log("No user is signed in.");
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

editProfileButton.addEventListener("click", function () {
  profileSection.style.display = "none";
  editButton.style.display = "none";
  editProfile.style.display = "flex";
  saveBtn.style.display = "flex";
});

cancelBtn.addEventListener("click", function () {
  profileSection.style.display = "flex";
  editButton.style.display = "flex";
  editProfile.style.display = "none";
  saveBtn.style.display = "none";
});
