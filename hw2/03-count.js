// Add your code here

// I want a non changing copy of the paragraph
const text = document.querySelector('#TextContent').innerText;

//  Method: handleKeyDown
// Purpose: Will trigger the highlighting functionality on the paragragh by creating a copy 
//          of the text and replace all keywords given by the user by a span with a higlight class.
//          then this modified text is added as the inner html.
//    Args: event is the keyDown event object
// Remarks: Need to come backt to this one and grab the target element from the
//          event rather than the dom and then I need to eliminate some noise
//          happening with empty events.
function handleKeyDown(event) {

  // ignoring shift key incase of caps
  if (event.key === 'Shift') return;

  // user input
  let keyWord = document.querySelector('input').value;

  // check if box is empty
  if (keyWord === '') {
    keyWord = event.key;
  }
  // replace keywords with highlighted elements
  let textCopy = text;
  textCopy = textCopy.replaceAll(
    keyWord,
    `<span class="highlight">${keyWord}</span>`
  );

  // set changes
  document.querySelector('#TextContent').innerHTML = textCopy;
}

document.getElementById('UserInput').addEventListener('keydown', handleKeyDown);
