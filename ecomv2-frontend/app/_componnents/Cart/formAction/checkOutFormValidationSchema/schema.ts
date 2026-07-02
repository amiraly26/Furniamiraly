import { z } from "zod";

const nameRegex = /^[a-zA-Z]+([\s\.\-'][a-zA-Z]+)*$/;
const phoneRegex = /^(\+\d{2,3}[\s\-]?)?\d+$/;
const addressRegex = /^[a-zA-Z0-9]+([\s\'\-,\.\/#]+[a-zA-Z0-9]+)*$/;
const CountryCityStateRegex = /^[a-zA-Z]+([\s\'-]+[a-zA-Z]+)*$/;
const codeRegex = /^[a-zA-Z0-9]+([\s\-][a-zA-Z0-9]+)*$/;

export const nameSchema =  z.string({
    message:"This field is required",
})
.trim()
.min(2, {
    message: "Your name is too short"
}).regex(nameRegex, {message: "Names cannot contains specials characthers expect - ' ."});

export const phoneSchema = z.string(
    {
         message:"This field is required"
    }
).trim()
.min(7, {message: "You phone number is too short"})
.max(15, {message: "Your phone number is too long"})
.regex(phoneRegex, {message: "Your number is in invalid format"});

export const emailSchema = z.string({
     message:"This field is required"
})
.min(5, {message: "Your email is too short"})
.email({ message: "Your email is in invalid format"})
.max(256,{ message: "Your email is too long"});

export const CountryCitySchema = z.string({
     message:"This field is required"
})
.min(2, {message: "Your entry is too short"})
.regex(CountryCityStateRegex, {message: "Your entry is invalid"})
.max(85, {message: "Your entry is too long"});

export const stateSchema = z.string({
     message:"This field is required"
})
.min(2, {message: "Your entry is too short"})
.regex(CountryCityStateRegex, "Your state format is invalid")
.optional();

export const zipCodeSchema = z.string(
    {
         message:"This field is required"
    }
)
.min(2, {message: "Your zip code is too short"})
.regex(codeRegex, {message: "Your zip code format is invalid"})
.optional();

export const addresSchema = z.string({
     message:"This field is required"
})
.min(2, {message: "Your address is to short"})
.regex(addressRegex, {message: "Your address is in invalid format"});

export const nidSchema = z.string({
    message: "This field is required"
}).trim()
.max(18, {message: "You have a maximum of 18 characters"})
.regex(codeRegex, {message: "Your NID format is invalid"})

export const messageSchema = z.string({
    message: "This field is required"
}).trim()
.min(5, {message: "Your message is too short"})

export const schema  =  z.object({
    fname: nameSchema,
    lname: nameSchema,
    email: emailSchema,
    street: addresSchema,
    country: CountryCitySchema,
    city: CountryCitySchema,
    state: stateSchema,
    zip: zipCodeSchema,
    phone: phoneSchema,
    message: messageSchema
})