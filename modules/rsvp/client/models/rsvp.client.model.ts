/* client side class for representing an rsvp */
export class Rsvp {
  _id: string;
  name: string;
	attending: boolean;
	note: string;
  created: Date;

  constructor(
    {
      _id='',
      name='',
			attending = false,
			note= '',
			created = new Date()
    }: {
      _id?: string;
      name?: string;
			attending?: boolean,
			note?: string,
			created? : Date
    }={}
  ) {

  }
}
