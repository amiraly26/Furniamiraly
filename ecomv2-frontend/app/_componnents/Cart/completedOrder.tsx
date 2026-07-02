import { Product } from "./cartContentLoader";
import { getPayloadMediaURL } from "@/app/utils/get-payload-url";
import { createRef, useState } from "react";
import  Link from "next/link";
import "./css/completedOrder.css";
import { useContext, useEffect } from "react";
import { RootContext } from "@/app/_providers/RootContext";
import { clearCart } from "./cartContentLoader";


interface MiniProdCardsProps{
    url: string;
    qt: number;
}

const MiniProdCard: React.FC = ({url, qt}:MiniProdCardsProps)=>{
    
    
    return (
        <div className="img__container">
            <div  className="w-[88px] h-[104px] rounded-[12px]" style={{backgroundImage: `url("${getPayloadMediaURL(url)}")`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat:'no-repeat'}} alt=""/>
            <span className="qt">{qt}</span>
        </div>
    )
}



interface CompletedOrderProps {
    total: number;
    products: any[]
}

export function CompletedOrder({total}:Readonly<CompletedOrderProps>){
    const { cartUpdater } = useContext(RootContext);
    const [products, setProducts] = useState([])

    const handleCloseTab = () => {
    cartUpdater(clearCart());
    }
    useEffect(()=>{
        setProducts(JSON.parse(localStorage.getItem("purchase")));
        window.addEventListener("beforeunload", handleCloseTab);
        cartUpdater(clearCart());
        return ()=>{
            window.removeEventListener("beforeunload", handleCloseTab);
        }
    },[])
    return (
        <div className="complete">
                    <div className="complete__header">
                        <p>Thank you! 🎉</p>
                        <h2>Your order has been received</h2>
                    </div>
                    <div className={"complete__product-img " + (products.length > 4 ? "justify-start ": "justify-center")}>
                       {products && products.map((product, index)=> {
                        return <MiniProdCard key={index} url={product.image.url} qt={product.quantity}/>
                       })}        
                    </div>
                    <div className="complete__info">
                        <div className="info__row">
                            <p className="label">Date:</p>
                            <p className="info">{new Date().toLocaleString('en-US', {year: "numeric", month: "long", day:"numeric"})}</p>
                        </div>
                        <div className="info__row">
                            <p className="label">Total:</p>
                            <p className="info">MUR {total}</p>
                        </div>
                    </div>
                    <Link href={"/shop"}>Go back to shop</Link>
                </div>
    )

}
