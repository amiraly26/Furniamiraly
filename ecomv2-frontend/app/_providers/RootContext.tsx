"use client"
import { createContext } from "react";
import type { Product } from "../_componnents/Cart/cartContentLoader";
import { create } from "zustand";

export const RootContext = createContext<any>({
    isCartOpen: ()=>{},
    cartContent: [],
    cartUpdater: ()=>{},
})
