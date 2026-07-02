"use client"

import "./page.css";
import { Stepper } from "../_componnents/Cart/stepperDesktop";
import Link from "next/link";
import Row from "../_componnents/Cart/row";
import dynamic from "next/dynamic";
import CountrySelector from "../_componnents/global/countrySelector";
import { CartContent } from "../_componnents/Cart/cartContent";
import Image from "next/image";
import { size } from "zod";
import { CompletedOrder } from "../_componnents/Cart/completedOrder";

interface ProdDetailProps {
        image: {
            src:string,
            alt?:string
        },
        itemName: string,
        itemColor: string,
        itemPrice: number,
        quantity: number
    }

export default function CartPage(){
    const prodDetails:ProdDetailProps = {
        image : {
            src:'/images/products/TABLE.JPG',
            alt:''
        },
        itemColor: 'black',
        itemName: 'Tray Table',
        itemPrice: 19.00,
        quantity:3
    };

    const cell:React.FC<ProdDetailProps> = (props)=>{
        return <Cell {...props}/>
    };
    
    const row:React.FC<ProdDetailProps> = (props)=>{
        return <Row {...props}/>
    };

    const ResponsiveManager = dynamic(()=>import("../_componnents/global/responsiveManager"), { ssr: false});
    const CountrySelector = dynamic(()=>import("../_componnents/global/countrySelector"), {ssr: false});

    

    
    return (
        <div className="flex flex-col pb-[80px] lg:items-center xl:px-[160px] lg:pt-[80px] w-100vw">
            <div id="page-header">
                <Link className="breadcrumbs" href={"/"}>
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                    <p>Back</p>
                </Link>
                <header>
                    <h2>Cart</h2>
                    <Stepper/>
                </header>
            </div>
            <main>
                <CompletedOrder products={[]}/>{/*
                <div className="complete">
                    <div className="complete__header">
                        <p>Thank you! 🎉</p>
                        <h2>Your order has been received</h2>
                    </div>
                    <div className="complete__product-img">
                        <div className="img__container">
                            <div src="http://159.65.15.249:1337/uploads/Paste_image_7d03658df6.svg" className="w-[88px] h-[104px]" style={{backgroundImage: 'url("http://159.65.15.249:1337/uploads/Paste_image_7d03658df6.svg")', backgroundSize: 'contain', backgroundPosition: 'center'}} alt=""/>
                            <span className="qt">2</span>
                        </div>
                        <div className="img__container">
                            <div src="http://159.65.15.249:1337/uploads/Paste_image_7d03658df6.svg" className="w-[88px] h-[104px]" style={{backgroundImage: 'url("http://159.65.15.249:1337/uploads/Paste_image_7d03658df6.svg")', backgroundSize: 'contain', backgroundPosition: 'center'}} alt=""/>
                            <span className="qt">2</span>
                        </div>
                        <div className="img__container">
                            <div src="http://159.65.15.249:1337/uploads/Paste_image_7d03658df6.svg" className="w-[88px] h-[104px]" style={{backgroundImage: 'url("http://159.65.15.249:1337/uploads/Paste_image_7d03658df6.svg")', backgroundSize: 'contain', backgroundPosition: 'center'}} alt=""/>
                            <span className="qt">2</span>
                        </div>
                        
                    </div>
                    <div className="complete__info">
                        <div className="info__row">
                            <p className="label">Order code:</p>
                            <p className="info">#0123_45678</p>
                        </div>
                        <div className="info__row">
                            <p className="label">Date:</p>
                            <p className="info">October 19, 2023</p>
                        </div>
                        <div className="info__row">
                            <p className="label">Total:</p>
                            <p className="info">$1,345.00</p>
                        </div>
                    </div>
                    <Link href={"/"}>Go back to shop</Link>
                </div>*/}
            </main>
        </div>
    )
}


