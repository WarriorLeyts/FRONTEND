export default function posSize(message) {
  let arrDomen = ['.biz','.com','.edu','.gov','.info','.mil','.movie',
                 '.su','.net','.org','.pro','.tv','.name','.ru','.xyz'];
  let arrMessage = [];

  arrMessage = message.split(' ') // разбиваем строку на массив 
  
  arrDomen.forEach( domen =>{  // находим элемент массива с доменом
     arrMessage.forEach(el => {
       if (el.includes(domen)) {
        message = message.replace(el,'') }       // удаляем url
     });
   })
   
  return message.length // возвращаем длину строки
}