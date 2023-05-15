export default function Characters(filter, characters) {
  console.log(filter);
  return (
    <div>
      {characters.map((char) => {
        if (char.fullName.includes(filter)) {
          return <Character character={char} />;
        }
      })}
    </div>
  );
}
