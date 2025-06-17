export interface INote {
  title: string;
  content: string;
  category: "work"|"personal"| "study";
  pined: boolean;
}
