"use client"
import { Card } from '../shopPage/Card';
import "./css/productScrollable.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Scrollbar } from 'swiper/modules';
import { ArticleProps } from '@/app/data/types';
import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';





interface ProductCardScrollableType {
  articles : ArticleProps[]
  allReviews: any;
}

export default function ProductCardScrollable({ articles = [], allReviews }:Readonly<ProductCardScrollableType>) {
  
  const timerIdRef = useRef(null)
  const swiperRef = useRef(null); //ref for swipper to cleanup after unmout
  const rootRef = useRef(null); //ref for the documentRoot
  const scrollbarRef = useRef(null); //ref for scrollBar used in scrollbar mutator observer
  const mutationObserverRef = useRef(null);//ref for mutation observer;
  const breakpointsConfig =  {  //breakpoint config for swiper.js
    768: {
      spaceBetween: 24,
    },
  };

  const scrollbarconfig = { //scrollbar config for scrollbar module for swiper.js
    hide: false,
    draggable: true,
  };

  const modulesConfig = [FreeMode, Scrollbar]; //modules needed

  
  
  const scrollHandler = useCallback((swiperInstance)=>{  //scroll handler Function

    if(swiperInstance.isEnd) { // push the list to the left if it reach end
      rootRef.current?.classList.remove("__left"); 
      rootRef.current?.classList.add("__right");
    }

    if(swiperInstance.isBeginning && (!rootRef.current?.classList.contains("__left"))) { //push the list to the right if reach the beginning
      rootRef.current?.classList.remove("__rigth");
      rootRef.current?.classList.add("__left");
    }
  },[]);
/* resize hanlder funntion to put the content list in its inital state when the screen has enough space to display it
    it will observe the sate of the scrollbar in order to know if the viewport has enough space to display all content without scroll
    since swiper.js will hide the scrollbar when there is enough space the scrollbar state is used to determine wheter we have to put the element in it's initial state or not  
 */
  const resizeHandler = useCallback((swiperInstance) => { 
    const mutationObserverConfig = {
      attributes: true,
      attributeFilter: ["class"],
      attributeOldValues: true
    }

    timerIdRef.current =  setTimeout(()=> { //asynchronous execution to capture the element after being rendered

    if(!swiperInstance || swiperInstance.destroyed)
      return

      const scrollbar = scrollbarRef.current;
      if(!scrollbar)
        return
      swiperInstance.params.scrollbar.el = scrollbar,
      swiperInstance.scrollbar.init(); //initialise the custom scrollbar
      swiperInstance.scrollbar.updateSize();


      const scrollbarMutationObserver = new MutationObserver((mutationList, observer)=>{ //mutaton observer is a sort of event listener for an html tag by observing every mutation in the tag

        for(const mutation of mutationList) {
          if(mutation.type === "attributes" && mutation.attributeName === "class") {
            const newClassValue = scrollbar.classList;

            if(newClassValue && newClassValue.contains("swiper-scrollbar-lock")) { //if scrollbar disapear 
              rootRef.current.removeAttribute("class");
              rootRef.current.classList.add("__left");
              swiperInstance.slideTo(0, 0, false);
            }
          }
        }
      })
      mutationObserverRef.current = scrollbarMutationObserver;
      scrollbarMutationObserver.observe(scrollbar, mutationObserverConfig);
    }, 150)
  },[])

  const swiperConfig = { //swiper overall config
    slidesPerView: "auto",
    spaceBetween: 12,
    modules: modulesConfig,
    freeMode: true,
    scrollbar:{...scrollbarconfig},
    breakpoints:{
      768: {
        spaceBetween: 24,
      }
    },
    className: "mySwiper"
  } 

  useEffect(()=>{
    const swiperInstance = swiperRef.current;
    if(swiperInstance) {
      const timerId = setTimeout(resizeHandler(swiperInstance), 150);
      return ()=>{
        swiperInstance?.destroy(true, true); //cleanup
        clearTimeout(timerId);
        clearTimeout(timerIdRef.current);
      }
    }
    
  }, []);

  return (
    <>
    <div id='prodscroll_headline'>
      <h4>New<br/>Arrivals</h4>
      <Link href={"/shop/"}>
        <p>More products</p>
        <p className='material-symbols-outlined'>arrow_right_alt</p>
      </Link>
    </div>
    <div id='prodscroll' className="__left" ref={rootRef}>
      <Swiper
        {...swiperConfig}
        onTransitionEnd={(swiper)=>scrollHandler(swiper)}
        onSwiper={(swiper)=>{
          swiperRef.current = swiper;
        }}
        onDestroy={
          (swiper)=>{
            mutationObserverRef.current?.disconnect();
          }
        }
      >
        {articles.map( (article)=><SwiperSlide key={article.id}><Card {...article} images={{url: (article.images ? article.images[0].url : ''), alternativeText: (article.images ? article.images[0].alternativeText : 'No image')}} allReviews={allReviews} isOnHome={true}/></SwiperSlide>)}
      </Swiper>
    </div>
    <div className='swiper-scrollbar' ref={scrollbarRef}></div>
    <div className='more-mobile'>
     <Link className="" href={"/shop/"}>
        <p>More products</p>
        <p className='material-symbols-outlined'>arrow_right_alt</p>
      </Link>
    </div>  
    </>
  );
}