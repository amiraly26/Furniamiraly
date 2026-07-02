"use client"

import './about1.css';
import Image from "next/image";
import { usePathname } from 'next/navigation';

export function Aboutone() {

    return (
    <section className="hero">
        <div className={"hero-image" + (usePathname() === "/contact" ? " round" : "")}>

        </div>

        <div className="hero-content">

            <h1 className="title">
                About Us!
            </h1>

            <p className="subtitle">
            We believe your home should feel easy to style, easy to love, 
            and easy to live in. So we create pieces that fit beautifully into 
            your everyday moments, without the fuss.
            </p>

            <a href="/contact" id='contactus'>Contact Us <i className="fa-solid fa-arrow-right"></i></a>
        </div>
    </section>

    );
}