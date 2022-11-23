export default {
  AccountModel: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Account name',
        example: 'John'
      },
      last_name: {
        type: 'string',
        description: 'Account lastname',
        example: 'Doe'
      },
      email: {
        type: 'string',
        description: 'Account email',
        example: 'john.doe@gmail.com'
      },
      phone: {
        type: 'string',
        description: 'Account phone number',
        example: '555-333'
      }
    }
  }

}
