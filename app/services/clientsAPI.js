function findAllClients () {
    return axios.get("http://localhost:1337/api/clients")
    .then((response)=>{      
    setClients(response.data.data);
    setIsLoading(false);         
    })
    // .catch((error)=>{
    // console.log("erreur lors de la récupération des données", error);
    // setIsError(true)
    // })
}

export default findAllClients;