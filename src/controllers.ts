import faker from 'faker'

const generateClient = () => {
  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    cpf: faker.datatype.number(99999999999),
    address: {
      street: faker.address.streetName(),
      number: faker.datatype.number(999),
      complement: faker.address.secondaryAddress(),
      postcode: faker.address.zipCode(),
      district: faker.datatype.string(),
      city: faker.address.city(),
      state: faker.address.state(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()
    }
  }
}

const generateStore = () => {
  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    cpf: faker.datatype.number(99999999999),
    address: {
      street: faker.address.streetName(),
      number: faker.datatype.number(999),
      complement: faker.address.secondaryAddress(),
      postcode: faker.address.zipCode(),
      district: faker.datatype.string(),
      city: faker.address.city(),
      state: faker.address.state(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()
    }
  }
}

const generateOrder = (items: number) => {
  return {
    identifier: '#' + faker.datatype.number(999999),
    total: faker.commerce.price(200, 1000, 2, 'R$'),
    status: 'WAITING_FOR_A_TAKER',
    items: generateItems(items)
  }
}

const generateItems = (count: number) => {
  const items = []
  
  for (let i = 0; i < count; i++) {
    const item = {
      price: faker.commerce.price(200, 1000, 2, 'R$'),
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