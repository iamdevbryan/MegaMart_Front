import Header from "../js/Header"
import '../css/Main.css'
import ProductsView from "./ProductsView";
import React, { useEffect, useState } from "react";
import Category from "./Category";


function Home({ user, setUser }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const userId = user.id;
      const response = await fetch(`https://megamart-cm02.onrender.com/api/orders/user/${userId}/`);
      const data = await response.json();
      console.log(data);
      setCart(data.items || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
    }
  };
    return (
      <div className="main">
        <Header user={user} fetchCart={fetchCart} cart={cart} setUser={setUser}/>

        <div className="greetings">
          <h1>Salut {user.username},</h1>
          <h3>Qu'est ce qu'on achete aujourd'hui ?</h3>
        </div>

        <div className="categories">
        <Category category='Smartphone' user={user} fetchCart={fetchCart}/>
        <Category category='Meuble' user={user} fetchCart={fetchCart}/>
       
        </div>
        

        {/* <ProductsView user={user} fetchCart={fetchCart}/> */}
      </div>      
    );
  }
  
  export default Home;