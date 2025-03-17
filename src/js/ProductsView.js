import { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "../js/ProductItem";
import ProductPopUp from "../js/ProductPopUp";
import "../css/ProductsView.css"

function ProductsView({user, fetchCart, category}){
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  // Récupérer les produits depuis l'API
  useEffect(() => {
    axios.get(`https://megamart-cm02.onrender.com/api/category/${category}`) 
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des produits :", error);
      });
  }, []);

  // Ouvrir le popup
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Fermer le popup
  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  // Ajouter au panier
  const handleAddToCart = () => {
    if (selectedProduct) {
      setCart([...cart, selectedProduct]);
      alert(`${selectedProduct.name} ajouté au panier !`);
      handleClosePopup();
    }
  };

  return (
    <div className="App" style={{display:"flex"}}>      
      <div className="product-list">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.name}
            image={`https://megamart-cm02.onrender.com/${product.image}`}
            price={product.discounted_price}
            true_price={product.price}
            seller={product.shop_name}
            reduction={product.discount_percentage}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductPopUp
        user={user}
        id={selectedProduct.id}
          title= {selectedProduct.name}
          price={selectedProduct.discounted_price}
          seller={selectedProduct.shop_name}
          description={selectedProduct.description}
          image={`https://megamart-cm02.onrender.com/${selectedProduct.image}`}
          onClose={handleClosePopup}
          onAddToCart={handleAddToCart}
          fetchCart={fetchCart}
        />
      )}
    </div>
  );
}

export default ProductsView;