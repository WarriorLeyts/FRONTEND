export default function posSize(message) {
    let arrDomen = ['www','http','https','.biz','.com','.edu','.gov','.info','.mil','.movie',
                   '.museum','.net','.org','.pro','.tv','.name','.club','.xyz'];
    let arrMessage = [];
    let url = ''; 

    arrMessage = message.split(' ') // разбиваем строку на массив 
    
    arrDomen.forEach( domen =>{  // находим элемент массива с доменом
       arrMessage.forEach(el => {
         if (el.includes(domen)) url = el        // присваиваем найденный элемент к переменной
       });
     })
     
    return message.replace(url,'').length  // возвращаем длину строки, после удаления "url"
}   