import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PLaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  const placeOrder=async(e)=>{
    e.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]= cartItems[item._id]
        orderItems.push(itemInfo)
      }
      })
      let orderData={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2
      }
      let responce= await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      if(responce.data.success){
        const {session_url}=responce.data;
        window.location.replace(session_url)
      }
      else{
        alert("Error");
      }
    }
    const navigate = useNavigate();
    useEffect(()=>{
      if(!token){
        navigate("/")
      }
      else if(getTotalCartAmount()==0){
        navigate("/")
      }
    },[token])
  return (
    <form onSubmit={placeOrder} action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Infomation</p>
        <div className="multi-fields">
          <input
          required
            onChange={onChangeHandeler}
            name="firstName"
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
          required
            onChange={onChangeHandeler}
            name="lastName"
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
        required
          onChange={onChangeHandeler}
          name="email"
          value={data.email}
          type="email"
          placeholder="Email"
        />
        <input
        required
        onChange={onChangeHandeler}
          name="street"
          value={data.street}
          type="text"
          placeholder="Address"
        />
        <div className="multi-fields">
          <input
          required
            onChange={onChangeHandeler}
            name="city"
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
          required
            onChange={onChangeHandeler}
            name="state"
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
          required
            onChange={onChangeHandeler}
            name="zipcode"
            value={data.zipcode}
            type="text"
            placeholder="zip code"
          />
          <input
          required
            onChange={onChangeHandeler}
            name="country"
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
        required
        onChange={onChangeHandeler}
          name="phone"
          value={data.phone}
          type="text "
          placeholder="Phone Number"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>${getTotalCartAmount === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit" >Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PLaceOrder;
