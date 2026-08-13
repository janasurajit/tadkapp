import { createContext, useState } from "react";


export const FoodContext = createContext()

export const FoodContextProvider = ({children}) =>{
    const [foodItem, setfoodItem] = useState([]);


    const contextValue = {
        foodItem,setfoodItem
    }
    return <FoodContext.Provider value={contextValue}>
        {children}
    </FoodContext.Provider>
}