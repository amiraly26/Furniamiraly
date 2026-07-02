"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/navigation";
import './styles.css';
import { Navigation, Pagination } from 'swiper/modules';


interface Slider{
  sliderImage:{
    url:string,
    alternativeText: string,
  },
  sliderHeadline: string,
  slidrText: string
}

interface HeroSectionProps {
  Sliders: [Slider]
}

export default function HeroSection() {
  const pagination = {
    clickable: true,
  };

  const yr = new Date().getFullYear();

  const swipperRef:any  = useRef(null);
  const nextRef:any = useRef(null);
  const prevRef:any = useRef(null);

  useEffect(()=>{
    return ()=>{
      swipperRef.current.destroy(true, true)
    }
  })

  return (
    <div className="mx-auto max-w-[1120px] px-8 pb-4 pt-[128px] md:pb-6 lg:px-0">


      <Swiper
        navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current
        }}
        loop={true}
        pagination={pagination}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        onSwiper={(swipper)=>( swipperRef.current = swipper)}
      >
      <div className="swiper-button-prev  bg-white p-3 rounded-full shadow" style={{marginLeft:"31px", width:"52px", height:"52px"}} onClick={()=>swipperRef.current?.slidePrev()}>
        <span className="material-symbols-outlined text-[var(--neutral-7)]">arrow_left_alt</span>
      </div>

      <div className="swiper-button-next  bg-white p-3 rounded-full shadow" style={{marginRight:"31px", width:"52px", height:"52px"}}onClick={()=>swipperRef.current?.slideNext()}>
        <span className="material-symbols-outlined text-[var(--neutral-7)]">arrow_right_alt</span>
      </div>
        <SwiperSlide id='slide1'>
            <h2 className='hero-heading'>Transform Your Space, Elevate Your Life</h2>
            <p className='hero-desc'>{ `Furni is a gift & decorations store based in Port Louis, Mauritius. Est since ${yr}. `}</p>
        </SwiperSlide>
        <SwiperSlide id='slide2'>
            <h2 className='hero-heading'>Designed for Style, Built for Living</h2>
            <p className='hero-desc'>Curated furniture and decor that blend modern aesthetics with everyday functionality. Proudly serving Mauritius.</p>
        </SwiperSlide>
        <SwiperSlide id='slide3'>
            <h2 className='hero-heading'>Artisan Craftsmanship, Timeless Comfort</h2>
            <p className='hero-desc'>{`Discover handcrafted furniture designed to bring warmth and elegance to your home. Since ${yr}.`}</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
