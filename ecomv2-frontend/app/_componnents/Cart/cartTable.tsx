"use client";


import { createContext, useContext} from "react";
import ResponsiveManager from "../global/responsiveManager";
import Row from "./row";
import { Cell } from "./cell";
import type { ProductCellProps } from "./cell";
import FormCartSummary from "./formCartSummary";
import "./css/cartTable.css";
import { RootContext } from "@/app/_providers/RootContext";
import Link from "next/link";
import { PageNavigationContext } from "@/app/cart/page";

export const TableUpdater = createContext({
    cartTableStateUpdater: ()=>{}
})

export default function ProductTable(){


    const products = useContext(RootContext).cartContent;
    const { deliveryContext } = useContext(PageNavigationContext);
    const isEmpty = products.length === 0;

  
    

    const cell :React.FC<ProductCellProps> = (props: Record<any, any>) =>{ return (<Cell {...props}></Cell>)}
    const row :React.FC<ProductCellProps> = (props: Record<any, any>) => { return (<Row {...props}></Row>)}

    return (
    <>
    {!isEmpty && (
    <div className="product-table">
        <div className="product-table__header">
            <div className="col__main">Product</div>
            <div className="col__sg">
                <div className="col__qt">Quantity</div>
                <div className="col__price">Price</div>
                <div className="col__subtotal">Subtotal</div>
            </div>
        </div>
        <div className="product-table__body flex flex-col items-center sm:block">
            {products.map((product, index)=><ResponsiveManager key={product.id + index} Mobile={cell} MobileProps={{...product}} Desktop={row} DesktopProps={{...product}}/>)}
        </div>
    </div>)}
    {!isEmpty && (<FormCartSummary delivery={deliveryContext}/>)}
    {isEmpty && 
    <div className="empty-cart">
        <div className="material-symbols-outlined text-center">shopping_cart_off</div>
        <h3>Your cart is empty!</h3>
         <Link href={"/shop"}><p>Go add something</p><span className="material-symbols-outlined">arrow_right_alt</span></Link>
    </div>}
    </>        
    );

}