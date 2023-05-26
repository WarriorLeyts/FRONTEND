import { assert } from 'chai';
import getRecommProfiles from '../public/assets/get_recomm_profiles.js';

describe('Функция проверки рекомендательной системы', function () {
  it('рекомендательная система тест №1', function () {
    const expectedResult = [258];
    const profile = {
      id: 256,
      posts: [
        'Привет. #сегодня был на концерте группы #linkinpark',
        'как вам новая песня #linkinpark',
      ],
    };
    const profiles = [
      {
        id: 257,
        posts: [
          'Сегодня вышла новая версия #javascript',
          'как вам новая версия #javascript?',
        ],
      },
      {
        id: 258,
        posts: [
          '#сегодня мне не понравилась новая песня #linkinpark',
        ],
      },
    ];
    const count = 1;
    const result = getRecommProfiles(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });
  it('рекомендательная система тест №2', function () {
    const expectedResult = [258, 257];
    const profile = {
      id: 256,
      posts: [
        'Привет. #сегодня был на концерте группы #linkinpark',
        'как вам новая песня #linkinpark',
      ],
    };
    const profiles = [
      {
        id: 257,
        posts: [
          'Сегодня вышла новая версия #javascript',
          'как вам новая версия #javascript?',
        ],
      },
      {
        id: 258,
        posts: [
          '#сегодня мне не понравилась новая песня #linkinpark',
        ],
      },
    ];
    const count = 2;
    const result = getRecommProfiles(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });
  it('рекомендательная система тест №3', function () {
    const expectedResult = [101, 102];
    const profile = {
      id: 100,
      posts: [
        'Кто смотрел #сегодня матч #dortmund и #bayern;',
        'Мне понравилось как играл игрок #musiala',
      ],
    };
    const profiles = [
      {
        id: 101,
        posts: [
          'Думаю, лучшего игрока #bayern этого сезона надо признать #musiala',
          'Как не забил свой момент #reus',
        ],
      },
      {
        id: 102,
        posts: [
          'Если #сегодня #dortmund выиграет они станут чемпионами',
          'Пора уже #reus выиграть свой первый чемпионат',
        ],
      },
    ];
    const count = 2;
    const result = getRecommProfiles(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });
  it('рекомендательная система тест №4', function () {
    const expectedResult = [101, 100];
    const profile = {
      id: 102,
      posts: [
        'Если #сегодня #dortmund выиграет они станут чемпионами',
        'Пора уже #reus выиграть свой первый чемпионат',
      ],
    };
    const profiles = [
      {
        id: 101,
        posts: [
          'Кто смотрел #сегодня матч #dortmund и #bayern',
          'Мне понравилось как играл игрок #musiala',
        ],
      },
      {
        id: 100,
        posts: [
          'Думаю, лучшего игрока #bayern этого сезона надо признать #musiala',
          'Как не забил свой момент #reus',
        ],
      },
    ];
    const count = 2;
    const result = getRecommProfiles(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });
  it('рекомендательная система тест №5', function () {
    const expectedResult = [303, 302, 301];
    const profile = {
      id: 300,
      posts: [
        'Начинаю программировать на #javascript',
        'Думаю #javascript сложнее для освоения чем #python',
        'Как центрировать объект в #css',
      ],
    };
    const profiles = [
      {
        id: 301,
        posts: [
          'Делаю backend на #python, кто делает также.',
          'Наконец-то, закончил, можно поехать отдохнуть #türkiye',
        ],
      },
      {
        id: 302,
        posts: [
          'Кто новичок в #javascript? Помогу чем смогу.',
          'Кто знает #python, нужна помощь.',
        ],
      },
      {
        id: 303,
        posts: [
          'Хочу стать #frontend разработчиком с чего начать #html и #css или сразу #javascript',
          'Изучил #html и #css перехожу на #javascript',
        ],
      },
    ];
    const count = 3;
    const result = getRecommProfiles(profile, profiles, count);
    assert.deepEqual(expectedResult, result);
  });
});
