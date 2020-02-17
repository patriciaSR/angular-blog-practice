
const mockedPosts = [
  {
    title: 'newpost',
    content: 'loremmmmmmmmm',
    tags: ['lala', 'lalalal', 'lalala'],
    categories: ['jasjas'],
    image: 'url?¿',
  },
  {
    title: 'newpost2',
    content: 'loremmmmmmmmm',
    tags: ['lala', 'lalalal', 'lalala'],
    categories: ['jasjas'],
    image: 'url?¿',
  },
];

const mockedComments = [
  {
    _id: '5e1dee39ddd15a6923ab68dc',
    content: 'hola me llamo plutox4Admin!!!',
    userID: '5e1debdcddd15a6923ab68ce',
    postID: '5e1dedd1ddd15a6923ab68d9',
    date: '2020-01-14T16:37:13.516Z',
    userInfo: {
      username: 'lola',
      image: 'klasd',
    },
  },
];

const mockedUsers = [
  {
    _id: '5e1debdcddd15a6923ab68ce',
    username: 'dumbo555',
    image: 'kadasad',
  },
  {
    _id: '5e1debdcddd15a6923ab68cb',
    username: 'bambi555',
    image: 'bambi22',
  },
];

const mockResponse = {
  _id: '5e208b8437d9b3437e9d22e9',
  title: 'newpostAdmin',
  content: 'loremmmmmmmmm',
  tags: [
    'lala',
    'lalalal',
    'lalala',
  ],
  categories: [
    'jasjas',
  ],
  image: 'url?¿',
  userID: '5e1debdcddd15a6923ab68ce',
  date: '2020-01-14T16:35:29.609Z',
};

module.exports = {
  mockedPosts,
  mockedComments,
  mockedUsers,
  mockResponse,
}