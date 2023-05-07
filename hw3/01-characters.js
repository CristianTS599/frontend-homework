// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

/// Method: CreateCard
/// Purpose: Takes in a charcter object and creates a bootstrap
///          5 card out of it using the image url, character name
///          and house.
/// Returns: DOM card element that is ready to be inserted
function CreateCard(character) {
  // setup card
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.style.width = '300px';

  // setup card image
  let image = document.createElement('img');
  image.src = `${character.imageUrl}`;
  image.classList.add('card-img-top');
  image.alt = `Picture of Game of Thrones character ${character.fullName}`;
  image.style.width = '280px';
  image.style.height = '280px';

  newCard.appendChild(image);

  // setup card body
  let cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  let cardHeading = document.createElement('h2');
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
    // grab dom element to add items to
    let section = document.querySelector('#content');

    console.log(data[0]);
    console.log(data);
    // Create boostrap cards from each charcater and add to
    // dom element
    data.map((char) => section.appendChild(CreateCard(char)));
  })
  .catch((error) => {
    // register and display any errors
    let section = document.querySelector('#content');
    let errorMessage = document.createElement('p');
    let errorTitle = document.createElement('h2');

    errorTitle.textContent = `Error Processing Request. Try Again Later:`;
    section.appendChild(errorTitle);

    errorMessage.textContent = `Error Message: ${error}`;
    section.appendChild(errorMessage);
  });
