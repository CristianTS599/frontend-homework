import { useState } from 'react';
import '../styles/search.css';
import Characters from './characters';

export default function Search() {
  const [name, setName] = useState("");

  const ChangeName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  }


  return (
    <>
    <div className="search-page">
      <div className="search-container rounded">
        <p className="lead search-desc">
          This page connects to a Game of Thrones API that provides information for all the characters 
          use the box below to search for any characters name. If the character exists you will see a
          card with their information other wise a not found message will appear.
        </p>
        <div className="input-group mb-3 search-box">
          <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Enter Character Name</span>
          </div>
          <input id="name" type="text" className="form-control" value={name} onChange={ChangeName} aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
        </div>
      </div>
    </div>
    <Characters filter={name}/>
    </>
  );
}
