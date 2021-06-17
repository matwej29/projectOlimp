const Console = require("Console");

const pg = require("pg");
const config = require("./dbConfig.json");
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

  async teams() {
    const client = await this.pool.connect();
    let result;
    try {
      result = await client.query("SELECT * from teams");
    } catch (err) {
      Console.error(err);
      return false;
    }
    client.release();
    return result.rows;
  }

  async itemById(id) {
    const text = "SELECT * from teams WHERE id = $1";
    let result;
    const client = await this.pool.connect();
    try {
      result = await client.query(text, [id]);
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
    const tmptext = "INSERT INTO teams (name, description) VALUES ($1, $2)";
    const client = await this.pool.connect();
    try {
      await client.query(tmptext, [header, text]);
    } catch (err) {
      Console.error(err);
    }
    client.release();
  }

  async edit(id, item) {
    const text = `UPDATE teams SET name=$1, description=$2 WHERE id=$3`;
    const values = [item.name, item.description, +id];
    const client = await this.pool.connect();
    try {
      await client.query(text, values);
    } catch (err) {
      Console.error(err);
    }
    client.release();
  }

  async delete(id) {
    const text = `DELETE FROM teams WHERE id = $1`;
    const client = await this.pool.connect();
    try {
      await client.query(text, [id]);
    } catch (err) {
      Console.error(err);
    }
    client.release();
  }
}

module.exports = News;
