/* client side class for representing an rsvp */



export class Rsvp {
  public _id: string = null;
  public name: string = '';
  public attending: boolean = true;
  public partySize: number = 1;
  public partyMembers: Array<string> = [];
  public note: string = '';
  public created: Date = new Date();

  validate(): any {
    if (this.name == '' || !this.name) {
      return { valid: false, message: 'Please enter your name' };
    }

    return { valid: true, message: ''};
  }

}
