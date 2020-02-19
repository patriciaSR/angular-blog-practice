export interface PostsDTO {
  _id: string;
  title: string;
  content: string;
  userID?: string;
  tags?: string[];
  categories?: string[];
  image?: string;
  date?: string;
}
