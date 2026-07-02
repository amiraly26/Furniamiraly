"use client"
import './services.css';
import Image from "next/image";
import Router from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function Service() {
    const divRef = useRef(null);
    const cardConntainerRef = useRef(null);
    const pathname = usePathname();
    const customColor = "#f4f6f8";
    useEffect(()=>{
        if(divRef.current && cardConntainerRef.current) {
            if(pathname === "/contact"){
                divRef.current.style.backgroundColor = customColor;
                cardConntainerRef.current.style.backgroundColor = customColor;
            }
        }
    }, [])
    return (
        <section ref={divRef} className={'service_section bg-white h-auto'}>
            <div ref={cardConntainerRef} className="cards-container">

                <div className="card">
                    <Image src="/images/fast delivery.svg" alt='' width={48} height={48}/>
                    <h3>Free Shipping</h3>
                    <p className='desc'>Order above $200</p>
                </div>

                <div className="card">
                    <Image src="/images/money.svg" alt='' width={48} height={48}/>
                    <h3>Money-Back</h3>
                    <p className='desc'>30 days guarantee</p>
                </div>

                <div className="card">
                    <Image src="/images/lock 01.svg" alt='' width={48} height={48}/>
                    <h3>Secure Payments</h3>
                    <p className='desc'>Secured by Stripe</p>
                </div>

                <div className="card">
                    <Image src="/images/call.svg" alt='' width={48} height={48}/>
                    <h3>24/7 Support</h3>
                    <p className='desc'>Phone and Email support</p>
                </div>

            </div>
        </section>
    );
}