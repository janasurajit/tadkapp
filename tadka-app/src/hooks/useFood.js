import { useContext, useEffect } from 'react';
import { getAllFoods } from '../services/Foodapi.jsx';
import { FoodContext } from '../context/FoodContext.jsx';

export const useFood =  () => {
    const { foodItem,setfoodItem} = useContext(FoodContext);

    const handlegetFoodItems = async () => {
    try {
        const data = await getAllFoods();
        setfoodItem(data.data);
        // console.log(foodItem); 

    } catch (error) {
       console.error('Error fetching food items:', error);
    }
}



return {handlegetFoodItems,foodItem,setfoodItem}
}
