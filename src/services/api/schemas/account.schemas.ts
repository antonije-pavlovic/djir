const createAccountSchema = {
  $id: 'AccountCreate',
  type: 'object',
  required: ['name', 'lastName', 'password', 'email', 'phone'],
  properties: {
    name: { type: 'string' },
    lastName: { type: 'string' },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string' },
    phone: { type: 'string' },
  }
}

const accountDtoSchema = {
  $id: 'AccountDTO',
  type: 'object',
  required: ['name', 'lastName', 'email', 'phone'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
  }
}

const accountUpdateSchema = {
  $id: 'AccountUpdate',
  type: 'object',
  properties: {
    name: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
  }
}

export default [
  createAccountSchema,
  accountDtoSchema,
  accountUpdateSchema
];