
//import '../scripts/01-characters';
import { useState } from "react";
import Character from './character.jsx';

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

const GetCharacters = (filter) => {
    let cards = [];
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {  
      

      data.map((char) => {
         
        if (char.fullName.includes(filter) || filter === '') {
            
          //cards.push(CreateCard(char));
          cards.push(char);
        }
      });
    })
    .catch((error) => {
      // register and display any errors
    });

    return cards;
  }

export default function Characters(props) {

    const [filter, setFilter] = useState(props.filter);
    const characters = GetCharacters(props.filter);

    console.log(characters);
    return (
            <div className="container">
                <h3>Searching for {props.filter === '' ? "All Characters" : props.filter}</h3>
                
                {characters.map(char => <Character key={index} character={char}/>)}
            </div>
          );
}






/// Method: CreateCard
/// Purpose: Takes in a charcter object and creates a bootstrap
///          5 card out of it using the image url, character name
/////          and house.
///// Returns: DOM card element that is ready to be inserted
//function CreateCard(character) {
//  // setup card
//  let newCard = document.createElement('div');
//  newCard.classList.add('card');
//  newCard.style.width = '300px';
//
//  // setup card image
//  let image = document.createElement('img');
//  image.src = `${character.imageUrl}`;
//  image.classList.add('card-img-top');
//  image.alt = `Picture of Game of Thrones character ${character.fullName}`;
//  image.style.width = '280px';
//  image.style.height = '280px';
//
//  newCard.appendChild(image);
//
//  // setup card body
//  let cardBody = document.createElement('div');
//  cardBody.classList.add('card-body');
//
//  let cardHeading = document.createElement('h2');
//  cardHeading.classList.add('card-title');
//  cardHeading.textContent = character.fullName;
//
//  cardBody.append(cardHeading);
//
//  let characterTitle = document.createElement('p');
//  characterTitle.classList.add('card-text');
//  characterTitle.textContent = character.title;
//
//  cardBody.appendChild(characterTitle);
//
//  newCard.appendChild(cardBody);
//
//  return newCard;
//}
