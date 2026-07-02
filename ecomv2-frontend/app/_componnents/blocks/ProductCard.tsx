"use client";
import '../../globals.css';
import "./ProductCard.css";
import "../QuantityButton/quantitybutton";
import{useContext, useRef, useState} from "react";
import Link from "next/link";
import QuantityButton from '../QuantityButton/quantitybutton';
import { RootContext } from "@/app/_providers/RootContext";
import { cartloader, pushProductToCart, updateCart, type Product as CartProduct} from "../Cart/cartContentLoader";
import { getPayloadMediaURL } from '@/app/utils/get-payload-url';
import StarRating from '../shopPage/StarRating';

type Product = {
  id: number | string;
  documentedId: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string | Array<{ children?: Array<{ text?: string }> }>;
  price: number;
  PercentageDiscount: number;
  sku: string | null;
  measurement: string;
  reviewsCount?: number;
  images: {
    url: string;
    alternativeText: string | null;
  }[];
  featuredImage:{
    url: string;
    alternativeText: string | null;
  }
  stock: number;
  featured: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  colour: Array<{ name: string }>;
};

export interface ProductCardProps {
  product: Product;
  avgRating: number;
  numReviews: number;
  documentId: string;
}

type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: {
    url: string;
    alt: string | null;
  };
  color: string;
};

export default function ProductCard({ product, avgRating, numReviews , documentId}: ProductCardProps) {
    const colours = Array.isArray(product.colour)
    ? product.colour.map(c => c.name)
  : [];

  const featuredimage= product.featuredImage;
  const images = [
  ...(featuredimage ? [featuredimage] : []),
  ...(product.images ?? []),
].filter((image, index, all) => image?.url && all.findIndex((item) => item?.url === image.url) === index).slice(0, 3);
  const descriptionText = Array.isArray(product.description)
    ? product.description
        .map((block) => block?.children?.map((child) => child.text).join("") ?? "")
        .join(" ")
    : product.description ?? "";



  const [currentIndex, setCurrentIndex] = useState(0);
  const activeImage = images[currentIndex] ?? images[0];
  const [selectedColor, setSelectedColor] = useState(colours[0]);
  const { cartContent = [], cartUpdater, isCartOpen } = useContext(RootContext);
  const addToCartBtnRef = useRef<HTMLButtonElement | null>(null);

    const cartItem = (cartContent as CartItem[]).find(
        item => item.id === documentId && item.color === selectedColor
    );
    const isOnCart = !!cartItem;

  const quantity = cartItem ? cartItem.quantity : 0;

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

    const pushNewProduct = (productToPush: CartProduct) => {
        if (addToCartBtnRef.current) { //Checking if we actually have the button before we use it
            addToCartBtnRef.current.innerText="Added";
        }

        cartUpdater(pushProductToCart(productToPush));

        setTimeout(() => {
            if (addToCartBtnRef.current) {
            addToCartBtnRef.current.innerText="Add to Cart";
            }
            isCartOpen(true);
        }, 200);
    };

    const addToCartHandler = ()=>{
        const storedCart = cartloader(); //retrieves the current cart items (from local storage)

        const productToPush = {
            id: documentId,
            prodName: product.title,
            prodPrice: product.price,
            quantity: 1,
            image: {
            url: images[0]?.url,
            alt: images[0]?.alternativeText || product.title,
            },
            color: selectedColor,
            max: product.stock
        };

        if (storedCart.length > 0) {
            //Is this product (with this color) already in the cart?
            const cartItems = cartContent as CartItem[]; //make TS understand this is CartItem[]
            const isArticleInside = cartItems.filter(
                item => item.id === documentId 
            ).length > 0;

            const hasSameColor = cartItems.some(item => item.id === documentId && item.color === selectedColor);

            const totalQuantity = (id:string) => {
                const sameItemsDiffColors = cartItems.filter(item => item.id === id);
                let total = 0 ;
                sameItemsDiffColors.forEach((item)=>{
                    total+= item.quantity;
                })
                return total;
            }
            


            if(isArticleInside) {
                const insideQt = totalQuantity(documentId);
                if(insideQt + 1 > product.stock) {
                    if(addToCartBtnRef.current) {
                        addToCartBtnRef.current.innerText = "Max";
                        setTimeout(() =>{
                            if(addToCartBtnRef.current){
                                addToCartBtnRef.current.innerText = "Add to Cart";
                                }
                        }, 200);
                        return;
                    }
                }
                if(hasSameColor) {
                    cartUpdater(updateCart(documentId, 1, selectedColor));

                    if(addToCartBtnRef.current) {
                        addToCartBtnRef.current.innerText = "+1";
                    }
                    setTimeout(() =>{
                        if(addToCartBtnRef.current){
                        addToCartBtnRef.current.innerText = "Add to Cart";
                        }
                    }, 200);

                } else {
                    pushNewProduct(productToPush);
                }
            } else {
                pushNewProduct(productToPush);
            }
        } else {
            pushNewProduct(productToPush);
        }
    };


  return (
    <section className="product-page">
            <nav className="product-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="material-symbols-outlined">chevron_right</span>
                <Link href="/shop">Shop</Link>
                <span className="material-symbols-outlined">chevron_right</span>
                <span>{product.title}</span>
            </nav>
            <div className="product-card">
                <div className="product-left">
                    <div className="carousel">
                        <div className="product-badge product-badge--new">NEW</div>
                        {product.PercentageDiscount > 0 && <div className="product-badge product-badge--sale">-{product.PercentageDiscount}%</div>}
                        {activeImage && <img
                                  src={getPayloadMediaURL(activeImage.url)}
                                  alt={activeImage.alternativeText || product.title}
                            className='carousel-image'
                        />}

                        {images.length > 1 && <button className="nav-button left" onClick={prevImage} aria-label="Previous image">
                            <i className="fas fa-arrow-left"></i>
                        </button>}

                        {images.length > 1 && <button className="nav-button right" onClick={nextImage} aria-label="Next image">
                            <i className="fas fa-arrow-right"></i>
                        </button>}
                    </div>

                    {images.length > 1 && <div className="thumbnail-container">
                    {images.map((img, index) => (
                        <div key={index}
                             onClick={() => setCurrentIndex(index)}>
                                <img
                                  src={getPayloadMediaURL(img.url)}
                                  alt={img.alternativeText || "No alternative text provided"}
                                  className="thumbnail cursor-pointer border-1 border-[black] rounded-lg object-contain"
                        />
                        </div>
                    ))}
                    </div>}
                </div>

                <div className="product-right">
                    <div className="upper-right">
                        <div className="product-info">
                            <div className="reviews">
                                <div className="stars">
                                    <StarRating rating={avgRating}/>
                                </div>
                                <div className="num-reviews">
                                    {numReviews || 0} Reviews
                                </div>
                            </div>
                            <h2 className="product-name">{product.title}</h2>
                            <p className="product-description">{descriptionText}</p>
                        </div>
                        {product.PercentageDiscount > 0 && <div className="flex gap-2">
                                        <p className="price mr-[2%]"> MUR { (product.price * ((100 - product.PercentageDiscount) / 100)).toFixed(2) }</p>
                                        <p className="line-through price text-gray-500" >MUR {product.price} </p>
                                     </div>} 
                        {product.PercentageDiscount === 0 && <p className="price">MUR {product.price.toFixed(2)} </p>}
                    </div>
                    <hr className="divider" />

                    <div className="lower-right">
                        <div className="measurement-container">
                            <h4 className="sub-title ">Measurements</h4>
                            <p className="measurement">{product.measurement}</p>
                        </div>

                        <div className="color-container">
                            <h4 className="sub-title">Choose Color</h4>
                            <p className="choosen-color">{selectedColor}</p>

                            <div className="colors">
                                {Array.isArray(colours) && colours.map((color, index) => (
                                <label key={index} className="color-option">
                                    <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    checked={selectedColor === color}
                                    onChange={() => setSelectedColor(color)}
                                    />
                                    <span
                                    className={`circle ${selectedColor === color ? "selected" : ""}`}
                                    style={{ backgroundColor: String(color) }}
                                    ></span>
                                </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="btn-container">
                        {product.stock > 0 && <>
                        <QuantityButton
                            quantity={quantity}
                            isOnCart={isOnCart}  
                            productInfo={{
                                id: documentId,
                                color: selectedColor,
                            }}
                            width={127}
                            height={56}
                            onAddNew={() => {
                                const productToPush = {
                                    id: documentId,
                                    prodName: product.title,
                                    prodPrice: product.price,
                                    quantity: 1,
                                    image: {
                                        url: images[0]?.url,
                                        alt: images[0]?.alternativeText || product.title,
                                    },
                                    color: selectedColor,
                                    max: product.stock,
                                };
                                pushNewProduct(productToPush); //call existing pushNewProduct function
                            }}
                            avStock={product.stock}
                        />
    
                        <button
                            className="cart-btn"
                            ref={addToCartBtnRef}
                            onClick={addToCartHandler}
                            >
                            Add to Cart
                        </button>
                        </>
                        }
                        {product.stock === 0 && <div className='flex-1 text-center lg:text-left text-[28px]'>Out of Stock</div>}
                    </div>
                </div>
            </div> 
    </section>
  );
}
