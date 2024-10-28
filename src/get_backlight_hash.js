export default function getBackLightHash(text) {
  const arrPunct = ['.', ',', '!', '?', ';', ':'];
  let result;
  return text.split(' ').map((item) => {
    if (item[0] === '#') {
      const punct = arrPunct.find((el) => (item[item.length - 1] === el));
      if (item[item.length - 1] === punct) {
        result = `<a href="/search?tag=${item.slice(1, item.length - 1)}" >${item.slice(0, item.length - 1)}</a>${punct}`;
      } else {
        result = `<a href="/search?tag=${item.slice(1)}" >${item}</a>`;
      }
      return result;
    }
    return item;
  }).join(' ');
}
