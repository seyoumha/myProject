export class Answer{
  constructor(public _id:string='',public user_answer: string = '', public detail: string='', public question_id: string = null, public vote:number = 0 ,public user_name: string =''){
  }
}
