export default function Character(character) {
  let alt = `Photo of Game of Thrones Character ${character.character.fullName}`;

  return (
    <div className="card">
      <img
        src={character.character.imageUrl}
        className="card-img-top"
        alt={alt}
      />
      <div className="card-body">
        <h5 className="card-title">{character.character.fullName}</h5>
        <p className="card-text">{character.character.title}</p>
      </div>
    </div>
  );
}
