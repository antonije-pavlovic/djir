const create_account_schema = {
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

const account_dto_schema = {
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

const account_update_schema = {
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
  create_account_schema,
  account_dto_schema,
  account_update_schema
];