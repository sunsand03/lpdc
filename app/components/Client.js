import React from "react";

const Client = ({ client }) => {
  return (
    <div>
      <h2>
        {client.attributes.firstname} {client.attributes.lastname}
      </h2>
      <p>Téléphone: {client.attributes.phone} </p>
      <p>
        Adresse: {client.attributes.adress} - {client.attributes.postal_code} -{" "}
        {client.attributes.city}
      </p>
      <p>email: {client.attributes.email}</p>
      <p> Point relais préféré: {client.attributes.relay_point}</p>
    </div>
  );
};

export default Client;
