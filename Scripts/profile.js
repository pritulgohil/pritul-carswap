let profileData = document.getElementById("profile-data");
let profileCard = document.getElementById("profile-card");
let saveButton = document.getElementById("save-button");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");

let emailInput = document.getElementById("emailInput");

let cityName = document.getElementById("city-name");

let provinceDropdown = document.getElementById("province-dropdown");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    let uid = user.uid;
    firebase
      .database()
      .ref(`users/${uid}`)
      .on(
        "value",
        (snapshot) => {
          const userName = snapshot.val();
          console.log(userName);

          profileData.innerHTML = `<p>First Name: ${userName.firstName}</p>
              <p>Last Name: ${userName.lastName}</p>
              <p>Email: ${userName.email}</p>
              <p>City: ${userName.cityName}</p>
              <p>Province: ${userName.province}</p>
              <button type="button" id="edit-button" class="btn btn-warning">Edit Profile</button>
`;
          firstName.value = userName.firstName;
          lastName.value = userName.lastName;
          emailInput.value = userName.email;
          cityName.value = userName.cityName;
          provinceDropdown.value = userName.province;
          let editButton = document.getElementById("edit-button");
          editButton.addEventListener("click", function () {
            form.style.display = "block";
            avatar.style.display = "none";
            profileCard.style.border = "none";
            profileData.style.display = "none";
          });
          console.log(editButton);
        },
        (error) => {
          console.error("Error reading data:", error);
        }
      );
  } else {
    console.log("No user signed in");
  }
});

let form = document.getElementById("signup-form");
let avatar = document.getElementById("avatar");
avatar.style.display = "flex";
form.style.display = "none";
profileCard.style.border = "block";
profileData.style.display = "block";

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

saveButton.addEventListener("click", saveUserData);

function saveUserData() {
  let user = firebase.auth().currentUser;
  if (user) {
    let uid = user.uid;
    let userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: emailInput.value,
      cityName: cityName.value,
      province: provinceDropdown.value,
    };

    firebase
      .database()
      .ref(`users/${uid}`)
      .set(userData)
      .then(() => {
        console.log("User data updated successfully");
        form.style.display = "none";
        profileCard.style.border = "1px solid rgb(200, 200, 200";
        profileData.style.display = "block";
        avatar.style.display = "block";
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  } else {
    console.log("No user is signed in");
  }
}
