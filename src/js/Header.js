import React, { useEffect, useState } from "react";
import "../css/Header.css";
import search_icon from "../icons/search-icon.png";
import user_icon from "../icons/user-icon.png";
import cart_icon from "../icons/cart-icon.png";
import logout_icon from "../icons/logout-icon.png"

function Header({ user, fetchCart, cart, setUser }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible_logout, setisVisible_logout] = useState(false)
 
  const handleLogout = () => {
    localStorage.removeItem("user"); // Supprime l'utilisateur stocké
    setUser(null);
  };

  const removeItem = async (itemId) => {
    try {
      await fetch(`https://megamart-cm02.onrender.com/api/orders/remove/${itemId}/`, { 
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
      });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const validateOrder = async () => {
    try {
      const userId = user.id;
      await fetch(`https://megamart-cm02.onrender.com/api/orders/${userId}/validate/`, { 
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
      });
      alert("Commande validée !");
      fetchCart(); 
    } catch (error) {
      console.error("Erreur lors de la validation de la commande :", error);
    }
  };

  return (
    <div className="header">
      <ul>
        <li className="nameApp">MegaMart</li>
        <li>
          <div className="search-bar">
            <img src={search_icon} alt="icône de recherche" />
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Recherchez un produit..." />
              <button>
                <img src={search_icon} alt="icône de recherche" />
              </button>
            </form>
          </div>
        </li>
        <li>
          <div className="user">
            <div className="user-container" onClick={()=>{setisVisible_logout(!isVisible_logout); setIsVisible(false)}}>
            <img src={user_icon} alt="" />
            <h3>{user.username}</h3>
            </div>
            
          {isVisible_logout && (
            <div className="logout" onClick={handleLogout}>
            <img src={logout_icon} alt="" />
            <h3>Se deconnecter</h3>
            </div>
          ) }
            
          </div>




          <div className="cart">
            <div className="cart-container" onClick={() => {setIsVisible(!isVisible); setisVisible_logout(false)}}>
              <img src={cart_icon} alt="" />
              <div className="orderedProducts">{cart.reduce((total, item) => total + item.quantity, 0)}</div>
              <h3>Panier</h3>
            </div>

            {isVisible && (
              <div className="order-container">
                <div className="order-title">
                  <h1>Liste des commandes</h1>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Prix U.</th>
                      <th>Qte</th>
                      <th>Prix TT.</th>
                      <th>Suppr.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td className="title">{item.product}</td>
                        <td className="prix-unite">{item.price} XOF</td>
                        <td className="qte">{item.quantity}</td>
                        <td className="prix-total">{item.price * item.quantity} XOF</td>
                        <td className="suppr">
                          <div className="remove-order" onClick={() => removeItem(item.id)}>x</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="total-price">
                  <h2>Nombre d'articles : <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span></h2>
                  <h2>Prix total : <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} XOF</span></h2>
                </div>

                <div className="order-button" onClick={validateOrder}>
                  Valider la commande
                </div>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Header;
