export default function emailValidation(email) {
  let validation = true;
  const validСharacters = '@-.1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let arrEmail = email.toUpperCase().split('');
  const checkAt = email.indexOf('@') === email.lastIndexOf('@') && email.includes('@'); // Проверяем есть ли символ "@", он должен быть только один раз.
  if (checkAt && email.includes('.')) { // в строке должен быть хотя бы один символ "."
    arrEmail.forEach((item) => {
      if (!validСharacters.includes(item)) { // Делаем проверку на наличие запрещенных символов.
        validation = false;
      }
      return validation;
    });
    arrEmail = email.split('@'); // разделяем нашу строку на две части.
    const checkDot = (email[email.indexOf('.') + 1] !== '.') && (email[email.indexOf('.') + 1] !== '-');
    const checkDash = (email[email.indexOf('-') + 1] !== '-') && (email[email.indexOf('-') + 1] !== '.');
    if (checkDot && checkDash) { // Необходимо проверить повторяются наши символы.
      const localName = arrEmail[0]; // присваиваем первую часть к переменной localName.
      const domainEmail = arrEmail[1]; //  также присваиваем вторую часть к переменной domainEmail.
      const symbols = validСharacters.slice(0, 3); // присваиваем наши символы.
      const firstElement = !symbols.includes(localName[0]) && !symbols.includes(domainEmail[0]);
      const lastElement = !symbols.includes(localName[localName.length - 1]);
      if (localName.length >= 3 && localName.length <= 25) { // размер локальной имени.
        if (firstElement && lastElement) { // проверяем первый и последний элемент.
          const OneDot = domainEmail.indexOf('.') === domainEmail.lastIndexOf('.'); // в домене может быть только один символ "."
          if (domainEmail.length >= 5 && domainEmail.length <= 25 && OneDot) { // размер домена.
            const domain = domainEmail.slice(domainEmail.indexOf('.') + 1); // после домены почты идет обычный домен.
            if (domain.length >= 2 && domain.length <= 6) { // размер обычного домена
              let domainValidation = true;
              domain.split('').forEach((item) => {
                if (validСharacters.slice(0, 13).includes(item)) { // только латинские буквы.
                  domainValidation = false;
                }
                return domainValidation;
              });
              return validation && domainValidation; // Проверяем наши условия.
            }
          }
        }
      }
    }
  }
  return false;
}
