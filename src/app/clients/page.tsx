"use client"
import AddClient from "@/components/clients/AddClient";
import axios from "axios";
import { useEffect, useState } from "react";

interface Client {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    instructions: string;
}

const Clients = () => {

    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchClients = async () => {
            try {
               const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/clients`);
               setClients(response.data.data)
               
            } catch (error) {
                console.error('Erreur lors de la récupération des clients', error)
            } finally {
                setLoading(false)
            }
        }
        fetchClients();
    }, [clients])

    if(loading){
        return <div className="p-10 text-center">Chargement des clients...</div>
    }

   console.log(clients);
   
    return (
        <div className="p-4">
            <h2 className="font-bold text-center p-4">Nos clients</h2>
            <div className="flex m-5 justify-end">
                <AddClient />
            </div>
            <table className="table-auto w-full border-collapse border border-orange-300">
                <thead className="font-bold">
                    <td className="border border-orange-300 px-4 py-2">Nom</td>
                    <td className="border border-orange-300 px-4 py-2">Prénom</td>
                    <td className="border border-orange-300 px-4 py-2">Téléphone</td>
                    <td className="border border-orange-300 px-4 py-2">Addresse</td>
                    <td className="border border-orange-300 px-4 py-2">Instructions</td>
                </thead>
                <tbody>
                    {clients && clients.map((client) =>(
                       <tr key={client.id}>
                        <td className="border border-orange-300 px-4 py-2">{client.lastname}</td>
                        <td className="border border-orange-300 px-4 py-2">{client.firstname}</td>
                        <td className="border border-orange-300 px-4 py-2">{client.phone}</td>
                        <td className="border border-orange-300 px-4 py-2">{client.address}</td>
                        <td className="border border-orange-300 px-4 py-2">{client.instructions}</td>
                       </tr>
                    ) )}
                </tbody>
          
            </table>
           
        </div>
    )
}

export default Clients;