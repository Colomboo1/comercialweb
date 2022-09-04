import React, {useContext} from "react";
import classnames from 'classnames';
import { FiltrationContext } from "../../App";
import "./styles.scss";

const offprice = (listPrice, sellingPrice) => {
    if (sellingPrice === listPrice){
        return 0;
    } 
    return Math.round(100-(sellingPrice*100/listPrice));
}

const rounding =(listPrice) => {
    return Number.parseFloat(listPrice).toFixed(2);
}
const ProductList = ({items, applyedFilter}) => {
    const [filter] = useContext(FiltrationContext);    
    return(
        <section className ={classnames('product-list', (filter.length > 0 && 'filtering'))}>
            {items.map(item => {
                const parsedAtributes= item.attributes.map(attrItem =>{
                    return attrItem.field + attrItem.value;//creo el array para poder comparar 
               });
                const percentage = offprice(item.price.listPrice, item.price.sellingPrice)//llamo a la funcion de realizar el calculo de funcion
                const view = parsedAtributes.some(item => filter.includes(item)); // realiza el filtado de productos y le asigna
                return <a key={item.id} href={item.href} className={classnames(view ? "show" : "no-show")}>
                    {percentage > 0 && <span className="percentage" >-{percentage}%</span>} {/* se realiza un condicion sobre el html*/}
                    <div className="product">
                        <img src={item.image} alt={item.image}/>
                        <h3>{item.title} </h3>
                        <div className="product-price">
                            {percentage > 0 && <span className="list-price"> $ {rounding(item.price.listPrice)}</span>}
                            <span className="selling-price"> $ {rounding(item.price.sellingPrice)}</span>
                        </div>
                    </div>
                </a>
            })}
        </section>
    )
}

export default ProductList;