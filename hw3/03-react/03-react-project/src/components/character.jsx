

export default function Character(character) {
    let alt = `Photo of Game of Thrones Character ${character.fullName}`;
    
    console.log('props');
    console.log(character);
return (
    <div class="card" style="width: 18rem;">
        <img src={character.imageUrl} class="card-img-top" alt={alt}/>
        <div class="card-body">
            <h5 class="card-title">{character.fullName}</h5>
            <p class="card-text">{character.title}</p>
        </div>
    </div>
    );
}