export function listCountry (name) {
    return `
    <li class="itemList"> 
      <img src="${name.flags.svg}" alt="" loading="lazy" />
      <span>${name.name.common}</span>
    </li>
    `
  }