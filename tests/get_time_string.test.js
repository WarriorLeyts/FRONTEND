import { assert } from 'chai';
import getTimeString from '../public/assets/get_time_string.js';

describe('Функция проверки преобразования числового значение в текстовое', function () {
  it('Преобразования числовое значение в текстовое тест №1', function () {
    const expectedResult = '1 минуту назад';
    const result = getTimeString(1);
    assert.equal(expectedResult, result);
  });
  it('Преобразования числовое значение в текстовое тест №2', function () {
    const expectedResult = '5 минут назад';
    const result = getTimeString(5);
    assert.equal(expectedResult, result);
  });
  it('Преобразования числовое значение в текстовое тест №3', function () {
    const expectedResult = '59 минут назад';
    const result = getTimeString(59);
    assert.equal(expectedResult, result);
  });
  it('Преобразования числовое значение в текстовое тест №4', function () {
    const expectedResult = '1 час назад';
    const result = getTimeString(61);
    assert.equal(expectedResult, result);
  });
  it('Преобразования числовое значение в текстовое тест №5', function () {
    const expectedResult = '5 часов назад';
    const result = getTimeString(300);
    assert.equal(expectedResult, result);
  });
  it('Преобразования числовое значение в текстовое тест №6', function () {
    const expectedResult = '23 часа назад';
    const result = getTimeString(1439);
    assert.equal(expectedResult, result);
  });
  it('Преобразования числовое значение в текстовое тест №7', function () {
    const expectedResult = '1 день назад';
    const result = getTimeString(1440);
    assert.equal(expectedResult, result);
  });
  it('Преобразования числовое значение в текстовое тест №8', function () {
    const expectedResult = '5 дней назад';
    const result = getTimeString(7200);
    assert.equal(expectedResult, result);
  });
  it('Преобразования числовое значение в текстовое тест №9', function () {
    const expectedResult = '365 дней назад';
    const result = getTimeString(525_600);
    assert.equal(expectedResult, result);
  });
  it('Преобразования числовое значение в текстовое тест №10', function () {
    const expectedResult = 'более года назад';
    const result = getTimeString(600_000);
    assert.equal(expectedResult, result);
  });
});
