"use server";
import { z } from "zod";
import { schema } from "../Cart/formAction/checkOutFormValidationSchema/schema";
import { nameSchema, emailSchema, messageSchema } from "../Cart/formAction/checkOutFormValidationSchema/schema";
import { fetchAPI } from "@/app/utils/fetch-api";
import { GetPayloadURL } from "@/app/utils/get-payload-url";

export async function ContactAction(currentState, formData) {


    const nameR  = z.safeParse(nameSchema, formData.get("name") ? formData.get("name") : null);
    const emailR  = z.safeParse(emailSchema, formData.get("email") ? formData.get("email"): null);
    const messageR  = z.safeParse(messageSchema, formData.get("message") ? formData.get("message"): null);

    const valid = {
        ...(nameR.success && {name:  formData.get("name")}),
        ...(emailR.success && {email:  formData.get("email")}),
        ...(messageR.success && {message:  formData.get("message")})
    }

    const errors = {
        ...(!nameR.success && {name:  nameR.error.flatten().formErrors}),
        ...(!emailR.success && {email:  emailR.error.flatten().formErrors}),
        ...(!messageR.success && {phone:  messageR.error.flatten().formErrors}),
    }

    if (Object.keys(errors).length === 0) {
            try {
                const request = await fetch(GetPayloadURL() + "api/contact-messages", {
                    headers:{
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body:JSON.stringify({
                        message: valid.message,
                        email: valid.email,
                        name: valid.name  
                    })
                    
                })
                const response = await request.json();
                return {...currentState, response:{...response}}
            
            }catch(e: Error){
                return {...currentState, requestError:e.message}
            }
    }
    return {...currentState, valid:{...valid}, errors:{...errors}}

            
}
