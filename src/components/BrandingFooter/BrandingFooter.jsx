import React from 'react';
import { LogoBrooklynHistory } from '../../assets';
import './BrandingFooter.css';

const BrandingFooter = () => {
  return (
    <div className="branding-footer">
      <img 
        src={LogoBrooklynHistory} 
        alt="Center for Brooklyn History" 
        className="branding-footer__logo"
      />
    </div>
  );
};

export default BrandingFooter;
