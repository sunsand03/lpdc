"use client"
import React, {useState, useEffect} from 'react';
import Menu from '../components/Menu';
import { API_URL } from '@/config';
import axios  from 'axios';
import Order from '../components/Order';

const Orders = () => {

    
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

 
    /**
     * récupère la base de donneées client
     */
    const fetchAllOrders = () => {
        axios.get(`${API_URL}/orders`)
        .then((response)=>{      
        setOrders(response.data.data);
        setIsLoading(false);         
        })
        .catch((error)=>{
        console.log("erreur lors de la récupération des données", error);
        setIsError(true)
        })
    }

    useEffect(()=>{
        fetchAllOrders();
    }, [])

    if(isLoading) return <div>Chargement...</div>    
    if(isError) return <div>Error fecthing data !</div>

    return (
        <div>
            <Menu/>
            <h1>Nos commandes</h1>
            <ul>
              {orders.map((order, index)=>(
                <li key={index}>
                    <Order order={order}/>
                </li>
              ))}
            </ul>        
        </div>
    );
};

export default Orders;