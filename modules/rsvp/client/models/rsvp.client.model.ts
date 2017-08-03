/* client side class for representing an rsvp */



export class Rsvp {
  _id: string = null;
  name: string = '';
  attending: boolean = true;
  partySize: number = 1;
  partyMembers: Array<string> = [];
  note: string = null;
  created: Date = new Date();
  user: string = null;

  removeDuplicates(): void{
   this.partyMembers = this.partyMembers.filter(x => {
     console.log(x);
     return x != this.name;
   });
  }

  validate(): any {
    if (this.name == '' || !this.name) {
      return { valid: false, message: 'Please enter your name' };
    }

    return { valid: true, message: ''};
  }

}
