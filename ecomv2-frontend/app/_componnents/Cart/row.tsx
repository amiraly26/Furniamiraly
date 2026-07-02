import "./css/row.css";
import QuantityButton from "../QuantityButton/quantitybutton";
import { ProductCellProps } from "./cell";
import Image from "next/image";
import { useContext } from "react";
import { RootContext } from "@/app/_providers/RootContext";
import { popProductFromCart } from "./cartContentLoader";
import { getPayloadMediaURL } from "@/app/utils/get-payload-url";


export default function Row({id, image, prodName, color, prodPrice, quantity, max}:Readonly<ProductCellProps>) {
    const { cartUpdater } = useContext(RootContext)
    const removeCell = () => {
            const newCartState = popProductFromCart(id, color);
            if( cartUpdater )
                cartUpdater(newCartState)
    }
    return (
        <div className="product-table__row">
            <div className="col__main">
                <div className="w-[80px] h-[96px] rounded-md border-1 border-[var(--neutral-4)]" style={{backgroundImage:`url("${getPayloadMediaURL(image.url)}")`, backgroundSize:"contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}/>
                <div className="product-item__overview">
                    <p className="name">{prodName}</p>
                    <p className="color">Color: {color}</p>
                    <button className="btn remove-btn hover:cursor-pointer" onClick={removeCell}><span className="material-symbols-outlined">close</span> Remove</button>
                </div>
            </div>
            <div className="col__sg">
                <div className="col__qt">
                    <QuantityButton quantity={quantity} productInfo={{id: id, color: color}} isOnCart avStock={max}/>
                </div>
                <div className="col__price">Rs {prodPrice}</div>
                <div className="col__subtotal">Rs {(prodPrice * quantity).toFixed(2)}</div>
            </div>
        </div>
    )
}
