export default function emailValidation(email) {
  const validation = /^[\dA-Z][\dA-Z-.]*[\dA-Z]*@[\dA-Z]{1}[\dA-Z-]*[\dA-Z]{1}\.[A-Z]{2,4}$/i.test(email); // Проверяем наличие валидных символов.
  const checkRepeat = (email[email.indexOf('.') + 1] !== '.') && (email[email.indexOf('.') + 1] !== '-')
  && (email[email.indexOf('-') + 1] !== '-') && (email[email.indexOf('-') + 1] !== '.'); // Проверяем повторность символа "минус" и "точка", и их последовательность.
  const checkSize = email.length >= 8 && email.length <= 50; // Проверяем размер наименования почты.
  return validation && checkRepeat && checkSize; // возвращаем результат
}
