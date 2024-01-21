import express from 'express';
import fs from 'fs';
import pkg from 'pg';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

const html = fs.readFileSync('public/main.html', 'utf8');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
  if (req.cookies.email) {
    res.type('html').send('<script>window.location.href = "/feed";</script>');
  } else {
    res.type('html').send(html);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { Client } = pkg; // должны быть в самом вверху
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
client.connect(); // вверху
const posts = JSON.stringify((await client.query(queryGetPosts)).rows); // должно быть в энд поинте
app.get('/posts.json', (req, res) => res.send(posts));

app.post('/posts.json', (req) => {
  const queryCreatePost = `INSERT INTO Posts (user_id, date, message, img_message) 
  VALUES (${+req.body.user_id},'${req.body.date}','${req.body.message}','${req.body.img_message}')`; // дата должна создаваться postgres или тут
  client.query((queryCreatePost));
});

app.delete('/posts/:id.json', (req) => {
  const queryDeletePost = `DELETE FROM Posts WHERE post_id = ${req.params.id};`; // вернуть статус во всех эндпоинтах
  client.query((queryDeletePost));
});

app.post('/posts/:id.json', (req) => { // mass assigment
  const arrKeys = Object.keys(req.body);
  const arrValues = Object.values(req.body);
  const valuesEdit = arrKeys.map((item, index) => `${item} = '${arrValues[index]}'`).join(','); // оставить возможность редактиповать текст сообщ.
  const queryEditPost = `UPDATE Posts SET ${valuesEdit} WHERE post_id = ${req.params.id}`;
  client.query((queryEditPost));
});

app.post('/createUser', async (req, res) => { // записать куки
  const findEmail = await client.query(`SELECT * FROM Users WHERE user_email='${req.body.email}'`); // проверить есть ли массив
  if (Object.keys(findEmail.rows).length === 0) { // сделать условие с отрицанием
    const cipherPassword = await bcrypt.hash(req.body.password, 8);
    const createUser = `INSERT INTO Users (user_name, user_email, password) 
    VALUES ('${req.body.name}','${req.body.email}','${cipherPassword}')`;
    client.query((createUser));
    return res.status(200).send();
  }
  return res.status(400).send({ message: 'Пользователь с таким email уже существует.' }); // начальная строка
});
app.post('/login', async (req, res) => { // записать куки
  const findUser = await client.query(`SELECT * FROM Users WHERE user_email='${req.body.email}'`);
  const userPassword = typeof (findUser.rows[0]?.password) !== 'undefined' ? findUser.rows[0].password : '';
  const isMatch = await bcrypt.compare(req.body.password, userPassword);
  if (isMatch) { // сделать условие с отрицанием
    const createToken = `INSERT INTO Sessions (user_id, date_token, token) 
    VALUES (${+findUser.rows[0].user_id},'${req.body.dateToken}','${req.body.token}')`;
    client.query(createToken);
    return res.status(200).send();
  }
  return res.status(400).send({ message: 'Проверьте введенный email и пароль' });
});
app.get('/feed', (req, res) => {
  if (req.cookies.email) {
    res.type('html').send('<h1>Страница feed</h1>');
  } else {
    setTimeout(() => {
      res.type('html').send('<script> alert("пользователь не авторизован") </script>');
    }, '1000');
  }
});
