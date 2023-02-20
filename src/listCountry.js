export default listCountry = (name) => {
    return `
    <li> 
      <img src="${name.flags.svg}" alt="" loading="lazy" />
      <span>${name.capital[0]}</span>
    </li>
    `
  }