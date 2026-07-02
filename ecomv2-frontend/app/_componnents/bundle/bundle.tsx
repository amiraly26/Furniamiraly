"use client"
import './bundle.css';
import Image from "next/image";

export function Bundle() {

    return (
    <section className='bundle_section'>
                <div className='livingroom'>
                    <div className='text' id='one'>
                        <p>Living Room</p>
                        <a href="/shop" id='shopnow'>Shop Now <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
                <div className='bedroom'>
                    <div className='text' id='two'>
                        <p>Bedroom</p>
                        <a href="/shop" id='shopnow'>Shop Now <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
                <div className='kitchen'>
                    <div className='text' id='three'>
                        <p>Kitchen</p>
                        <a href="/shop" id='shopnow'>Shop Now <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
        </section>
    );
}