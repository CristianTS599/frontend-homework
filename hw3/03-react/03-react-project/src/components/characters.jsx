import Character from './character';

export default function Characters({filter, characters}) {
  return (
    <div className="card-container">{characters.length !== 0 ? characters.map(char => {if (char.fullName.toLowerCase().includes(filter.toLowerCase()) || filter === '') {return <Character key={char.id} character={char}/>}}): "No Characters"}</div>
  );
}
