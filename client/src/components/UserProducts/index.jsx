import "./UserProducts.css";
import { useSelector } from "react-redux";

function UserProducts() {

    const productsIdUser = [];
    const customerHistory = useSelector(state => state.customerHistory);
    let productState = useSelector(state => state.productsCopy);

    customerHistory.forEach(element => {
        element.productsOrdered.forEach(product => {
            if (productsIdUser.findIndex(e => e.id === product.id) === -1) productsIdUser.push(product.id);
        });
    });

    const productsUser = productsIdUser.map(item => {
        const findOneProduct = productState.find(e => e.id === item);

        return findOneProduct;
    });

    return (
        <div>
            {productsUser.length > 0 && 
                <div>
                    <p>A</p>
                </div>
            }
        </div>
    )

}


export default UserProducts;