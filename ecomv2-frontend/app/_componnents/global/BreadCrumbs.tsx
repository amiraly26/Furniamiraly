"use server"
import Link from "next/link";
import { headers } from "next/headers";

export default async function Breadcrumbs(){
    const pathname= (await headers()).get("x-pathname");
    const segments = pathname.split("/").filter(Boolean) //split return ["","SHOP","PRODUCT",""], filter boolean remove the ""
    
    const breadCrumbItems = segments.map((segment,index)=>{
        const href = "/" + segments.slice(0,index+1).join("/"); //segment.slice(0,2) means take first and second elements from the list ["SHOP","PRODUCT"]
                                                    //  "/SHOP/PRODUCT"
        const text = segment.replace(/-/g," ") //replace "-" by " " globally(g)
                            .replace(/\b\w/g, (char)=>char.toUpperCase()); // \b is the start of a word
                                                                           // \w is the first letter after _,no.,space
                                                                           // Capitalizes each first letter of a word
        return {href , text};
    });

    return (
  <div>
    <Link href="/">Home</Link>

    {breadCrumbItems.map((item, index) => {
      const isLast = index === breadCrumbItems.length - 1;

      return (
        <span key={index}>
          {" > "}
          {isLast ? (
            <Link href={item.href} style={{fontWeight:"bolder"}}>{item.text}</Link> //the last (current page) will be bold
          ) : (
            <Link href={item.href}>{item.text}</Link>
          )}
        </span>
      );
    })}
  </div> 
);                                             
}