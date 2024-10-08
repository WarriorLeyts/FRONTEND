const formatBirthday = (dateString) => {
  const birthDate = new Date(dateString);
  const day = birthDate.getDate();
  const month = birthDate.getMonth();
  const monthsGenitive = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return `День рождения ${day} ${monthsGenitive[month]}`;
};
export default formatBirthday;
