import emailValidation from './email_validation.js';
import getTimeString from './get_time_string.js';

const EX2 = document.getElementById('ex2');
const USERSREGISTR = document.getElementById('usersRegistr');
const WRITMESSAGES = document.getElementById('writMessages');
const WRITTODAY = document.getElementById('writToday');
const HANDEX1 = document.getElementById('handler-ex1');
const HANDEX2 = document.getElementById('handler-ex2');
const BTNREGISTR1 = document.getElementById('registration1');
const BTNAUTHOR1 = document.getElementById('authorization1');
const BTNREGISTR2 = document.getElementById('registration2');
const BTNAUTHOR2 = document.getElementById('authorization2');
const REGWINDOW = document.getElementById('registration-window');
const BLREGWINDOW = document.getElementById('block-registration-window');
const BLAUTHORWINDOW = document.getElementById('block-authorization-window');
const REGAUTHOR = document.getElementById('authorization-window');
const BTNREGWIN = document.getElementById('btn-registration-window');
const INPREGLOGIN = document.getElementById('input-reg-login');
const INPREGMAIL = document.getElementById('input-reg-mail');
const INPREGPASS = document.getElementById('input-reg-pass');
const INPREGPASSCONF = document.getElementById('input-reg-pass-conf');
BTNREGISTR1.addEventListener('click', () => {
  REGWINDOW.style.display = 'flex';
});
BTNAUTHOR1.addEventListener('click', () => {
  REGAUTHOR.style.display = 'flex';
});
BTNREGISTR2.addEventListener('click', () => {
  REGWINDOW.style.display = 'flex';
});
BTNAUTHOR2.addEventListener('click', () => {
  REGAUTHOR.style.display = 'flex';
});
document.getElementById('ex1').addEventListener('click', () => {
  REGWINDOW.style.display = 'none';
  REGAUTHOR.style.display = 'none';
});

EX2.addEventListener('click', () => {
  REGAUTHOR.style.display = 'none';
});
HANDEX1.addEventListener('touchmove', () => {
  HANDEX1.style.opacity = 0;
  BLREGWINDOW.style.transform = 'translate(0px, 800px)';
});
HANDEX1.addEventListener('touchend', () => {
  BLREGWINDOW.style.transform = 'none';
  HANDEX1.style.opacity = 1;
  REGWINDOW.style.display = 'none';
});
HANDEX2.addEventListener('touchmove', () => {
  HANDEX2.style.opacity = 0;
  BLAUTHORWINDOW.style.transform = 'translate(0px, 800px)';
});
HANDEX2.addEventListener('touchend', () => {
  BLAUTHORWINDOW.style.transform = 'none';
  HANDEX2.style.opacity = 1;
  REGAUTHOR.style.display = 'none';
});
BTNREGWIN.addEventListener('click', async () => {
  if (INPREGLOGIN.querySelector('.window-input__input').value === '') {
    INPREGLOGIN.querySelector('.login-vd').innerHTML = 'Укажите имя';
    INPREGLOGIN.querySelector('.login-vd').classList.add('valErrorStyle');
    INPREGLOGIN.querySelector('.window-input').classList.add('inpErrorStyle');
    INPREGLOGIN.querySelector('.window-input__input').classList.add('inpErrorStyle');
  } else {
    INPREGLOGIN.querySelector('.window-input').classList.remove('valErrorStyle');
    INPREGLOGIN.querySelector('.window-input').classList.remove('inpErrorStyle');
    INPREGLOGIN.querySelector('.window-input__input').classList.remove('inpErrorStyle');
  }
  if (INPREGMAIL.querySelector('.window-input__input').value === '') {
    INPREGMAIL.querySelector('.mail-vd').innerHTML = 'Укажите адрес почты';
    INPREGMAIL.querySelector('.mail-vd').classList.add('valErrorStyle');
    INPREGMAIL.querySelector('.window-input').classList.add('inpErrorStyle');
    INPREGMAIL.querySelector('.window-input__input').classList.add('inp2ErrorStyle');
  } else if (!emailValidation(INPREGMAIL.querySelector('.window-input__input').value)) {
    INPREGMAIL.querySelector('.mail-vd').innerHTML = 'Адрес не валиден';
    INPREGMAIL.querySelector('.mail-vd').classList.add('valErrorStyle');
    INPREGMAIL.querySelector('.window-input').classList.add('inpErrorStyle');
    INPREGMAIL.querySelector('.window-input__input').classList.add('inp2ErrorStyle');
  } else {
    INPREGMAIL.querySelector('.mail-vd').classList.remove('valErrorStyle');
    INPREGMAIL.querySelector('.window-input').classList.remove('inpErrorStyle');
    INPREGMAIL.querySelector('.window-input__input').classList.remove('inp2ErrorStyle');
  }
  if (INPREGPASS.querySelector('.window-input__input').value === '') {
    INPREGPASS.querySelector('.password-vd').classList.add('valErrorStyle');
    INPREGPASS.querySelector('.window-input').classList.add('inpErrorStyle');
    INPREGPASS.querySelector('.window-input__input').classList.add('inp2ErrorStyle');
  } else {
    INPREGPASS.querySelector('.password-vd').classList.remove('valErrorStyle');
    INPREGPASS.querySelector('.window-input').classList.remove('inpErrorStyle');
    INPREGPASS.querySelector('.window-input__input').classList.remove('inp2ErrorStyle');
  }

  if (INPREGPASS.querySelector('.window-input__input').value !== INPREGPASSCONF.querySelector('.window-input__input').value) {
    INPREGPASSCONF.querySelector('.confirm-password-vd').classList.add('valErrorStyle');
    INPREGPASSCONF.querySelector('.window-input').classList.add('inpErrorStyle');
    INPREGPASSCONF.querySelector('.window-input__input').classList.add('inp2ErrorStyle');
  } else {
    INPREGPASSCONF.querySelector('.confirm-password-vd').classList.remove('valErrorStyle');
    INPREGPASSCONF.querySelector('.window-input').classList.remove('inpErrorStyle');
    INPREGPASSCONF.querySelector('.window-input__input').classList.remove('inp2ErrorStyle');
  }
  if (INPREGLOGIN.querySelector('.login-vd').style.display !== 'block'
  && INPREGMAIL.querySelector('.mail-vd').style.display !== 'block'
  && INPREGPASS.querySelector('.password-vd').style.display !== 'block'
  && INPREGPASSCONF.querySelector('.confirm-password-vd').style.display !== 'block') {
    const createUser = {
      name: INPREGLOGIN.querySelector('.window-input__input').value,
      email: INPREGMAIL.querySelector('.window-input__input').value,
      password: INPREGPASS.querySelector('.window-input__input').value,
    };
    let response = await fetch('/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(createUser),
    });
    if (response.status === 200) {
      REGWINDOW.style.display = 'none';
      REGAUTHOR.style.display = 'none';
      window.location.href = '#';
    }
    if (response.status === 400) {
      response = await response.json();
      INPREGMAIL.querySelector('.mail-vd').innerHTML = response.message;
      INPREGMAIL.querySelector('.mail-vd').classList.add('valErrorStyle');
      INPREGMAIL.querySelector('.window-input').classList.add('inpErrorStyle');
      INPREGMAIL.querySelector('.window-input__input').classList.add('inp2ErrorStyle');
    }
  }
});
REGAUTHOR.querySelector('.btn-authorization-window').addEventListener('click', async () => {
  if (REGAUTHOR.querySelector('.input-mail').querySelector('.window-input__input').value === '') {
    REGAUTHOR.querySelector('.mail-vd').innerHTML = 'Введите адрес электронной почты';
    REGAUTHOR.querySelector('.mail-vd').classList.add('valErrorStyle');
    REGAUTHOR.querySelector('.input-mail').querySelector('.window-input').classList.add('inpErrorStyle');
    REGAUTHOR.querySelector('.input-mail').querySelector('.window-input__input').classList.add('inp2ErrorStyle');
  } else {
    REGAUTHOR.querySelector('.mail-vd').classList.remove('valErrorStyle');
    REGAUTHOR.querySelector('.input-mail').querySelector('.window-input').classList.remove('inpErrorStyle');
    REGAUTHOR.querySelector('.input-mail').querySelector('.window-input__input').classList.remove('inp2ErrorStyle');
  }

  if (REGAUTHOR.querySelector('.input-password').querySelector('.window-input__input').value === '') {
    REGAUTHOR.querySelector('.password-vd').innerHTML = 'Введите пароль';
    REGAUTHOR.querySelector('.password-vd').classList.add('valErrorStyle');
    REGAUTHOR.querySelector('.input-password').querySelector('.window-input').classList.add('inpErrorStyle');
    REGAUTHOR.querySelector('.input-password').querySelector('.window-input__input').classList.add('inp2ErrorStyle');
  } else {
    REGAUTHOR.querySelector('.password-vd').classList.remove('valErrorStyle');
    REGAUTHOR.querySelector('.input-password').querySelector('.window-input').classList.remove('inpErrorStyle');
    REGAUTHOR.querySelector('.input-password').querySelector('.window-input__input').classList.remove('inp2ErrorStyle');
  }
  if (REGAUTHOR.querySelector('.mail-vd').style.display !== 'block'
    && REGAUTHOR.querySelector('.password-vd').style.display !== 'block') {
    const email = REGAUTHOR.querySelector('.input-mail').querySelector('.window-input__input').value;
    const password = REGAUTHOR.querySelector('.input-password').querySelector('.window-input__input').value;
    const authorUser = {
      email,
      password,
    };
    let response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(authorUser),
    });
    if (response.status === 200) {
      REGWINDOW.style.display = 'none';
      REGAUTHOR.style.display = 'none';
      window.location.href = '#';
    }
    if (response.status === 400) {
      response = await response.json();
      REGAUTHOR.querySelector('.password-vd').innerHTML = response.message;
      REGAUTHOR.querySelector('.input-mail').querySelector('.window-input').classList.add('inpErrorStyle');
      REGAUTHOR.querySelector('.input-mail').querySelector('.window-input__input').classList.add('inp2ErrorStyle');
      REGAUTHOR.querySelector('.password-vd').classList.add('valErrorStyle');
      REGAUTHOR.querySelector('.input-password').querySelector('.window-input').classList.add('inpErrorStyle');
      REGAUTHOR.querySelector('.input-password').querySelector('.window-input__input').classList.add('inp2ErrorStyle');
    }
  }
});
(async () => {
  const data = await fetch('./data.json').then((response) => response.json());
  const data2 = await fetch('./profiles.json').then((response) => response.json());
  USERSREGISTR.innerHTML = data.static.usersRegistr;
  WRITMESSAGES.innerHTML = data.static.writMessages;
  WRITTODAY.innerHTML = data.static.writToday;
  const lastMessages = data.lastMessages.slice(0);
  const blogs = data.blogs.slice(0);
  data.lastMessages.forEach((item, index) => {
    data2.users.forEach((item1) => {
      if (item.user_id === item1.id) {
        lastMessages[index].urlPictures = item1.url;
      }
    });
  });
  blogs.forEach((item, index) => {
    data2.users.forEach((item1) => {
      if (item.user_id === item1.id) {
        blogs[index].urlPictures = item1.url;
      }
    });
  });
  const topics = data.topics.slice(0);
  function enterMessages() {
    for (let i = 0; i < lastMessages.length; i += 1) {
      let dateMessage = lastMessages[i].date.split(' ');
      dateMessage = `${dateMessage[0].split('.').reverse().join('.')} ${dateMessage[1]}`;
      dateMessage = new Date(dateMessage);
      let timePassed = (new Date() - dateMessage) / 60000;
      timePassed = getTimeString(timePassed);
      const messageImg = typeof lastMessages[i].img_message !== 'undefined'
        ? `<img class="message-img" src="${lastMessages[i].img_message}" alt=""></img>` : '';
      const HTML = `<a class="avatar" href="#"><img class="post__avatar" src="${lastMessages[i].urlPictures}"alt=""></a>
      <div class="user">
          <div class="user-information">
              <a href="#" class="user-information__user-name" >
              ${lastMessages[i].name}<span class="mail">${lastMessages[i].mail}</span>
              </a> 
              <div class="user-information__time-message">
              <p>${timePassed}</p>
              </div>
          </div>
          <div class="user-message mg-rg">
          <p>${lastMessages[i].message}</p>
          ${messageImg}
          </div>
          <div class="user-interaction">
           <div class="user-interaction__item">
              <a href=""><svg  class="user-interaction__icon" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path  d="M4.6875 0.8125L1.40625 4.5625M1.40625 4.5625L4.6875 8.3125M1.40625 4.5625H8.4375C12.1875 4.5625 14.0625 6.4375 14.0625 10.1875" stroke="#ABACB1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg></a>
              <p>${lastMessages[i].quantityReposts}</p>
            </div>
            <div class="user-interaction__item">
              <a href=""><svg class="user-interaction__favs" width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path  d="M1.875 6.5C0.46875 4.625 0.9375 1.8125 3.28125 0.875C5.625 -0.0624999 7.03125 1.8125 7.5 2.75C7.96875 1.8125 9.84375 -0.0624999 12.1875 0.875C14.5312 1.8125 14.5312 4.625 13.125 6.5C11.7187 8.375 7.5 12.125 7.5 12.125C7.5 12.125 3.28125 8.375 1.875 6.5Z" stroke="#ABACB1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg></a>
              <p>${lastMessages[i].quantityLike}</p>
            </div>
            <div class="user-interaction__item">
              <a href=""><svg class="user-interaction__icon" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path  d="M12.125 9.3125V13.0625H0.875V9.3125M6.5 0.875V10.25M6.5 0.875L2.75 4.625M6.5 0.875L10.25 4.625" stroke="#ABACB1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </a>
              <p>${lastMessages[i].quantityShare}</p>
            </div>
          </div>`;
      document.getElementById(`post_${i + 1}`).innerHTML = HTML;
    }
    for (let i = 0; i < topics.length; i += 1) {
      const HTMLHASH = `<p class="hashtag">${topics[i].hashName}</p>
        <span class="hashtag-sub">${topics[i].numOfMessage}</span>`;
      document.getElementById(`hash-li_${i + 1}`).innerHTML = HTMLHASH;
    }
    for (let i = 0; i < blogs.length; i += 1) {
      const HTMLBLOGS = `<img src="${blogs[i].urlPictures}" alt="" class="blog-icon">
        <div class="blog-info">
          <p class="blog-name">${blogs[i].name}
          </p>
          <span class="blog-sub">${blogs[i].mail}</span>
          </div>
        <a class="blogs__btn" href="#">Читать</a>`;
      document.getElementById(`blog_${i + 1}`).innerHTML = HTMLBLOGS;
    }
  }
  enterMessages();
  setInterval(() => {
    enterMessages();
  }, 60000);
})();

console.log((async () => { await fetch('/posts.json'); })());
