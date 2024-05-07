import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios";
import { toast } from 'react-toastify';

const List = ({url}) => {
  
  const [list,setList]=useState([]);
  const fetchList= async()=>{
    const responce = await axios.get(`${url}/api/food/list`);
    if(responce.data.success){
      setList(responce.data.data)
    }
    else{
      toast.error("error in  get data")
    }
  }
  const removeFood = async(foodId)=>{
    const responce = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList()
    if(responce.data.success){
      toast.success(responce.data.message)
    }else{
      toast.error('error in remove')
    }

  }
  useEffect(()=>{
    fetchList()
  },[])


  return (

    <div className='list add flex-col'>
      <p>
        All Foods List
      </p>
      <div className="list-table">
        <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <p>Category</p>
        <b>Price</b>
        <p>Action</p>
        </div>
      </div>
      {list.map((item,index)=>{
        return(
          <div className="list-table-format" key={index}>
            <img src={`${url}/images/`+item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
          </div>
        )
      })}

    </div>
  )
}

export default List