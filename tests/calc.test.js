import { assert } from 'chai';
import postSize from '../public/assets/post_size.js';

describe('Функция проверки расчета размера поста', function () {
  it('без ссылок тест №1', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет!');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №2', function () {
    const expectedResult = 8;
    const result = postSize('Привет! https://google.com');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №3', function () {
    const expectedResult = 39;
    const result = postSize('Привет! vk.ru ссылка на страницу "ВКонтакте"');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №4', function () {
    const expectedResult = 27;
    const result = postSize('Чтобы перевести текст translate.google.com/?hl=ru или reverso.net');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №5', function () {
    const expectedResult = 44;
    const result = postSize('Смотрите прямые эфиры телеканалов России на https://limehd.tv/tv');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №6', function () {
    const expectedResult = 52;
    const result = postSize('Обзоры и рейтинг лучших регистраторов доменных имен ru.hostings.info');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №7', function () {
    const expectedResult = 28;
    const result = postSize('История доменной зоны SU на https://sm.su/blog/domain/7514/');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №8', function () {
    const expectedResult = 70;
    const result = postSize('Интерактивный сервис прямых трансляций для самого разного контента на twitch.tv');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №9', function () {
    const expectedResult = 30;
    const result = postSize('Домены film.movie developer.pro выставлены на продажу');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №10', function () {
    const expectedResult = 25;
    const result = postSize('Сайт с на японском языке www.turkleriz.biz');
    assert.equal(expectedResult, result);
  });
  it('без ссылок тест №11', function () {
    const expectedResult = 43;
    const result = postSize('Посмотреть результаты футбольных матчей на www.soccer.ru');
    assert.equal(expectedResult, result);
  });
});
