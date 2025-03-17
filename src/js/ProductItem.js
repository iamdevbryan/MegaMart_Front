import "../css/product-item.css";
import checked from "../icons/checked.png";

function ProductItem({ image, title, price,true_price, seller, reduction, onClick }) {
  return (
    <div className="product-item" onClick={onClick}>
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="price-title">
        <h3 className="title">{title}</h3>
        <h3 className="price">{price} XOF</h3>

        {reduction!==0 && (
          <h3 className="true-price">{true_price} XOF</h3>
       
      )}
        
        <h3 className="seller">
          Vendeur - {seller} <img src={checked} alt="" />
        </h3>
      </div>
      {reduction!==0 && (
        <div className="reduction">
          <h3>{reduction}%<br /> OFF</h3>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
