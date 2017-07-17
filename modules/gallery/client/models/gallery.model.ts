export class Gallery {
  _id: string;
  name: string;
  pictures: Array<any>;
  thumbnail: string;
  publicRead: boolean;
  publicWrite: boolean;
  creator: string;
  allowedUsers: Array<string>;

  constructor(
    {
      _id='',
      name='',
      pictures=[],
      thumbnail='',
      publicRead=false,
      publicWrite=false,
      creator='',
      allowedUsers=[]
    }: {
      _id?: string;
      name?: string;
      pictures?: Array<any>;
      thumbnail?: string;
      publicRead?: boolean;
      publicWrite?: boolean;
      creator?: string;
      allowedUsers?: Array<string>;
    }={}
  ) {

  }
}
