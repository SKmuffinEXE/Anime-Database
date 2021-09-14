const BASE_URL = "http://localhost:3000/Anime"
let i = 1;


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
    
    
    //make image tag, link to key, append to container
    if(charDiv.dataset.number != i){
        const charDiv = document.createElement('div')
        charDiv.setAttribute('data-number', i)
    
        const charImg = document.createElement('img')
        charImg.src = character.image
    
        const charName = document.createElement('p')
        charName.innerText = character.name
        
        charDiv.append(charImg, charName)
    }

    //reference code
    // const charDiv = document.createElement('div')
    // charDiv.setAttribute('data-number', i)

    // const charImg = document.createElement('img')
    // charImg.src = character.image

    // const charName = document.createElement('p')
    // charName.innerText = character.name
    
    // charDiv.append(charImg, charName)

    // console.log(charDiv.dataset.number)

    // let i = 0

    // console.log(i)
    ++i
    if (i > 3) {
        i = 1
    }
    // console.log(`after plus:${i}`)
    //console.log(characters[0])
    // if(i<4){
    //     console.log(i)
    //     container.append(charImg, charName)
    // }

    container.append(charDiv)

    //characters are appended several times

}

//Put at bottom,  DOMContentLoaded after HTML/CSS skeleton has been created and other JS functions work (Domcontentloaded acts like init() function)
document.addEventListener("DOMContentLoaded", function(){
getAnime()

})
