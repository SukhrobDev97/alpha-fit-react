import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisements from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css"

import { useDispatch } from "react-redux";
import {  Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data))
});

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export function HomePage({ onAdd }: HomePageProps) {
  const {setPopularDishes, setNewDishes, setTopUsers} = actionDispatch(useDispatch())
  // via SELECTOR get DATA from REDUX STORE

  useEffect(()=>{
    // request DATA from Backend server
    const product = new ProductService();
    
    // Top Selling Products - barcha kategoriyalardan eng ko'p ko'rilganlar
    product.getProducts({
      page: 1,
      order: "productViews",
      limit: 4
    })
    .then((data)=>{
      console.log("data passed here", data)
      setPopularDishes(data)
    })
    .catch((err) => console.log(err))

    // Latest Products - barcha kategoriyalardan eng yangi mahsulotlar
    product.getProducts({
      page: 1,
      order: "createdAt",
      limit: 4
    })
    .then((data)=>{
      console.log("data passed here", data)
      setNewDishes(data)
    })
    .catch((err) => console.log(err))

    const member = new MemberService()

    member
      .getTopUsers()
      .then((data)=> setTopUsers(data || []))
      .catch((err) => console.log(err))
  },[])

    return <div className={"homePage"}>
      <Statistics />
      <PopularDishes onAdd={onAdd} />
      <NewDishes onAdd={onAdd} />
      <Advertisements />
      <ActiveUsers />
      <Events />
    </div>
  }

function err(reason: any): PromiseLike<never> {
  throw new Error("Function not implemented.");
}
  