"use client"

import "./css/cart.css"
import {useEffect, createRef, useContext } from "react";
import { RootContext } from "@/app/_providers/RootContext";
import { CartContent } from "./cartContent";


export function Cart ({isOpen}) {
    
    const divRef = createRef();
    const { isCartOpen } = useContext(RootContext);
    const products = useContext(RootContext).cartContent;


    async function closeCart() {
        if(!divRef.current?.classList.contains("translate-x-100")){
            divRef.current?.classList.toggle("translate-x-100");
        }
        let time = null;
        await new Promise<void>((resolve)=>{
            time = setTimeout(()=>{
                isCartOpen(false);
                resolve();
            }, 100);
        });
        clearTimeout(time);
    }

    async function clickHandler(event:Event) {
        if(divRef.current &&  !divRef.current.contains(event.target as Node)) {
            await closeCart();
        }
    }


    

    useEffect(()=>{
        if(isOpen) {
            const time = setTimeout(()=>{
                divRef.current?.classList.toggle("translate-x-100");
        }, 100);
        return()=>clearTimeout(time);
        }
    }, [isOpen])


    return (
        <>
            {isOpen &&(
                <div className="cart" onClick={clickHandler}>
                <CartContent ref={divRef} cStatic={true} closer={closeCart} content={products}/>
                </div>
                    
            )}
        </>
      )
};