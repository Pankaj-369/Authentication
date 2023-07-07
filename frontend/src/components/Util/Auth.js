import { redirect } from "react-router-dom";

export function getduration(){
    const date=localStorage.getItem('expiration');
    const expiration=new Date(date);
    const curdate=new Date();
    const duration=expiration.getTime()-curdate.getTime();
    return duration;
}
export const getauthtoken = () => {     // loader
    const token =localStorage.getItem('token');
    if(!token){
        return null;
    }
    const tokenduration=getduration()
    if(tokenduration<0){
        return 'EXPIRED';
    }

    return token;
   }
   

export function checkauth(){
    const token=getauthtoken();
    if(!token){
        return redirect('/auth')
    }
    return null;
}