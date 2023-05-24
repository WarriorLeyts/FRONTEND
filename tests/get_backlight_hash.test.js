import { assert } from 'chai';
import getBackLightHash from '../public/assets/get_backlight_hash.js';

describe('Функция проверки, которая подсветит все хэш теги в заданной строке.', function () {
  it('Подсвет хэштегов тест №1', function () {
    const expectedResult = 'Кто еще изучает <a href="/search?tag=javascript" >#javascript</a> ?';
    const result = getBackLightHash('Кто еще изучает #javascript ?');
    assert.equal(expectedResult, result);
  });
  it('Подсвет хэштегов тест №2', function () {
    const expectedResult = 'Не могу решить, какой новый вкус @Lays мне нравится больше всего <a href="/search?tag=DoUsAFlavor" >#DoUsAFlavor</a>.';
    const result = getBackLightHash('Не могу решить, какой новый вкус @Lays мне нравится больше всего #DoUsAFlavor.');
    assert.equal(expectedResult, result);
  });
  it('Подсвет хэштегов тест №3', function () {
    const expectedResult = 'Выглядит соблазнительно <a href="/search?tag=WantAnR8" >#WantAnR8</a>';
    const result = getBackLightHash('Выглядит соблазнительно #WantAnR8');
    assert.equal(expectedResult, result);
  });
  it('Подсвет хэштегов тест №4', function () {
    const expectedResult = 'У @DavidPollack47 серьезный вопрос: с чем вы будете вашу охлажденную колу — с крылышками или сэндвичем? <a href="/search?tag=ShareaCoke" >#ShareaCoke</a>';
    const result = getBackLightHash('У @DavidPollack47 серьезный вопрос: с чем вы будете вашу охлажденную колу — с крылышками или сэндвичем? #ShareaCoke');
    assert.equal(expectedResult, result);
  });
  it('Подсвет хэштегов тест №5', function () {
    const expectedResult = 'Не можем дождаться первого <a href="/search?tag=tweetfromtheseat" >#tweetfromtheseat</a> в <a href="/search?tag=280characters" >#280characters</a>.';
    const result = getBackLightHash('Не можем дождаться первого #tweetfromtheseat в #280characters.');
    assert.equal(expectedResult, result);
  });
  it('Подсвет хэштегов тест №6', function () {
    const expectedResult = 'Ждите того, что случится завтра <a href="/search?tag=ShareYourEars" >#ShareYourEars</a>';
    const result = getBackLightHash('Ждите того, что случится завтра #ShareYourEars');
    assert.equal(expectedResult, result);
  });
  it('Подсвет хэштегов тест №7', function () {
    const expectedResult = 'Принятие начинается со всех нас <a href="/search?tag=WeAccept" >#WeAccept</a>!';
    const result = getBackLightHash('Принятие начинается со всех нас #WeAccept!');
    assert.equal(expectedResult, result);
  });
  it('Подсвет хэштегов тест №8', function () {
    const expectedResult = 'Эксперимент «Разные миры» <a href="/search?tag=OpenYourWorld" >#OpenYourWorld</a>';
    const result = getBackLightHash('Эксперимент «Разные миры» #OpenYourWorld');
    assert.equal(expectedResult, result);
  });
  it('Подсвет хэштегов тест №9', function () {
    const expectedResult = 'Пусть ваш разум будет свободен <a href="/search?tag=HereToCreate" >#HereToCreate</a>!';
    const result = getBackLightHash('Пусть ваш разум будет свободен #HereToCreate!');
    assert.equal(expectedResult, result);
  });
  it('Подсвет хэштегов тест №10', function () {
    const expectedResult = 'Когда водитель едет <a href="/search?tag=BeyondFiveStars" >#BeyondFiveStars</a>, поделитесь комплиментом. Поделитесь своей любовью. <a href="/search?tag=love" >#love</a>';
    const result = getBackLightHash('Когда водитель едет #BeyondFiveStars, поделитесь комплиментом. Поделитесь своей любовью. #love');
    assert.equal(expectedResult, result);
  });
});
