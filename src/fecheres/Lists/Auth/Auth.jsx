import React, {  useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axiosClient from '../../AxiosClient/Axios';
import { useNavigate } from 'react-router-dom';
export default function Auth() {
    const [password, setPassword]=useState('')
    const [type, setType]=useState('password')
    const [opacity, setOpacity]=useState('opacity-100')
   const naviget = useNavigate()

    let [width,setWidth] = useState('')
    const addReg =(e)=>{
      e.preventDefault();
      let payload = {
        username:e.target[0].value,
        password:password

      }
    
      if(e.target[0].value && password ){
        console.log('send');
        if( password > 6){
          axiosClient.post('auth/signin',{...payload}).then((res)=>{
            localStorage.setItem('token', res?.data?.tokens?.access_token)

            if(res.status === 201){
              naviget('/card')
            }
          })
        }else{
        alert("Parol kuchsiz")
        }
      }else{
        alert("To'liq  to'ldiring")
      }

    }
   const handlePassword =(e)=>{
    let p = e.target.value
    let a = ''
    setPassword(p)
    if(p.length <5  ){
        a = 'w-[33%]   bg-red-500'
    }else  if(p.length <= 7){
        a = 'bg-yellow-400 w-[66%]'
    }else  if(p.length >= 8){
        a = 'bg-green-500 w-[100%]'
    }
    setWidth(a)
}
const handleEye=()=>{
  if(type === 'password'){
    setOpacity('opacity-0')
    setType('text')
  }else{
    setType('password')
    setOpacity('opacity-100')

  }
}



  return (
    <div className='flex flex-col items-center justify-center h-[100vh] bg-gray-800 '> 
  <div className='sm:shadow-lg  sm:w-[500px] p-8 sm:shadow-gray-400 text-white'>
  <h2 className='text-center py-1 text-[28px] font-semibold my-4'>Kirish</h2>
      <form className=' flex flex-col bg-gray-800 my-4' onSubmit={addReg} id='regis'  >
        <div className='bg-gray-800' >
        <input type="text" className='w-full p-2 bg-gray-800 my-4 border-b-2' placeholder='User name'/>
       <div className=' relative my-4'>
       <input className='w-full p-2 bg-gray-800  border-b-2' placeholder=' Password'  onChange={handlePassword} type={type} />
        <FaRegEye className=' absolute  top-[12px] right-5 text-[20px] ' />
        <FaRegEyeSlash className= {` absolute top-[12px] right-5 text-[20px] ${opacity} `}  onClick={handleEye} />
        <div className={`${width} h-1 rounded `}></div>
       </div>
        </div>
      </form>
      <button form='regis' className='py-1 px-3 bg-green-500 rounded mt-2 text-white font-semibold' >Kirish</button>
  </div>
    </div>
  )
}
