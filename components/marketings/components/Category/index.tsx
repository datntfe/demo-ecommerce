import React from 'react';

interface CategoryComponentProps {
  pictureUrl: string;
  name: string;
  className: string;
  showName: boolean;
  link: string;
}

const CategoryComponent = ({
  pictureUrl,
  name,
  className,
  showName,
  link,
}: CategoryComponentProps) => (
  <a className={`Category-component ${className ?? className}`} href={link}>
    <img src={pictureUrl} alt={name} />
    {showName ? <p className="text-center">{name}</p> : ''}
  </a>
);
export default CategoryComponent;
