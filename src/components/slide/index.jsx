import "./styles.scss";
import "../../assets/font-icon/style.css"

import React, {useRef, useEffect, useCallback} from 'react';

const Slideshow = ({items, controller = true, autoplay = true, velocity="1000", interval="1000"}) => {
	const slideshow = useRef(null);
	const intervaloSlideshow = useRef(null);
	const siguiente = useCallback(() => {
		if(slideshow.current.children.length > 0){
			const primerElemento = slideshow.current.children[0];
			slideshow.current.style.transition = `${velocity}ms ease-out all`;
			const tamañoSlide = slideshow.current.children[0].offsetWidth;
			slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;
			const transicion = () => {
				slideshow.current.style.transition = 'none';
				slideshow.current.style.transform = `translateX(0)`;
				slideshow.current.appendChild(primerElemento);
				slideshow.current.removeEventListener('transitionend', transicion);
			}

			slideshow.current.addEventListener('transitionend', transicion);

		}
	}, [velocity]);
	
	const anterior = () => {
		console.log('Anterior');
		if(slideshow.current.children.length > 0){
			const index = slideshow.current.children.length - 1;
			const ultimoElemento = slideshow.current.children[index];
			slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild);
			
			slideshow.current.style.transition = 'none';
			const tamañoSlide = slideshow.current.children[0].offsetWidth;
			slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;
		
			setTimeout(() => {
				slideshow.current.style.transition = `${velocity}ms ease-out all`;
				slideshow.current.style.transform = `translateX(0)`;
			}, 30);
		}
	}

	useEffect(() => {
		if(autoplay){
			intervaloSlideshow.current = setInterval(() => {
				siguiente();
			}, interval);
            slideshow.current.addEventListener('mouseenter', () => {
				clearInterval(intervaloSlideshow.current);
			});
	
            slideshow.current.addEventListener('mouseleave', () => {
				intervaloSlideshow.current = setInterval(() => {
					siguiente();
				}, interval);
			});
		}
	}, [autoplay, interval, siguiente]);

	return (
		<div className="slider-content">
			{controller && (
				<div className="buttons">
					<button onClick={anterior} ><i className='icon-icn_chevron_left' type='icon'></i></button>
					<button onClick={siguiente}><i className='icon-icn_chevron_right' type='icon'></i></button>
				</div>
			)}

			<div className="slide" ref={slideshow}>
                {items.map(item => {
                    return <a key={item.imgName} href={item.href}>
                    <img src={process.env.PUBLIC_URL + item.imgName} alt={item.imgName} />
                    </a>
                })}
			</div>
		</div>
	);
}

export default Slideshow;
