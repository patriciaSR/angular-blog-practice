export interface PostDTO {
  _id?: string;
  title: string;
  content: string;
  userID?: string;
  tags?: string[];
  categories?: string[];
  image?: string;
  date?: string;
  userInfo?: PostUserInfoDTO;
  comments?: CommentDTO[];
}

export interface PostUserInfoDTO {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  image: string;
  role: string;
}

export interface CommentDTO {
  _id: string;
  content: string;
  userID: string;
  postID: string;
  date: string;
  userInfo: ComentUserInfoDTO;
}

export interface ComentUserInfoDTO {
  userID: string;
  username: string;
  image: string;
}
