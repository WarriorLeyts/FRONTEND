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
  host: 'dpg-cs1c9223esus739dgd20-a.oregon-postgres.render.com',
  database: 'demos_zv3i',
  password: 'bm2lPZs8m2TL79gW4ZTcQz0pua6QQeyD',
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
  const { token } = req.cookies;
  const queryGetToken = `SELECT *   
  FROM Sessions
  WHERE token='${token}'`;
  const getToken = (await client.query(queryGetToken)).rows[0];

  const queryGetBlogs = `SELECT users.id AS id, name, nickname, avatar, id_follower, aboutme
  FROM Subscriptions
  JOIN Users ON Subscriptions.id_user = Users.id`;

  const getBlogs = (await client.query(queryGetBlogs)).rows;
  let blogs = [];
  const idUserCurrent = getToken?.id_user ? getToken?.id_user : 0;

  getBlogs.forEach((item) => {
    let point = 0;
    let isUniq = true;
    const countSub = getBlogs.filter((itemFilt) => itemFilt.id === item.id).length;
    const subscriptionMessage = (item.id_follower === idUserCurrent) ? 'Читаю' : 'Читать';

    blogs.forEach((item2, index) => {
      if (item.id === item2.id) {
        isUniq = false;
      }
      if ((item.id === item2.id) && (item.id_follower === idUserCurrent)) {
        point = index;
      }
    });

    if (isUniq) {
      blogs.push({ ...item, countSub, subscriptionMessage });
    }
    if (point) {
      blogs[point].subscriptionMessage = 'Читаю';
      blogs[point].id_follower = item.id_follower;
    }
  });
  blogs = blogs.sort((a, b) => b.countSub - a.countSub).slice(0, 3);
  return res.status(200).send(blogs);
});
app.get('/topics.json', async (req, res) => {
  const queryAllMesages = `SELECT message
  FROM Posts`;

  const allMessages = (await client.query(queryAllMesages)).rows;
  let topics = [];

  allMessages.forEach((item) => {
    let isUniq = true;
    let hashTags = '';
    item.message.toLowerCase().split(' ').forEach((word) => {
      const countMessages = 1;
      let point = 0;
      if (word[0] === '#') {
        topics.forEach((topic, index) => {
          if (topic.hashName.startsWith(word.slice(0, word.length - 1))) {
            isUniq = false;
            point = index;
          }
        });
        if (isUniq) {
          topics.push({ hashName: word, countMessages });
        } else {
          topics[point] = {
            hashName: topics[point].hashName,
            countMessages: hashTags.includes(word.slice(0, word.length - 1))
              ? topics[point].countMessages : topics[point].countMessages + 1,
          };
        }
        hashTags += word;
      }
    });
  });
  topics = topics.sort((a, b) => b.countMessages - a.countMessages).slice(0, 5);

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
    const queryGetCountPosts = `SELECT * FROM Posts WHERE id_user = '${tokenAndUser.id}'`;
    const queryGetCountFollowers = `SELECT * FROM Subscriptions WHERE id_user = '${tokenAndUser.id}'`;
    const queryGetCountFolloweds = `SELECT * FROM Subscriptions WHERE id_follower = '${tokenAndUser.id}'`;

    const arrQueryDate = await Promise.all([
      client.query(queryGetCountPosts),
      client.query(queryGetCountFollowers),
      client.query(queryGetCountFolloweds),
    ]);

    const user = {
      id: tokenAndUser.id,
      name: tokenAndUser.name,
      nickname: tokenAndUser.nickname,
      aboutme: tokenAndUser.aboutme,
      location: tokenAndUser.location,
      website: tokenAndUser.website,
      dateOfBirth: tokenAndUser.date_of_birth,
      showBirthDate: tokenAndUser.show_birth_date,
      avatar: tokenAndUser.avatar,
      countPosts: arrQueryDate[0].rows.length,
      countFollowers: arrQueryDate[1].rows.length,
      countFolloweds: arrQueryDate[2].rows.length,
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
app.get('/posts/user/:id.json', async (req, res) => {
  const { id } = req.params;
  const queryGetPosts = `SELECT * 
  FROM Posts
  JOIN Users ON Posts.id_user = Users.id
  WHERE id_user = '${id}'
  ORDER BY Posts.id DESC`;
  const posts = (await client.query(queryGetPosts)).rows;
  return res.status(200).json({ posts });
});
app.get('/api/profile/:id', async (req, res) => {
  const { id } = req.params;
  const queryGetPosts = `SELECT id, nickname, avatar, name, aboutme, location, date_of_birth, show_birth_date, website
  FROM Users
  WHERE id = '${id}'`;
  const user = (await client.query(queryGetPosts)).rows[0];

  if (user && user.show_birth_date !== 'showAll') {
    delete user?.date_of_birth;
  }
  const queryGetCountPosts = `SELECT * FROM Posts WHERE id_user = '${id}'`;
  const queryGetCountFollowers = `SELECT * FROM Subscriptions WHERE id_user = '${id}'`;
  const queryGetCountFolloweds = `SELECT * FROM Subscriptions WHERE id_follower = '${id}'`;

  const arrQueryDate = await Promise.all([
    client.query(queryGetCountPosts),
    client.query(queryGetCountFollowers),
    client.query(queryGetCountFolloweds),
  ]);

  const profile = {
    ...user,
    countPosts: arrQueryDate[0].rows.length,
    countFollowers: arrQueryDate[1].rows.length,
    countFolloweds: arrQueryDate[2].rows.length,
  };

  return res.status(200).json({ profile });
});
app.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const queryGetPosts = `SELECT *
  FROM Users
  WHERE id = '${id}'`;
  try {
    const user = (await client.query(queryGetPosts)).rows[0];
    if (!user) {
      return res.status(401).send('<script> alert("пользователь не найден") </script>');
    }
    return res.status(200).type('html').send(html);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
app.get('/api/subscriptions/is-following/:followedId', async (req, res) => {
  const { token } = req.cookies;
  const { followedId } = req.params;
  const queryGetToken = `SELECT *   
  FROM Sessions
  WHERE token='${token}'`;
  const getToken = (await client.query(queryGetToken)).rows[0];

  if (!token || !getToken
    || ((new Date() - new Date(getToken.created_at)) / 60000 > minutsOfWeek)) {
    return res.status(400).json({ message: 'пользователь не авторизован' });
  }
  const queryIsFollowing = `SELECT * 
  FROM Subscriptions
  WHERE id_user = '${followedId}' AND id_follower = '${getToken?.id_user}'`;

  const isFollowing = (await client.query(queryIsFollowing)).rows[0];

  if (isFollowing) {
    return res.status(200).json({ subscriptionMessage: 'Читаю' });
  }
  return res.status(200).json({ subscriptionMessage: 'Читать' });
});
app.post('/api/subscriptions/toggle/:followedId', async (req, res) => {
  const { token } = req.cookies;
  const { followedId } = req.params;

  const queryGetToken = `SELECT *   
  FROM Sessions
  WHERE token='${token}'`;

  const getToken = (await client.query(queryGetToken)).rows[0];

  if (!token || !getToken
    || ((new Date() - new Date(getToken.created_at)) / 60000 > minutsOfWeek)) {
    return res.status(400).json({ message: 'пользователь не авторизован' });
  }

  if (getToken?.id_user === +followedId) {
    return res.status(200).json({ subscriptionMessage: 'Читать' });
  }
  const queryIsFollowing = `SELECT * 
  FROM Subscriptions
  WHERE id_user = '${followedId}' AND id_follower = '${getToken?.id_user}'`;

  const queryUnsubscribe = `DELETE 
  FROM Subscriptions 
  WHERE id_user = '${followedId}' AND id_follower = '${getToken?.id_user}'`;

  const querySubscribe = `INSERT INTO Subscriptions (id_user, id_follower)
  VALUES ('${followedId}', '${getToken?.id_user}');`;

  const isFollowing = (await client.query(queryIsFollowing)).rows[0];

  if (isFollowing) {
    client.query(queryUnsubscribe);
    return res.status(200).json({ subscriptionMessage: 'Читать' });
  }
  client.query(querySubscribe);
  return res.status(200).json({ subscriptionMessage: 'Читаю' });
});

app.get('/posts/subscriptions', async (req, res) => {
  const { token } = req.cookies;

  const queryGetToken = `SELECT *   
  FROM Sessions
  WHERE token='${token}'`;

  const getToken = (await client.query(queryGetToken)).rows[0];

  if (!token || !getToken
    || ((new Date() - new Date(getToken.created_at)) / 60000 > minutsOfWeek)) {
    return res.status(400).json({ message: 'пользователь не авторизован' });
  }
  const queryGetPosts = `SELECT Posts.*, Users.*
  FROM Posts
  JOIN Users ON Posts.id_user = Users.id
  WHERE Posts.id_user IN (
    SELECT id_user
    FROM Subscriptions
    WHERE id_follower = '${getToken?.id_user}'
    UNION
    SELECT ${getToken?.id_user}
  )
  ORDER BY Posts.date DESC;`;

  const posts = (await client.query(queryGetPosts)).rows;
  return res.status(200).json({ posts });
});

app.get('/api/profile/:id/followers', async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  const queryGetToken = `SELECT *   
  FROM Sessions
  WHERE token='${token}'`;

  const getToken = (await client.query(queryGetToken)).rows[0];
  if (!token || !getToken
    || ((new Date() - new Date(getToken.created_at)) / 60000 > minutsOfWeek)) {
    return res.status(400).json({ message: 'пользователь не авторизован' });
  }

  const queryGetFollowers = `SELECT *
  FROM Subscriptions
  JOIN Users ON Subscriptions.id_follower = Users.id
  WHERE Subscriptions.id_user = '${id}'`;

  let followers = (await client.query(queryGetFollowers)).rows;

  followers = followers?.map(async (item) => {
    const queryIsFollowing = `SELECT *
    FROM Subscriptions
    WHERE id_user = '${item.id}' AND id_follower = '${getToken?.id_user}'`;
    const isFollowing = (await client.query(queryIsFollowing)).rows[0];
    return { ...item, subscriptionMessage: isFollowing ? 'Читаю' : 'Читать' };
  });

  followers = await Promise.all(followers);
  return res.status(200).json({ followers });
});

app.get('/api/profile/:id/following', async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const queryGetToken = `SELECT *   
  FROM Sessions
  WHERE token='${token}'`;
  const getToken = (await client.query(queryGetToken)).rows[0];

  if (!token || !getToken
    || ((new Date() - new Date(getToken.created_at)) / 60000 > minutsOfWeek)) {
    return res.status(400).json({ message: 'пользователь не авторизован' });
  }

  const queryGetFollowers = `SELECT *
    FROM Subscriptions
    JOIN Users ON Subscriptions.id_user = Users.id
    WHERE Subscriptions.id_follower = '${id}'`;

  let following = (await client.query(queryGetFollowers)).rows;

  following = following?.map(async (item) => {
    const queryIsFollowing = `SELECT *
    FROM Subscriptions
    WHERE id_user = '${item.id}' AND id_follower = '${getToken?.id_user}'`;
    const isFollowing = (await client.query(queryIsFollowing)).rows[0];
    return { ...item, subscriptionMessage: isFollowing ? 'Читаю' : 'Читать' };
  });

  following = await Promise.all(following);
  return res.status(200).json({ following });
});

app.get('/api/search', async (req, res) => {
  const { tag } = req.query;

  const queryGetPosts = `SELECT users.id, name, nickname, avatar, message, message_img, date
   FROM Posts
   JOIN Users ON Posts.id_user = Users.id
   ORDER BY Posts.date DESC`;

  let posts = (await client.query(queryGetPosts)).rows;
  posts = posts.filter((post) => post.message.includes(tag.slice(0, -1)));
  posts = JSON.stringify(posts);
  return res.status(200).send(posts);
});

app.get('/search', async (req, res) => {
  const { tag } = req.query;

  const queryGetPosts = `SELECT users.id, name, nickname, avatar, message, message_img, date
   FROM Posts
   JOIN Users ON Posts.id_user = Users.id
   ORDER BY Posts.date DESC`;

  let posts = (await client.query(queryGetPosts)).rows;
  posts = posts.filter((post) => post.message.includes(tag.slice(0, -1)));

  if (!posts.length) {
    return res.status(401).send('<script> alert("Нет сообщений с данным хэштегом") </script>');
  }
  return res.status(200).type('html').send(html);
});
