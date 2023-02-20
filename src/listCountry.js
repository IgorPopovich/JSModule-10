export function listCountry (name) {
    return `
    <li class="itemList"> 
      <img src="${name.flags.svg}" alt="" loading="lazy" />
      <span>${name.capital[0]}</span>
    </li>
    `
  }