import * as bcrypt from 'bcrypt';

export const apiSuccessResponse = ( statusCode :number, message:string) => { return { success: true, statusCode, message } }
export const apiSuccessWithData=(statusCode:number,data:any,message:string)=>{return { success: true, statusCode, data ,message}}
export const hashPassword=(password: string): Promise<string>=> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }