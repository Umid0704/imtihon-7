import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosClient from "../AxiosClient/Axios";


export default function Cardmodal({ open, toggle, edit }) {
    console.log(edit.birthdate)
    const [img, setImg]  = useState("")
   
  const addAuthor=(e)=>{
    e.preventDefault()
    let payload = {
        full_name:e.target[1].value ? e.target[1].value : edit.full_name,
        birthdate:e.target[2].value ? e.target[2].value : edit.birthdate,
        country:e.target[3].value ? e.target[3].value : edit.country,
    }
    let imgFormData = new FormData();
    imgFormData.append('file', img)
    if(edit !== ''){
        if(img){
            axiosClient.post("files/upload", imgFormData).then((res) => {
                if(res.status === 201) {
                    axiosClient.patch(`author/${edit.id}`, {...payload, image: res?.data?.link}).then((res) => {
                        window.location.reload();
                        toggle();
                    }).catch((e)=>{
                        console.log(e);
                    })
                }
            })

        }else{
            axiosClient.patch(`author/${edit.id}`, {...payload, image: edit.image}).then((res) => {
                window.location.reload();
                toggle();
            })
        }
    }else{
        console.log(true)
      axiosClient.post("files/upload", imgFormData).then((res) => {
        if(res.status === 201) {
            axiosClient.post("author", {...payload, image: res?.data?.link}).then((res) => {
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
        <form className="flex flex-col gap-2" onSubmit={addAuthor}> 
          <input className="form-control"  placeholder="name" type="file" onChange={(e)=>setImg(e.target.files[0])} />
          <input className="form-control" defaultValue={edit.full_name} placeholder="Full name" type="text" />
          <input className="form-control" defaultValue={edit.birthdate} placeholder="Birthdate" type="date" />
          <input className="form-control" defaultValue={edit.country} placeholder="country" type="text" />
         
          <button className="px-4 py-2 bg-green-500 rounded-lg text-white">add book</button>
        </form>
      </ModalBody>
    </Modal>
  );
}
