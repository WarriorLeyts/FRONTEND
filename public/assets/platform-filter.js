export default function platformFilter(text, arrSwearing) {
  const arrPunct = ['.', ',', '!', '?', ';', ':', '-'];
  return text.split(' ').map((item) => {
    const word = arrPunct.includes(item[item.length - 1]) ? item.slice(0, item.length - 1) : item;
    if (arrSwearing.find((sw) => word.toLowerCase().startsWith(sw.toLowerCase()))) {
      return item.replace(word, '*'.repeat(item.length));
    }
    return item;
  }).join(' ');
}
