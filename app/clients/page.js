"use client"
import React, { useEffect, useState } from 'react';
import axios  from 'axios';
import Client from '../components/Client';

const Clients = () => {


    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

 
    /**
     * récupère la base de donneées client
     */
    const fetchClients = () => {
        axios.get("http://localhost:1337/api/clients")
        .then((response)=>{      
        setClients(response.data.data);
        setIsLoading(false);         
        })
        .catch((error)=>{
        console.log("erreur lors de la récupération des données", error);
        setIsError(true)
        })
    }

    useEffect(()=>{
        fetchClients();
    }, [])

    if(isLoading) return <div>Chargement...</div>    
    if(isError) return <div>Error fecthing data !</div>

    
    return (
        <div>
            <h1>Base de données clients</h1>
            <ul>
              {clients.map((client, index)=>(
                <li key={index}>
                    <Client client={client}/>
                </li>
              ))}
            </ul>
        </div>
    );
};

export default Clients;