/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */

import mongoose, { MongooseOptions } from 'mongoose';
import ConflictError from '../errors/custom/conflict.error';
import NotFoundError from '../errors/custom/not.found';
import UnprocessableError from '../errors/custom/unprocessable.error';
import config from '../config/config';

export default class BaseRepository {

  protected model: any;
  protected _connection;

  constructor(model: any) {
    this.model = model;
    this._connect()
  }

  private _connect = async () => {

    this._connection = await mongoose.connect(config.mongo.url);
    console.log('MongooseMixin: connected successfully.');
    // TODO: handle disconnections
    // TODO: handlle errors
  }

  protected _create = async (doc: any | any[], options?: MongooseOptions) => {
    try {
      return await this.model.create(doc, options);
    } catch (error) {
      console.log(error)
      // TODO: log error and send 500 applicatoin http error
      if(error.code === 11000) {
        throw new ConflictError();
      }

      if(error.name === 'ValidationError') {
        throw new UnprocessableError({
          kind: error.errors.kind,
          path: error.errors.path,
          value: error.errors.value,
        });
      }
    }
  }

  /**
   * We set options `new` property to true, to return the document after update was applied.
   */
  protected _update = async (filter: any, params: any,  options?: any): Promise<any> => {
    try {
      if (options) {
        options.new = true;
      } else {
        options = { new: true };
      }

      const result = await this.model.findOneAndUpdate(filter, params, options).lean();

      if (!result) {
        throw new NotFoundError(filter);
      }
      return result;
    } catch(error) {
      // TODO: Log the error and transform to https error
    }
  }

  protected _delete = async (filter: any, options?: MongooseOptions) => {
    try {
      const result = await this.model.findOneAndDelete(filter, options).lean();
      if (!result) {
        throw new NotFoundError(filter);
      }
      return result;

    } catch(error) {
      // TODO: Log the error and transform to https error
    }
  }

  protected _find = async (filter: any, options?: MongooseOptions) => {
    try {
      return await this.model.find(filter, options).lean();

    } catch(error) {
      // TODO: TODO: Log the error and transform to https error
    }
  }

  protected _get = async (filter: any, options?: MongooseOptions) => {
    try {
      const invalidValues: any[] = [];

      for(const prop in filter) {
        if(filter[prop] === null || filter[prop] === undefined) {
          invalidValues.push({ prop, value: filter[prop] })
        }
      }

      if (invalidValues.length) {
        throw new ConflictError(invalidValues);
      }

      const result = await this.model.findOne(filter, options).lean();

      if(!result) {
        return null;
      }

      return result;

    } catch(error) {
      // TODO: TODO: Log the error and transform to https error
    }
  }
}