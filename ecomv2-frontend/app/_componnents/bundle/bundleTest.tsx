"use client"
import './bundle.css';
import Image from "next/image";

export function BundleTest() {

    return (
    <section className='bundle_section'>
                <div className='bundle-featured' style={{backgroundImage:"url('/images/Livingroom.png')"}}>
                    <div className='text'>
                        <p>Living Room</p>
                        <a href="/shop?query=Living+Room"  style={{backgroundImage:"url('/images/Livingroom.png')"}}>Shop Now <span className='material-symbols-outlined'>arrow_right_alt</span></a>
                    </div>
                </div>
                <div className='double-bundle'>
                    <div className='sub-bundle' style={{backgroundImage:"url('/images/bedroom.png')"}}>
                    <div className='text'>
                        <p>Bedroom</p>
                        <a href="/shop?query=Bedroom" >Shop Now <span className='material-symbols-outlined'>arrow_right_alt</span></a>
                    </div>
                </div>
                <div className='sub-bundle' style={{backgroundImage:"url('/images/Toaster1.png')"}}>
                    <div className='text'>
                        <p>Kitchen</p>
                        <a href="/shop?query=Kitchen" >Shop Now <span className='material-symbols-outlined'>arrow_right_alt</span></a>
                    </div>
                </div>
                </div>
        </section>
    );
}