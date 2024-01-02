console.log("Let's write some JavaScript");
let currentSong = new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
    }
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingSeconds).padStart(2,'0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/Songs/");
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs=[];
    for( let index = 0 ; index < as.length ; index++)
    {
        const element = as[index];
        if(element.href.endsWith(".mp3"))
        {
            songs.push(element.href.split("/Songs/"[1]))
        }
    }
   return songs ;
}


const playMusic = (track, pause=false) =>{
    // let audio = new Audio("/Songs/" + track)

    currentSong.src = "/Songs/" + track + ".mp3" ;
    // if(!pause){
    //     currentSong.play();
    //     play.src = "filledpause.svg" ;
    // }
    currentSong.play();
        play.src = "filledpause.svg" ;
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function main(){

  
    // Get the list of Songs
    let songs = await getSongs();
    // playMusic(songs[0],true)

    //Attach an event listener to each songs
    Array.from(document.querySelector(".SongList").getElementsByTagName("li")).forEach(e =>{
        e.addEventListener("click", element =>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })


    //Arrach Event listener to play, next and previous
    play.addEventListener("click", () =>{
        if(currentSong.paused){
            currentSong.play();
            play.src = "filledpause.svg";
        }
        else{
            currentSong.pause();
            play.src = "playsong.svg";
        }
    })

    //Time Updation
    currentSong.addEventListener("timeupdate" , ()=>{
        // console.log(currentSong.currentTime , currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;

        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })


    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", (e)=>{
        let percent = e.offsetX / e.target.getBoundingClientRect().width * 100;
        document.querySelector(".circle").style.left = percent + "%" ;
        currentSong.currentTime = currentSong.duration * percent / 100 ;
    })


}
main();
