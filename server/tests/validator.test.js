const haveOffensiveWords = require('../utils/validator');

describe('haveOffensiveWords method test', () => {
  const mockWords = [{
    word: 'caca',
    level: 1,
  },
  {
    word: 'pedo',
    level: 1,
  },
  ];

  test('add comment without offensive words', () => {
    const mockGoodText = 'hola que tal';

    const result = haveOffensiveWords(mockGoodText, mockWords);

    expect(result.length).toEqual(0);
  });

  test('reject add comment with offensive words', () => {
    const mockBadText = 'caca que tal';

    const result = haveOffensiveWords(mockBadText, mockWords);

    expect(result.length).toEqual(1);
  });

  test('reject add comment with capitalize offensive words', () => {
    const mockBadText = 'CACA que tal';

    const result = haveOffensiveWords(mockBadText, mockWords);

    expect(result.length).toEqual(1);
  });

  test('add comment with not first offensive words inside an other word', () => {
    const mockBadText = 'menuda cacatúa';

    const result = haveOffensiveWords(mockBadText, mockWords);

    expect(result.length).toEqual(0);
  });

  test('add comment with first "false offensive words" inside an other word', () => {
    const mockBadText = 'cacatua';

    const result = haveOffensiveWords(mockBadText, mockWords);

    expect(result.length).toEqual(0);
  });

  test('reject add comment with offensive words inside special characters', () => {
    const mockBadText = 'esto es una **CACA***';

    const result = haveOffensiveWords(mockBadText, mockWords);

    expect(result.length).toEqual(1);
  });
});
