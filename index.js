const command = process.argv[2];
const params = process.argv.slice(3);
// const params = {
//     "id" : 1,
//     "name" : "Paint my love",
//     "duration" : 180,
//     "genre" : "Pop"
// }
const PlaylistController = require ('./controllers/PlaylistController')

switch (command) {
    case 'add':  
        PlaylistController.add(params)
        break;
    case 'remove':
        PlaylistController.remove(params)
        break;
    case 'make':
        PlaylistController.make(params)
        break;
    case 'showPlaylist':
        PlaylistController.show()
        break;
    default :
        console.log("sek bener mas commandne");
        break;
}

// Node js : modul utama dan 3rd party modul.
