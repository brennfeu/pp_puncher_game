class Artwork {
    constructor(_data, _id) {
        this.id = _id;

        this.name = _data.name;
        this.description = _data.description;
        this.artworkPath = _data.artworkPath;
        this.artist = _data.artist;
    }

    getDescription() {
        return this.name + "\n\n" + this.description + "\n\nArtist: " + this.artist;
    }

    getFullPath() {
        return "artworks/" + this.artworkPath;
    }
}

class ArtworkManager {
    static addArtwork(_area) {
        ArtworkManager.ARTWORK_LIST.push(_area);
    }
    static getArtwork(_name) {
        for (var i in ArtworkManager.ARTWORK_LIST) {
            if (ArtworkManager.ARTWORK_LIST[i].name == _name) {
                return ArtworkManager.ARTWORK_LIST[i];
            }
        }
        return null;
    }

    static loadList(_list) {
        for (var i in _list) {
            ArtworkManager.addArtwork(new Artwork(_list[i], i));
        }
    }
}
ArtworkManager.ARTWORK_LIST = [];
