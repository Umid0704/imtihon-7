import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";  
import axiosClient from './../../AxiosClient/Axios';
import { useNavigate } from 'react-router-dom';
 export default function Registration() {
    const [password2, setPassword2]=useState('')
    const [type2, setType2]=useState('password')
    const [opacity2, setOpacity2]=useState('opacity-100')
   const naviget = useNavigate()
    let [width2,setWidth2] = useState('')
    const addReg =(e)=>{
      e.preventDefault();
      let payload = {
        full_name:e.target[0].value,
        username:e.target[1].value,
        password:password2

      }
    
      if(e.target[0].value && e.target[1].value && password2 ){
        console.log('send');
        if( password2 > 4){
        axiosClient.post('auth/signup', {...payload}).then(res=>{
          console.log(res?.data?.tokens?.access_token);
          if(res?.status === 201){
            localStorage.setItem('token', res?.data?.tokens?.access_token)
            naviget('/auth')
          }else if(res?.status === 404){
            alert("Ro'yxatdan o'tgansiz")
          }
        }).catch((e)=>{
          console.log(e);
        })
        }else{

        alert("Parol kuchsiz")
        }
      }else{
        alert("To'liq  to'ldiring")
      }

    }

const handleEye2=()=>{
  if(type2 === 'password'){
    setType2('text')
    setOpacity2('opacity-0')

  }else{
    setType2('password')
    setOpacity2('opacity-100')

  }
}
const handlePassword2 =(e)=>{
  let p = e.target.value
  let a = ''
  setPassword2(p)
  if(p.value == ''){
      setWidth2('')
  }else if(p.length <5  ){
      a = 'w-[33%]   bg-red-500'
  }else  if(p.length <= 7){
      a = 'bg-yellow-400 w-[66%]'
  }else  if(p.length >= 8){
      a = 'bg-green-500 w-[100%]'
  }
  setWidth2(a)
}


  return (
    <div className='flex flex-col items-center justify-center h-[100vh] bg-gray-800 '> 
  <div className='sm:shadow-lg w-full sm:w-[500px]  p-8 sm:shadow-gray-400 text-white'>
  <h2 className='text-center py-1 text-[28px] font-semibold '>Ro'yhatdan o'ting</h2>
      <form className=' flex flex-col bg-gray-800 ' onSubmit={addReg} id='regis'  >
        <input className='w-full p-2 bg-gray-800 my-4 border-b-2 active:border-none' placeholder='Full name' type="text"  />
        <div className='bg-gray-800' >
        <input type="text" className='w-full p-2 bg-gray-800 my-4 border-b-2' placeholder='User name'/>
       <div className=' relative Kirish'>
       <input className='w-full p-2 bg-gray-800  border-b-2' placeholder='Password' aria-label='Password' onChange={handlePassword2} type={type2} />
        <FaRegEye className=' absolute  top-[11px] right-5 text-[20px] ' />
        <FaRegEyeSlash className= {` absolute top-[11px] right-5 text-[20px] ${opacity2}`}  onClick={handleEye2} />
        <div className={`${width2} h-1 rounded `}></div>
       </div>
        </div>
      </form>
    <div className='flex justify-between'>
    <button form='regis' className='py-1 px-3 bg-green-500 rounded mt-2 text-white font-semibold' >Registration</button>
      <button  className='py-1 px-3 bg-green-500 rounded mt-2 text-white font-semibold' onClick={()=>naviget('/auth')} >Kirish</button>
    </div>
  </div>
    </div>
  )
}
