"use client"
import React, { useEffect, useState } from 'react';
import axios  from 'axios';
import Client from '../components/Client';
import Menu from '../components/Menu';
import FormClient from '../components/forms/formClient';
import style from '../assets/styles/clients.module.css'
import { API_URL } from '@/config';

const Clients = () => {


    const [clients, setClients] = useState([]); // État pour gérer l'affichage de la bdd clients
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    
 
    /**
     * récupère la base de donneées client
     */
    const fetchClients = () => {
        axios.get(`${API_URL}/clients`)
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
            <Menu/>
            <h1>Base de données clients</h1>
            <ul>
              {clients.map((client, index)=>(
                <li key={index}>
                    <Client client={client}/>
                </li>
              ))}
            </ul>
            <FormClient/> 
               
        </div>
    );
};

export default Clients;