import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName]; 
    if (model && model.db?.db) { 
      let modelExists = await model.db.db.listCollections({
        name: collectionName
      }).toArray();

      if (modelExists.length) {
        await db.dropCollection(collectionName);
      }
    } else {
      console.log(`Model ${modelName} not found.`); 
    }
  } catch (err) {
    throw err;
  }
};
