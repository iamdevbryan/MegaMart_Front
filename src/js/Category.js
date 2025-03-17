import '../css/Category.css';
import ProductsView from './ProductsView';

export default function Category({category, user, fetchCart}){
    return(
        <div className='category'>
               <h1 className='category-title'>{category}</h1>

                <div className='products'>
                    <ProductsView user={user} fetchCart={fetchCart} category={category}/>
                </div>
        </div>
    );
}