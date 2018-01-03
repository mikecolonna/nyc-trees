let trees

/*Sends a request to the API and stores the resulting JSON in the global
variable trees.  Then calls getSpeciesNames
*/
async function getTrees() {
    try {
        let response = await fetch("https://data.cityofnewyork.us/resource/5rq2-4hqu.json")
        trees = await response.json()
        console.log(trees)
        getSpeciesNames()
    } catch (error) {
        console.log(error)
    }
}

/*Creates a set of all the species of trees represented in the JSON data.
Sets the options for the species dropdown menu.  Returns the set.
*/
function getSpeciesNames() {
    let names = trees.map((tree) => {
        return tree.spc_latin
    })
    var namesNoDuplicates = new Set(names)

    var speciesDropdown = document.getElementById("species");
    namesNoDuplicates.forEach((species) =>{
      var newSpecies = document.createElement("option");
      newSpecies.text = species;
      speciesDropdown.add(newSpecies);
    })

    return namesNoDuplicates
}

/*Takes the initial JSON data from the API and returns JSON data containing
only trees that fit the criteria the user chose in the dropdown menus.
*/
function parseTrees(trees, borough, species) {
  console.log("in parse trees, borough:" + borough)
  let result = trees.filter(tree => tree.boroname == borough && tree.spc_latin == species)
  console.log(result)
  return result
}

/*Displays the trees represented in the JSON data given as its parameter to the
DOM.  Creates the More Info buttons and adds their event listeners
*/
function renderTrees(trees) {
    const treesdiv = document.getElementById('trees')
    let boroughAnswer = document.getElementById('borough').value
    let speciesAnswer = document.getElementById('species').value
    treesdiv.innerHTML = "<p>There are " + trees.length + " " + speciesAnswer + " trees in " + boroughAnswer + "</p>"
    let opentag = "<div>"
    let endtag = "</div><br>"
    trees.forEach(function(tree) {
        let treeid = "<span>(" + tree.tree_id + ")</span> "
        let boroheader = "<span>" + tree.boroname + ", " + tree.zip_city + ", " + tree.zipcode + "</span><br>"
        let species = "<span><i>" + tree.spc_latin + "</i></span> "
        let common = "<span>" + tree.spc_common + "</span> "
        let linebreak = "<br>"
        let status = "<span>Status: " + tree.status + " Health: " + tree.health + "</span>"
        let moreinfodiv = "<div style=\"display:none\" id=\"div" + tree.tree_id + "\">" + status + "</div>"
        let moreinfo = "<button class=\"button\" id=\"" + tree.tree_id + "\">More info</button>"
        treesdiv.innerHTML += opentag + treeid + boroheader + species + common
                            + moreinfo + moreinfodiv + linebreak + endtag
    })

    //adding the event listeners to each button
    let buttons = Array.from(document.getElementsByClassName('button'))
    buttons.forEach(function(button) {
        let id = button.id
        let infodiv = document.getElementById("div" + id)
        button.addEventListener('click', () => {
            if (infodiv.style.display === "none") {
                infodiv.style.display = "block"
            } else {
                infodiv.style.display = "none"
            }
        })
    })
}

/*Adds a submit event listener to the form that calls parseTrees and
renderTrees
*/
const form = document.getElementById('form')
form.onsubmit = (e) => {
    e.preventDefault()
    let boroughAnswer = document.getElementById('borough').value
    let speciesAnswer = document.getElementById('species').value
    renderTrees(parseTrees(trees, boroughAnswer, speciesAnswer))
}

/*Specifies the onload event listener for the window to display a greeting
for 5 seconds and calls getTrees
*/
window.onload = () => {
    const greeting = document.getElementById("greeting")
    greeting.innerHTML = "WELCOME!!!!"
    setTimeout(() => {
        greeting.innerHTML = ""
    }, 5000)

    //const list = document.getElementById("trees")

    getTrees()
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
