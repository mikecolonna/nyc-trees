
async function getTrees() {
    try {
        let response = await fetch("https://data.cityofnewyork.us/resource/5rq2-4hqu.json")
        let trees = await response.json()
        renderTrees(trees)
        console.log(trees)
    } catch (error) {
        console.log(error)
    }
}

<<<<<<< HEAD
function parseTrees(trees, parameters) {
    
}

function renderTrees(trees) {
=======
>>>>>>> b47e72cfe39223a0fae23cca64e2019a5968a3ce

function renderTrees(trees) {
    const treesdiv = document.getElementById('trees')
    let opentag = "<div>"
    let endtag = "</div>"
    trees.forEach(function(tree) {
        let treeid = "<span>(" + tree.tree_id + ")</span> "
        let boroheader = "<span>" + tree.boroname + ", " + tree.zip_city + ", " + tree.zipcode + "</span><br>"
        let species = "<span><i>" + tree.spc_latin + "</i></span> "
        let common = "<span>" + tree.spc_common + "</span> "
        let status = "<span>Status: " + tree.status + " Health: " + tree.health + "</span> "
        let linebreak = "<br>"
        treesdiv.innerHTML += opentag + treeid + boroheader + species + common + status + linebreak + endtag
    })
}

//const submit = document.getElementById('submit')
const form = document.getElementById('form')
form.onsubmit = (e) => {
    e.preventDefault()
    getTrees()
}

window.onload = () => {
    const greeting = document.getElementById("greeting")
    greeting.innerHTML = "WELCOME!!!!"
    setTimeout(() => {
        greeting.innerHTML = ""
    }, 5000)

    const list = document.getElementById("trees")

}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
