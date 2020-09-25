export default class gotService { 

    _apiBase = 'https://www.anapioficeandfire.com/api';
    
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error (`could not fetch ${url}, status : ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
       const  res =  await this.getResource('/characters?page=5&pageSize=5');
            return res.map(this._transformCharacter);
    }

    getCharacter = async (id) =>{
        const character = await this.getResource(`/characters/${id}`);
            return this._transformCharacter(character);        
    }

    getAllBooks = async () =>{
        const res = await this.getResource('/books?page=1&pageSize=5');
        return res.map(this._transformBook);

    }

    getBook = async (id) =>{
        const book =  await this.getResource(`/books/${id}`);
        return this._transformBook(book);     
    }
        
    getAllHouses = async () => {
        const res = await this.getResource('/houses?page=1&pageSize=5');
        return res.map(this._transformHouse);
    }

    getHouse = async (id) =>{
        const house = await this.getResource(`/houses/${id}`);
            return this._transformHouse(house);    
    }
    

    isSet = (data) => {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name : this.isSet(char.name),
            gender : this.isSet(char.gender),
            born : this.isSet(char.born),
            died : this.isSet(char.died),
            culture : this.isSet(char.culture)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name : this.isSet(house.name),
            region : this.isSet(house.region),
            words : this.isSet(house.words),
            titles : this.isSet(house.titles),
            overlord : this.isSet(house.overlord),
            ancestralWeapons : this.isSet(house.ancestralWeapons)
        }
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name : this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher : this.isSet(book.publisher),
            realeased : this.isSet(book.realeased)
        }
    }
}

// const got = new gotService();

// console.log(got.getCharacter(130));

// got.getAllCharacters()
//     .then(res=>console.log(res));

// got.getCharacter(130)
//     .then(res=>console.log(res));

// got.getAllBooks()
//     .then(res=>(res.forEach(item=>console.log(item.name))));

// got.getBooks(10)
//     .then(res=>console.log(res));

// got.getAllHouses()
//     .then(res=>(res.forEach(item=>console.log(item.name))));

// got.getHouse(10)
//     .then(res=>console.log(res));