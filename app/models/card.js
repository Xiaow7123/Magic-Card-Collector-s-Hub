class Card {
    constructor({
        // id and identification 
        // links and resources 
        // card details 
        // physical and visual layout 
        // language and market details 
        // color attributes 
        id,name,type_line,oracle_text,image_uris,lang,layout,
        object, oracle_id, prints_search_uri, rulings_uri, scryfall_uri,
        uri, tcgplayer_id, tcgplayer_etched_id, color_identity, color_indicator,
        colors
    }) {
        this.id = id;
        this.name = name;
        this.type_line = type_line;
        this.oracle_text = oracle_text;
        this.image_uris = image_uris;
        this.lang = lang;
        this.layout = layout;
        this.object = object;
        this.oracle_id = oracle_id;
        this.prints_search_uri = prints_search_uri;
        this.rulings_uri = rulings_uri;
        this.scryfall_uri = scryfall_uri;
        this.uri = uri;
        this.tcgplayer_id = tcgplayer_id;
        this.tcgplayer_etched_id = tcgplayer_etched_id;
        this.color_identity = color_identity;
        this.color_indicator = color_indicator || [];
        this.colors = colors || [];
    }

    //retrieve the image URL by specified size, default to normal 
    getImage(size = 'normal') {
        return this.image_urls && this.image_uris[size] ? this.image_uris[size] : "No image available";
    }
}