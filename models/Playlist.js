const fs = require ('fs');
const {Pop, Rock} = require ('./Song');

class Playlist{
    constructor (id, name, songs){
        this.id = id;
        this.name = name;
        this.song = songs || [];
    }
    static getPlaylist(){
        let data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
        let playlists = data.map(playlist => {
            let {id, name, song} = playlist;
            song = song.map(song => {
                let {id, name, duration, genre} = song;
                if (genre === 'Pop'){
                    return new Pop (id, name, duration);
                } else if (genre === 'Rock'){
                    return new Rock (id, name, duration);
                }
            })
            return new Playlist (id, name, song)
        })
        return playlists;
        // return data;
    }
    static add (params) {
        let playlists = this.getPlaylist();
        const [name, genre, duration, playlistName] = params;


        playlists.forEach(playlist =>{
            if(playlist.name === playlistName){
                let id; 
                if(playlist.song.length === 0){
                    id = 1;
                } else {
                    id = playlist.song[playlist.song.length - 1].id +1;
                }
                if (genre === 'Pop'){
                    playlist.song.push( new Pop (id, name, +duration))
                } else if (genre === 'Rock'){
                    playlist.song.push( new Rock (id, name, +duration))
                }
            }
        })
        // console.log (playlist[0].songs);
        this.save(playlists);
        console.log(`${name} has been added tp ${playlistName}.`);
        // console.log (params);
 
    }
    static show (){
        let data = this.getPlaylist(); // Panggil metode getPlaylist dengan tanda kurung ()
        console.log(data);
    }
    static remove(params){
        let playlists = this.getPlaylist();
        const [songName,playlistName] = params;

        playlists = playlists.map(playlist => {
            if (playlist.name = playlistName){
                playlist.song = playlist.song.filter(song => song.name !==songName )
                return playlist
            } else {
                return playlist
            }
        })
        this.save(playlists);
        console.log (`${songName} has been removed  drom ${playlistName}.`);
    }
    static make (params){
        let playlists = this.getPlaylist();
        let id = playlists[playlists.length - 1].id +1;
        let [name] = params;
        playlists.push (new Playlist(id, name)) 

        this.save(playlists);   
        console.log (`playlist ${name} has been created.`);
    }
    static save(data){  
        fs.writeFileSync(`./data.json`, JSON.stringify(data, null,3));
    }
    
}



module.exports = Playlist;