export default function Character(props) {
  let alt = `Photo of Game of Thrones Character ${props.character.fullName}`;

  return (
    <div className="card">
      <img
        src={props.character.imageUrl}
        className="card-img-top"
        alt={alt}
      />
      <div className="card-body">
        <h5 className="card-title">{props.character.fullName}</h5>
        <p className="card-text">{props.character.title}</p>
      </div>
    </div>
  );
}
