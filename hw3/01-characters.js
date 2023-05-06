// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

function CreateCard(character) {
  // setup card
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.style.width = '18rem';

  // setup card image
  let image = document.createElement('img');
  image.src = `${character.imageUrl}`;
  image.classList.add('card-img-top');
  image.alt = `Picture of Game of Thrones character ${character.fullName}`;

  newCard.appendChild(image);

  // setup card body
  let cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  let cardHeading = document.createElement('h5');
  cardHeading.classList.add('card-title');
  cardHeading.textContent = character.fullName;

  cardBody.append(cardHeading);

  let characterTitle = document.createElement('p');
  characterTitle.classList.add('card-text');
  characterTitle.textContent = character.title;

  cardBody.appendChild(characterTitle);

  newCard.appendChild(cardBody);

  return newCard;
}

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let section = document.querySelector('section');
    console.log('data');
    console.log(data);
    console.log(data[0]);

    data.map((char) => section.appendChild(CreateCard(char)));
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
