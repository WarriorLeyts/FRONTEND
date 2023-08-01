import emailValidation from './email_validation.js';

const EX1 = document.getElementById('ex1');
const EX2 = document.getElementById('ex2');
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
EX1.addEventListener('click', () => {
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
BTNREGWIN.addEventListener('click', () => {
  if (INPREGLOGIN.querySelector('.window-input__input').value === '') {
    INPREGLOGIN.querySelector('.login-vd').innerHTML = 'Укажите имя';
    INPREGLOGIN.querySelector('.login-vd').style.display = 'block';
    INPREGLOGIN.querySelector('.window-input').style.marginBottom = '0px';
    INPREGLOGIN.querySelector('.window-input').style.border = '1px solid #FF97C3';
    INPREGLOGIN.querySelector('.window-input').style.background = '#FFDEEC';
    INPREGLOGIN.querySelector('.window-input__input').style.background = '#FFDEEC';
  } else {
    INPREGLOGIN.querySelector('.login-vd').style.display = 'none';
    INPREGLOGIN.querySelector('.window-input').style.marginBottom = '24px';
    INPREGLOGIN.querySelector('.window-input').style.border = '1px solid #DFDFDF';
    INPREGLOGIN.querySelector('.window-input').style.background = '#FFF';
    INPREGLOGIN.querySelector('.window-input__input').style.background = '#FFF';
  }
  if (INPREGMAIL.querySelector('.window-input__input').value === '') {
    INPREGMAIL.querySelector('.mail-vd').innerHTML = 'Укажите адрес почты';
    INPREGMAIL.querySelector('.mail-vd').style.display = 'block';
    INPREGMAIL.querySelector('.window-input').style.marginBottom = '0px';
    INPREGMAIL.querySelector('.window-input').style.border = '1px solid #FF97C3';
    INPREGMAIL.querySelector('.window-input').style.background = '#FFDEEC';
    INPREGMAIL.querySelector('.window-input__input').style.background = '#FFDEEC';
  } else if (!emailValidation(INPREGMAIL.querySelector('.window-input__input').value)) {
    INPREGMAIL.querySelector('.mail-vd').innerHTML = 'Адрес не валиден';
    INPREGMAIL.querySelector('.mail-vd').style.display = 'block';
    INPREGMAIL.querySelector('.window-input').style.marginBottom = '0px';
    INPREGMAIL.querySelector('.window-input').style.border = '1px solid #FF97C3';
    INPREGMAIL.querySelector('.window-input').style.background = '#FFDEEC';
    INPREGMAIL.querySelector('.window-input__input').style.background = '#FFDEEC';
  } else {
    INPREGMAIL.querySelector('.mail-vd').style.display = 'none';
    INPREGMAIL.querySelector('.window-input').style.marginBottom = '24px';
    INPREGMAIL.querySelector('.window-input').style.border = '1px solid #DFDFDF';
    INPREGMAIL.querySelector('.window-input').style.background = '#FFF';
    INPREGMAIL.querySelector('.window-input__input').style.background = '#FFF';
  }
  if (INPREGPASS.querySelector('.window-input__input').value === '') {
    INPREGPASS.querySelector('.password-vd').innerHTML = 'Укажите пароль';
    INPREGPASS.querySelector('.password-vd').style.display = 'block';
    INPREGPASS.querySelector('.window-input').style.marginBottom = '0px';
    INPREGPASS.querySelector('.window-input').style.border = '1px solid #FF97C3';
    INPREGPASS.querySelector('.window-input').style.background = '#FFDEEC';
    INPREGPASS.querySelector('.window-input__input').style.background = '#FFDEEC';
  } else {
    INPREGPASS.querySelector('.password-vd').style.display = 'none';
    INPREGPASS.querySelector('.window-input').style.marginBottom = '24px';
    INPREGPASS.querySelector('.window-input').style.border = '1px solid #DFDFDF';
    INPREGPASS.querySelector('.window-input').style.background = '#FFF';
    INPREGPASS.querySelector('.window-input__input').style.background = '#FFF';
  }
  if (INPREGPASS.querySelector('.window-input__input').value !== INPREGPASSCONF.querySelector('.window-input__input').value) {
    INPREGPASSCONF.querySelector('.confirm-password-vd').innerHTML = 'пароли не совпадают';
    INPREGPASSCONF.querySelector('.confirm-password-vd').style.display = 'block';
    INPREGPASSCONF.querySelector('.window-input').style.marginBottom = '0px';
    INPREGPASSCONF.querySelector('.window-input').style.border = '1px solid #FF97C3';
    INPREGPASSCONF.querySelector('.window-input').style.background = '#FFDEEC';
    INPREGPASSCONF.querySelector('.window-input__input').style.background = '#FFDEEC';
  } else {
    INPREGPASSCONF.querySelector('.confirm-password-vd').style.display = 'none';
    INPREGPASSCONF.querySelector('.window-input').style.marginBottom = '24px';
    INPREGPASSCONF.querySelector('.window-input').style.border = '1px solid #DFDFDF';
    INPREGPASSCONF.querySelector('.window-input').style.background = '#FFF';
    INPREGPASSCONF.querySelector('.window-input__input').style.background = '#FFF';
  }
  if (INPREGLOGIN.querySelector('.login-vd').style.display === 'none'
  && INPREGMAIL.querySelector('.mail-vd').style.display === 'none'
  && INPREGPASS.querySelector('.password-vd').style.display === 'none'
  && INPREGPASSCONF.querySelector('.confirm-password-vd').style.display === 'none') {
    console.log(INPREGLOGIN.querySelector('.window-input__input').value);
    console.log(INPREGMAIL.querySelector('.window-input__input').value);
    console.log(INPREGPASS.querySelector('.window-input__input').value);
  }
});
