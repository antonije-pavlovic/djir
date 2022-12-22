/* eslint-disable no-undef */
exports.up = async (db) => {
  await db.createCollection('posts');
  await db.collection('posts').createIndex({ author_id: 1 });
};

exports.down = async (db) => {
  await db.dropCollection('posts');
};
