"use client"
import './contact.css';
import Image from "next/image";
import { ContactAction } from './contactAction';
import { useActionState, useEffect } from 'react';

export function Contitle() {
    const [formState, formAction] = useActionState(ContactAction, {})
    return (
        <section className='Contact_Title'>
            <div className='section-one'>
                <h1>Contact Us</h1>
            </div>
            <div className='section-two'>
                <div className='cards'>
                    <Image src={"/images/store 01.svg"} alt={''} width={32} height={32}/>
                    <div className='hug'>
                        <h1>ADDRESS</h1>
                        <p>234 Hai Trieu, Ho Chi Minh City, 
                        Viet Nam</p>
                    </div>
                </div>
                <div className='cards'>
                    <Image src={"/images/call.svg"} alt={''} width={32} height={32}/>
                    <div className='hug'>
                        <h1>CONTACT US</h1>
                        <p>+84 234 567 890</p>
                    </div>
                </div>
                <div className='cards'>
                    <Image src={"/images/fast delivery.svg"} alt={''} width={32} height={32}/>
                    <div className='hug'>
                        <h1>EMAIL</h1>
                        <p>hello@furni.com</p>
                    </div>
                </div>
            </div>
            <div className='section-three'>
                <form className="contact-form" action={formAction}>
                    <div className='container'>
                        <label className="name">FULL NAME</label>
                        <input type="text" id="name" name='name' placeholder="Your Name"/>
                    </div>
                    <div className='container'>
                        <label className="email">EMAIL ADDRESS</label>
                        <input type="email" id="email" name='email' placeholder="Your Email"/>
                    </div>
                    <div className='container'>
                        <label className="message">MESSAGE</label>
                        <textarea id="message" name='message' placeholder="Your message"></textarea>
                    </div>
                    <button type="submit" id='button'>Send Message</button>
                </form>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14981.140237283626!2d57.491012205470625!3d-20.163853242843807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c514951e05167%3A0xc1dd16fdabffc236!2sMetaBox%20Technology!5e0!3m2!1sen!2smu!4v1765441647421!5m2!1sen!2smu" width="600" height="450" loading="lazy"></iframe></div>
        </section>
    );
}