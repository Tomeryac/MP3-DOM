/** 
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    while (document.getElementById("main").firstChild) {
        document.getElementById("main").removeChild(document.getElementById("main").lastChild);
      }
    let r = document.createElement("div");
    let songPlayed;
    player.songs.forEach(song => {
        if(song.id == songId)
            songPlayed = song;
    });
    const children = [{
        content:"PLAYING",
        type:'h1'
    },{
        content:songPlayed.title,
        type:'p' 
    },{
        content:songPlayed.album,
        type:'p'
    },{
        content:songPlayed.artist,
        type:'p'
    },{
        content:calculateDuration(songPlayed.duration),
        type:'p'
    },{
        
        content:songPlayed.coverArt,
        type:'img'
    }]
    children.forEach(child => {
        t = document.createElement(child.type);
        if(child.type == 'img'){
            t.setAttribute("src", child.content);
            
            t.setAttribute("width", "100%");

            t.setAttribute("height", "100%");
        }
        t.textContent = child.content;
        r.appendChild(t);
    });
    r.classList.add("card");
    r.classList.add('w-50');
    document.getElementById("main").appendChild(r);

    setTimeout(function () {
        for (let i = 0; i < player.songs.length; i++) {
            const element = player.songs[i];
            
            if (element.id == songId) {
                if (i == player.songs.length-1){
                    playSong(player.songs[0].id);
                }
                else{
                playSong(player.songs[i + 1].id); 
                }
          
            }
        }
        
    },songPlayed.duration*1000)
    
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    while (document.getElementById("songs").firstChild) {
        document.getElementById("songs").removeChild(document.getElementById("songs").lastChild);
      }
    for (let i = 0; i < player.songs.length; i++) {
        const obj = player.songs[i];
      
        if (obj.id== songId) {
          player.songs.splice(i, 1);
        }
    }
        while (document.getElementById("playlists").firstChild) {
            document.getElementById("playlists").removeChild(document.getElementById("playlists").lastChild);
    }
for (let j = 0; j < player.playlists.length; j++) {
    const playlist = player.playlists[j];
    for (let i = 0; i < playlist.songs.length; i++) {
            let song = playlist.songs[i];
        if (song == songId)
            playlist.songs.splice(i,1);
    }
    };
        generateSongs();
        generatePlaylists();
}




/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
  let id =  uniqueId();
  let newSong = {
      id:id,
      title:title,
      album:album,
      artist:artist,
      duration:duration,
      coverArt:coverArt
  }; 
    player.songs.push(newSong);
createSongElement(newSong);
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
 function uniqueId(){
    let id =1;
    player.songs.forEach(song => {
      if (song.id>id) {
        id = song.id;
    
      }
    
    });
    return id+1;
}
function handleSongClickEvent(event) {

    if (event.target.textContent == "play") {
        playSong(event.target.classList.item(0));
    }
    else{
        removeSong(event.target.classList.item(0));
    }    
    }

        
    


/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
   
  
    addSong( {
        title:document.getElementsByName("title")[0].value ,
        album:document.getElementsByName("album")[0].value,
        artist:document.getElementsByName("artist")[0].value,
        duration:document.getElementsByName("duration")[0].value,
        coverArt:document.getElementsByName("cover-art")[0].value
    });
    
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [{
        content:coverArt,
        type:'img',
        class:'card-img-top'
    },{
        content:title,
        type:'h5',
        class:'card-title'
    },{
        content:album,
        type:'p',
        class:'card-text'
    },{
        content:artist,
        type:'p',       
         class:'card-text'
    },{
        content:duration,
        type:'p',
        class:'card-text'
    },{
        content: "play",
        context:id ,
        type:'button',
        class:"btn btn-primary m-3"
    },
    {
        content: "remove",
        context:id,
        type:'button',
        class:"btn btn-primary m-3"
        
    }]
    const classes = ['card', 'w-50', 'm-3', 'song'];
    const attrs = {};
    const eventListeners = {click:handleSongClickEvent};
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [{
        content:name,
        type:'p'
    },{
        content:songs.length,
        type:'p'
    },{
        content:calculateDuration(playlistDuration(id)),
        type:'p'
    }];
    const classes = ['card', 'w-50', 'playlist'];
    const attrs = {};
    const eventListeners = {};
    return createElement("div", children, classes, attrs, eventListeners);
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    let mainDiv = document.createElement(tagName);
    let contentDiv = document.createElement('div');
    contentDiv.classList.add('card-body');
    children.forEach(child => {
        t = document.createElement(child.type);
        if(child.type == 'img'){
            t.setAttribute("src", child.content);

            // t.setAttribute("width", "100%");

            // t.setAttribute("height", "100%");
            
            t.classList.add(child.class);
            
            mainDiv.appendChild(t);
        }else if(child.type == 'button'){  
            
            t.textContent = child.content;

            t.classList.add(child.context);
            

            classArr = child.class.split(" ");
            classArr.forEach(cls => {
                t.classList.add(cls);
            });

            t.addEventListener("click",eventListeners["click"]);

        }
        else{
            t.textContent = child.content;
            t.classList.add(child.class);
        }
        if(child.type != 'img'){
            contentDiv.appendChild(t);
        
        }
        mainDiv.appendChild(contentDiv);

    });
    classes.forEach(cls => {
        mainDiv.classList.add(cls);
    });
    
    for(const property in attributes){
        mainDiv.setAttribute(property, attributes[property]);
    }
    classes.forEach(cls => {
        if(cls == "song")
            document.getElementById("songs").appendChild(mainDiv);
        if(cls == "playlist")
            document.getElementById("playlists").appendChild(mainDiv);
    });
    
}
function playlistDuration(id) {
    let arr = getPlaylistAndSongIndex(id, 1);
    let index = arr[0];
    let sum = 0;
    player.songs.forEach(song => {
      player.playlists[index].songs.forEach(songID => {
        if(song.id == songID){
          sum += song.duration;
        }
      });
    });
    return sum;
  }
//a function that converts duration in sec to mm:ss format.
function calculateDuration(duration){
  
    mmDuration = Math.floor(duration / 60);
    if(mmDuration < 10)
      mmDuration = "0" + mmDuration;
    
    ssDuration = duration - mmDuration * 60;
    if(ssDuration < 10)
        ssDuration = "0" + ssDuration;
    return mmDuration+":"+ssDuration;
}
function getPlaylistAndSongIndex(playlistID, songID){
    let indexOfSong = -1;
    let indexOfPlaylist = -1;
    for (let i = 0; i < player.playlists.length; i++) {
      const playlist = player.playlists[i];
      if(playlist.id == playlistID){
        indexOfPlaylist = i;
        for (let j = 0; j < playlist.songs.length; j++) {
          const song = playlist.songs[j];
          if(song == songID){
            indexOfSong = j;
          }
        }
      }
    }
    if(indexOfPlaylist == -1){
      throw "playlist index does not exisst";
    }
    return [indexOfPlaylist,indexOfSong];
}
/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    songs = player.songs;
    songs.sort(function(a, b){
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
    })
    songs.forEach(song => {
        createSongElement(song);
    });
}   

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    playlists = player.playlists;
    playlists.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    playlists.forEach(playlist => {
        createPlaylistElement(playlist);
    });
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)