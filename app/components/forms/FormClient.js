import React, { useState } from 'react';

const FormClient = () => {
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici tu pourrais envoyer les données à ton API Strapi pour ajouter un nouveau client
        // Par exemple :
        axios.post(`${API_URL}/clients`, {
            lastname,
            firstname,
            phone,
            address,
            postalCode,
            city,
            country,
            email,
            status
        })
        .then((response) => {
            console.log('Client ajouté avec succès !');
        })
        .catch((error) => {
            console.error('Erreur lors de l\'ajout du client :', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Firstname:
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </label>
            <label>
                Lastname:
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </label>            
            <label>
                Phone:
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label>
                Address:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                Postal Code:
                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </label>
            <label>
                City:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label>
                Country:
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Status:
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
            </label>
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default FormClient;

