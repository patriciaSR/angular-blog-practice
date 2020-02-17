const { getOnlyUsersIDs, getUserPostInfo, getUserCommentsInfo } = require('../utils/onlyUsers');
const { mockPost, mockRepeatUserIDPost, mockComments, mockUsersInfo } = require('./fixtures/fixOnlyUserVariables');

describe('getOnlyUserIDs method test', () => {
  test('return onlyUserIDs from post and comments into an Array', () => {
    const expectedResult = ['3a', '1a', '2a'];

    const result = getOnlyUsersIDs(mockPost, mockComments);

    expect(result.length).toEqual(3);
    expect(result).toEqual(expectedResult);
  });

  test('return onlyUserIDs from post and comments into an Array without repeated userIDs', () => {
    const expectedResult = ['1a', '2a'];

    const result = getOnlyUsersIDs(mockRepeatUserIDPost, mockComments);

    expect(result.length).toEqual(2);
    expect(result).toEqual(expectedResult);
  });
});


describe('getUserPostInfo method test', () => {
  const mockUserID = '3a';

  test('return an object with userPostInfo from userPostID and onlyUsersInfo Array', () => {
    const expectedResult = mockUsersInfo[2];

    const result = getUserPostInfo(mockUserID, mockUsersInfo);

    expect(result).toEqual(expectedResult);
  });

  test('return undefined userPostInfo when userPostID is not in onlyUsersInfo Array', () => {
    const expectedResult = undefined;

    const result = getUserPostInfo('45b', mockUsersInfo);

    expect(result).toEqual(expectedResult);
  });
});


describe('getUserCommentsInfo method test', () => {
  test('return an array with comments and their userInfo from userID and onlyUsersInfo Array', () => {
    const expectedResult = [{
      _id: '2',
      userID: '1a',
      content: 'hola',
      userInfo: {
        userID: '1a',
        username: 'lola22',
      },
    },
    {
      _id: '2',
      userID: '1a',
      content: 'hola',
      userInfo: {
        userID: '1a',
        username: 'lola22',
      },
    },
    {
      _id: '2',
      userID: '2a',
      content: 'hola',
      userInfo: {
        userID: '2a',
        username: 'paco22',
      },
    }];

    const result = getUserCommentsInfo(mockComments, mockUsersInfo);

    expect(result).toEqual(expectedResult);
  });
});
