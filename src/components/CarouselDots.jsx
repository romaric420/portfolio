import React from 'react';
import '../styles/CarouselDots.css';

/** Points de navigation d'un carrousel : le point actif se remplit pendant l'affichage du bloc. */
const CarouselDots = ({ carousel, items, tone = 'light' }) => {
  const { active, paused, goTo, duration } = carousel;
  if (items.length < 2) return null;

  return (
    <div className={`carousel-dots carousel-dots--${tone}`}>
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          className={`carousel-dot ${index === active ? 'is-active' : ''}`}
          style={{ '--tint': item.tint }}
          onClick={() => goTo(index, index < active)}
          aria-label={item.label}
          aria-current={index === active ? 'true' : undefined}
        >
          {index === active ? (
            <span
              key={active}
              className="carousel-dot-fill"
              style={{ animationDuration: `${duration}ms`, animationPlayState: paused ? 'paused' : 'running' }}
            />
          ) : null}
        </button>
      ))}
    </div>
  );
};

export default CarouselDots;
