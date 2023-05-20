import Image from 'next/image';

const ImageCus = (props: any) => {
  const { children, alt } = props;
  return (
    <Image
      {...props}
      alt={alt}
      blurDataURL="/img/img-loading.png"
      placeholder="blur"
    >
      {children}
    </Image>
  );
};

export default ImageCus;
