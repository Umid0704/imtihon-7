import React, { useEffect, useState } from 'react'
import axiosClient from '../AxiosClient/Axios'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaRegUser } from 'react-icons/fa'

export default function SinglePage() {
    const link = [
        {id:1,name:"Cards", to:'/card', icon:<FaBookOpen/>},
        {id:2,name:"Page", to:"/page", icon: <FaRegUser/>}
      ]
  let win = window.location.pathname.split('/')[1]
  console.log(win)

    const [dataRes, setDataRes]=useState('')
    const url = window.location.href.split('/')[4]
   useEffect(()=>{
    axiosClient.get(`book/${url}`).then(res=>{
        setDataRes(res.data)
    })
   },[])
  
  return (
   <div className='flex h-[100vh] bg-gray-800 text-white  gap-[280px]'>
    <div className=' p-1 w-[50px] md:w-1/5 bg-[#3456] h-[100vh] sticky flex flex-col md:items-end gap-4 pt-4   top-0 ' >
      {
        link.map((item)=>{
          return  <Link key={item.id} className={`/${win}` == item.to ? ' rounded-full md:w-[140px] text-center py-[15px] md:rounded-r-[100px]  bg-white flex items-center justify-center gap-2 text-[20px] text-black p-2 no-underline'   :'md:w-[140px] text-center py-[15px] rounded-l-full  flex items-center justify-center gap-2 text-[20px] p-2  no-underline text-white' } to={item.to}> {item.icon}<span className='hidden md:block'>{item.name}</span></Link>
        })
      }
    </div>  
     <div className='flex justify-center items-center '>
       <div className='w-[500px] flex border p-4 gap-2 rounded'>
       <div className='w-1/2'>
            <img className='w-full h-[200px]' src={dataRes?.image} alt="image" />
        </div>
        <div className='h-[100%] flex flex-col   justify-between '>
            <p>Name:{dataRes?.name}</p>
            <p>Price:{dataRes?.price}</p>
            <p>Code:{dataRes?.code}</p>
            <p>Janr: {dataRes?.janr?.name}</p>
            <p>Author: {dataRes?.author?.full_name}</p>
        </div>
       </div>
    </div>
   </div>
  )
}
