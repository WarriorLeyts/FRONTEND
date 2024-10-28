export default function getReplaceLink(message) {
  const arrDomen = ['.biz', '.com', '.edu', '.gov', '.info', '.mil', '.movie', '.su', '.net', '.org', '.pro', '.tv', '.name', '.ru', '.xyz'];
  let arrMessage = [];
  arrMessage = message.split(' '); // разбиваем строку на массив

  arrDomen.forEach((domen) => { // находим элемент массива с доменом
    arrMessage.forEach((el, index) => {
      if (el.includes(domen)) {
        let replace;
        let protocol;
        if (el.includes('https://') || el.includes('http://')) { // проверка на наличие протокола с ссылкой.
          replace = el;
          protocol = el.includes('https://') ? 'https://' : 'http://'; // вычисляем нужный протокол для удаления.
        } else {
          replace = `https://${el}`;
        }
        arrMessage[index] = `<a href="${replace}">${el.replace(protocol, '')}</a>`; // возвращаем ссылку с тегом "a", и удаляем протокол ссылки (если имеется).
      }
    });
  });

  return arrMessage.join(' '); // возвращаем измененную строку.
}
