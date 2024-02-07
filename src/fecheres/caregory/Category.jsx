import React, { useState } from 'react'
import { useGetCategoryQuery } from '../Cards/CardSlice'
import { Link } from 'react-router-dom';
import { FaBookOpen, FaRegUser } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import axiosClient from '../AxiosClient/Axios';
import CAtegoryModal from './CategoryModal';

export default function Category() {
    const { data: category}= useGetCategoryQuery()
    const [modalCategory, setmodalCategory]=useState(false)
    const [editCAtegory, seteditCAtegory]=useState('')

    const link = [
      {id:1,name:"Cards", to:'/card', icon:<FaBookOpen/>},
      {id:2,name:"Page", to:"/page", icon: <FaRegUser/>},
      {id:2,name:"Category", to:"/category", icon: <BiCategory />}
    
    ];
    let win = window.location.pathname
    const deleteCategory=(id)=>{
      axiosClient.delete(`category/delete/${id}`).then(res=>{
        console.log(res);
        window.location.reload()
      })
    }
    const editCategory =(item)=>{
      seteditCAtegory(item)
      setmodalCategory(true)
    }
    const toggle=()=>{
      setmodalCategory(false)
      seteditCAtegory('')
    }
  return (
    <div className=' bg-gray-800 flex text-white'>
    <CAtegoryModal open={modalCategory} toggle={toggle} edit={editCAtegory}/>
    <div className=' p-1 w-[50px] md:w-1/5 bg-[#3456] h-[100vh] sticky flex flex-col md:items-end gap-4 pt-4   top-0 ' >
      {
        link?.map((item)=>{
          return  <Link key={item.id} className={win == item.to ? ' rounded-full md:w-[140px] text-center py-[15px] md:rounded-r-[100px]  bg-white flex items-center justify-center gap-2 text-[20px] text-black p-2 no-underline'   :'md:w-[140px] text-center py-[15px] rounded-l-full  flex items-center justify-center gap-2 text-[20px] p-2  no-underline text-white' } to={item.to}> {item.icon}<span className='hidden md:block'>{item.name}</span></Link>
        })
      }
    </div>  
   <div>
   <button className='px-4 py-2 rounded-lg bg-green-500' onClick={()=>setmodalCategory(true)}>add category</button>
      <div className='flex flex-wrap'>
      {
        category?.map((item, index)=>{
          return <di className='px-3 py-2 shadow h-[100px]' key={item.id}>
            <p>Janr: {item.name}</p>
            <button className='px-4 py-2 rounded-lg bg-green-500' onClick={()=>editCategory(item)}>edit</button>
            <button className='px-4 py-2 rounded-lg bg-red-500' onClick={()=>deleteCategory(item.id)}>delete</button>
          </di>
        })
      }
      </div>
   </div>
    </div>
  )
}
