// DOM elements
const aboutList = document.querySelector(".about");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
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
      <div class="pink-text">${user.admin ? "Admin" : ""}</div>
    `;
            });

        // toggle UI elements
        loggedInLinks.forEach((item) => (item.style.display = "block"));
        loggedOutLinks.forEach((item) => (item.style.display = "none"));
    } else {
        // hide account info

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
            const id = doc.id;
            const about = doc.data();
            // const t = firebase.firestore.Timestamp.fromDate(new Date());
            // const d = t.toDate();
            const li = `
            
            <div class="col s12 m6">
                 <div class="card">
                     <div class="card-content">
                     <i class="material-icons right delete" onclick=deleteid(${id})>clear</i>
                        <span class="card-title">${about.title}</span>
                         <p>${about.content}</p>
                     </div>
                    <div class="thumb red-text" >
                    <p>Created by ${about.name}</p>
                    </div>
                </div>
            </div>
            
      `;
            html += li;
        });
        aboutList.innerHTML = html;
    } else {
        aboutList.innerHTML = `<h5 class="center-align" style="margin: 60px auto; ">Welcome to Infogram</h5>
        
        <div class="" style="margin: 60px auto; max-width: 600px;">
        <div class="card">
            <div class="card-content">
            
               <span class="card-title">Sample Card</span>
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            </div>
           <div class="card-action red-text">
                <i class="material-icons">thumb_up</i>
                <i class="material-icons">thumb_down</i>
           </div>
       </div>
   </div>
        
   <h5 class="center-align" style="margin: 60px auto; ">Sign up to see kn !</h5>
        
        `;
    }
};
// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
});

function deleteid(id) {
    db.collection("about").doc(`${id}`).delete();
}

function Search() {
    // User Input
    let input = document.getElementById("searchText");

    // Filter, makes search not case sensitive
    let filter = input.value.toUpperCase();

    // Individual item on list
    let card = document.getElementsByClassName("card");

    // Treats lists items like an array, where each item can be accessed through it's index
    for (i = 0; i < card.length; i++) {
        let item = card[i];

        // Iterate over each list item to see if the value of the input, ignoring case, matches the inner text or inner html of the item.
        let txtValue = item.textContent || item.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            // Displays list items that are a match, and nothing if no match
            card[i].style.display = "";
        } else {
            card[i].style.display = "none";
        }
    }
}
