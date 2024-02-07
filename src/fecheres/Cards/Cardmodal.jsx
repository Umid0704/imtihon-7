import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetAutherQuery, useGetCategoryQuery } from "./CardSlice";
import axiosClient from "../AxiosClient/Axios";


export default function Cardmodal({ open, toggle, edit }) {
    console.log(edit.image)
    const [imgFile, setImgFile]  = useState("")
    const {data:category}=useGetCategoryQuery()
    const {data:auther}=useGetAutherQuery()
    console.log(category);
  const addBook=(e)=>{
    e.preventDefault()
    let payload = {
        name:e.target[1].value ? e.target[1].value : edit.name,
        author_id: +e.target[2].value ? +e.target[2].value : +edit.author_id,
        price: +e.target[3].value ? +e.target[3].value : +edit.price,
        code:e.target[4].value ? e.target[4].value : edit.code,
        janr_id: +e.target[5].value ? +e.target[5].value : +edit.janr_id,
        description:e.target[6].value ? e.target[3].value : edit.description
    }
    console.log(payload)
    const imgFormData = new FormData();
    imgFormData.append('file', imgFile)
    if(edit !== ''){
        if(imgFile){
            axiosClient.post("files/upload", imgFormData).then((res) => {
                if(res.status === 201) {
                    axiosClient.patch(`book/${edit.id}`, {...payload, image: res?.data?.link}).then((res) => {
                        window.location.reload();
                        toggle();
                    }).catch((e)=>{
                        console.log(e);
                    })
                }
            })

        }else{
            axiosClient.pat(`book/${edit.id}`, {...payload, image: edit.image}).then((res) => {
                window.location.reload();
                toggle();
            })
        }
    }else{
        console.log(true)
      axiosClient.post("files/upload", imgFormData).then((res) => {
        if(res.status === 201) {
            axiosClient.post("book/create", {...payload, image: res?.data?.link}).then((res) => {
                window.location.reload();
                toggle();
            }).catch((e)=>{
                console.log(e);
            })
        }
    })
    }
   
  }
 
  
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalBody>
        <form className="flex flex-col gap-2" onSubmit={addBook}> 
          <input className="form-control"  placeholder="name" type="file" onChange={(e)=>setImgFile(e.target.files[0])} />
          <input className="form-control" defaultValue={edit.name} placeholder="name" type="text" />
          <select className="form-control" defaultValue={edit.author_id} name="" id="">
          <option value="" hidden >Auther</option>
          {
            auther?.map((item)=>{return <option key={item.id} value={item.id}>{item.full_name}</option>})
          }
          </select>
          <input className="form-control" defaultValue={edit.price} placeholder="price" type="number" />
          <input className="form-control" defaultValue={edit.code} placeholder="code" type="text" />
          <select className="form-control" name="" id="" defaultChecked={edit.category}>
          <option value="" defaultValue={edit}  hidden >Category</option>
          {
            category?.map((item)=>{return <option key={item.id} value={item.id}>{item.name}</option>})
          }
          </select>
          <textarea name="" id="" cols="30" rows="10" className="form-control" placeholder="description" defaultValue={edit.description}></textarea>
         
          <button className="px-4 py-2 bg-green-500 rounded-lg text-white">add book</button>
        </form>
      </ModalBody>
    </Modal>
  );
}
