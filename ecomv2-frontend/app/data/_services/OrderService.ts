import { GetPayloadURL } from "@/app/utils/get-payload-url";

const BASE_URL  = GetPayloadURL().replace(/\/$/, "");

type DeliveryMethod = "free" | "express" | "pick-up";
type PayloadId = string | number;
type OrderResponse = { documentId?: PayloadId; id?: PayloadId };

export interface Item {
    id: PayloadId,
    color: string,
    quantity: number,
}
interface OrderFields{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nid: string,
    street: string;
    city: string;
    country: string;
    delivery: DeliveryMethod;
    state? : string;
    postCode?: string;
    items: Item[]
}

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Something went wrong";
}

export async function OrderItemsServices(orderId: PayloadId, items:Item[]) {
    const path = "/api/order-items";
    const url = new URL(path, BASE_URL);
    const itemsToSend = items.map((item) => ({
        quantity: Number(item.quantity),
        product: item.id,
        colour: item.color,
        order: orderId
    }));

    try  {
        const data: unknown[] = []
        for(const itemToSend of itemsToSend) {
            const response = await fetch(url.href, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(itemToSend)
            })
            const mdata = await response.json();
            data.push(mdata);
        }
        return {
            success: true,
            data: data,
        }

    } catch (error) {
        
        return {
            success: false,
            message: getErrorMessage(error),
        } 
    }
}

export async function OrderServices({firstName, lastName, email, nid, phone, street, city, country, delivery, state, postCode, items}:Readonly<OrderFields>) {
    const path  = "/api/orders";
    const url = new URL(path, BASE_URL);


    try {
        const order = await fetch(url.href, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                nid,
                phone,
                street,
                city,
                country,
                delivery,
                state: (state !== undefined && state !== null) ? state : null,
                postCode: (postCode !== undefined && postCode !== null) ? postCode : null
            })
        })

        const fResponse = await order.json() as OrderResponse;
        const orderId = fResponse.documentId || fResponse.id;
        const orderItems = await OrderItemsServices(orderId, items);

        if(!orderItems.success) {
            return {
                success: false,
                message: orderItems.message
            }
        }

        return {
            success: true,
            data: orderItems.data
        }
    }catch(error) {
        return {
            success: false,
            message: getErrorMessage(error)
        }
    }

}


