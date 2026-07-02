import { Aboutone } from '../about1/about1';
import { Contitle } from '../contact/contact';
import { Service } from '../services/services';
import './contactus.css';
import Image from "next/image";

export function Contact() {
    return (
        <section className='contactus'>
            <div className='division_one'>
            <div className='firstline'>
                <h1>We believe in sustainable decor. We're passionate about life at home.</h1>
                <p>Our features timeless furniture, with natural fabrics, curved lines, 
                    plenty of mirrors and classic design, which can be incorporated into 
                    any decor project. The pieces enchant for their sobriety, to last for 
                    generations, faithful to the shapes of each period, with a touch of the 
                    present</p>
            </div>
            <Aboutone/>
            </div>
            <Contitle/>
            <Service/>
        </section>
    );
}