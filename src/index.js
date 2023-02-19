import './css/styles.css'; 
import Notiflix from 'notiflix';
let debounce = require('lodash.debounce');
 
const DEBOUNCE_DELAY = 300;

const search = document.getElementById('search-box')  

let array = [] 
let objects = []
let list = document.getElementById('list')
let countryInfo = document.getElementById('country-info')

const logHi = () => {
  let value = search.value.toLowerCase().trim() 

  fetch('https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags,languages')
  .then(response => {
    return response.json()
  }).then(data => {
    array = data
  }).catch(error => console.log(error.message));

  objects = []
  list.innerHTML = ""

  if (value.length < 2 && value.length > 0) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
  }

  for ( let i = 0; i < array.length; i++ ) {
    if (array[i]?.capital[0]?.toLowerCase()?.includes(value) && value.length > 1) {   
      list.innerHTML = ""
      objects.push(array[i])
      objects.map(function (wizard) {
          let li = document.createElement('li')
          li.innerHTML = `<img src="${wizard.flags.svg}"></img>  ${wizard.capital[0]}`
          list.append(li)
      });
        // если результат меньше 2, то...
      if (objects.length < 2) { 
          for ( let i = 0; i < objects.length; i++ ) {
            let langu = Object.values(objects[i].languages)
            list.innerHTML = ""
            countryInfo.innerHTML = "a"
            countryInfo.innerHTML = `
                  <div class=description>
                      <li><img src="${objects[i].flags.svg}"></img>  ${objects[i].capital[0]}</li>
                      <p>Capital: <span>${objects[i].capital}</span></p>
                      <p>Population: <span>${objects[i].population}</span></p>
                      <p id="span">Languages:</p>
                  </div>
              `
              let span = document.getElementById('span')
              langu.map(function (item) {
                let li = document.createElement('li')
                li.innerHTML = item + ','
                span.append(li)
            });
            span.lastElementChild.innerHTML = `${langu.pop()}.`
          }
      } else {
        countryInfo.innerHTML = ""
      }
    }
    if (value == "") {
      list.innerHTML = ""
      objects = []
    }
    if (value.length < 2) {
      list.innerHTML = ""
      countryInfo.innerHTML = ""
    }
  }
  if (value.length > 1 && objects.length < 1) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
  }
};

search.addEventListener("input", debounce(logHi, DEBOUNCE_DELAY))
