"use client"
import AddOrder from "@/components/orders/AddOrder";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
    code: string;
    price: number;
    name: string;
}
interface Order {
    id: number;
    date_order: string;
    phone: string;
    amount: number;
    date_payment: string;
    payment_method: {
        name: string;
    };
    client: {
        firstname : string;
    }
    products: Product[];       
}

const Orders = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders?populate=*`, {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
                    }
                });
                setOrders(response.data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders();
    }, [])

    if(loading){
        return <div className="p-10 text-center">Chargement des commandes...</div>
    }
   
    return (
        <main className="p-4">
            <h2 className="font-bold text-center p-4">Nos commandes</h2>
            <div className="flex m-5 justify-end">
                <AddOrder />
            </div>
            <table className="table-auto w-full border-collapse border border-orange-300 m-4">
                <thead className="font-bold">
                    <td className="border border-orange-300 px-4 py-2">Date d&apos;achat</td>
                    <td className="border border-orange-300 px-4 py-2">Liste des articles</td>
                    <td className="border border-orange-300 px-4 py-2">Montant</td>
                    <td className="border border-orange-300 px-4 py-2">Client</td>
                    <td className="border border-orange-300 px-4 py-2">Méthode de paiement</td>
                    <td className="border border-orange-300 px-4 py-2">Date de paiement</td>
                </thead>
                <tbody>
                    {orders && orders.map((order) =>(
                       <tr key={order.id}>
                        <td className="border border-orange-300 px-4 py-2">{order.date_order}</td>
                        <td className="border border-orange-300 px-4 py-2">
                            <ul>
                                {order.products.map((product, index)=>(
                                    <li key={index}>
                                        {product.name} : {product.price}€
                                    </li>
                                ))}
                            </ul>
                        </td>  
                        <td className="border border-orange-300 px-4 py-2">{order.amount}€</td>
                        <td className="border border-orange-300 px-4 py-2">{order.client.firstname}</td>
                        <td className="border border-orange-300 px-4 py-2">{order.payment_method.name}</td>
                        <td className="border border-orange-300 px-4 py-2">{order.date_payment}</td>
                       </tr>
                    ) )}
                </tbody>
            </table>
           
        </main>
    )
}

export default Orders;