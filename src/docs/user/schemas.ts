export default {
  UserModel: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Users name',
        example: 'John'
      },
      lastName: {
        type: 'string',
        description: 'Users lastname',
        example: 'Doe'
      },
      email: {
        type: 'string',
        description: 'Users email',
        example: 'john.doe@gmail.com'
      },
      phone: {
        type: 'string',
        description: 'Users phone number',
        example: '555-333'
      }
    }
  }

}
