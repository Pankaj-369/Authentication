import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}){

 const searchParams= new URL(request.url).searchParams;
 const mode=searchParams.get('mode') || 'login';

  if(mode!=='login' && mode!=='signup'){  
    throw json({message:'unsupported mode'},{status:422})
  }

 const data= await request.formData(); 
 const userdata={
  email:data.get('email'),
  password:data.get('password')
 }

 const response=await fetch('http://localhost:8080/'+ mode,{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify(userdata)
 })

 if(response.status === 422 || response.status === 401){
  return response;
 }
 if(!response.ok){
 throw json({message:'could not authenticate user.'},{status:500});
 }
 
 const resdata=await response.json();
 const token=resdata.token;
 localStorage.setItem('token',token);

 const expiration=new Date();
 expiration.setHours(expiration.getHours() + 1 );
 localStorage.setItem('expiration',expiration.toISOString())

return redirect('/');
}