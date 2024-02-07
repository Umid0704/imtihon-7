import React, { useState } from 'react'
import { FaBookOpen, FaRegUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import CardModal from './Cardmodal'
import { useDeleteBookMutation, useGetBookQuery } from './CardSlice'
import axiosClient from '../AxiosClient/Axios'
import { BiCategory } from "react-icons/bi"
export default function Cards() {
  const [opencardmodal, setopencardmodal]=useState(false)
  const {data:card}=useGetBookQuery()
  const [editBook, seteditBook]=useState('')
  // const [deleteBook]=useDeleteBookMutation()
  console.log(card);
  const link = [
    {id:1,name:"Cards", to:'/card', icon:<FaBookOpen/>},
    {id:2,name:"Page", to:"/page", icon: <FaRegUser/>},
    {id:2,name:"Category", to:"/category", icon: <BiCategory />},
  ]
  let win = window.location.pathname
  let toggle =()=>{
    setopencardmodal(false)
    seteditBook('')
  }
  const deleteBook=(id)=>{
    axiosClient.delete(`book/${id}`).then(res=>{
      console.log(res);
      window.location.reload()
    })
  }
  const edit=(item)=>{
      seteditBook(item)
      setopencardmodal(true)
  }
  const naviget = useNavigate()
  return (
    <div className='bg-gray-800 text-white flex'>
    <CardModal open={opencardmodal} toggle={toggle} edit={editBook}/>
      <div className=' p-1 w-[50px] md:w-1/5 bg-[#3456] h-[100vh] sticky flex flex-col md:items-end gap-4 pt-4   top-0 ' >
      {
        link.map((item)=>{
          return  <Link key={item.id} className={win == item.to ? ' rounded-full md:w-[140px] text-center py-[15px] md:rounded-r-[100px]  bg-white flex items-center justify-center gap-2 text-[20px] text-black p-2 no-underline'   :'md:w-[140px] text-center py-[15px] rounded-l-full  flex items-center justify-center gap-2 text-[20px] p-2  no-underline text-white' } to={item.to}> {item.icon}<span className='hidden md:block'>{item.name}</span></Link>
        })
      }
    </div>  
      <div className=' p-2'>
     <div>
     <button className='px-5 py-2 bg-green-600 rounded-lg' onClick={()=>setopencardmodal(true)}>Add Book</button>
     </div>
     <div className='flex flex-wrap gap-2'>
      {
        card?.map((item, index)=>{
          return <div className='w-[260px] p-[5px] rounded-lg shadow shadow-slate-300 *:m-0 *:p-0 ' key={index}>
            <img className='w-full h-[150px] rounded' src={item.image} alt="Book image" />
            <div className='flex flex-col gap-1 m-2'>
              <p className='flex justify-between px-3'>Name: <span>{item.name}</span></p>
              <p className='flex justify-between px-3'>Price: <span>{item.price}</span></p>
              <div className='text-center'>
              <button className='text-center  py-2 bg-blue-500 px-4 rounded-lg' onClick={()=>naviget(`/card/${item.id}`)}>... info</button>
              </div>
             <div className='flex justify-around'>
             <button className='px-4 py-2 bg-green-500 rounded-lg' onClick={()=>edit(item)}> edit</button>
              <button className='px-4 py-2 bg-red-500 rounded-lg' onClick={()=>deleteBook(item.id)}>delete</button>
             </div>
            </div>
          </div>
        })
      }
     </div>
      
      </div>
    </div>
  )
}
