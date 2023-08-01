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
