const pg = require("pg");
const config = require("./config.json");
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
      result = await client.query("SELECT * from news");
    } catch (err) {
      console.log(err);
      return false;
    }
    client.release();
    return result.rows;
  }

  async itemById(id) {
    let text = "SELECT * from news WHERE id = $1";
    let result;
    const client = await this.pool.connect();
    try {
      result = await client.query(text, [id]);
    } catch (err) {
      console.log(err);
    }
    client.release();
    if (result.rowCount === 0) {
      return false;
    }
    return await result.rows[0];
  }

  async add(header, text) {
    let tmptext = "INSERT INTO news (header, text) VALUES ($1, $2)";
    const client = await this.pool.connect();
    try {
      await client.query(tmptext, [header, text]);
    } catch (err) {
      console.log(err);
    }
    client.release();
  }

  async edit(id, value) {
    let text = `UPDATE news SET text=$1 WHERE id=$2`;
    let values = [value, parseInt(id)];
    const client = await this.pool.connect();
    try {
      await client.query(text, values);
    } catch (err) {
      console.log(err);
    }
    client.release();
  }

  async delete(id) {
    let text = `DELETE FROM news WHERE id = $1`;
    const client = await this.pool.connect();
    try {
      await client.query(text, [id]);
    } catch (err) {
      console.log(err);
    }
    client.release();
  }
}

module.exports = News;
