import express from 'express';
import fs from 'fs';
import pkg from 'pg';

const app = express();
const port = 3000;

const html = fs.readFileSync('public/main.html', 'utf8');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.type('html').send(html));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { Client } = pkg;
const client = new Client({
  user: 'muhammad',
  host: 'dpg-cl0dlc237rbc739gj0q0-a.oregon-postgres.render.com',
  database: 'demos',
  password: 'XTF7IRWVdMfChArk3mQpUEFvEcE9WZ1N',
  port: 5432,
  ssl: true,
});
const queryGetPosts = `SELECT * 
  FROM Posts, Users
  WHERE Posts.user_id=Users.user_id`;
client.connect();
const posts = JSON.stringify((await client.query(queryGetPosts)).rows);
app.get('/posts.json', (req, res) => res.send(posts));

app.post('/posts.json', (req) => {
  const queryCreatePost = `INSERT INTO Posts (user_id, date, message, img_message) 
  VALUES (${+req.body.user_id},'${req.body.date}','${req.body.message}','${req.body.img_message}')`;
  client.query((queryCreatePost));
});

app.delete('/posts/1.json', (req, res) => {
  res.send('DELETE Request Called');
  const queryDeletePost = `DELETE FROM Posts WHERE post_id = ${req.body.post_id};`;
  client.query((queryDeletePost));
});
app.post('/posts/1.json', (req) => {
  const arrKeys = Object.keys(req.body.edit);
  const arrValues = Object.values(req.body.edit);
  const valuesEdit = arrKeys.map((item, index) => `${item} = '${arrValues[index]}'`).join(',');
  const queryEditPost = `UPDATE Posts SET ${valuesEdit} WHERE post_id = ${req.body.post_id}`;
  client.query((queryEditPost));
});
