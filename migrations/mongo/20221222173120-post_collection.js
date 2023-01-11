/* eslint-disable no-undef */
exports.up = async (db) => {
  await db.createCollection('posts', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Post object validator',
        required: [ 'title' ],
        properties: {
          title: {
            bsonType: 'string',
            description: ' \'title must be a string\' ',
          }
        }
      }
    }
  });
  await db.collection('posts').createIndex({ authorId: 1 });
};

exports.down = async (db) => {
  await db.dropCollection('posts');
};
