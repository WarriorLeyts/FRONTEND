import { assert } from 'chai';
import platformFilter from '../public/assets/platform-filter.js';

describe('Функция проверки фильтера матерных слов', function () {
  it('фильтер матерных слов тест №1', function () {
    const expectedResult = 'Да вы что?? ****** там?';
    const result = platformFilter('Да вы что?? Охуели там?', ['охуели']);
    assert.equal(expectedResult, result);
  });
  it('фильтер матерных слов тест №2', function () {
    const expectedResult = '*******. Одним словом описал ситуацию в стране и в мире, рассказал о проблемах.';
    const result = platformFilter('Пиздец. Одним словом описал ситуацию в стране и в мире, рассказал о проблемах.', ['пиздец']);
    assert.equal(expectedResult, result);
  });
  it('фильтер матерных слов тест №3', function () {
    const expectedResult = '*****! Оно говорит о стольких вещах таким малым количеством букв.';
    const result = platformFilter('Fuck! Оно говорит о стольких вещах таким малым количеством букв.', ['fuck']);
    assert.equal(expectedResult, result);
  });
  it('фильтер матерных слов тест №4', function () {
    const expectedResult = 'Давайте видеть во всём позитив! Нет! У нас не ****** дороги! У нас ******** бездорожье!';
    const result = platformFilter('Давайте видеть во всём позитив! Нет! У нас не хуевые дороги! У нас пиздатое бездорожье!', ['хуевые', 'пиздатое']);
    assert.equal(expectedResult, result);
  });
  it('фильтер матерных слов тест №5', function () {
    const expectedResult = '****** – думали две женщины, с милой улыбкой глядя друг другу в глаза.';
    const result = platformFilter('Сука!” – думали две женщины, с милой улыбкой глядя друг другу в глаза.', ['сука']);
    assert.equal(expectedResult, result);
  });
  it('фильтер матерных слов тест №6', function () {
    const expectedResult = 'Матерные прикольные статусы: Ты зачем сюда зашел… ******* статус и ушел?';
    const result = platformFilter('Матерные прикольные статусы: Ты зачем сюда зашел… Спиздил статус и ушел?', ['спиздил']);
    assert.equal(expectedResult, result);
  });
  it('фильтер матерных слов тест №7', function () {
    const expectedResult = 'В моей жизни никогда не было цензуры… А не ***** ли??!';
    const result = platformFilter('В моей жизни никогда не было цензуры… А не похуй ли??!', ['похуй']);
    assert.equal(expectedResult, result);
  });
  it('фильтер матерных слов тест №8', function () {
    const expectedResult = 'Он такой ******, что даже ****** про него говорят, что он ******.';
    const result = platformFilter('Он такой пидор, что даже пидоры про него говорят, что он пидор.', ['пидор']);
    assert.equal(expectedResult, result);
  });
  it('фильтер матерных слов тест №9', function () {
    const expectedResult = 'Да-да, побольше ******, пожалуйста, а то мне её катастрофически не хватает.';
    const result = platformFilter('Да-да, побольше хуйни, пожалуйста, а то мне её катастрофически не хватает.', ['хуйни']);
    assert.equal(expectedResult, result);
  });
  it('фильтер матерных слов тест №10', function () {
    const expectedResult = 'Эта жизнь ***** такая, ***** в ней не поймёшь, каждый день **********, ******** и помрёшь.';
    const result = platformFilter('Эта жизнь хуйня такая, нихуй в ней не поймёшь, каждый день охуеваешь, охуевшим и помрёшь.', ['хуйня', 'нихуй', 'охуев']);
    assert.equal(expectedResult, result);
  });
});
