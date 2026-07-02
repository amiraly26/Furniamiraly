import { forwardRef, useEffect, createRef, useImperativeHandle } from "react"
import "./css/stepperDesktop.css"

export const Stepper = forwardRef((props, forwardRef) => {


    const internalStep1Ref = createRef();
    const internalStep2Ref = createRef();
    const internalStep3Ref = createRef();

    
    useImperativeHandle(forwardRef, ()=>({
        step1 : internalStep1Ref.current,
        step2: internalStep2Ref.current,
        step3: internalStep3Ref.current
    }))





    const { current } = props;

    return (
        <div className={"process-steps relative transition-[all] duration-300 ease-in-out " + (current === "checkout" ? "-translate-x-[288px] md:translate-none" : "") + (current === "complete" ? "-translate-x-[576px] md:translate-none " :"")}>
            <div ref={internalStep1Ref} className={"process first hover:cursor-not-allowed " + (current === "checkout" ? "complete hover:cursor-pointer": "") + (current === "complete" ? "complete hover:cursor-not-allowed " : "")}>
                <div className={"process__no "+((current === "checkout" || current === "complete") ? "material-symbols-outlined": "")}>{(current === "checkout" || current === "complete") ? "check": "1"}</div>
                <p className="process__name">Shopping Cart</p>
            </div>
            <div ref={internalStep2Ref} className={"process "+ (current === "cart" ? "incomplete hover:cursor-pointer " : "") + ((current === "checkout" || current === "complete") ? "current hover:cursor-not-allowed " : "") + (current ==="complete" ? "complete ": "")}>
                <div className={"process__no "+((current === "complete") ? "material-symbols-outlined ": "" )}>{(current !== "complete") ? "2" : "check"}</div>
                <p className="process__name">Checkout details</p>
            </div>
            <div ref={internalStep3Ref} className={"process hover:cursor-not-allowed " +((current === "complete") ? "current complete ": "incomplete")}>
                <div className={"process__no "+ ((current === "complete")? "material-symbols-outlined ": "")}>{(current !== "complete") ? "3" : "check"}</div>
                <p className="process__name">Order complete</p>
            </div>
        </div>
    )
})