/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */

 sort();
for (let i = 0; i < player.songs.length; i++) 
{
    const element = player.songs[i];
    let div = createSongElement(element);
    div.style.border = "thick solid #0000FF";
    document.getElementById("songs").appendChild(div);
}
for (let i = 0; i < player.playlists.length; i++) {
    const element = player.playlists[i];
    let div = createPlaylistElement(element);
    div.style.border = "thick solid #0000FF";
    document.getElementById("playlists").appendChild(div);   
}
function sort(){
    player.songs.sort(function (a, b) {
        if (a.title < b.title){
        return -1; }
        else if (a.title > b.title){
        return 1; }
        return 0;
    });
}
function playS(song)
{
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${convertDuration(song.duration)}.`);
}
function playSong(songId) {
    var wantedSong = player.songs.find(res => res.id == songId); //finds the song with the ID
    if(wantedSong===null){
      throw new Error("ID not found"); //if id not exist, throw error
    }
    playS(wantedSong);
    clear();
    document.getElementById(songId).style.backgroundColor = 'red';
}
function clear()
{
    for (let i = 1; i <= player.songs.length; i++) 
    {
        document.getElementById(i).style.backgroundColor = 'white';
    }
}
/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {

    const children = [ title, album , artist , duration , coverArt];
    const classes = []
    const attrs = { onclick: `playSong(${id})`}
    return createElement("div", children, classes, attrs,id)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [name , songs.length  ,"mintues : " + totaldurtion(songs)%60];
    const classes = []
    const attrs = {}
    return createElement1("div", children, classes, attrs,id)
}
function totaldurtion(songs =  [])
{
    let sum = 0 ;
    for (let i = 0; i < songs.length; i++) {
        const element = songs[i];
        var wantedSong = player.songs.find(res => res.id == element);
        sum += wantedSong.duration;
    }
    return sum;
}
/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
 function createElement1(tagName, children = [], classes = [], attributes = {},id) {
    let tag = document.createElement(tagName);
    for (let i = 0; i < children.length; i++) {
        const element = children[i];
        let p  = document.createElement("p");
        p.innerHTML = children[i];
        tag.appendChild(p);
    }
    classes.forEach(element => {
        tag.classlist.add(element);
    });

    for (const att in attributes) {
        tag.setAttribute(att, attributes[att]);   
    }

    return tag;

 }
function createElement(tagName, children = [], classes = [], attributes = {},id) {
    let tag = document.createElement(tagName);
    tag.setAttribute("id",id);
    for (let i = 0; i < children.length; i++) 
    {
        if(i+1 == children.length)
        {
            let img  = document.createElement("img");
            img.setAttribute("src" , children[i]);
            tag.appendChild(img);
        }
        else
            {
                let p  = document.createElement("p");
                if(typeof children[i] === 'string')
                    p.innerHTML = children[i];
                else
                    p.innerHTML = convertDuration(children[i]);
                tag.appendChild(p);
                    
            }

        
    }
    classes.forEach(element => {
        tag.classlist.add(element);
    });

    for (const att in attributes) {
        tag.setAttribute(att, attributes[att]);   
    }

    return tag;

}
function convertDuration(duration)
    {
      let minutes=Math.floor(duration/60);
      let seconds=duration%60;
      if(minutes<10)
        minutes="0"+minutes;
      if(seconds<10)
        seconds="0"+seconds;
      return minutes+":"+seconds;
    }

// You can write more code below this line
