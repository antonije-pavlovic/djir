import { Collection } from 'mongodb';
import MongoBaseRepository from '../../repository/mongo/mongo.base.repository';

export default class PostRepository extends MongoBaseRepository {
  // Collection can be generic !
  private postCollection: Collection;

  constructor() {
    super();
    this.postCollection = this.database.collection('posts');
  }

  public create = async () => {
    return await this.postCollection.insertOne({
      title: 1
    });

  }
}