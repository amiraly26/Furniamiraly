"use client";

import "./css/checkoutForm.css";
import dynamic from "next/dynamic";
import testAction from "./checkoutAction";
import React, {useEffect, useCallback, useContext, createRef} from "react";
import { useFormStatus } from "react-dom";
import { PageNavigationContext } from "@/app/cart/page";
import { RootContext } from "@/app/_providers/RootContext";

interface CheckoutFormProps {
    delivery: string,
    finalTotal: number,
}

export function CheckoutForm({delivery, finalTotal}: Readonly<CheckoutFormProps>) {
    
    const {formState, checkoutAction} = useContext(PageNavigationContext);
    const items = useContext(RootContext).cartContent;
    const countryLableRef= createRef()
    const { cartContent } = useContext(RootContext);


    const SubmitButton = React.memo(()=>{
        const { pending } = useFormStatus()
        return (
            <button type="submit" className="px-10 py-3 rounded-[8px] bg-[var(--neutral-7)] text-white hover:cursor-pointer" style={{fontFamily:"var(--font-inter)"}} disabled={pending}> {!pending? "Place Order" : <div className="submit-btn-loader"/>} </button>
        )
    })

    const placeHolder = React.memo(()=>{
            <input  type="text" disabled/>
    })


    const handleCountryError = ()=>{
        if("country" in formState.errors) {
            countryLableRef.current.classList.add("shake");
            setTimeout(()=>{
                countryLableRef.current.classList.remove("shake");
            },300)
        }
    }
    

    const handleError = (inputElement: HTMLElement) =>{
        handleCountryError();
        const fieldName: string | null = inputElement.getAttribute('name');
        if(fieldName && (fieldName in formState.errors))
            inputElement.classList.add("shake");
            setTimeout(()=>{
                inputElement.classList.remove("shake")
            },300)
    }


    useEffect(()=>{
        const  inputs = document.querySelectorAll("input");
        if(inputs){
            for(let input of inputs) {
                handleError(input)
            }
        }
    }, [formState])

    useEffect(()=>{
        localStorage.setItem("purchase", JSON.stringify(cartContent));
    },[])

    const CountrySelector = useCallback(dynamic(()=>import("../global/countrySelector"), {ssr: false, loading: placeHolder}), []);

    return (
        <>
        <form name="order_checkout-info" action={checkoutAction}>
                <fieldset className="contact-info">
                    <h2>Contact information</h2>
                        <div className="__double">
                            <div className="input-group">
                                <label htmlFor="fname">FIRST NAME</label>
                                <input key={formState.errors.fname ? formState.errors.fname[0] : "fname-default"} className="text-[var(--neutral-4)]" type="text" name="fname" id="fname" placeholder={formState.errors?.fname ? formState.errors?.fname[0] : "First name"} defaultValue={formState.valid?.fname ? formState.valid?.fname : ""} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="lname">LAST NAME</label>
                                <input key={formState.errors.lname ? formState.errors.lname[0] : "lname-default"} className="text-[var(--neutral-4)]" type="text" name="lname" id="lname" placeholder={formState.errors?.lname ? formState.errors?.lname[0] : "Last name"} defaultValue={formState.valid?.lname ? formState.valid?.lname : ""}/>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">NATIONAL ID</label>
                            <input key={formState.errors.street ? formState.errors.nid[0] : "nid-default"} className="text-[var(--neutral-4)]" type="text" name="nid" id="nid" placeholder={formState.errors?.nid ? formState.errors?.nid[0] : "National identification number"} defaultValue={formState.valid?.nid ? formState.valid?.nid : ""}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">PHONE NUMBER</label>
                            <input key={formState.errors.phone ? formState.errors.phone[0] : "phone-default"} className="text-[var(--neutral-4)]" type="text" name="phone" id="phone" placeholder={formState.errors?.phone ? formState.errors?.phone[0] : "Phone number"} defaultValue={formState.valid?.phone ? formState.valid?.phone : ""}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">EMAIL ADDRESS</label>
                            <input key={formState.errors.email ? formState.errors.email[0] : "email-default"} className="text-[var(--neutral-4)]" type="email" name="email" id="email" placeholder={formState.errors?.email ? formState.errors?.email[0] : "Email address"} defaultValue={formState.valid?.email ? formState.valid?.email : ""}/>
                        </div> 
                    </fieldset>
                    <fieldset className="shipping-address">
                        <h2>Shipping Address</h2>
                        <div className="input-group">
                            <label htmlFor="street">STREET ADDRESS*</label>
                            <input key={formState.errors.street ? formState.errors.street[0] : "street-default"} className="text-[var(--neutral-4)]" type="text" name="address" id="street" placeholder={formState.errors?.address ? formState.errors?.address[0] : "Street address"} defaultValue={formState.valid?.address ? formState.valid?.address : ""}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="country" ref={countryLableRef} className="text-[var(--neutral) transition-all duration-100 ease-in-out]">COUNTRY*</label>
                            <CountrySelector inputName={"country"}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="city">TOWN/CITY*</label>
                            <input key={formState.errors.city ? formState.errors.city[0] : "city-default"} className="text-[var(--neutral-4)]" type="city" name="city" id="city" placeholder={formState.errors?.city ? formState.errors?.city[0] : "Town/City"} defaultValue={formState.valid?.city ? formState.valid?.city : ""}/>
                        </div>
                        <div className="__double">
                            <div className="input-group">
                                <label htmlFor="state">STATE</label>
                                <input key={formState.errors.state ? formState.errors.state[0] : "state-default"} className="text-[var(--neutral-4)]" type="text" name="state" id="state" placeholder={formState.errors?.state ? formState.errors?.state[0] : "State"} defaultValue={formState.valid?.state ? formState.valid?.state : ""}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="zip">ZIP CODE</label>
                                <input key={formState.errors.zip ? formState.errors.zip[0] : "zip-default"} className="text-[var(--neutral-4)]" type="text" name="zip" id="zip" placeholder={formState.errors?.zip ? formState.errors?.zip[0] : "Zip Code"} defaultValue={formState.valid?.zip ? formState.valid?.zip : ""}/>
                            </div>
                        </div>
                        <input type="hidden" name="deliveryMethod" value={delivery}/>
                        <input type="hidden" name="total" value={finalTotal}/>
                        <input type="hidden" name="items" value={JSON.stringify(items)}/>
                        <SubmitButton/>
                    </fieldset>
                    
                </form>
                {/*<div className="aside-cart flex flex-col gap-6">
                    <button type="submit" form="order_checkout-info" className="lg:hidden px-10 py-3 rounded-[8px] bg-[var(--neutral-7)] text-white" style={{fontFamily:"var(--font-inter)"}}>Place Order</button>
                </div>*/}
        </>
    );
}