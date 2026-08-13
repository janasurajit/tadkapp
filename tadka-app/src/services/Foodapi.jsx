import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    credentials: true
})

export const getAllFoods = async () => {
    try {
        const response = await api.get('/food/api/getallfoods');
        return response?.data;
    } catch (error) {
       console.error('Error fetching food items:', error);
    }
}