const createUserSchema = {
  $id: 'UserCreate',
  type: 'object',
  required: ['username', 'password', 'email'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string' }
  }
}

const userDtoSchema = {
  $id: 'UserDTO',
  type: 'object',
  required: ['id', 'email', 'username'],
  properties: {
    id: { type: 'integer' },
    username: { type: 'string' },
    email: { type: 'string' }
  }
}

const userUpdateSchema = {
  $id: 'UserUpdate',
  type: 'object',
  properties: {
    email: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' }
  }
}

export default [
  createUserSchema,
  userDtoSchema,
  userUpdateSchema
];