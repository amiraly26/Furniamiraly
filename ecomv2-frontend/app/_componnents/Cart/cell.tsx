import "./css/cell.css";
import React, { useContext } from "react";
import QuantityButton from "../QuantityButton/quantitybutton";
import { popProductFromCart } from "./cartContentLoader";
import { RootContext } from "@/app/_providers/RootContext";
import { getPayloadMediaURL } from "@/app/utils/get-payload-url";


export interface ProductCellProps {
    id:number, 
    image:{
        url:string,
        alt:string
    }, 
    prodName: string, 
    color: string, 
    prodPrice: number, 
    quantity:number,
    max?:number
}

export const  Cell =  React.memo(({id, image, prodName, color, prodPrice, quantity, max}:Readonly<ProductCellProps>) => {

    const { cartUpdater } = useContext( RootContext );

    const removeCell = () => {
        const newCartState = popProductFromCart(id, color);
        if( cartUpdater )
            cartUpdater(newCartState)
    }
    const nameLength = prodName?.split(" ").length;

    return (
        <div className="item-cell">
            <div className="w-[80px] h-[96px] rounded-md border-1 border-[var(--neutral-4)]" style={image?.url? {
                                                                                                        backgroundImage: `url("${getPayloadMediaURL(image.url)}")`,
                                                                                                        backgroundSize: "contain",
                                                                                                        backgroundPosition: "center",
                                                                                                        backgroundRepeat: "no-repeat",
                                                                                                    }
                                                                                                    : undefined
                                                                                                }/>
            <div className="item-cell__info">
                <div className="row-1">
                    <p className="item-name" style={{...(nameLength > 2 && {fontSize: "10px"})}}>{prodName}</p>
                    <p className="item-price">Rs{prodPrice}</p>
                </div>
                <div className="row-2">
                    <p className="item-color">Color: {color}</p>
                    <button className="hover:cursor-pointer" onClick={removeCell}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="row-3">
                    <QuantityButton quantity={quantity} productInfo={{id: id, color: color}} height={28} isOnCart avStock={max}/>
                </div>
            </div>
        </div>
    )
})
