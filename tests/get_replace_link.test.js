import { assert } from 'chai';
import getReplaceLink from '../public/assets/get_replace_link.js';

describe('Функция замены ссылки на HTML код', function () {
  it('Замена ссылки на HTML код тест №1', function () {
    const expectedResult = 'Привет <a href="https://github.com">github.com</a>';
    const result = getReplaceLink('Привет github.com');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №2', function () {
    const expectedResult = 'Привет! <a href="https://google.com">google.com</a>';
    const result = getReplaceLink('Привет! https://google.com');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №3', function () {
    const expectedResult = 'Привет! <a href="https://vk.ru">vk.ru</a> ссылка на страницу "ВКонтакте"';
    const result = getReplaceLink('Привет! vk.ru ссылка на страницу "ВКонтакте"');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №4', function () {
    const expectedResult = 'Чтобы перевести текст <a href="https://translate.google.com/?hl=ru">translate.google.com/?hl=ru</a> или <a href="https://reverso.net">reverso.net</a>';
    const result = getReplaceLink('Чтобы перевести текст translate.google.com/?hl=ru или reverso.net');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №5', function () {
    const expectedResult = 'Смотрите прямые эфиры телеканалов России на <a href="http://limehd.tv/tv">limehd.tv/tv</a>';
    const result = getReplaceLink('Смотрите прямые эфиры телеканалов России на http://limehd.tv/tv');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №6', function () {
    const expectedResult = 'Обзоры и рейтинг лучших регистраторов доменных имен <a href="https://ru.hostings.info">ru.hostings.info</a>';
    const result = getReplaceLink('Обзоры и рейтинг лучших регистраторов доменных имен ru.hostings.info');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №7', function () {
    const expectedResult = 'История доменной зоны SU на <a href="https://sm.su/blog/domain/7514/">sm.su/blog/domain/7514/</a>';
    const result = getReplaceLink('История доменной зоны SU на https://sm.su/blog/domain/7514/');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №8', function () {
    const expectedResult = 'Интерактивный сервис прямых трансляций для самого разного контента на <a href="https://twitch.tv">twitch.tv</a>';
    const result = getReplaceLink('Интерактивный сервис прямых трансляций для самого разного контента на twitch.tv');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №9', function () {
    const expectedResult = 'Домены <a href="https://film.movie">film.movie</a> <a href="https://developer.pro">developer.pro</a> выставлены на продажу';
    const result = getReplaceLink('Домены film.movie developer.pro выставлены на продажу');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №10', function () {
    const expectedResult = 'Сайт с на японском языке <a href="http://www.turkleriz.biz">www.turkleriz.biz</a>';
    const result = getReplaceLink('Сайт с на японском языке http://www.turkleriz.biz');
    assert.equal(expectedResult, result);
  });
  it('Замена ссылки на HTML код тест №11', function () {
    const expectedResult = 'Посмотреть результаты футбольных матчей на <a href="https://www.soccer.ru">www.soccer.ru</a>';
    const result = getReplaceLink('Посмотреть результаты футбольных матчей на www.soccer.ru');
    assert.equal(expectedResult, result);
  });
});
