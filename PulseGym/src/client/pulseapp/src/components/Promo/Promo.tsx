import React, { useState } from 'react';
import promo from '../../images/promo.jpg';
import './Promo.css';

export const PromoImage = () => {
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHovering) {
      const rippleElement = e.currentTarget.querySelector('.ripple') as HTMLElement | null;
      if (rippleElement) {
        const promoRect = e.currentTarget.getBoundingClientRect();
        const rippleSize = Math.max(promoRect.width / 2, promoRect.height / 2);
        const offsetX = e.clientX - promoRect.left - rippleSize;
        const offsetY = e.clientY - promoRect.top - 2 * rippleSize;
        setRippleStyle({
          width: `${rippleSize * 2}px`,
          height: `${rippleSize * 2}px`,
          transform: `translate(${offsetX}px, ${offsetY}px) scale(1)`,
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRippleStyle({
      transform: 'translate(-50%, -50%) scale(0)',
    });
  };

  return (
    <div className="promoStyle" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
      <img src={promo} alt="Promo" className="promo-image" />
      <div className="ripple" style={{ ...rippleStyle }}></div>
    </div>
  );
};


export default PromoImage;
