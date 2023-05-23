import { assert } from 'chai';
import emailValidation from '../public/assets/email_validation.js';

describe('Функция проверки валидности эмайл', function () {
  it('Валидность эмайл тест №1', function () {
    const expectedResult = true;
    const result = emailValidation('nan@ma.ru');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №2', function () {
    const expectedResult = true;
    const result = emailValidation('igna.tov@mail.ru');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №3', function () {
    const expectedResult = false;
    const result = emailValidation('ina.-to@mail.ru');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №4', function () {
    const expectedResult = false;
    const result = emailValidation('ivanov(popov)@mail.ru');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №5', function () {
    const expectedResult = false;
    const result = emailValidation('-gorshkov@mail.ru');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №6', function () {
    const expectedResult = true;
    const result = emailValidation('89year-happy@gmail.com');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №7', function () {
    const expectedResult = true;
    const result = emailValidation('daye.leyts@gmail.com');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №8', function () {
    const expectedResult = false;
    const result = emailValidation('desyatka@gmailcom');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №9', function () {
    const expectedResult = true;
    const result = emailValidation('blog-ivanov@gmail.com');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №10', function () {
    const expectedResult = false;
    const result = emailValidation('почта@gmail.com');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №11', function () {
    const expectedResult = false;
    const result = emailValidation('n@bk.ru');
    assert.equal(expectedResult, result);
  });
  it('Валидность эмайл тест №12', function () {
    const expectedResult = false;
    const result = emailValidation('');
    assert.equal(expectedResult, result);
  });
});
