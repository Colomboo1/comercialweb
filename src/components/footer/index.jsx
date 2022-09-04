import "./styles.scss";
import facebook from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import youtube from '../../assets/images/youtube.png';

const FooterBlock = ({title, links}) => {
    return (
        <div className="footer-block">
            <h3>{title}</h3>
            <div className="sub-block">
                {links.map(item => <a key={item} href="#">{item}</a>)}
            </div>
        </div>
    )
}

const Footer = () => {
    return(
        <footer>
            <FooterBlock title="producto" links={["compre juntos","kit look","completa tu compra","shop the look","sin stock" ]} />
            <FooterBlock title="mi cuenta" links={["mis pedidos","wishlist","productos frecuentes","mis listas","mis recetas"]}/>
            <FooterBlock title="contactanos" links={["nuestras sucursales","horarios y telefonos"]}/>
            <div className="icons">
                <img className="social" src={facebook} alt="facebook.png"></img>
                <img className="social" src={twitter}alt="twitter.png"></img>
                <img className="social" src={youtube}alt="youtube.png"></img>   
            </div>
            
        </footer>
    )
}

export default Footer;