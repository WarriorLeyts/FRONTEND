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
  host: 'dpg-crduvr0gph6c73ekh7kg-a.oregon-postgres.render.com',
  database: 'demos_zbpd',
  password: 'su4hNG0OoPIjDFsPBw7TexlUigrwXie5',
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
FROM Posts
JOIN Users ON Posts.id_user = Users.id
ORDER BY Posts.id DESC
LIMIT 4;`;
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

app.post('/posts.json', async (req, res) => {
  const { email } = req.cookies;
  const { message, messageImg } = req.body;
  const queryGetToken = `SELECT *   
  FROM Users
  WHERE email='${email}'`;
  try {
    const getUser = (await client.query(queryGetToken)).rows[0];
    if (!getUser) {
      throw new Error('Пользователь не авторизован');
    }
    const queryCreatePost = `INSERT INTO Posts (id_user, message, message_img) 
    VALUES (${getUser.id},'${message}','${messageImg}')`;
    const newPost = (await client.query(queryCreatePost));
    if (!newPost) {
      throw new Error('Не удалось создать пост.');
    }
    return res.status(200).json({ message: 'Ваш пост создан' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
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
  const { email, password } = req.body;
  const nickname = `user-${crypto.randomUUID().slice(0, 4)}`;
  try {
    const candidate = await client.query(`SELECT * FROM Users WHERE email='${req.body.email}'`);
    if (candidate.rows[0]) {
      throw new Error('Пользователь с таким email уже существует.');
    }
    const cipherPassword = await bcrypt.hash(password, 8);
    const createUser = `INSERT INTO Users (nickname, email, password) 
  VALUES ('${nickname}','${email}','${cipherPassword}') returning id`;

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
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
app.post('/login', async (req, res) => {
  const token = crypto.randomUUID();
  const { email, password } = req.body;
  try {
    const candidate = await client.query(`SELECT * FROM Users WHERE email='${email}'`);
    const userPassword = candidate.rows.length !== 0 ? candidate.rows[0].password : '';
    const isMatch = await bcrypt.compare(password, userPassword);
    if (!isMatch) {
      throw new Error('Пользователь с указанными данными не найден.');
    }
    const createToken = `INSERT INTO Sessions (id_user, token) 
  VALUES (${+candidate.rows[0].id},'${token}')`;

    await client.query(createToken);

    res.cookie('email', email, {
      expires: new Date(Date.now() + (10082 * 60000)),
    });
    res.cookie('token', token, {
      expires: new Date(Date.now() + (10082 * 60000)),
    });

    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get('/feed', async (req, res) => {
  const { token } = req.cookies;
  const queryGetToken = `SELECT *   
  FROM Sessions
  WHERE token='${token}'`;
  const getDateToken = (await client.query(queryGetToken)).rows;
  if (!req.cookies.token || ((new Date() - new Date(getDateToken[0]?.date)) / 60000 > 10_082)) {
    return res.status(401).send('<script> alert("пользователь не авторизован") </script>');
  }
  return res.status(200).type('html').send(html);
});
