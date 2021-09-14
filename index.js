const BASE_URL = "http://localhost:3000/Anime"

//make initial fetch function
function getAnime(){
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(animeData => animeData.forEach(console.log("testtts")))
}
//      AnimeData => renderAnime(animeData)))
//     {console.log("testssss")}
// }

//make render function
function renderAnime(){

}



//Put at bottom,  DOMContentLoaded after HTML/CSS skeleton has been created and other JS functions work (Domcontentloaded acts like init() function)
document.addEventListener("DOMContentLoaded", function(){
getAnime()

})
