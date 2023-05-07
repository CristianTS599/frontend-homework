//const backgroundColors = [
//  'rgba(54, 162, 235, 0.8)',
//  'rgba(255, 206, 86, 0.8)',
//  'rgba(255, 99, 132, 0.8)',
//  'rgba(75, 192, 192, 0.8)',
//  'rgba(153, 102, 255, 0.8)',
//  'rgba(255, 159, 64, 0.8)',
//  'rgba(199, 199, 199, 0.8)',
//  'rgba(83, 102, 255, 0.8)',
//  'rgba(40, 159, 64, 0.8)',
//  'rgba(210, 199, 199, 0.8)',
//  'rgba(78, 52, 199, 0.8)',
//];
//
//const borderColors = [
//  'rgba(54, 162, 235, 1)',
//  'rgba(255, 206, 86, 1)',
//  'rgba(255, 99, 132, 1)',
//  'rgba(75, 192, 192, 1)',
//  'rgba(153, 102, 255, 1)',
//  'rgba(255, 159, 64, 1)',
//  'rgba(159, 159, 159, 1)',
//  'rgba(83, 102, 255, 1)',
//  'rgba(40, 159, 64, 1)',
//  'rgba(210, 199, 199, 1)',
//  'rgba(78, 52, 199, 1)',
//];

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

async function GetCharacterData() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let homes = [];
      let homeCounts = {};
      let homeData = [];
      // Create boostrap cards from each charcater and add to
      // dom element
      data.map((char) => {
        //debugger;
        AddHouse(char.family, homes, homeCounts);
      });

      SetColors(homes.length);

      homes.forEach((home) => {
        homeData.push(homeCounts[home]);
      });

      renderChart(homes, homeData);

      console.log(homes);
      console.log(homeCounts);
      console.log('data');
      console.log(homeData);
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

function SetColors(iterations) {
  for (let i = 0; i < iterations; ++i) {
    let currentColor = GetRGBAColor(0.8);
    backgroundColors.push(currentColor);
    borderColors.push(currentColor.replace('.8', '1'));
  }
}

function AddHouse(newHome, homesArray, homeCounts) {
  newHome = newHome.replace('House', '').trim();
  if (homesArray.length === 0) {
    homesArray.push(newHome);
    homeCounts[newHome] = 1;
    return true;
  }

  let result = true;
  homesArray.forEach((element) => {
    if (element.toLowerCase() === newHome.toLowerCase()) {
      homeCounts[element] = homeCounts[element] + 1;
      result = false;
    }
  });

  if (!result) {
    return result;
  }

  result = true;
  homesArray.map((hm) => {
    if (StringMatch(hm, newHome) > 0.8) {
      homeCounts[hm] = homeCounts[hm] + 1;
      result = false;
      return;
    }
  });

  if (result) {
    homesArray.push(newHome);
    homeCounts[newHome] = 1;
    return true;
  }
  return false;
}

function StringMatch(s1, s2) {
  let charMatches = 0;
  if (!StringNullOrEmpty(s1) && !StringNullOrEmpty(s2)) {
    let s1Len = s1.length;
    let s2Len = s2.length;

    if (s1Len <= s2Len) {
      for (let i = 0; i < s1Len; ++i) {
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
  let matchPercentage = charMatches / s1.length;
  return matchPercentage;
}

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

//renderChart();
