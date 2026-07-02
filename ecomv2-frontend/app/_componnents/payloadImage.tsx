
import Image from "next/image";
import "./PayloadImage.css";
import { getPayloadMediaURL } from "../utils/get-payload-url";

interface PayloadImageProps{
    src:string;
    alt:string;
    className?: string;        //explicitly allow className
    fill?: boolean;           
    [key: string]: any;  
}

export function PayloadImage({src,alt,...rest}:Readonly<PayloadImageProps>){

    const imageUrl= getPayloadMedia(src);
    if(!imageUrl) return null;

    return <div className="rounded-[20px] overflow-hidden w-full h-full">
            <Image src={imageUrl} alt={alt} {...rest} />
            </div>
}
export function getPayloadMedia(url:string | null){
    if(url == null) return null;
    if(url.startsWith("data:")) return url;
    if(url.startsWith("http") || url.startsWith("//")) return url;
    return getPayloadMediaURL(url);
}
