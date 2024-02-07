import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosClient from './../AxiosClient/Axios';


export default function CAtegoryModal({ open, toggle, edit }) {
  
  const addBook=(e)=>{
    e.preventDefault()
    let payload = {
        name:e.target[0].value ? e.target[0].value : edit.name,
      
    }
    console.log(payload)
    const imgFormData = new FormData();
    if(edit !== ''){
          
                    axiosClient.patch(`category/update/${edit.id}`, {...payload}).then((res) => {
                        window.location.reload();
                        toggle();
                    }).catch((e)=>{
                        console.log(e);
                    })
            

       
    }else{
    
            axiosClient.post("category/create", {...payload}).then((res) => {
                window.location.reload();
                toggle();
            }).catch((e)=>{
                console.log(e);
            })
       
    }
   
  }
 
  
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalBody>
        <form className="flex flex-col gap-2" onSubmit={addBook}> 
        
<input type="text" defaultValue={edit.name} placeholder="Nema" className="form-conrtol" />         
          <button className="px-4 py-2 bg-green-500 rounded-lg text-white">add book</button>
        </form>
      </ModalBody>
    </Modal>
  );
}
