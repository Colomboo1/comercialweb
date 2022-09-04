import React, {useContext} from "react";
import "./styles.scss";
import { FiltrationContext } from "../../App";
import classnames from 'classnames';

const FilterBox = ({title, values, field}) => {
    const [filter, setFilter] = useContext(FiltrationContext);
    return(
        <div className='filter-box'>
            <h3 id="title.filter">{title}</h3>
            <div className="checkboxes">
                {values.map(item => {
                    const combinedName = field + item;
                    return (
                        <label key={combinedName} class="checkbox-content">
                            <input
                                className="checkbox"
                                value={combinedName}
                                name={combinedName}
                                type="checkbox"  
                                onChange={(e) =>{
                                    if(e.target.checked === true){
                                        setFilter([...filter, combinedName]);
                                    } else{
                                        const parsedFilter = filter.filter((filterItem) => filterItem !== combinedName);
                                        setFilter(parsedFilter);
                                    }     
                                }}
                            />
                            <span className={classnames('checkbox-icon', filter.includes(combinedName) ? "icon-icn_checkbox_on" : "icon-icn_checkbox_off" )} ></span>
                            <span>{item}</span>
                        </label>
                    )
                })}
            </div>        
        </div>
    )
}

const FilterList = ({items}) => {
    return(
        <aside className='filter-list'>
                {items.map(item => <FilterBox title={item.title} values={item.values} field={item.field}/> )}
                
        </aside>    
    )
}

export default FilterList;
