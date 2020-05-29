const { MongoClient } = require('mongodb');

class SimpleODM {
  constructor() {
    this.connectionInstance = null;
  }

  async connect(mongoUrl) {
    if (!this.connectionInstance) {
      this.connectionInstance = await MongoClient.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    return await this.connectionInstance;
  }

  getDatabase(databaseName) {
    if (!this.connectionInstance) {
      throw new Error('Database not connected');
    }
    return this.connectionInstance.db(databaseName);
  }

  closeConnection() {
    if (!this.connectionInstance) {
      throw new Error('Database not connected');
    }
    return this.connectionInstance.close();
  }
}

module.exports = SimpleODM;
