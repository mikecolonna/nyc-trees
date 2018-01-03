let trees

async function getTrees() {
    try {
        let response = await fetch("https://data.cityofnewyork.us/resource/5rq2-4hqu.json")
        trees = await response.json()
        console.log(trees)
    } catch (error) {
        console.log(error)
    }
}

function getSpeciesNames(trees) {
    let names = trees.map((tree) => {
        return tree.spc_latin
    })
    return new Set(names)
}

function parseTrees(trees, borough) {
  /* this works but looks bad
  for (i = 0; i < 1000; i++){
    let currentTree = trees[i]
    if (!(currentTree.boroname == borough)){
      delete result[i]
    }
  }*/
  let result = trees.filter(tree => tree.boroname == borough)
  console.log(result)
  return result
}

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
    let boroughAnswer = document.getElementById('borough').value
    renderTrees(parseTrees(trees, boroughAnswer))
}

window.onload = () => {
    const greeting = document.getElementById("greeting")
    greeting.innerHTML = "WELCOME!!!!"
    setTimeout(() => {
        greeting.innerHTML = ""
    }, 5000)

    const list = document.getElementById("trees")

    getTrees()
}
