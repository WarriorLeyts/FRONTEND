export default function formatNumber(number) {
  const stringNumber = String(number);
  const result = [];
  let point = 0;
  const step = stringNumber.length < 7 ? 2 : 3;
  if (stringNumber.length > 3 && stringNumber.length < 10) {
    for (let i = 0; i < step; i += 1) {
      const arg1 = ((stringNumber.length - 3) - point) < 0 ? 0
        : ((stringNumber.length - 3) - point);
      result.unshift(stringNumber.slice(arg1, (stringNumber.length - point)));
      point += 3;
    }
    return result.join(' ');
  }
  return stringNumber;
}
