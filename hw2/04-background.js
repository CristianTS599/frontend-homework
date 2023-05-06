// user input box
let intervalInput = document.getElementById('TimerInterval');
let body = document.querySelector('body');
let interval = 3000;
// timer controlling color switch
let timerID;

// Method: GetRGBValue
// Purpose: returns a random number between 0 and 255 inclusive
// Returns: valid Integer for RGB coloring.
const GetRGBValue = () => {
  return Math.floor(Math.random() * (255 - 0) + 0);
};

// Method: ChangeBGColor
// Purpose: Uses the GetRGBValue method to change the color of the body
//          elements background.
// No return.
const ChangeBGColor = () => {
  body.style.backgroundColor = `rgba(${GetRGBValue()}, ${GetRGBValue()}, ${GetRGBValue()}, .3)`;
};

// Method: SetInterval
// Purpose: Uses the user input box to set the timer interval or if
//          the box is empty defaults to 2000 ms
// No return. Sets global interval variable
const SetInterval = () => {
  if (intervalInput.value === '' || intervalInput.value < 0) {
    interval = 2000;
  } else {
    interval = intervalInput.value * 1000;
  }
};

// Method: StartStopColors
// Purpose: This is the button click event handler
//          invokes appropriate methods to trigger color change
//          or stop the color change all together.
// No return.
function StartStopColors() {
  // Get button from dom
  let button = document.querySelector('button');
  // Set button value
  button.textContent = button.textContent === 'Stop' ? 'Start' : 'Stop';

  // Get new interval or set default
  SetInterval();

  // if button is now start then animation should not be running
  if (button.textContent === 'Start') {
    clearInterval(timerID);
  } else {
    timerID = setInterval(ChangeBGColor, interval);
  }
}

// want screen to default to not white
ChangeBGColor();
// on load set the interval and btton click events
window.addEventListener('load', () => {
  timerID = setInterval(ChangeBGColor, interval);
  document.querySelector('button').addEventListener('click', StartStopColors);
});
