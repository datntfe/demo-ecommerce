// @ts-ignore
import React from 'react';

const CardComponent = ({
  title,
  description,
  href,
  className,
  classModify,
  urlImage,
  children,
}: any) => (
  <div className={`Card ${className ?? ''} ${classModify ?? ''}`}>
    <a
      href={href}
      className={`${className ? `Card ${className}` : 'Card'}-item-image`}
    >
      <img src={urlImage} alt={title} />
    </a>
    <div className={`${className ? `Card ${className}` : 'Card'}-item-info`}>
      <h4 className={`${className ? `Card ${className}` : 'Card'}-item-title`}>
        <a href={href}>{title}</a>
      </h4>
      <p
        className={`${
          className ? `Card ${className}` : 'Card'
        }-item-description`}
      >
        {description}
      </p>
      {children}
    </div>
  </div>
);
export default CardComponent;
