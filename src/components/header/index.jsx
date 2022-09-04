import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/generic-logo.png' ;
import axios from "axios";
import "./styles.scss";

const menuNuevo = [{title: "Cargando...", href: "/#"}];

const Header = () => {
    const [menu, setMenu] = useState(menuNuevo);

    useEffect(() => {
        axios.get('http://remote.fizzmod.com/menu.json')
        .then(function (response) {
            setMenu(response.data.menu.categories)
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        console.log("actualizamos");
        console.log(menu);
    }, [menu]);

    const changeMenu = (e) => {
        e.preventDefault();
        setMenu([{title: "Menu 1", href: "/menu"}])
    }
    
    return(
        <header className='header'>
            <div className="top-area">
                <img src={logo} className="logo" alt="logo" />
                <div className="search-block">
                    <nav className='top-nav'>
                        <a href="/ayuda">ayuda</a>
                        <a href="/mis-pedidos">mis pedidos</a>
                        <a href="/mi-cuenta">mi cuenta</a>
                    </nav>
                    <div className='search-cart'>
                        <div className='search'>
                            <i className = 'icon-icn_search' type='icon'></i>
                            <input type="text" name='search' placeholder='Buscar un producto...' />
                        </div>
                        
                        <a href="/mi-carrito" onClick={changeMenu} className="carrito">
                            <i className='icon-icn_cart' type= 'icon'></i>
                            <span>mi carrito</span>
                        </a>
                    
                    </div>
                </div>
            </div>
            <nav className='main-menu'>
                {menu.map(item => {
                    return <a key={item.title} href={item.href}>{item.title}</a>
                })}
            </nav>
        </header>
    )
}

export default Header;