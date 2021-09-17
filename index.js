const BASE_URL = "http://localhost:3000/Anime"
let i = 1;

const stars = document.getElementById('starRating')
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
// create image
    const splashImage = document.createElement('img')
    splashImage.src = animeData.image
    splashImage.alt = animeData.name
    const title = document.createElement('h3')
    title.textContent = animeData.name

    animeShow.append(splashImage, title)
    guide.append(animeShow)
//add click event listener
    animeShow.addEventListener('click', function (){moreDetails(animeData)})
}
function moreDetails(animeData) {
    const title = document.getElementById('title')
    title.innerText = animeData.name

    const detGenre = document.getElementById('genre')
    detGenre.innerText = `Genre: ${animeData.genre}`

    const episodes = document.getElementById('episodes')
    episodes.innerText = `Episodes: ${animeData.episodes}`

    const detRelease = document.getElementById('release-date')
    detRelease.innerText = `Anime Release Date: ${animeData.releaseDate}`

    const description = document.getElementById('description')
    description.innerText = animeData.description

    //Use showRating function to update ratings output
    const currentRating = document.getElementById('rating')
    currentRating.innerText = `Rating: ${showRating(animeData.ratings)} Stars`

    //.myParam used to set custom attribute to the stars HTML node with 'starRating id' and then assign to animeData object
    stars.myParam = animeData
    const enableButton = document.getElementById("disabled")
    enableButton.disabled = false

    const whichShow = document.getElementById('whichShow')
    whichShow.textContent = `What would you like to rate ${animeData.name}?`
    //foreach for to iterate through each character
    animeData.characters.forEach(character =>renderCharacters(character))
}
//To show character images when click event is fired
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

//Add form event listener for rating system; which is called on form submission (initialized under DOMContentLoaded event at bottom)
    function submitRating(event){
        event.preventDefault()  
        
        //assign anime variable to the attribute tied to form event target
        let anime = event.target.myParam

        
        //increment a rating by 1 depending on user input
        let result = +event.target.star1.value
        if(result === 1){anime.ratings.one += 1} 
        if(result === 2){anime.ratings.two += 1}
        if(result === 3){anime.ratings.three += 1}
        if(result === 4){anime.ratings.four += 1}
        if(result === 5){anime.ratings.five += 1} 
      

        //send updated ratings to server to update  & persist via patch fetch request
        fetch(`${BASE_URL}/${anime.id}`, {method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ratings: anime.ratings}),
            })
            .then(resp => resp.json())
            .then(console.log("test"))

        console.log(anime)
        console.log(anime.ratings)
        moreDetails(anime)
        }  
          
//Function to return formatted average ratings
function showRating(ratings) {
 let oneStars = +ratings.one 
 let twoStars = +ratings.two *2
 let threeStars = +ratings.three*3
 let fourStars = +ratings.four*4
 let fiveStars = +ratings.five*5

 let totalRatings = +ratings.one + +ratings.two + +ratings.three + +ratings.four + +ratings.five

 let averageRating = ((oneStars + twoStars + threeStars + fourStars + fiveStars)/totalRatings)
 let averageRatingFormatted = averageRating.toFixed(2)
 return averageRatingFormatted
}

//Put at bottom,  DOMContentLoaded after HTML/CSS skeleton has been created and other JS functions work (Domcontentloaded acts like init() function)
document.addEventListener("DOMContentLoaded", function(){
    getAnime()
    
    stars.addEventListener('submit', (event) => submitRating(event))

})