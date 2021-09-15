const BASE_URL = "http://localhost:3000/Anime"
let i = 1;

const stars = document.getElementById('starRating')

let singlePass = false
// let testObj = {"five" : 2, "four": 1, "three": 3,"two": 1,"one": 3}

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
    // stars.addEventListener('submit', (event) => submitRating(animeData, event))
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

    //rating system
    const currentRating = document.getElementById('rating')
    currentRating.innerText = `Rating: ${showRating(animeData.ratings)} Stars`



    //boolean in global scope, set to false, when dom loads, it's automatically false
    //if false, add event listner, and set boolean true
    stars.myParam = animeData
    const enableButton = document.getElementById("disabled")
    enableButton.disabled = false

    const whichShow = document.getElementById('whichShow')
    whichShow.textContent = `What would you like to rate ${animeData.name}?`
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

// let stars = document.getElementById('starRating')
// stars.addEventListener('submit', () => showRating())


    function submitRating(event){
        event.preventDefault()  
       // console.log(animeData.ratings)

        //update information
        // let ratings = animeData.ratings
        let anime = event.target.myParam

        //let ratings be the object containing the shows ratings
        //increment a rating by 1 depending on user input
        let result = +event.target.star1.value
        if(result === 1){anime.ratings.one += 1} 
        if(result === 2){anime.ratings.two += 1}
        if(result === 3){anime.ratings.three += 1}
        if(result === 4){anime.ratings.four += 1}
        if(result === 5){anime.ratings.five += 1} 
        // console.log(event.target.myParam)

        //console.log(animeData.ratings)
        // debugger

        //send information to server
        fetch(`${BASE_URL}/${anime.id}`, {method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ratings: anime.ratings}),
            })
            .then(resp => resp.json())
            .then()

        // //update DOM again here
        // console.log(animeData)
        console.log(anime.ratings)
        moreDetails(anime)
        }  
          

function showRating(ratings) {
 let oneStars =  +ratings.one 
 let twoStars = +ratings.two *2
 let threeStars = +ratings.three*3
 let fourStars = +ratings.four*4
 let fiveStars = +ratings.five*5

 let totalRatings = +ratings.one + +ratings.two + +ratings.three + +ratings.four + +ratings.five

 let averageRating = ((oneStars + twoStars + threeStars + fourStars + fiveStars)/totalRatings)
 let averageRatingFormated = averageRating.toFixed(2)
 return averageRatingFormated
}

//Put at bottom,  DOMContentLoaded after HTML/CSS skeleton has been created and other JS functions work (Domcontentloaded acts like init() function)
document.addEventListener("DOMContentLoaded", function(){
    //temp!!!!!
    // showRating(testObj)
    getAnime()
    stars.addEventListener('submit', (event) => submitRating(event))
    
})