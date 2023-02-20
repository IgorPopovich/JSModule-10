export default itemCountry = (name) => {
    return `
        <li class="description">
          <div class="top">
            <img src="${name.flags.svg}"></img>  
            <span>${name.capital[0]}</span>
          </div>
          <p>Capital: <span>${name.capital}</span></p>
          <p>Population: <span>${name.population}</span></p>
          <p id="span">Languages:</p>
        </li>
  `
  }