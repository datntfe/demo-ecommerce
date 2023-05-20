import React from 'react';

interface ImageTitleComponent {
  pictureUrl: string;
  name?: string;
  className: string;
}

const ImageTitleComponent = ({
  pictureUrl,
  name,
  className,
}: ImageTitleComponent) => (
  <div className="picture-title">
    <h1>{name}</h1>
    <img className={`${className}`} src={pictureUrl} alt={name} />
  </div>
);
export default ImageTitleComponent;
