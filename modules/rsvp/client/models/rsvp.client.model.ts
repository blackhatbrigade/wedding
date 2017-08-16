/* client side class for representing an rsvp */



export class Rsvp {
    _id: string = null;
    name: string = null;
    attending: boolean = true;
    partySize: number = 1;
    partyMembers: Array<string> = [];
    note: string = null;
    created: Date = new Date();
    user: string = null;

  constructor(json?:any)
  constructor(json: any)
  {
    if(json)
    {
      this._id  = json._id || null;
      this.name =  json.name || '';
      this.attending = json.attending || true;
      this.partySize =  json.partySize || 1;
      this.partyMembers = json.partyMembers || [];
      this.note = json.note || null;
      if(json.created){
        this.created = new Date(json.created);  
      }
      else{
        this.created = new Date();
      }
      this.user = json.user || null;
      this.removeDuplicates();
    }

  }
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
