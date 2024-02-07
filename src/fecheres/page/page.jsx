import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBookOpen, FaRegUser } from "react-icons/fa";
import PageModal from "./pageModal";
import { useGetAuthorQuery } from "./pageSlice";
import axiosClient from "../AxiosClient/Axios";
import { BiCategory } from "react-icons/bi";

export default function Page() {
  const [pageopen, setPageOpen] = useState(false);
  const [editPage, seteditPage] = useState('');
  const { data: page } = useGetAuthorQuery();
  const link = [
    {id:1,name:"Cards", to:'/card', icon:<FaBookOpen/>},
    {id:2,name:"Page", to:"/page", icon: <FaRegUser/>},
    {id:2,name:"Category", to:"/category", icon: <BiCategory />}
  
  ];
  const naviget = useNavigate()
  let win = window.location.pathname;
  const toggle = () => {
    setPageOpen(false);
  };
  const deleteAuthor=(id)=>{
    axiosClient.delete(`author/${id}`).then(res=>{
      console.log(res);
      window.location.reload()
    })
  }
  const edit=(item)=>{
    seteditPage(item)
    setPageOpen(true)
  }
  return (
    <div className="bg-gray-800 text-white flex">
      <div className=" w-[50px] md:w-1/5 bg-[#3456] h-[100vh] sticky flex flex-col md:items-end gap-4 pt-4   top-0 ">
        {link.map((item) => {
          return (
            <Link
              key={item.id}
              className={
                win == item.to
                  ? " rounded-full md:w-[140px] text-center py-[15px] md:rounded-r-[100px]  bg-white flex items-center justify-center gap-2 text-[20px] text-black no-underline"
                  : "md:w-[140px] text-center py-[15px] rounded-l-full  flex items-center justify-center gap-2 text-[20px] no-underline text-white "
              }
              to={item.to}
            >
              {" "}
              {item.icon}
              <span className="hidden md:block">{item.name}</span>
            </Link>
          );
        })}
      </div>
      <PageModal open={pageopen} toggle={toggle} edit={editPage} />
      <div className="p-4">
        <button className="px-4 py-2 bg-green-500 rounded-lg" onClick={()=>setPageOpen(true)}>ADD Auther</button>
        <div className="flex flex-wrap gap-[30px] justify-around ">
          {page?.map((item, index) => {
            return (
              <div className="w-[250px]">
                <img className="w-full h-[180px]" src={item.image} alt="" />
                <div>
                  <h2>{item.full_name}</h2>
                  <button onClick={()=>naviget(`/page/${item.id}`)}>info</button>
                 <div>
                 <button onClick={()=>edit(item)}>edit</button>
                  <button onClick={()=>deleteAuthor(item.id)}>delete</button>
                 </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
