"use client"

import "./page.css";
import { Stepper } from "../_componnents/Cart/stepperDesktop";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect, useContext, createRef, useCallback, useActionState} from "react";
import { CheckoutForm } from "../_componnents/Cart/checkoutForm";
import  CartTable from "../_componnents/Cart/cartTable";
import { createContext } from "react";
import { RootContext } from "../_providers/RootContext";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import checkoutAction from "../_componnents/Cart/checkoutAction";
import { CompletedOrder } from "../_componnents/Cart/completedOrder";


export const PageNavigationContext = createContext({})

    
export default function CartPage(){


    const {isCartOpen, openCheck} = useContext(RootContext);
    const [delivery, setDelivery] = useState(null);
    const [stage, setStage] =  useState({current: "cart", next: "checkout", stagePrev: null});
    const [firstRender, setFirstRender] = useState(true);
    const products = useContext(RootContext).cartContent;
    const [finalTotal, setFinalTotal] = useState(0);
    const [checkoutFormState, checkoutFormAction] = useActionState(checkoutAction, {valid:{}, errors:{},  sent: false,});
    const mainRef = useRef(null);
    const RenderCount = useRef(0);
    const stepperRef = createRef();
    const router = useRouter();
    




    const Loader:React.FunctionComponent = ()=>{
        return(
        <div className="load-wraper">
            <div className="activity"></div>
        </div>)        
    };
    const DynamicCartTable = useCallback(dynamic(()=> import("../_componnents/Cart/cartTable"), {ssr: false, loading: Loader}), []);

    const goToCheckout = async()=>{
        if(mainRef.current) {
            mainRef.current.classList.add("translate-x-full", "opacity-0");
            await new Promise((resolve)=>{setTimeout(()=>{
                mainRef.current.classList.remove("translate-x-full");
                mainRef.current.classList.add("-translate-x-full");
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                })
                setStage({current: "checkout", next: "finished payemnt", stagePrev:"cart"});
                resolve()
            },750)});
            mainRef.current.classList.remove("opacity-0");
            mainRef.current.classList.remove("-translate-x-full");
        }
    }

    const completeOrder = async()=>{
        if(mainRef.current) {
            mainRef.current.classList.add("translate-x-full", "opacity-0");
            await new Promise((resolve)=>{setTimeout(()=>{
                mainRef.current.classList.remove("translate-x-full");
                mainRef.current.classList.add("-translate-x-full");
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                })
                setStage({current: "complete", next: null, stagePrev:"checkout"});
                resolve()
            },750)});
            mainRef.current.classList.remove("opacity-0");
            mainRef.current.classList.remove("-translate-x-full");
        }
    }

    const goBack = async ()=>{
        if(mainRef.current){
            mainRef.current.classList.add("-translate-x-full");
            mainRef.current.classList.add("opacity-0");
            const wNext = stage.current;
            const wCurr = stage.stagePrev
            const wPrev = stage.current;
            await new Promise((resolve)=>{setTimeout(()=>{
                mainRef.current.classList.remove("-translate-x-full");
                mainRef.current.classList.add("translate-x-full");
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                })
                setStage({current: wCurr, next: wNext, stagePrev: wPrev});
                resolve()
            },750)});
            mainRef.current.classList.remove("opacity-0");
            mainRef.current.classList.remove("translate-x-full");
            
            
            
        }
    }

    const handleStepClick = async (step: number) => {
        switch(step){
            case 1:
                if(stage.current === "cart" || stage.current === "complete") {
                    return;
                }
                await goBack();
                break;
            case 2:
                if(stage.current === "checkout"  || stage.current === "complete" || products.length === 0)
                    return;
                if(stage.current === "cart" && delivery === null) {
                    const radioForm = document.querySelector("form[name=delivery]");
                    const radios = radioForm?.querySelectorAll(".summary-delivery__choice");
                    if(window.innerWidth < 1024) {
                        radioForm?.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        })
                    }
                    radios?.forEach((radio)=>{
                        radio.classList.add("shake-radio");
                    })
                    setTimeout(()=>{
                        radios.forEach((radio)=>{
                            radio.classList.remove("shake-radio");
                        })
                    }, 750)
                    return;
                }
                await goToCheckout();
                break;
                    
        }
        return;    

    }
    const handleStep1= async ()=>{
        await handleStepClick(1)
    }
    const handleStep2 = async ()=>{
        await handleStepClick(2)
    }


    useEffect(()=>{
       if(openCheck)
            isCartOpen(false)
        RenderCount.current += 1;
    },[])

    useEffect(()=>{
        const {step1, step2, step3} = stepperRef.current;
        step1.addEventListener("click", handleStep1);
        step2.addEventListener("click", handleStep2);
        window.addEventListener("popstate", async ()=>{
            await goBack();
        })

        if(stage.stagePrev === "checkout") {
            document.querySelectorAll("input[type=radio]").forEach((radio)=>{
                radio.checked = (radio.getAttribute("value") === delivery)
            })
        }

        return ()=>{
        window.removeEventListener("popstate", async()=>{
            await goBack();
            })
        step1.removeEventListener("click", handleStep1)
        step2.removeEventListener("click", handleStep2);
        }
    }, [stage, delivery]);

    useEffect(()=>{
        if(checkoutFormState.sent && checkoutFormState.result.success) {
           completeOrder();
        }
    },[checkoutFormState])
    
    



    
    return (
        <div className="flex flex-col pb-[80px] lg:items-center xl:px-[160px] pt-[105px] w-100vw">
            <div id="page-header">
                <Link className="breadcrumbs" href={"/"}>
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                    <p>Back</p>
                </Link>
                <header className="cart-header">
                    <h2>{stage.current.charAt(0).toUpperCase()+stage.current.slice(1)}</h2>
                    <Stepper current={stage.current} ref={stepperRef}/>
                </header>
            </div>
            <main ref={mainRef} className={(stage.current === "checkout" || stage.current === "complete") ? "items-center" : ""}>
                <PageNavigationContext.Provider value={
                    {
                        goNextHandler:goToCheckout, 
                        firstRenderHandler: setFirstRender, 
                        deliveryContext: delivery, 
                        deliverySetter: setDelivery,
                        formState: checkoutFormState,
                        checkoutAction: checkoutFormAction,
                        finalTotalSetter: setFinalTotal,
                    }}>
                    {stage.current === "cart" &&  ((RenderCount.current > 0 )? <DynamicCartTable/> : <CartTable/>)}
                    {stage.current === "checkout" && <CheckoutForm delivery={delivery} finalTotal={finalTotal}/>}
                    {stage.current === "complete" && <CompletedOrder total={finalTotal} products={products}/>}
                </PageNavigationContext.Provider>    
            </main>
        </div>
    )
}


