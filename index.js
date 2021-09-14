const BASE_URL = "http://localhost:3000/Anime"
let i = 1;

let testObj = {"five" : 2, "four": 1, "three": 3,"two": 1,"one": 3}

//make initial fetch function
function getAnime(){
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(animeData => animeData.forEach((anime) => {renderAnime(anime)}))
}
//make render function
function renderAnime(animeData){
    const guide = document.getElementById('anime-container')
    const animeShow = document.createElement('div')
//image
    const splashImage = document.createElement('img')
    splashImage.src = animeData.image
    splashImage.alt = animeData.name
    const title = document.createElement('h3')
    title.textContent = animeData.name

    animeShow.append(splashImage, title)
    guide.append(animeShow)
//add click event listener
//function () { moreDetails(animeData)} is a reference that is invoked only when click event occurs
    animeShow.addEventListener('click', function (){moreDetails(animeData)})
}

function moreDetails(animeData) {
    const title = document.getElementById('title')
    title.innerText = animeData.name

    //commented out for the current state of code
    // const img = document.getElementById('splash')
    // img.src = animeData.image
    const detGenre = document.getElementById('genre')
    detGenre.innerText = `Genre: ${animeData.genre}`

    const episodes = document.getElementById('episodes')
    episodes.innerText = `Episodes: ${animeData.episodes}`

    const detRelease = document.getElementById('release-date')
    detRelease.innerText = animeData.releaseDate

    const description = document.getElementById('description')
    description.innerText = animeData.description

    //foreach for to iterate through each character
    animeData.characters.forEach(character =>renderCharacters(character))

}

function renderCharacters(character){
    const container = document.getElementById("characters")
    const charName = document.getElementById(`name${i}`)
    const charImg = document.getElementById(`img${i}`)

    charName.textContent = character.name
    charImg.src = character.image
    ++i
    if (i > 3) {
        i = 1
    }

}

//Add event listener for rating system
document.getElementById('starRating').addEventListener('submit', function() {showRating(animeData)})

function showRating(ratings, event) {
 event.preventDefault()
 let oneStars =  +ratings.one 
 let twoStars = +ratings.two *2
 let threeStars = +ratings.three*3
 let fourStars = +ratings.four*4
 let fiveStars = +ratings.five*5

 let totalRatings = +ratings.one + +ratings.two + +ratings.three + +ratings.four + +ratings.five

 let averageRating = (oneStars + twoStars + threeStars + fourStars + fiveStars)/totalRatings
 return averageRating
}


//Put at bottom,  DOMContentLoaded after HTML/CSS skeleton has been created and other JS functions work (Domcontentloaded acts like init() function)
document.addEventListener("DOMContentLoaded", function(){

    //temp!!!!!
    showRating(testObj)
    getAnime()

})
