import axios from "axios";
import { useEffect, useState } from "react";


const AddOrder = () => {

    const [dateOrder, setDateOrder]= useState('');
    const [amount, setAmount]= useState('');
    const [clients, setClients]= useState('');
    const [products, setProducts]= useState<string[]>([]);
    const [productsList, setProductsList] =  useState<any[]>([]);
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/orders`, {
                data: {
                    dateOrder,
                    amount,
                    clients: clients,
                    products: products.map(productId => ({ id: productId }))
                },
            });
            if (response.status === 201){
                setMessage('Commande ajoutée avec succès !')
                setLoading(true);
                setDateOrder('');
                setAmount('');
                setClients('');
                setProducts([]);
                setShowForm(false)
            }
            
        } catch (error) {
            console.error("Erreur lors de l'ajout de la commande", error);
            setMessage("Erreur lors de l'ajout de la commande");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        const fetchClients = async () => {
            try {
                const response = await axios(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/clients?populate=*`);
                console.log(response.data.data);
                setClients(response.data.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des clients", error)
            }
        };

        fetchClients();

    }, [clients])

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const response = await axios(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?populate=*`);
                console.log(response.data.data);
                setProductsList(response.data.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des clients", error)
            }
        };

        fetchProducts();

    }, [products])
    

    return (
        <div>
            <button 
                className="bg-green-300 p-2"
                onClick={handleClick}
            >
                Ajouter une commande
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="p-4 border m-4">
                    <div>
                        <input 
                            type="date" 
                            value={dateOrder}
                            onChange={(e) => setDateOrder(e.target.value)}
                            placeholder="date de la commande" 
                            className="border m-2"  
                        />
                        <input 
                            type="number"  
                            placeholder="Montant"
                            className="border m-2"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div>
                        <select 
                            className="border m-2"
                            value={clients}
                            onChange={(e) => setClients(e.target.value)}
                        >
                            <option value="">Sélectionner un client</option>
                            {clients.map((client: any) => (
                                <option key={client.id} value={client.id}>{client.firstname} {client.lastname}</option>
                            ))}
                        </select>
                        <select 
                            className="border m-2"
                            onChange={(e) => {
                                const selectedProducts = Array.from(e.target.selectedOptions, option => option.value)
                                setProducts(selectedProducts);
                            }}
                        >
                                <option value="">
                                    Sélectionner les produits
                                </option>
                                {productsList.map((product: any) => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                    </div>
                    <div>
                        <p>Produits sélectionnés : </p>
                        <ul>
                            {products.map((productId) => {
                                const selectedProduct = productsList.find((product: any) => product.id === productId);
                                return selectedProduct ? (
                                    <li key={selectedProduct.id}>
                                        {selectedProduct.name}
                                    </li>
                                ) : null;
                            })}
                        </ul>
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

export default AddOrder;