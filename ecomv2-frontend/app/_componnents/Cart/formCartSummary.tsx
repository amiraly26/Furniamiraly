import { useState, useEffect, useContext, } from "react";
import "./css/formCartSummary.css"
import { RootContext } from "@/app/_providers/RootContext";
import { PageNavigationContext } from "@/app/cart/page";

export default function FormCartSummary({delivery}) {
    
    const products = useContext(RootContext).cartContent;
    const goNext = useContext(PageNavigationContext).goNextHandler;
    const subtotal = products.length === 0 ? 0 : products.reduce((a, b)=> { return a + (b.prodPrice * b.quantity)}, 0);
    const { deliverySetter } = useContext(PageNavigationContext);
    const [total, setTotal] = useState(subtotal);
    const [computedTotal, setComputedTotal] = useState(total);
    const { finalTotalSetter } = useContext(PageNavigationContext);


    const handleSubmit = (submitEvent : Event)=>{
        submitEvent.preventDefault();
        const formData = new FormData(submitEvent.currentTarget);
        //const delvery = formData.get("delivery");
        const form =  submitEvent.currentTarget;
        const radios =  form.querySelectorAll(".summary-delivery__choice");
        
        if(!delivery || delivery === null || delivery === undefined) {
            for(let radio of radios) {
                radio.classList.add("shake-radio");
                setTimeout(()=>{
                    radio.classList.remove("shake-radio");
                }, 500)                
            }
        } else {
            goNext();
        }



    }

    const chooseDeliveryMethod = (deliveryMethod: string) => {
        deliverySetter(deliveryMethod);
    }


    useEffect(()=>{
        setTotal(subtotal);
    }, [subtotal])

    useEffect(()=>{
        switch(delivery){
            default:
                setComputedTotal(total);
                finalTotalSetter(total);
                break
            case "free":
                setComputedTotal(total);
                finalTotalSetter(total)
                break;
            case "express":
                setComputedTotal(total + 15);
                finalTotalSetter(total + 15);
                break
            case "pick-up":
                setComputedTotal(total * 0.79);
                finalTotalSetter(total * 0.79);
                break
        }
    }, [total, delivery])




    return (
        <>
        <form name="delivery" className="product-cart__summary" onSubmit={handleSubmit}>
            <h2>Summary</h2>
            <div className="summary-delivery">
                <div className="summary-delivery__choice">
                    <div className="inpt-radio__group">
                        <input name="delivery" id="free-shipping" type="radio" value={"free"} onChange={(e)=>{chooseDeliveryMethod(e.target.value)}}/>
                        <label htmlFor="free-shipping"> Free Shipping</label>
                    </div>
                    <p className="added__price">Rs 0.00</p>
                </div>
                <div className="summary-delivery__choice">
                    <div className="inpt-radio__group">
                        <input name="delivery" id="express" type="radio" value={"express"} onChange={(e)=>{chooseDeliveryMethod(e.target.value)}}/>
                        <label htmlFor="express">Express Shipping</label>
                    </div>
                    <p className="added__price">+Rs 15.00</p>
                </div>
                <div className="summary-delivery__choice">
                    <div className="inpt-radio__group">
                        <input name="delivery" id="pick-up" type="radio" value={"pick-up"} onChange={(e)=>{chooseDeliveryMethod(e.target.value)}}/>
                        <label htmlFor="pick-up">Pick Up</label>
                    </div>
                    <p className="added__price">%21.00</p>
                </div>
            </div>
            <div className="fields">
                <div className="fields__subtotal">
                    <p>Subtotal</p>
                    <p>Rs {(subtotal).toFixed(2)}</p>
                </div>
                <div className="fields__total">
                    <p className="font-semibold">Total</p>
                    <p>Rs {(computedTotal).toFixed(2)}</p>
                </div>
            </div>
            <button type="submit">Checkout</button>
        </form>
    </>
    ) 
}