export default function getTimeString(postDate, currentDate) {
  let descriptionTime;
  let description;
  const minutes = (currentDate - new Date(postDate)) / 60000;
  let time = minutes;
  if (Math.trunc(time) <= 0) {
    return 'только что';
  }
  function getDescriptionTime(unitOftime) {
    if (unitOftime < 10) {
      return Math.trunc(unitOftime);
    }
    return Math.abs(
      (unitOftime / 10 - Math.trunc(unitOftime / 10)).toFixed(1) * 10,
    );
  }
  switch (true) {
    case minutes > 0 && minutes < 60:
      descriptionTime = getDescriptionTime(time);
      if (
        (time > 10 && time < 15)
        || descriptionTime > 4
        || descriptionTime === 0
      ) {
        description = 'минут';
      } else if (descriptionTime > 1 && descriptionTime < 5) {
        description = 'минуты';
      } else description = 'минуту';
      break;
    case minutes >= 60 && minutes < 1440:
      time = Math.trunc(minutes / 60); // Получаем часы.
      descriptionTime = getDescriptionTime(time);
      if (
        (time > 10 && time < 15)
        || descriptionTime > 4
        || descriptionTime === 0
      ) {
        description = 'часов';
      } else if (descriptionTime > 1 && descriptionTime < 5) {
        description = 'часа';
      } else description = 'час';
      break;
    case minutes < 525_601:
      time = Math.trunc(minutes / 1440); // Получаем дни.
      descriptionTime = getDescriptionTime(time);
      if (
        (time > 10 && time < 15)
        || descriptionTime > 4
        || descriptionTime === 0
      ) {
        description = 'дней';
      } else if (descriptionTime > 1 && descriptionTime < 5) {
        description = 'дня';
      } else description = 'день';
      break;
    case minutes > 525_600:
      return 'более года назад';
    default:
      return 'введено не верное значение';
  }
  return `${Math.trunc(time)} ${description} назад`; // возвращаем результат.
}
