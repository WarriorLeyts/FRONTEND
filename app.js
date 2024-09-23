import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import fs from 'fs';
import emailValidation from './src/email_validation.js';

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
const minutsOfWeek = 10_082;
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
  const nickname = `user-${crypto.randomUUID().slice(0, 6)}`;
  try {
    const candidate = await client.query(`SELECT * FROM Users WHERE email='${email}'`);
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
    return res.status(201).json({});
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
      expires: new Date(Date.now() + (minutsOfWeek * 60000)),
    });
    res.cookie('token', token, {
      expires: new Date(Date.now() + (minutsOfWeek * 60000)),
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
  try {
    if (!token) {
      return res.status(401).send('<script> alert("пользователь не авторизован") </script>');
    }
    const getDateToken = (await client.query(queryGetToken)).rows[0];
    if (!getDateToken) {
      return res.status(401).send('<script> alert("пользователь не авторизован") </script>');
    }
    if (((new Date() - new Date(getDateToken?.created_at)) / 60000 > minutsOfWeek)) {
      return res.status(401).send('<script> alert("пользователь не авторизован") </script>');
    }
    return res.status(200).type('html').send(html);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get('/api/settings/profile', async (req, res) => {
  const { token } = req.cookies;
  const getTokenAndUser = `SELECT * 
  FROM Sessions
  JOIN Users ON Sessions.id_user = Users.id
  WHERE token='${token}'`;
  try {
    if (!token) {
      throw new Error('пользователь не авторизован');
    }
    const tokenAndUser = (await client.query(getTokenAndUser)).rows[0];
    if (!tokenAndUser) {
      throw new Error('пользователь не авторизован');
    }
    if (((new Date() - new Date(tokenAndUser.created_at)) / 60000 > minutsOfWeek)) {
      throw new Error('пользователь не авторизован');
    }
    const user = {
      name: tokenAndUser.name,
      nickname: tokenAndUser.nickname,
      aboutme: tokenAndUser.aboutme,
      location: tokenAndUser.location,
      website: tokenAndUser.website,
      dateOfBirth: tokenAndUser.date_of_birth,
      showBirthDate: tokenAndUser.show_birth_date,
      avatar: tokenAndUser.avatar,
    };
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});
app.post('/api/settings/profile', async (req, res) => {
  const {
    name, nickname, aboutme, location, website, dateOfBirth, showBirthDate, avatar,
  } = req.body;
  const isNicknameUnique = `SELECT *   
  FROM Users
  WHERE nickname='${nickname}'`;
  const { token } = req.cookies;

  const getTokenAndUser = `SELECT * 
  FROM Sessions
  JOIN Users ON Sessions.id_user = Users.id
  WHERE token='${token}'`;

  const updates = [];

  if (name) updates.push(`name = '${name}'`);
  if (nickname) updates.push(`nickname = '${nickname}'`);
  if (aboutme) updates.push(`aboutme = '${aboutme}'`);
  if (location) updates.push(`location = '${location}'`);
  if (website) updates.push(`website = '${website}'`);
  if (dateOfBirth) updates.push(`date_of_birth = '${dateOfBirth}'`);
  if (showBirthDate) updates.push(`show_birth_date = '${showBirthDate}'`);
  if (avatar) updates.push(`avatar = '${avatar}'`);
  try {
    const tokenAndUser = (await client.query(getTokenAndUser)).rows[0];

    if (!token || !tokenAndUser
      || ((new Date() - new Date(tokenAndUser.created_at)) / 60000 > minutsOfWeek)) {
      throw new Error('пользователь не авторизован');
    }
    const updateUserQuery = `
    UPDATE Users 
    SET 
    ${updates.join(', ')} 
    WHERE id = '${tokenAndUser.id}'`;

    const nicknameUniqueResult = (await client.query(isNicknameUnique)).rows[0];
    if (nicknameUniqueResult) {
      throw new Error('К сожалению, этот никнейм занят');
    }
    await client.query(updateUserQuery);

    return res.status(200).json({ message: 'Данные пользователя обновлены.' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});
app.post('/api/settings/password', async (req, res) => {
  const { token } = req.cookies;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const minLength = 8;
  const queryIsAuth = `SELECT * 
  FROM Sessions
  JOIN Users ON Sessions.id_user = Users.id
  WHERE token='${token}'`;

  try {
    const isAuth = (await client.query(queryIsAuth)).rows[0];
    if (!token || !isAuth
      || ((new Date() - new Date(isAuth.created_at)) / 60000 > minutsOfWeek)) {
      throw new Error('пользователь не авторизован');
    }
    const userPassword = isAuth ? isAuth.password : '';
    const isMatch = await bcrypt.compare(oldPassword, userPassword);

    if (!isMatch) {
      return res.status(401).json({ errOldPass: 'пароль не верный' });
    }
    if (newPassword.length < minLength) {
      return res.status(400).json({ errNewPass: 'Пароль должен содержать не менее 8 символов' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ errConfirm: 'Пароли не совпадают' });
    }

    const queryOldPasswords = `SELECT * 
    FROM Password_history
    WHERE id_user='${isAuth.id}'`;
    const arrOldPasswords = (await client.query(queryOldPasswords)).rows;

    arrOldPasswords.push({ password: isAuth.password });

    const promises = arrOldPasswords.map((item) => bcrypt.compare(newPassword, item.password));
    const results = await Promise.all(promises);
    const matchesOldPassword = results.includes(true);
    if (matchesOldPassword) {
      return res.status(400).json({ errNewPass: 'Новый пароль совпадает c предыдущим паролем' });
    }
    if (((new Date() - new Date(isAuth.last_password_update)) / 60000) < 1440) {
      return res.status(400).json({ errNewPass: 'Нельзя сменить пароль не чаще одного раза в сутки' });
    }
    const cipherPassword = await bcrypt.hash(newPassword, 8);

    const createNewPassword = `UPDATE Users
    SET 
    password = '${cipherPassword}',
    last_password_update = NOW()
    WHERE id = '${isAuth.id}'`;
    const saveOldPassword = `INSERT INTO Password_history (id_user, password) 
    VALUES ('${isAuth.id_user}', '${isAuth.password}')`;

    await client.query(createNewPassword);
    await client.query(saveOldPassword);
    return res.status(200).json({ message: 'Новый пароль создан' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});
app.post('/api/settings/email', async (req, res) => {
  const { token } = req.cookies;
  const { email, password } = req.body;
  const queryIsAuth = `SELECT * 
  FROM Sessions
  JOIN Users ON Sessions.id_user = Users.id
  WHERE token='${token}'`;

  try {
    const isAuth = (await client.query(queryIsAuth)).rows[0];
    if (!token || !isAuth
      || ((new Date() - new Date(isAuth.created_at)) / 60000 > minutsOfWeek)) {
      return res.status(401).json({ errorAuth: 'пользователь не авторизован' });
    }
    const isMatch = await bcrypt.compare(password || '', isAuth.password);
    if (!isMatch) {
      return res.status(400).json({ errorPass: 'Не правильный пароль' });
    }
    if (!emailValidation(email)) {
      return res.status(400).json({ errorEmail: 'Ваш эмайл не валиден' });
    }
    if (email === isAuth.email) {
      return res.status(400).json({ errorEmail: 'Ваш эмайл совпадает с текущим эмайлом' });
    }
    const queryIsEmailTaken = `SELECT * FROM Users WHERE email='${email}'`;
    const isEmailTaken = (await client.query(queryIsEmailTaken)).rows[0];
    if (isEmailTaken) {
      return res.status(400).json({ errorEmail: 'Этот эмайл занят другим пользователем' });
    }
    const queryUpdateEmail = `UPDATE Users
    SET 
    email = '${email}'
    WHERE id = '${isAuth.id}'`;
    await client.query(queryUpdateEmail);
    return res.status(200).json({ message: 'Ваш новый эмайл сохранен.' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
