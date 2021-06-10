const pg = require('pg');
const Console = require('Console');
const config = require('./config.json');

class News {
  constructor() {
    this.pool = new pg.Pool({
      user: config.user,
      host: config.host,
      database: config.database,
      password: config.password,
      port: config.port,
    });
  }

  async news() {
    const client = await this.pool.connect();
    let result;
    try {
      result = await client.query('SELECT * from news');
    } catch (err) {
      Console.error(err);
      return false;
    }
    client.release();
    return result.rows;
  }

  async itemById(id) {
    const queryText = 'SELECT * from news WHERE id = $1';
    let result;
    const client = await this.pool.connect();
    try {
      result = await client.query(queryText, [id]);
    } catch (err) {
      Console.error(err);
    }
    client.release();
    if (result.rowCount === 0) {
      return false;
    }
    return result.rows[0];
  }

  async add(header, text) {
    const queryText =
      'INSERT INTO news (header, text, date) VALUES ($1, $2, CURRENT_DATE+CURRENT_TIME)';
    const client = await this.pool.connect();
    try {
      await client.query(queryText, [header, text]);
    } catch (err) {
      Console.error(err);
    }
    client.release();
  }

  async edit(id, item) {
    const queryText = `UPDATE news SET header=$1, text=$2, date = CURRENT_DATE+CURRENT_TIME WHERE id=$3`;
    const values = [item.header, item.text, +id];
    const client = await this.pool.connect();
    try {
      await client.query(queryText, values);
    } catch (err) {
      Console.error(err);
    }
    client.release();
  }

  async delete(id) {
    const queryText = `DELETE FROM news WHERE id = $1`;
    const client = await this.pool.connect();
    try {
      await client.query(queryText, [id]);
    } catch (err) {
      Console.error(err);
    }
    client.release();
  }
}

module.exports = News;
