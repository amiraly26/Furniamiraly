"use server";
import { z } from "zod";
import { schema } from "./formAction/checkOutFormValidationSchema/schema";
import { nameSchema, emailSchema, CountryCitySchema, phoneSchema, zipCodeSchema, addresSchema, stateSchema, nidSchema} from "./formAction/checkOutFormValidationSchema/schema";
import { OrderServices, type Item } from "@/app/data/_services/OrderService";
import { send } from "process";


export default async function checkoutAction(currentState, formData) {

    if(formData.get("deliveryMethod") === null) {
        return {...currentState}
    }

    const items:Item[] = JSON.parse(formData.get("items")).map((item:Item)=>{
        return {
            id: item.id,
            quantity: Number(item.quantity),
            color: String(item.color)
        }
    })



    
    const fnameR  = z.safeParse(nameSchema, formData.get("fname") ? formData.get("fname") : null);
    const lnameR  = z.safeParse(nameSchema, formData.get("lname") ? formData.get("lname") : null);
    const emailR  = z.safeParse(emailSchema, formData.get("email") ? formData.get("email"): null);
    const nidR = z.safeParse(nidSchema, formData.get("nid") ? formData.get("nid") : null);
    const phoneR  = z.safeParse(phoneSchema, formData.get("phone") ? formData.get("phone") : null);
    const streetR  = z.safeParse(addresSchema, formData.get("address") ? formData.get("address") : null);
    const countryR  = z.safeParse(CountryCitySchema, formData.get("country") ? formData.get("country") : null);
    const cityR = z.safeParse(CountryCitySchema, formData.get("city") ? formData.get("city") : null)
    const stateR  = z.safeParse(stateSchema, formData.get("state") ? formData.get("state") : undefined);
    const zipR  = z.safeParse(zipCodeSchema, formData.get("zip") ? formData.get("zip") : undefined);





    const valid = {
        ...(fnameR.success && {fname:  formData.get("fname")}),
        ...(emailR.success && {email:  formData.get("email")}),
        ...(lnameR.success && {lname:  formData.get("lname")}),
        ...(nidR.success && {nid: formData.get("nid")}),
        ...(phoneR.success && {phone:  formData.get("phone")}),
        ...(streetR.success && {address:  formData.get("address")}),
        ...(countryR.success && {country:  formData.get("country")}),
        ...(cityR.success && {city:  formData.get("city")}),
        ...(stateR.success && {state:  formData.get("state")}),
        ...(zipR.success && {zip:  formData.get("zip")}),
    }
    
    const errors = {
        ...(!fnameR.success && {fname:  fnameR.error.flatten().formErrors}),
        ...(!lnameR.success && {lname:  lnameR.error.flatten().formErrors}),
        ...(!nidR.success && {nid: nidR.error.flatten().formErrors}),
        ...(!emailR.success && {email:  emailR.error.flatten().formErrors}),
        ...(!phoneR.success && {phone:  phoneR.error.flatten().formErrors}),
        ...(!streetR.success && {address:  streetR.error.flatten().formErrors}),
        ...(!countryR.success && {country:  countryR.error.flatten().formErrors}),
        ...(!cityR.success && {city:  cityR.error.flatten().formErrors}),
        ...(!stateR.success && {state:  stateR.error.flatten().formErrors}),
        ...(!zipR.success && {zip:  zipR.error.flatten().formErrors}),
    }
    
    if (Object.keys(errors).length === 0) {
        const request = await OrderServices({
            firstName: valid.fname,
            lastName: valid.lname,
            email: valid.email,
            phone: valid.phone,
            nid: valid.nid,
            street: valid.address,
            city: valid.city,
            country: valid.country,
            postCode: valid.zip,
            delivery: formData.get("deliveryMethod"),
            items: items,
        });


            return {...currentState, sent: true, result:{...request}}
    }

   

    
    return {...currentState, valid:{...valid}, errors: {...errors}}
}