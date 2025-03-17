import { useState } from "react";
import "../css/ProductPopUp.css";
import checked from "../icons/checked.png";
import close from "../icons/cross-icon.png";

function ProductPopUp({ image, reduction, title, price, seller, description, onClose, onAddToCart, user, id,fetchCart }) {
  const handleAddToCart = async () => {
    try {
      const response = await fetch(`https://megamart-cm02.onrender.com/api/orders/add/${user.id}/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: id,
          price: price,
          quantity: quant,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Produit ajouté au panier !");
        fetchCart();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
    onClose();
  };

  const [quant, setQuant] = useState(1)

  const handleChange =(event)=>{
    setQuant(parseInt(event.target.value), 10)
  }

  return (
    <div className="background-blur">
      <div className="pop-up">
        <div className="product-container">
          <img src={image} alt="" />
          {reduction && <div className="reduction"><h3>{reduction} <br/> % OFF</h3></div>}
        </div>

        <div className="infos-container">
          <h3 className="title">{title}</h3>
          <h3 className="price">{price} XOF</h3>
          <h3 className="seller">
            {seller} <img src={checked} alt="" />
          </h3>
          <div className="desc-container">
            <h3 className="desc-text">{description}</h3>
            <input type="number"  defaultValue={1} min={1} onChange={handleChange}/>
            <div className="button" onClick={handleAddToCart}>Ajouter au panier</div>
            <div className="close" onClick={onClose}>
              <img src={close} alt="Fermer"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopUp;
