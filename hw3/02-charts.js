const borderColors = [];
const backgroundColors = [];

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
const GetRGBAColor = (alpha) => {
  return `rgba(${GetRGBValue()}, ${GetRGBValue()}, ${GetRGBValue()}, ${alpha})`;
};

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

/// Method: GetCharacterData
/// Purpose: Creates and implements the api fetch call to get all characters,
///          process all the information and make the results available to the
///          chart.
/// Return: No return just populates the donut chart on the dom.
async function GetCharacterData() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      // list of unique character homes
      let homes = [];
      
      // dictionary with house:count key value pairs
      let homeCounts = {};

      // array of numbers (house counts) in same order as "homes"
      let homeData = [];

      // process new character
      data.map((char) => {
        AddHouse(char.family, homes, homeCounts);
      });

      // set chart colors
      SetColors(homes.length);

      // using all the unique homes and the home:homeCount key values pairs
      // create an array of home counts thats the same order of the homes array.
      homes.forEach((home) => {
        homeData.push(homeCounts[home]);
      });

      // render chart
      renderChart(homes, homeData);

      // testing code, will go away
      //console.log(homes);
      //console.log(homeCounts);
      //console.log('data');
      //console.log(homeData);
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
}

/// Method: SetColors
/// Purpose: Randomly sets the colors used for the chart 
/// Params: "iterations": number of unique homes = number of colors to create.
function SetColors(iterations) {
  for (let i = 0; i < iterations; ++i) {
    let currentColor = GetRGBAColor(0.8);

    // add background color
    backgroundColors.push(currentColor);
    
    // add border colors with adjusted alpha 
    borderColors.push(currentColor.replace('.8', '1'));
  }
}

/// Method: AddHouse
/// Purpose: Iterates the houses that comes back from the api and adds it based on certain characteristics
///          listed below:
///           - if the array of houses is empty just add the house
///           - if the home is already in my list then ignore it,
///           - if home is 80% similar to another than consider it a typo and increment its similar counter part.
///          This method will create an in memory dictionary with keys as the unique home and the value as the homes count (times it appears)
///          then uses that data to create the donut chart 
/// Params: 
///   - "newHome": the home to potentially add
///   - "homesArray": all currently unique homes processed
///   - "homeCounts": Dictionary of home:homeCount key value pairs.
function AddHouse(newHome, homesArray, homeCounts) {
  newHome = newHome.replace('House', '').trim();
  // always add first home
  if (homesArray.length === 0) {
    
    homesArray.push(newHome);
    // add new home and set its count to 1
    homeCounts[newHome] = 1;
    return true;
  }

  // check to see if the house has already been accounted for
  let result = true;
  homesArray.forEach((element) => {
    if (element.toLowerCase() === newHome.toLowerCase()) {
      // if not accounted for then add setting its count to one
      homeCounts[element] = homeCounts[element] + 1;
      result = false;
    }
  });

  // indicates if house should be skipped.
  if (!result) {
    return result;
  }

  // if house has not been processed than we process but check for typos based on a similarity percentage first.
  result = true;
  homesArray.map((hm) => {
    // check if this home is 80% similar to another (check for typos) and if so increment the existing home
    if (StringMatch(hm, newHome) > 0.8) {
      // increment existing home value on 80 similarity
      homeCounts[hm] = homeCounts[hm] + 1;
      result = false;
      return;
    }
  });

  // if home was not 80 similar to other than its likely new and should be added with count of 1
  if (result) {
    homesArray.push(newHome);
    homeCounts[newHome] = 1;
    return true;
  }
  return false;
}

/// Method: StringMatch
/// Purpose: Algorithm that takes two strings and determines a percentage match of them.
/// Returns: Percentage match from 0 to 100%. Value returned is essentially s2 is a x% match to s1.
/// Params: 
///   - "s1": Home already processed, for comparison.
///   - "s2": new home that needs processing before adding.
function StringMatch(s1, s2) {
  let charMatches = 0;
  // confirm we dont have empties
  if (!StringNullOrEmpty(s1) && !StringNullOrEmpty(s2)) {
    let s1Len = s1.length;
    let s2Len = s2.length;

    // logic here is I only want to iterate as much as smallest word
    if (s1Len <= s2Len) {
      for (let i = 0; i < s1Len; ++i) {
        // iterate each letter. Words must match from current iteration back
        let substring = s1.substring(0, i + 1);
        if (s2[i] === substring || InSubstring(s2[i], substring)) {
          ++charMatches;
        }
      }
    } else {
      for (let i = 0; i < s2Len; ++i) {
        let substring = s1.substring(0, i + 1);
        if (s2[i] === substring || InSubstring(s2[i], substring)) {
          ++charMatches;
        }
      }
    }
  }
  // get percentage match in decimal
  let matchPercentage = charMatches / s1.length;
  return matchPercentage;
}

/// Method: InSubstring
/// Purpose: checks to see if a char is in string
/// Params: 
///   - "textChar": char to search for in full string 
///   - "subString": substring that might contain search char
///   - "homeCounts": Dictionary of home:homeCount key value pairs.
const InSubstring = (testChar, subString) => {
  let charArray = subString.split('');
  let result = false;

  charArray.forEach((element) => {
    if (testChar[0].toLowerCase() === element.toLowerCase()) {
      result = true;
    }
  });
  return result;
};

/// Method: StringNullOrEmpty
/// Purpose: checks if string is null or empty
const StringNullOrEmpty = (s) => {
  return s === null || s === undefined || s === '';
};

GetCharacterData();

const renderChart = (dynLabels, dynData) => {
  const donutChart = document.querySelector('.donut-chart');

  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: dynLabels,
      datasets: [
        {
          label: 'My First Dataset',
          data: dynData,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
  });
};