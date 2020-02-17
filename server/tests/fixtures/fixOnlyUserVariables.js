const mockPost = {
  _id: '3',
  userID: '3a',
  title: 'lalalalaa',
  content: 'lolololo',
};

const mockRepeatUserIDPost = {
  _id: '3',
  userID: '1a',
  title: 'lalalalaa',
  content: 'lolololo',
};

const mockComments = [{
  _id: '2',
  userID: '1a',
  content: 'hola',
},
{
  _id: '2',
  userID: '1a',
  content: 'hola',
},
{
  _id: '2',
  userID: '2a',
  content: 'hola',
},
];

const mockUsersInfo = [{
  _id: '1a',
  firstname: 'lola',
  username: 'lola22',
},
{
  _id: '2a',
  firstname: 'paco',
  username: 'paco22',
},
{
  _id: '3a',
  firstname: 'marta',
  username: 'marta22',
},
];

module.exports = {
  mockPost,
  mockRepeatUserIDPost,
  mockComments,
  mockUsersInfo,
}