import faker from 'faker'

const generateClient = () => {
  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    document: '188.599.357-92',
    address: {
      street: faker.address.streetName(),
      number: faker.datatype.number(999).toString(),
      complement: faker.address.secondaryAddress(),
      postcode: faker.address.zipCode(),
      district: faker.datatype.string(),
      city: faker.address.city(),
      state: faker.address.state(),
      latitude: -20.3424849, // Americanas Exp Garcia
      longitude: -40.3845925
      // latitude: -20.3425654, // Sipolatti Exp Garcia
      // longitude: -40.3848138
      // latitude: -20.3425654, // Casas Bahia Exp Garcia
      // longitude: -40.3848138
      // latitude: -20.3524037, // Multi Show Express Vista Mar
      // longitude: -40.3744645
    }
  }
}

const generateStore = () => {
  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    document: '188.599.357-92',
    logo_path: faker.image.imageUrl(),
    address: {
      street: faker.address.streetName(),
      number: faker.datatype.number(999).toString(),
      complement: faker.address.secondaryAddress(),
      postcode: faker.address.zipCode(),
      district: faker.datatype.string(),
      city: faker.address.city(),
      state: faker.address.state(),
      latitude: -20.329611, // R. Santa Clara, 86 - Oriente Cariacica - ES, 29147-590
      longitude: -40.380240
      // latitude: -20.3288849, // R. Leopoldo Corrêa, 28 - Oriente, Cariacica - ES, 29150-610
      // longitude: -40.3799727
      // latitude: -20.331919, // R. São Sebastião, 301 - Santa Cecília Cariacica - ES, 29147-511
      // longitude: -40.395277
      // latitude: -20.361389, // R. Princesa Isabel, 156 - Campo Belo Cariacica - ES, 29143-002
      // longitude: -40.378993
    }
  }
}

const generateOrder = (items: number) => {
  return {
    identifier: '#' + faker.datatype.number(999999),
    total: parseFloat(String(faker.datatype.number(1000) + 20)),
    status: 'WAITING_FOR_A_TAKER',
    items: generateItems(items)
  }
}

const generateItems = (count: number) => {
  const items = []
  
  for (let i = 0; i < count; i++) {
    const item = {
      price: faker.datatype.number(1000) + 20,
      item_photo_path: faker.image.imageUrl(),
      quantity: faker.datatype.number(10),
      name: faker.commerce.productName(),
    }

    items.push(item)
  }

  return items
}

export const generate = (setSelector: null | 'many' | 'single' | 'single-many' = null): any => {
  const selector = setSelector || faker.helpers.randomize(['single', 'many', 'single-many'])

  if (selector === 'single') {
    return {
      client: generateClient(),
      store: generateStore(),
      order: generateOrder(1)
    }
  } else if (selector === 'single-many') {
    return {
      client: generateClient(),
      store: generateStore(),
      order: generateOrder(faker.datatype.number(8) + 2)
    }
  } else if (selector === 'many') {
    const basket = []

    for (let i = 0; i < faker.datatype.number(4) + 2; i++) {
      basket.push(generate(faker.helpers.randomize(['single', 'single-many'])))
    }

    return basket;
  } else {
    return {}
  }
}