"use client";

import "./css/cartContent.css"
import { forwardRef } from "react";
import Link from "next/link";
import { Cell }  from "./cell";
import { Product } from "./cartContentLoader";
import  React  from "react";

interface CartContentProps{
    cStatic:boolean,
    closer?: CallableFunction,
    content: [Product]
}


export const CartContent = React.memo(forwardRef(({cStatic = false, closer, content}:Readonly<CartContentProps>, innerref) => {

    const products = content;
    let total = 0;

    if(products?.length === 1) 
        total = products[0].prodPrice * products[0].quantity;
    else if(products?.length > 1) 
        total = products?.reduce(( a , b )=>a + (b.prodPrice * b.quantity), 0);

    return (
        <div className={`cart-content ${cStatic ? "translate-x-100 w-[343px]": "w-[312px] rounded-[4px] border-1 border-[var(--neutral-4)] h-[fit-content]"}`} ref={innerref} >
            <div className="summary__items">
                <div className="summary__items-headline">
                    <h5 className={`${!cStatic?"text-[20px]":"text-[34px]"}`}>{cStatic ? "Cart":"Order Summary"}</h5>
                    {cStatic && (
                        <button onClick={closer} className="hover:cursor-pointer">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    )}
                </div>
                <div className={"items-list " + (!products || products?.length === 0 ? "justify-center": "")}>
                    {(!products || products?.length === 0) &&
                        <>
                            <p className="material-symbols-outlined text-center" style={{fontSize:"56px"}}>shopping_cart_off</p>
                            <p className="text-center">Your cart is empty</p>
                        </>
                    }
                    {(products && products.length > 0) &&
                       products.map((product,index)=><Cell key={index}{...product} onCheckout={cStatic ? false : true} />)
                    }
                </div>
                
            </div>
            {(products?.length > 0) && <div className={`summary__counts ${cStatic ? "h-[218px]" : ""}`}>
                <div className="fields">
                    {!cStatic && (
                        <div className="fields__subtotal shipping py-[13px]">
                            <p>Shipping</p>
                            <p className="number">MUR {total.toFixed(2)}</p>
                        </div>
                    )}
                    <div className={`fields__subtotal ${cStatic ? "flex-1":"py-[13px]"}`}>
                        <p>Subtotal</p>
                        <p className="number">MUR {total.toFixed(2)}</p>
                    </div>
                    <div className={`fields__total ${cStatic ? "flex-1":"py-[13px]"}`}>
                        <p style={ { fontWeight :"400",} }>Total</p>
                        <p>MUR {total.toFixed(2)}</p>
                    </div>
                </div>
                {cStatic &&(
                <div className="buttons">
                    <Link href={"/checkout"} className="buttons__checkout">
                        <p>Checkout</p>
                    </Link>
                    <Link href={"/cart"}>
                        <p>View Cart</p>
                    </Link>
                </div>
                )}
            </div>}
        </div>
    )
}))
