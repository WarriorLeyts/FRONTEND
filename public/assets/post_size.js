export default function postSize(message) {
  const arrDomen = ['.biz', '.com', '.edu', '.gov', '.info', '.mil', '.movie', '.su', '.net', '.org', '.pro', '.tv', '.name', '.ru', '.xyz'];
  let arrMessage = [];
  let res = message;
  arrMessage = message.split(' '); // разбиваем строку на массив

  arrDomen.forEach((domen) => { // находим элемент массива с доменом
    arrMessage.forEach((el) => {
      if (el.includes(domen)) {
        res = res.replace(el, ''); // удаляем url
      }
    });
  });

  return res.length; // возвращаем длину строки
}
