// DOM elements
const aboutList = document.querySelector(".about");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");
const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            adminItems.forEach((item) => (item.style.display = "block"));
        }
        // account info
        db.collection("user")
            .doc(user.uid)
            .get()
            .then((doc) => {
                const html = `
      <div>Logged in as ${user.email}</div>
      <div>${doc.data().bio}</div>
      <div class="pink-text">${user.admin ? "Admin" : ""}</div>
    `;
                accountDetails.innerHTML = html;
            });

        // toggle UI elements
        loggedInLinks.forEach((item) => (item.style.display = "block"));
        loggedOutLinks.forEach((item) => (item.style.display = "none"));
    } else {
        // hide account info
        accountDetails.innerHTML = "";
        // toggle UI elements
        adminItems.forEach((item) => (item.style.display = "none"));
        loggedInLinks.forEach((item) => (item.style.display = "none"));
        loggedOutLinks.forEach((item) => (item.style.display = "block"));
    }
};

// setup about
const setupAbout = (data) => {
    if (data.length) {
        let html = "";
        data.forEach((doc) => {
            const about = doc.data();
            const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${about.name} </div>
          <div class="collapsible-body white"> ${about.email}, ${about.phone}, ${about.city}</div>
        </li>
      `;
            html += li;
        });
        aboutList.innerHTML = html;
    } else {
        aboutList.innerHTML = '<h5 class="center-align">Login to view Info</h5>';
    }
};

// const setupAbout = (data) => {
//     if (data.length) {
//         let html = "";
//         data.forEach((doc) => {
//             const about = doc.data();
//             const li = `
//             <li>
//             <div class="collapsible-header grey lighten-4"> ${about.name} </div>
//             <div class="collapsible-body white"> ${about.email}, ${about.phone}, ${about.city}</div>
//           </li>
//         `;
//             html += li;
//         });
//         aboutList.innerHTML = html;
//     } else {
//         aboutList.innerHTML = '<h5 class="center-align">Login to view about me Cards</h5>';
//     }
// };

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
});
