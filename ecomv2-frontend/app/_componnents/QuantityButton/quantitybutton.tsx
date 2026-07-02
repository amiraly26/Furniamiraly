"use client"

import { useContext, useState } from "react";
import { updateCart, popProductFromCart, cartloader } from "../Cart/cartContentLoader";
import "./css/quantitybutton.css";
import { RootContext } from "@/app/_providers/RootContext";

interface QuantityButtonProps {
    quantity: number,
    isOnCart?:boolean,
    productInfo:{
        id: any,
        color?: string
    }
    onAddNew?: () => void;
    width?: number,
    height?: number,
    avStock: number,
}

export default function QuantityButton({quantity, width=80, height=34, isOnCart=false, productInfo,onAddNew, avStock}:Readonly<QuantityButtonProps>) {
    
    const { cartUpdater } = useContext(RootContext)



    const addHander = ()=>{
        const isOnList = cartloader()
                            .filter((cartItem)=>{
                                if((cartItem.id === productInfo.id) && (cartItem.color === productInfo.color))
                                    return true;
                            }).length > 0;

        const totalItemQt = cartloader()
                            .filter((cartItem) => {
                                return (cartItem.id === productInfo.id)
                            })
                            .reduce((a, b) => {
                                return a + b.quantity
                            }, 0);
        if((totalItemQt + 1) > avStock) {
            return;
        }                   
        if(productInfo && isOnCart) {
            const newCartState = updateCart(productInfo.id, 1, productInfo.color);
            cartUpdater(newCartState);
        }else { 
            if(!isOnList) {
                onAddNew();
                return 
            }
            cartUpdater(updateCart(productInfo.id, 1, productInfo.color));
        }
    }

    const removeHandler = () => {
        if(productInfo) {
            if(quantity - 1 > 0) {
                const newCartState = updateCart(productInfo.id, (-1) , productInfo.color);
                cartUpdater(newCartState);
            } else {
                const newCartState = popProductFromCart(productInfo.id, productInfo.color);
                cartUpdater(newCartState);
            }
        }else {
            //do nothing
        }
    }
    
    return (<div className="item-button__quantity" style={{width: `${width}px`, height: `${height}px`}}>
                <button className="material-symbols-outlined hover:cursor-pointer" onClick={removeHandler}>remove</button>
                <p>{quantity ? quantity : 1}</p>
                <button className="material-symbols-outlined hover:cursor-pointer" onClick={addHander}>add</button>
            </div>)
}