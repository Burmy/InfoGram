// DOM elements
const aboutList = document.querySelector(".about");

// setup about
const setupAbout = (data) => {
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
