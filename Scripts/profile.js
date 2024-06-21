import {
  auth,
  onAuthStateChanged,
  get,
  child,
  dbRef,
  database,
  signOut,
  uploadBytes,
  storageRef,
  getDownloadURL,
  storage,
  set,
  update,
} from "./firebaseConfig.js";

let profileName = document.getElementById("profile-name");
let profileUserName = document.getElementById("profile-username");
let profileImg = document.getElementById("profileImg");
let newImage = document.getElementById("new-profile");

let emailAddress = document.getElementById("email");
let city = document.getElementById("city");
let state = document.getElementById("state");
let province = document.getElementById("province");

let firstName = document.getElementById("input-f-name");
let lastName = document.getElementById("input-l-name");

let cityName = document.getElementById("input-city");

let editProfileButton = document.getElementById("edit-btn");
let profileSection = document.getElementById("profile-section");
let editButton = document.getElementById("edit-button");

let editProfile = document.getElementById("edit-profile");
let saveBtn = document.getElementById("save-btn");
let cancelBtn = document.getElementById("cancel");

let uploadBtn = document.getElementById("uploadPicture");

let uid = "";

onAuthStateChanged(auth, function (user) {
  if (user) {
    console.log("User is signed in:", user.uid);
    uid = user.uid;
    const ref = dbRef(database);
    get(child(ref, `users/${user.uid}`))
      .then((snapshot) => {
        const user = snapshot.val();
        console.log(user.firstName);
        profileName.textContent = `${user.firstName}'s Profile`;
        profileUserName.innerHTML = `${user.firstName} ${user.lastName}`;
        emailAddress.innerHTML = user.email;
        city.innerHTML = user.cityName;
        state.innerHTML = user.province;

        profileImg.src = user.profileImage;
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
    signOut(auth)
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

  const ref = dbRef(database);
  get(child(ref, `users/${uid}`))
    .then((snapshot) => {
      const user = snapshot.val();
      newImage.src = user.profileImage;
      firstName.value = user.firstName;
      lastName.value = user.lastName;
      cityName.value = user.cityName;
      province.value = user.province;
      console.log(user.cityName);
      console.log(user.province);
      //province.value =
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});

saveBtn.addEventListener("click", function () {
  console.log(lastName.value);
  console.log(province.value);
  console.log(cityName.value);
  console.log(firstName.value);
  console.log("click");

  // Update the user data in Firebase
  const updatedUserData = {
    firstName: firstName.value,
    lastName: lastName.value,
    cityName: cityName.value,
    province: province.value,
  };

  const userRef = dbRef(database, `users/${uid}`);

  update(userRef, updatedUserData)
    .then(() => {
      console.log("User data updated successfully!");

      profileSection.style.display = "flex";
      editButton.style.display = "flex";
      editProfile.style.display = "none";
      saveBtn.style.display = "none";
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
    });
  location.reload();
});

cancelBtn.addEventListener("click", function () {
  profileSection.style.display = "flex";
  editButton.style.display = "flex";
  editProfile.style.display = "none";
  saveBtn.style.display = "none";
});

// Uploading Profile Picture in Database and in the User node is completed
uploadBtn.addEventListener("click", () => {
  console.log("Upload clicked...");
  let picture = document.createElement("input");
  picture.type = "file";

  picture.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const storageReference = storageRef(
        storage,
        "profileImg/" + selectedFile.name
      );

      uploadBytes(storageReference, selectedFile)
        .then((snapshot) => {
          console.log("Image uploaded successfully!");
          getDownloadURL(snapshot.ref)
            .then((url) => {
              console.log(url);
              newImage.src = url;

              var userRef = dbRef(database, `users/${uid}/profileImage`);

              set(userRef, url)
                .then(() => {
                  console.log("Profile image URL updated in database");
                })
                .catch((error) => {
                  console.error("Error updating profile image URL:", error);
                });
            })
            .catch((error) => {
              console.error("Error getting download URL", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image", error);
        });
    } else {
      alert("Please select an image to upload.");
    }
  });
  picture.click();
});
