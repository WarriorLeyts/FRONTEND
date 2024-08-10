import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import fs from 'fs';

const app = express();
const port = 3000;
const { Client } = pkg;
const client = new Client({
  user: 'muhammad',
  host: 'dpg-cqpkf6ij1k6c73ds2eb0-a.oregon-postgres.render.com',
  database: 'demos_t6ex',
  password: 'c4HH2PlMVpWowYA0yN1PKghzewj8oHNg',
  port: 5432,
  ssl: true,
});
client.connect();
app.use(express.static('public'));
const html = fs.readFileSync('public/index.html', 'utf8');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/posts.json', async (req, res) => {
  const queryGetPosts = `SELECT * 
  FROM Posts, Users
  WHERE Posts.id_user=Users.id`;
  const posts = JSON.stringify((await client.query(queryGetPosts)).rows);
  res.status(200).send(posts);
});
app.get('/blogs.json', async (req, res) => {
  const blogs = [
    {
      id: '5',
      name: 'Хабр Научпоп',
      mail: '@habr_popsci',
      urlPictures: 'img/habr-icon.png',
    },
    {
      id: '6',
      name: 'Матч ТВ',
      mail: '@MatchTV',
      urlPictures: 'img/match-icon.png',
    },
    {
      id: '7',
      name: 'Популярная механика',
      mail: '@PopMechanica',
      urlPictures: 'img/popmeh-icon.png',
    },
  ];
  return res.status(200).send(blogs);
});
app.get('/topics.json', async (req, res) => {
  const topics = [
    {
      hashName: '#javascript',
      numOfMessage: '2 941 сообщение',
    },
    {
      hashName: '#python3',
      numOfMessage: '29 718 сообщений',
    },
    {
      hashName: '#ruby',
      numOfMessage: '958 186 сообщений',
    },
    {
      hashName: '#как_научиться_коду?',
      numOfMessage: '4 185 сообщений',
    },
    {
      hashName: '#помогите_с_кодом',
      numOfMessage: '482 сообщения',
    },
  ];
  return res.status(200).send(topics);
});

app.post('/posts.json', (req, res) => {
  const queryCreatePost = `INSERT INTO Posts (id_user, message, message_img) 
  VALUES (${+req.body.user_id},'${req.body.message}','${req.body.message_img}')`;
  client.query((queryCreatePost));
  return res.status(200).send();
});

app.delete('/posts/:id.json', (req, res) => {
  const queryDeletePost = `DELETE FROM Posts WHERE id = ${req.params.id};`;
  client.query((queryDeletePost));
  return res.status(200).send();
});

app.post('/posts/:id.json', (req, res) => {
  const queryEditPost = `UPDATE Posts SET message = '${req.body.message}' WHERE id = ${req.params.id}`;
  client.query((queryEditPost));
  return res.status(200).send();
});

app.post('/createUser', async (req, res) => {
  const token = crypto.randomUUID();
  const findEmail = await client.query(`SELECT * FROM Users WHERE email='${req.body.email}'`);
  if (Object.keys(findEmail.rows).length !== 0) {
    return res.status(400).send({ message: 'Пользователь с таким email уже существует.' });
  }
  const cipherPassword = await bcrypt.hash(req.body.password, 8);
  const createUser = `INSERT INTO Users (name, email, password) 
  VALUES ('${req.body.name}','${req.body.email}','${cipherPassword}') returning id`;
  const newUser = (await client.query((createUser))).rows[0];
  const createToken = `INSERT INTO Sessions (id_user, token) 
  VALUES (${newUser.id},'${token}') returning token`;
  const getToken = (await client.query(createToken)).rows[0].token;
  res.cookie('email', req.body.email, {
    expires: new Date(Date.now() + 999999),
  });
  res.cookie('token', getToken, {
    expires: new Date(Date.now() + 999999),
  });
  return res.status(200).send();
});
app.post('/login', async (req, res) => {
  const token = crypto.randomUUID();
  const findUser = await client.query(`SELECT * FROM Users WHERE email='${req.body.email}'`);
  const userPassword = typeof (findUser.rows[0]?.password) !== 'undefined' ? findUser.rows[0].password : '';
  const isMatch = await bcrypt.compare(req.body.password, userPassword);
  if (!isMatch) {
    return res.status(400).send({ message: 'Проверьте введенный email и пароль' });
  }
  const createToken = `INSERT INTO Sessions (id_user, token) 
  VALUES (${+findUser.rows[0].id},'${token}') returning token`;
  const getToken = (await client.query(createToken)).rows[0].token;
  res.cookie('email', req.body.email, {
    expires: new Date(Date.now() + (10082 * 60000)),
  });
  res.cookie('token', getToken, {
    expires: new Date(Date.now() + (10082 * 60000)),
  });
  return res.status(200).send();
});
app.get('/feed', async (req, res) => {
  const queryGetToken = `SELECT *   
  FROM Sessions
  WHERE token='${req.cookies.token}'`;
  const getDateToken = (await client.query(queryGetToken)).rows;
  if (!req.cookies.token || ((new Date() - new Date(getDateToken[0]?.date)) / 60000 > 10_082)) {
    return res.type('html').send('<script> alert("пользователь не авторизован") </script>');
  }
  return res.type('html').send(html);
});
