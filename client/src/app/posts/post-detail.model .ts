export interface PostDetail {
  _id: string;
  title: string;
  content: string;
  // userID: string;
  // tags: string[];
  // categories: string[];
  // image: string;
  // date: string;
  // userInfo: PostUserInfo;
  comments: Comment[];
}

// export interface PostUserInfo {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   username: string;
//   image: string;
//   role: string;
// }

export interface Comment {
  _id: string;
  content: string;
  userID: string;
  postID: string;
  date: string;
  userInfo: ComentUserInfo;
}

export interface ComentUserInfo {
  userID: string;
  username: string;
  image: string;
}
