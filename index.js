const BASE_URL = "http://localhost:3000/Anime"

//make initial fetch function
function getAnime(){
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(animeData => animeData.forEach((anime) => {renderAnime(anime)}))
}

//make render function
function renderAnime(animeData){

    // console.log(animeData)
    const guide = document.getElementById('anime-container')
    const animeShow = document.createElement('div')

    //image
    const splashImage = document.createElement('img')
    splashImage.src = animeData.image
    splashImage.alt = animeData.name
    const title = document.createElement('h2')
    title.textContent = animeData.name

    animeShow.append(splashImage, title)
    guide.append(animeShow)

}



//Put at bottom,  DOMContentLoaded after HTML/CSS skeleton has been created and other JS functions work (Domcontentloaded acts like init() function)
document.addEventListener("DOMContentLoaded", function(){
getAnime()

})
