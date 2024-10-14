import axios from "axios";
import { useState } from "react";


const AddClient = () => {

    const [firstname, setFirstname]= useState('');
    const [lastname, setLastname]= useState('');
    const [address, setAddress]= useState('');
    const [phone, setPhone]= useState('');
    const [instructions, setInstructions]= useState('');
    const [loading, setLoading]= useState(false);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {

        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/clients`, {
                data: {
                    firstname,
                    lastname,
                    phone,
                    address,
                    instructions,
                },
            });
            if (response.status === 201){
                setMessage('Client ajouté avec succès !')
                setLoading(true);
                setFirstname('');
                setLastname('');
                setAddress('');
                setPhone('');
                setInstructions('');
                setShowForm(false)
            }
            
        } catch (error) {
            console.error("Erreur lors de l'ajout du client", error);
            setMessage("Erreur lors de l'ajout du client");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button 
                className="bg-green-300 p-2"
                onClick={handleClick}
            >
                Ajouter un client
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="p-4 border m-4">
                    <div>
                        <input 
                            type="text" 
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="Nom" 
                            className="border m-2"  
                        />
                        <input 
                            type="text"  
                            placeholder="Prénom"
                            className="border m-2"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Adresse" 
                            className="border m-2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Téléphone" 
                            className="border m-2"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Instructions de livraison" 
                            className="border m-2"
                            value={instructions}
                            onChange={(e)=> setInstructions(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-green-400 p-1 font-bold">
                        {loading ? 'Envoi...' : 'Ajouter'}
                    </button>
                    {message && <p>{message}</p>}
                </form>
            ) }
        </div>
    );

}

export default AddClient;