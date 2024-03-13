import React from 'react';

const Order = ({order}) => {
    return (
        <div>
            <h1>Commande n°</h1>
            <h4>Montant : {order.attributes.Amount} €</h4>
        </div>
    );
};

export default Order;