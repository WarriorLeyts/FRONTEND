export default function declineMessage(number) {
  const lastNumber = ((number / 10) - Math.trunc(number / 10)).toFixed(1) * 10;
  if (lastNumber === 0 || (lastNumber >= 5 && lastNumber <= 9) || (number >= 11 && number <= 14)) {
    return 'сообщений';
  }
  if ((lastNumber >= 2 && lastNumber <= 4)) {
    return 'сообщения';
  }
  return 'сообщение';
}
