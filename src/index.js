import Notiflix from 'notiflix';
let debounce = require('lodash.debounce');
import listCountry from './listCountry';
import itemCountry from './itemCountry';
 
const DEBOUNCE_DELAY = 300;
const search = document.getElementById('search-box')  
let list = document.getElementById('list')

const logHi = () => {
  let value = search.value.toLowerCase().trim() 
  list.innerHTML = ""
  
  if (value.length > 1) {
    fetch(`https://restcountries.com/v3.1/name/${value}?fields=name.official,capital,population,flags,languages`)
    .then(response => {
      return response.json()
    }).then(data => {
      let array = data
      list.innerHTML =  array.map((item) => listCountry(item)).join("");
      if (array.length < 2) { 
        list.innerHTML = array.map((item) => 
        itemCountry(item)).join("");
        let langu = Object.values(array[0].languages)
        langu.map(function (item) {
          let li = document.createElement('li')
          li.innerHTML = item + ','
          span.append(li)
      });
      span.lastElementChild.innerHTML = `${langu.pop()}.`
      }
    }).catch(error => {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });
  } else {
    list.innerHTML = ""
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
  }
};

search.addEventListener("input", debounce(logHi, DEBOUNCE_DELAY))
