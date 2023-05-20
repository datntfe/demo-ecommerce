import React from 'react';

import { TIconProps } from './Icon.types';
import { EIconColor } from './Icon.enums';

const Svg: React.FC<TIconProps> = ({ color = EIconColor.BLACK }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={26} viewBox="0 0 32 26" fill="none">
    <path d="M25.4551 22.8008V24.9124C25.4551 25.0205 25.1503 25.1492 24.597 25.278C23.4173 25.5547 21.1098 25.8373 18.2885 25.9483C17.4746 25.9823 16.612 26.0001 15.731 26.0001C15.2981 26.0001 14.8724 25.9962 14.4538 25.9883C11.5106 25.9291 8.96679 25.6805 7.44263 25.4082C6.48546 25.2365 5.93066 25.0575 5.93066 24.9124V22.8008H25.4551Z" fill="url(#paint0_linear_5128_51871)" />
    <path style={{mixBlendMode: 'multiply'}} d="M24.5891 25.272C23.4094 25.5488 21.1019 25.8314 18.2806 25.9424L18.2334 23.1027L21.3747 22.8067L24.5175 22.5107L24.5251 22.8067L24.5891 25.272Z" fill="url(#paint1_linear_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} opacity="0.85" d="M14.4642 22.8004C14.4642 23.1186 14.4398 24.733 14.4459 25.982C11.5028 25.9228 8.95897 25.6742 7.43481 25.4019L7.4592 22.9883L12.9248 22.796L14.4658 22.7412C14.4658 22.7412 14.4658 22.7649 14.4642 22.8004Z" fill="url(#paint2_linear_5128_51871)" />
    <path d="M25.455 22.8011C25.455 23.3235 21.0776 23.9331 15.6882 23.9331C10.2988 23.9331 5.93359 23.3235 5.93359 22.8011C5.93359 22.2787 10.3034 21.8525 15.6882 21.8525C21.0731 21.8525 25.455 22.2772 25.455 22.8011Z" fill="#B4B7C8" />
    <path d="M25.455 22.8011C25.455 23.3235 21.0776 23.9331 15.6882 23.9331C10.2988 23.9331 5.93359 23.3235 5.93359 22.8011C5.93359 22.2787 10.3034 21.8525 15.6882 21.8525C21.0731 21.8525 25.455 22.2772 25.455 22.8011Z" fill="#B4B7C8" />
    <path d="M15.6806 23.8223C11.0563 23.8223 7.17432 23.3947 6.03882 22.9478C6.74908 23.4302 10.7927 23.9318 15.6806 23.9318C20.5686 23.9318 24.6259 23.4302 25.3362 22.9463C24.1992 23.3932 20.3049 23.8223 15.6806 23.8223Z" fill="#C4C4D4" />
    <path d="M30.4526 9.96611C30.2682 10.2488 30.0837 10.5388 29.9054 10.8362C29.8185 10.9842 29.7332 11.1218 29.6478 11.2698C26.7519 16.2049 24.7888 22.3683 24.7004 22.6553C24.7017 22.6637 24.7017 22.6722 24.7004 22.6805C24.7004 23.0608 21.8807 23.3804 18.0474 23.4766C17.3098 23.4944 16.534 23.5048 15.7323 23.5048H15.682C13.4292 23.5048 11.3686 23.4293 9.78651 23.3035C9.42376 23.2754 9.08387 23.2443 8.77599 23.2118C7.45607 23.0638 6.66046 22.8818 6.66046 22.6805C6.66046 22.6805 6.66046 22.6805 6.66046 22.6716C6.53548 22.2484 4.5998 16.199 1.76943 11.3349C1.67798 11.1677 1.57282 11.002 1.47222 10.8348C1.29237 10.5388 1.111 10.2428 0.925049 9.96316C2.53817 10.8444 4.20803 11.6239 5.92429 12.2968C7.44845 12.868 8.95737 13.2601 9.83071 13.0248L9.86119 13.016C12.3258 12.3027 15.3665 2.75212 15.6637 1.79765C15.6759 1.76658 15.682 1.7429 15.6865 1.73106V1.7207V1.73106C15.7536 1.95451 16.9059 5.68211 18.3767 8.80152C19.3628 10.8984 20.4861 12.7215 21.5103 13.016C23.7783 13.673 30.4526 9.96611 30.4526 9.96611Z" fill="url(#paint3_linear_5128_51871)" />
    <path d="M30.4526 9.96611C30.2682 10.2488 30.0837 10.5388 29.9054 10.8362C29.8185 10.9842 29.7332 11.1218 29.6478 11.2698C26.7519 16.2049 24.7888 22.3683 24.7004 22.6553C24.7017 22.6637 24.7017 22.6722 24.7004 22.6805C24.7004 23.0608 21.8807 23.3804 18.0474 23.4766C17.3098 23.4944 16.534 23.5048 15.7323 23.5048H15.682C13.4292 23.5048 11.3686 23.4293 9.78651 23.3035C9.42376 23.2754 9.08387 23.2443 8.77599 23.2118C7.45607 23.0638 6.66046 22.8818 6.66046 22.6805C6.66046 22.6805 6.66046 22.6805 6.66046 22.6716C6.53548 22.2484 4.5998 16.199 1.76943 11.3349C1.67798 11.1677 1.57282 11.002 1.47222 10.8348C1.29237 10.5388 1.111 10.2428 0.925049 9.96316C2.53817 10.8444 4.20803 11.6239 5.92429 12.2968C7.44845 12.868 8.95737 13.2601 9.83071 13.0248L9.86119 13.016C12.3258 12.3027 15.3665 2.75212 15.6637 1.79765C15.6759 1.76658 15.682 1.7429 15.6865 1.73106V1.7207V1.73106C15.7536 1.95451 16.9059 5.68211 18.3767 8.80152C19.3628 10.8984 20.4861 12.7215 21.5103 13.016C23.7783 13.673 30.4526 9.96611 30.4526 9.96611Z" fill="url(#paint4_linear_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} opacity="0.85" d="M18.3325 23.5005H15.688C13.4353 23.5005 11.3747 23.425 9.7926 23.2992C9.42985 23.2711 9.08996 23.24 8.78208 23.2075C7.46216 23.0595 6.66655 22.8775 6.66655 22.6762C6.66655 22.6762 6.66655 22.6762 6.66655 22.6674C6.53547 22.2486 4.63027 16.2939 1.83039 11.4461C1.56671 10.9903 1.29694 10.5434 1.01802 10.1143C0.984484 10.0625 0.952477 10.0107 0.918945 9.96628L1.07136 10.0521C1.33961 10.2001 1.93251 10.5108 2.69459 10.8852C3.60909 11.3292 4.76745 11.8678 5.91361 12.2999C7.43777 12.8711 8.94669 13.2633 9.82003 13.028L9.85052 13.0191C12.3151 12.3058 15.3558 2.75525 15.653 1.80078L18.3325 23.5005Z" fill="url(#paint5_linear_5128_51871)" />
    <path style={{mixBlendMode: 'multiply'}} d="M29.5701 11.3914C26.7214 16.3043 24.7872 22.3715 24.6927 22.6511C24.694 22.6595 24.694 22.668 24.6927 22.6763C24.6927 23.0566 21.8731 23.3762 18.0398 23.4724L18.366 8.80176C19.3521 10.8986 20.4754 12.7217 21.4996 13.0162C23.0832 13.4764 26.8342 11.7939 28.936 10.7447C29.8383 10.3008 30.4388 9.96192 30.4388 9.96192C30.1508 10.4207 29.8566 10.9001 29.5701 11.3914Z" fill="url(#paint6_linear_5128_51871)" />
    <path style={{mixBlendMode: 'multiply'}} d="M29.9056 10.8323C29.8187 10.9803 29.7334 11.1179 29.648 11.2659C27.7977 12.2248 23.2923 14.9876 21.5136 14.4726C20.4893 14.1767 19.366 12.355 18.3799 10.2567C16.9167 7.13728 15.7568 3.40968 15.6898 3.18771V3.17587V3.18771C15.6898 3.18771 15.6791 3.22175 15.6669 3.25282C15.3621 4.20729 12.329 13.7594 9.86443 14.4726H9.83395C8.9606 14.7079 7.45626 14.3158 5.92753 13.7446C4.43385 13.1911 2.76033 11.9111 1.76962 11.3355C1.67817 11.1682 1.57301 11.0025 1.47241 10.8353C2.91341 11.5998 4.40007 12.2802 5.92448 12.873C7.44864 13.4456 8.95756 13.8378 9.8309 13.6025C9.84077 13.5987 9.85097 13.5957 9.86138 13.5936C12.3259 12.8804 15.3666 3.32829 15.6639 2.3753C15.676 2.34423 15.6821 2.32055 15.6867 2.30871V2.29688V2.30871C15.7538 2.53216 16.906 6.25828 18.3769 9.37769C19.363 11.476 20.4863 13.2991 21.5105 13.5936C23.3837 14.1352 28.2671 11.695 29.9056 10.8323Z" fill="url(#paint7_linear_5128_51871)" />
    <path d="M30.4525 9.96612C30.1751 10.3893 29.9053 10.8274 29.6431 11.2757C28.9694 11.625 27.9406 12.137 26.8204 12.6238C24.874 13.4658 22.6488 14.2235 21.5178 13.9009C20.489 13.6049 19.3657 11.7818 18.3796 9.68348C17.1847 7.13675 16.194 4.18308 15.8312 3.06584C15.7504 2.81427 15.7016 2.65593 15.6895 2.6145V2.60266V2.6145C15.6895 2.6145 15.6788 2.64853 15.6666 2.67961C15.6437 2.75508 15.6041 2.88234 15.5477 3.054C14.938 4.96885 12.4186 12.4033 10.2238 13.7366C10.1119 13.8062 9.99094 13.8609 9.86412 13.8994H9.83364C8.96029 14.1362 7.45595 13.7514 5.92722 13.1714C5.5035 13.0115 5.07826 12.8384 4.66369 12.6608C3.50228 12.1621 2.4308 11.625 1.73578 11.2683C1.47363 10.8244 1.20385 10.3805 0.927979 9.9602C0.987421 9.99275 2.45214 10.8052 4.23388 11.588C4.77953 11.8307 5.35566 12.0719 5.92722 12.2879C7.45138 12.8591 8.96029 13.2513 9.83364 13.016L9.86412 13.0071C9.98681 12.9719 10.1042 12.9212 10.2132 12.8562C12.1717 11.6723 14.3833 5.6318 15.2779 2.97557C15.4761 2.38365 15.6102 1.96191 15.6605 1.79173C15.6727 1.76066 15.6788 1.73698 15.6834 1.72514V1.7207V1.73106C15.7077 1.80801 15.8541 2.28746 16.0995 3.01108C16.7542 4.97799 17.5132 6.91071 18.3735 8.80152C19.3322 10.8422 20.422 12.6223 21.4218 12.9893L21.5056 13.016C22.6335 13.3445 24.8588 12.5854 26.8097 11.7404C28.7606 10.8954 30.4525 9.96612 30.4525 9.96612Z" fill="#B4B7C8" />
    <path style={{mixBlendMode: 'multiply'}} opacity="0.65" d="M15.8025 21.7151L19.6266 19.6893L19.5839 15.0546L15.8025 12.792V21.7151Z" fill="url(#paint8_linear_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} opacity="0.85" d="M10.2211 13.7321C10.1092 13.8016 9.98827 13.8563 9.86144 13.8948H9.83096C8.95762 14.1316 7.45327 13.7468 5.92454 13.1668C5.50083 13.007 5.07559 12.8338 4.66101 12.6562L4.2312 11.5938C4.77685 11.8364 5.35298 12.0776 5.92454 12.2937C7.4487 12.8649 8.95762 13.257 9.83096 13.0218L9.86144 13.0129C9.9855 12.9761 10.1039 12.9233 10.2135 12.856L10.2211 13.7321Z" fill="url(#paint9_linear_5128_51871)" />
    <g style={{mixBlendMode: 'multiply'}}>
      <path d="M30.4528 9.96582C30.1479 10.4246 29.8568 10.904 29.5718 11.3953C29.3201 11.2245 29.1082 11.0041 28.95 10.7486C29.8523 10.2943 30.4528 9.96582 30.4528 9.96582Z" fill="#A3AEB5" />
    </g>
    <path d="M31.3334 10.6342C31.7015 10.0799 31.537 9.34083 30.9661 8.98346C30.3952 8.62608 29.6339 8.78574 29.2658 9.34006C28.8978 9.89439 29.0622 10.6335 29.6331 10.9908C30.2041 11.3482 30.9653 11.1885 31.3334 10.6342Z" fill="url(#paint10_radial_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} d="M30.7895 9.72693C30.7898 9.86842 30.7468 10.0068 30.666 10.1246C30.5853 10.2423 30.4703 10.3342 30.3357 10.3885C30.2012 10.4427 30.053 10.457 29.9101 10.4295C29.7671 10.402 29.6358 10.3339 29.5328 10.2338C29.4297 10.1338 29.3596 10.0063 29.3312 9.86749C29.3029 9.7287 29.3176 9.58487 29.3735 9.45421C29.4294 9.32355 29.524 9.21194 29.6453 9.13351C29.7666 9.05509 29.9091 9.01338 30.0548 9.01367C30.2497 9.01367 30.4365 9.08882 30.5743 9.22258C30.7121 9.35634 30.7895 9.53777 30.7895 9.72693Z" fill="url(#paint11_radial_5128_51871)" />
    <g style={{mixBlendMode: 'multiply'}}>
      <path d="M16.1058 3.01108C16.0168 3.03844 15.9247 3.05533 15.8315 3.0614C15.7358 3.06952 15.6395 3.06554 15.5449 3.04956C15.4544 3.03461 15.366 3.00979 15.2812 2.97557C15.4794 2.38365 15.6135 1.96191 15.6638 1.79173C15.676 1.76066 15.6821 1.73698 15.6867 1.72514V1.7207V1.73106C15.7141 1.80801 15.8604 2.28746 16.1058 3.01108Z" fill="#A3AEB5" />
    </g>
    <path d="M16.1405 2.65748C16.7752 2.42241 17.0934 1.73231 16.8513 1.11608C16.6092 0.49986 15.8984 0.190872 15.2637 0.425938C14.629 0.661004 14.3108 1.35111 14.5529 1.96733C14.795 2.58355 15.5058 2.89254 16.1405 2.65748Z" fill="url(#paint12_radial_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} d="M15.461 2.00956C15.8676 2.00956 16.1972 1.68956 16.1972 1.29482C16.1972 0.900078 15.8676 0.580078 15.461 0.580078C15.0544 0.580078 14.7249 0.900078 14.7249 1.29482C14.7249 1.68956 15.0544 2.00956 15.461 2.00956Z" fill="url(#paint13_radial_5128_51871)" />
    <path style={{mixBlendMode: 'multiply'}} d="M26.8267 12.6202C24.8804 13.4622 22.6551 14.2199 21.5242 13.8973L21.4358 12.9902L21.5196 13.0168C22.6475 13.3453 24.8728 12.5862 26.8237 11.7412C26.8176 12.0386 26.8267 12.3346 26.8267 12.6202Z" fill="url(#paint14_linear_5128_51871)" />
    <g style={{mixBlendMode: 'multiply'}}>
      <path d="M2.70555 10.883C2.49761 11.1713 2.18511 11.3727 1.83069 11.4468C1.56701 10.991 1.29723 10.5441 1.01831 10.1149L1.07623 10.0469C1.35058 10.1949 1.94347 10.5086 2.70555 10.883Z" fill="#A3AEB5" />
    </g>
    <path d="M2.46304 9.98864C2.46304 10.2251 2.39081 10.4563 2.25549 10.6529C2.12017 10.8496 1.92783 11.0028 1.7028 11.0933C1.47777 11.1838 1.23015 11.2075 0.991263 11.1613C0.752372 11.1152 0.532936 11.0013 0.360704 10.8341C0.188473 10.6669 0.0711823 10.4538 0.0236639 10.2219C-0.0238546 9.98997 0.000533599 9.74956 0.0937444 9.53108C0.186955 9.3126 0.344802 9.12586 0.547325 8.99448C0.749847 8.86309 0.987949 8.79297 1.23152 8.79297C1.39325 8.79297 1.55339 8.8239 1.7028 8.88398C1.85222 8.94407 1.98798 9.03214 2.10234 9.14317C2.21669 9.2542 2.30741 9.38601 2.3693 9.53108C2.43119 9.67614 2.46304 9.83162 2.46304 9.98864Z" fill="url(#paint15_radial_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} d="M1.64153 9.72693C1.64183 9.86842 1.59887 10.0068 1.51809 10.1246C1.43732 10.2423 1.32236 10.3342 1.18778 10.3885C1.0532 10.4427 0.905057 10.457 0.762112 10.4295C0.619168 10.402 0.487855 10.3339 0.384809 10.2338C0.281762 10.1338 0.211618 10.0063 0.183261 9.86749C0.154904 9.7287 0.169611 9.58487 0.225519 9.45421C0.281427 9.32355 0.376019 9.21194 0.497315 9.13351C0.618611 9.05509 0.761151 9.01338 0.906881 9.01367C1.10172 9.01367 1.28858 9.08882 1.42635 9.22258C1.56413 9.35634 1.64153 9.53777 1.64153 9.72693Z" fill="url(#paint16_radial_5128_51871)" />
    <path style={{mixBlendMode: 'multiply'}} opacity="0.65" d="M23.2875 18.5535L24.4002 17.9527L24.3301 16.6475L23.1885 16.0645L23.2875 18.5535Z" fill="url(#paint17_linear_5128_51871)" />
    <path style={{mixBlendMode: 'multiply'}} opacity="0.65" d="M8.69209 18.5535L9.8032 17.9527L9.73309 16.6475L8.59302 16.0645L8.69209 18.5535Z" fill="url(#paint18_linear_5128_51871)" />
    <path d="M24.4 18.0287L24.3512 16.7842L23.3361 16.1982L22.3713 16.8582L22.4201 18.1027L23.4352 18.6887L24.4 18.0287Z" fill="url(#paint19_linear_5128_51871)" />
    <path d="M24.0997 16.956L24.1363 17.8765L23.423 18.3648L22.6716 17.9312L22.635 17.0108L23.3498 16.5225L23.9747 16.8835L24.0997 16.956Z" fill="url(#paint20_linear_5128_51871)" />
    <g style={{mixBlendMode: 'screen'}} opacity="0.65">
      <path d="M23.3361 16.1982L23.3498 16.5223L22.635 17.0106L22.3713 16.8582L23.3361 16.1982Z" fill="#D4CAFF" />
    </g>
    <g style={{mixBlendMode: 'screen'}} opacity="0.35">
      <path d="M23.4353 18.6884L23.4231 18.3628L24.1364 17.876L24.4001 18.0284L23.4353 18.6884Z" fill="#C7E1F8" />
    </g>
    <path d="M24.3513 16.7842L24.0999 16.9558L24.1364 17.8763L24.4001 18.0287L24.3513 16.7842Z" fill="url(#paint21_linear_5128_51871)" />
    <path d="M22.4202 18.1023L22.6717 17.9307L23.4231 18.3628L23.4353 18.6883L22.4202 18.1023Z" fill="url(#paint22_linear_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} opacity="0.35" d="M24.1 16.9553L24.1366 17.8758L23.4233 18.3641L22.6719 17.9305C22.6719 17.9305 23.5376 17.2202 23.975 16.8828L24.1 16.9553Z" fill="url(#paint23_linear_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} d="M22.873 17.0005C22.8735 17.0459 22.8603 17.0905 22.8349 17.1286C22.8096 17.1667 22.7732 17.1967 22.7303 17.2149C22.6875 17.233 22.64 17.2385 22.594 17.2307C22.5479 17.2228 22.5053 17.2019 22.4714 17.1706C22.4375 17.1393 22.4139 17.0991 22.4035 17.0548C22.393 17.0106 22.3963 16.9643 22.4128 16.9218C22.4293 16.8793 22.4583 16.8425 22.4962 16.816C22.5342 16.7895 22.5793 16.7744 22.6261 16.7726C22.6578 16.7714 22.6895 16.7764 22.7192 16.7873C22.7489 16.7982 22.776 16.8148 22.799 16.836C22.8221 16.8572 22.8405 16.8827 22.8532 16.911C22.8659 16.9393 22.8726 16.9697 22.873 17.0005Z" fill="url(#paint24_radial_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} d="M23.4123 16.5196C23.4127 16.5358 23.4065 16.5516 23.3951 16.5635C23.3837 16.5754 23.368 16.5825 23.3513 16.5832C23.339 16.5835 23.3269 16.5803 23.3165 16.5739C23.3061 16.5675 23.2979 16.5583 23.2928 16.5475C23.2878 16.5366 23.2862 16.5245 23.2882 16.5127C23.2902 16.5009 23.2957 16.49 23.3041 16.4813C23.3125 16.4725 23.3233 16.4664 23.3353 16.4636C23.3472 16.4608 23.3597 16.4615 23.3713 16.4656C23.3828 16.4697 23.3929 16.477 23.4002 16.4866C23.4074 16.4962 23.4117 16.5077 23.4123 16.5196Z" fill="url(#paint25_radial_5128_51871)" />
    <path d="M9.80331 18.0287L9.75454 16.7842L8.73945 16.1982L7.77466 16.8582L7.82496 18.1027L8.83852 18.6887L9.80331 18.0287Z" fill="url(#paint26_linear_5128_51871)" />
    <path d="M9.50305 16.956L9.53963 17.8765L8.82632 18.3648L8.07491 17.9312L8.03833 17.0108L8.75316 16.5225L9.37959 16.8835L9.50305 16.956Z" fill="url(#paint27_linear_5128_51871)" />
    <g style={{mixBlendMode: 'screen'}} opacity="0.65">
      <path d="M8.73945 16.1982L8.75317 16.5223L8.03834 17.0106L7.77466 16.8582L8.73945 16.1982Z" fill="#D4CAFF" />
    </g>
    <g style={{mixBlendMode: 'screen'}} opacity="0.35">
      <path d="M8.83837 18.6884L8.82617 18.3628L9.53948 17.876L9.80316 18.0284L8.83837 18.6884Z" fill="#C7E1F8" />
    </g>
    <path d="M9.75442 16.7842L9.50293 16.9558L9.53951 17.8763L9.80319 18.0287L9.75442 16.7842Z" fill="url(#paint28_linear_5128_51871)" />
    <path d="M7.82495 18.1023L8.07491 17.9307L8.82632 18.3628L8.83852 18.6883L7.82495 18.1023Z" fill="url(#paint29_linear_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} opacity="0.35" d="M9.50291 16.9553L9.53949 17.8758L8.82618 18.3641L8.07935 17.9305C8.07935 17.9305 8.94507 17.2202 9.38403 16.8828L9.50291 16.9553Z" fill="url(#paint30_linear_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} d="M8.27606 17.0006C8.27662 17.046 8.26339 17.0905 8.23801 17.1287C8.21264 17.1668 8.17624 17.1968 8.13339 17.215C8.09053 17.2331 8.04311 17.2386 7.99706 17.2307C7.95101 17.2228 7.90838 17.202 7.87449 17.1707C7.8406 17.1394 7.81696 17.0991 7.80653 17.0549C7.7961 17.0106 7.79934 16.9644 7.81584 16.9219C7.83235 16.8794 7.86139 16.8426 7.89933 16.8161C7.93726 16.7895 7.98242 16.7744 8.02914 16.7727C8.06093 16.7713 8.09267 16.7762 8.12247 16.787C8.15228 16.7978 8.17953 16.8143 8.20259 16.8356C8.22564 16.8569 8.24404 16.8825 8.25666 16.9108C8.26929 16.9392 8.27588 16.9697 8.27606 17.0006Z" fill="url(#paint31_radial_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} d="M8.81558 16.5196C8.816 16.5358 8.80985 16.5516 8.79846 16.5635C8.78706 16.5754 8.77132 16.5825 8.75461 16.5832C8.74233 16.5835 8.73023 16.5803 8.71983 16.5739C8.70944 16.5675 8.7012 16.5583 8.69617 16.5475C8.69113 16.5366 8.68951 16.5245 8.69151 16.5127C8.69351 16.5009 8.69904 16.49 8.70741 16.4813C8.71578 16.4725 8.72662 16.4664 8.73857 16.4636C8.75052 16.4608 8.76305 16.4615 8.7746 16.4656C8.78614 16.4697 8.79619 16.477 8.80348 16.4866C8.81077 16.4962 8.81498 16.5077 8.81558 16.5196Z" fill="url(#paint32_radial_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} opacity="0.35" d="M9.75454 16.7842L8.73945 16.1982L7.77466 16.8582L7.82496 18.1027L8.83852 18.6887L9.80331 18.0287L9.75454 16.7842Z" fill="url(#paint33_linear_5128_51871)" />
    <path d="M19.4985 19.6199V15.1583L15.9503 12.9268L12.402 15.1583V19.6199L15.9503 21.8499L19.4985 19.6199Z" fill="url(#paint34_linear_5128_51871)" />
    <path d="M15.9503 12.9268V14.0884L13.3257 15.7384L12.402 15.1583L15.9503 12.9268Z" fill="url(#paint35_linear_5128_51871)" />
    <path d="M15.9502 21.8487V20.6871L18.5748 19.0371L19.4984 19.6187L15.9502 21.8487Z" fill="url(#paint36_linear_5128_51871)" />
    <path d="M19.4986 15.1572L18.575 15.7373V19.0372L19.4986 19.6188V15.1572Z" fill="url(#paint37_linear_5128_51871)" />
    <path d="M12.4021 19.6187L13.3257 19.0371L15.9503 20.6871V21.8487L12.4021 19.6187Z" fill="url(#paint38_linear_5128_51871)" />
    <path d="M18.5748 15.7393V19.0378L15.9502 20.6893L13.2708 19.0718V15.7038L15.9502 14.0879L18.1389 15.4656L18.5748 15.7393Z" fill="#CCFFE1" />
    <path d="M18.5749 15.7393V19.0378L15.9503 20.6893L13.3242 19.0378V15.7393L15.9503 14.0879L18.139 15.4656L18.5749 15.7393Z" fill="url(#paint39_linear_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} opacity="0.35" d="M18.5734 15.7381V19.038L15.9503 20.6895L13.3242 19.038C13.3242 19.038 16.5234 16.6127 18.139 15.4658L18.5734 15.7381Z" fill="url(#paint40_linear_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} d="M15.9975 15.0928C16.548 15.0928 16.9943 14.6595 16.9943 14.125C16.9943 13.5905 16.548 13.1572 15.9975 13.1572C15.447 13.1572 15.0007 13.5905 15.0007 14.125C15.0007 14.6595 15.447 15.0928 15.9975 15.0928Z" fill="url(#paint41_radial_5128_51871)" />
    <path style={{mixBlendMode: 'screen'}} d="M19.2287 19.069C19.2287 19.1955 19.1901 19.3191 19.1177 19.4243C19.0452 19.5294 18.9423 19.6114 18.8219 19.6597C18.7015 19.7081 18.5691 19.7206 18.4413 19.6958C18.3135 19.6711 18.1962 19.61 18.1042 19.5205C18.0122 19.4309 17.9496 19.3169 17.9243 19.1928C17.8991 19.0687 17.9124 18.9401 17.9624 18.8233C18.0125 18.7065 18.0971 18.6068 18.2056 18.5367C18.3141 18.4666 18.4415 18.4294 18.5718 18.4297C18.6582 18.4297 18.7438 18.4462 18.8236 18.4784C18.9034 18.5105 18.9759 18.5576 19.0369 18.617C19.0979 18.6764 19.1462 18.7469 19.1792 18.8244C19.2121 18.902 19.2289 18.9851 19.2287 19.069Z" fill="url(#paint42_radial_5128_51871)" />
    <defs>
      <linearGradient id="paint0_linear_5128_51871" x1="5.92914" y1="24.3975" x2="25.4475" y2="24.3975" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9299AC" />
        <stop offset="0.35" stopColor="#959BB2" />
        <stop offset="0.91" stopColor="#97A0AD" />
        <stop offset={1} stopColor="#97A1AC" />
      </linearGradient>
      <linearGradient id="paint1_linear_5128_51871" x1="18.2334" y1="24.2214" x2="24.5891" y2="24.2214" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="0.24" stopColor="#CCD2DA" />
        <stop offset="0.44" stopColor="#ABB4C2" />
        <stop offset="0.54" stopColor="#9EA9B9" />
        <stop offset="0.63" stopColor="#ABB4C2" />
        <stop offset="0.79" stopColor="#CCD2DA" />
        <stop offset={1} stopColor="white" />
      </linearGradient>
      <linearGradient id="paint2_linear_5128_51871" x1="7.44091" y1="24.3645" x2="14.4658" y2="24.3645" gradientUnits="userSpaceOnUse">
        <stop stopColor="#454545" />
        <stop offset="0.05" stopColor="#545454" />
        <stop offset="0.16" stopColor="#7A7A7A" />
        <stop offset="0.3" stopColor="#B9B9B9" />
        <stop offset="0.45" stopColor="white" />
        <stop offset="0.53" stopColor="#DCDCDC" />
        <stop offset="0.69" stopColor="#9C9C9C" />
        <stop offset="0.83" stopColor="#6D6D6D" />
        <stop offset="0.93" stopColor="#505050" />
        <stop offset="0.99" stopColor="#454545" />
      </linearGradient>
      <linearGradient id="paint3_linear_5128_51871" x1="0.925049" y1="12.6105" x2="30.4526" y2="12.6105" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9299AC" />
        <stop offset="0.35" stopColor="#959BB2" />
        <stop offset="0.91" stopColor="#97A0AD" />
        <stop offset={1} stopColor="#97A1AC" />
      </linearGradient>
      <linearGradient id="paint4_linear_5128_51871" x1="0.925049" y1="12.6105" x2="30.4526" y2="12.6105" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9299AC" />
        <stop offset="0.35" stopColor="#959BB2" />
        <stop offset="0.91" stopColor="#97A0AD" />
        <stop offset={1} stopColor="#97A1AC" />
      </linearGradient>
      <linearGradient id="paint5_linear_5128_51871" x1="2.0011" y1="16.5869" x2="16.2432" y2="12.6206" gradientUnits="userSpaceOnUse">
        <stop stopColor="#454545" />
        <stop offset="0.05" stopColor="#545454" />
        <stop offset="0.16" stopColor="#7A7A7A" />
        <stop offset="0.3" stopColor="#B9B9B9" />
        <stop offset="0.45" stopColor="white" />
        <stop offset="0.53" stopColor="#DCDCDC" />
        <stop offset="0.69" stopColor="#9C9C9C" />
        <stop offset="0.83" stopColor="#6D6D6D" />
        <stop offset="0.93" stopColor="#505050" />
        <stop offset="0.99" stopColor="#454545" />
      </linearGradient>
      <linearGradient id="paint6_linear_5128_51871" x1="18.5001" y1="16.1371" x2="30.8991" y2="16.1371" gradientUnits="userSpaceOnUse">
        <stop offset="0.01" stopColor="white" />
        <stop offset="0.19" stopColor="#CCD2DA" />
        <stop offset="0.33" stopColor="#ABB4C2" />
        <stop offset="0.41" stopColor="#9EA9B9" />
        <stop offset="0.52" stopColor="#ABB4C2" />
        <stop offset="0.73" stopColor="#CCD2DA" />
        <stop offset={1} stopColor="white" />
      </linearGradient>
      <linearGradient id="paint7_linear_5128_51871" x1="1.47241" y1="8.42322" x2="29.9056" y2="8.42322" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="0.17" stopColor="#CFD4DC" />
        <stop offset="0.32" stopColor="#AEB6C4" />
        <stop offset="0.39" stopColor="#A1ABBB" />
        <stop offset="0.52" stopColor="#AEB6C4" />
        <stop offset="0.74" stopColor="#CFD4DD" />
        <stop offset={1} stopColor="white" />
      </linearGradient>
      <linearGradient id="paint8_linear_5128_51871" x1="15.8025" y1="17.2536" x2="19.6266" y2="17.2536" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="#E3E8E9" />
        <stop offset="0.56" stopColor="#B7C3C7" />
        <stop offset="0.84" stopColor="#9CACB2" />
        <stop offset={1} stopColor="#92A3AA" />
      </linearGradient>
      <linearGradient id="paint9_linear_5128_51871" x1="4.2312" y1="12.785" x2="10.2211" y2="12.785" gradientUnits="userSpaceOnUse">
        <stop stopColor="#454545" />
        <stop offset="0.05" stopColor="#545454" />
        <stop offset="0.16" stopColor="#7A7A7A" />
        <stop offset="0.3" stopColor="#B9B9B9" />
        <stop offset="0.45" stopColor="white" />
        <stop offset="0.53" stopColor="#DCDCDC" />
        <stop offset="0.69" stopColor="#9C9C9C" />
        <stop offset="0.83" stopColor="#6D6D6D" />
        <stop offset="0.93" stopColor="#505050" />
        <stop offset="0.99" stopColor="#454545" />
      </linearGradient>
      <radialGradient id="paint10_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(29.9379 9.63735) scale(1.23 1.19419)">
        <stop offset="0.35" stopColor="#959BB2" />
        <stop offset="0.91" stopColor="#97A0AD" />
        <stop offset={1} stopColor="#97A1AC" />
      </radialGradient>
      <radialGradient id="paint11_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(30.0579 9.72693) scale(0.736169 0.71474)">
        <stop stopColor="white" />
        <stop offset={1} stopColor="#454545" />
      </radialGradient>
      <radialGradient id="paint12_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(15.341 1.19309) scale(1.23 1.19419)">
        <stop offset="0.35" stopColor="#959BB2" />
        <stop offset="0.91" stopColor="#97A0AD" />
        <stop offset={1} stopColor="#97A1AC" />
      </radialGradient>
      <radialGradient id="paint13_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(15.461 1.29482) scale(0.736169 0.714741)">
        <stop stopColor="white" />
        <stop offset={1} stopColor="#454545" />
      </radialGradient>
      <linearGradient id="paint14_linear_5128_51871" x1="21.4297" y1="12.857" x2="26.8206" y2="12.857" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="0.18" stopColor="#CCD2DA" />
        <stop offset="0.33" stopColor="#ABB4C2" />
        <stop offset="0.41" stopColor="#9EA9B9" />
        <stop offset="0.52" stopColor="#ABB4C2" />
        <stop offset="0.73" stopColor="#CCD2DA" />
        <stop offset={1} stopColor="white" />
      </linearGradient>
      <radialGradient id="paint15_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(0.871819 9.63793) scale(1.23 1.19419)">
        <stop offset="0.35" stopColor="#959BB2" />
        <stop offset="0.91" stopColor="#97A0AD" />
        <stop offset={1} stopColor="#97A1AC" />
      </radialGradient>
      <radialGradient id="paint16_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(0.906881 9.72693) scale(0.736169 0.71474)">
        <stop stopColor="white" />
        <stop offset={1} stopColor="#454545" />
      </radialGradient>
      <linearGradient id="paint17_linear_5128_51871" x1="23.1885" y1="17.309" x2="24.4002" y2="17.309" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="#E3E8E9" />
        <stop offset="0.56" stopColor="#B7C3C7" />
        <stop offset="0.84" stopColor="#9CACB2" />
        <stop offset={1} stopColor="#92A3AA" />
      </linearGradient>
      <linearGradient id="paint18_linear_5128_51871" x1="8.59149" y1="17.309" x2="9.8032" y2="17.309" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="0.2" stopColor="#E3E8E9" />
        <stop offset="0.56" stopColor="#B7C3C7" />
        <stop offset="0.84" stopColor="#9CACB2" />
        <stop offset={1} stopColor="#92A3AA" />
      </linearGradient>
      <linearGradient id="paint19_linear_5128_51871" x1="23.4334" y1="18.6895" x2="23.3402" y2="16.2006" gradientUnits="userSpaceOnUse">
        <stop offset="0.02" stopColor="#00A520" />
        <stop offset="0.05" stopColor="#00A924" />
        <stop offset="0.34" stopColor="#02D752" />
        <stop offset="0.56" stopColor="#04F46E" />
        <stop offset="0.69" stopColor="#04FF79" />
      </linearGradient>
      <linearGradient id="paint20_linear_5128_51871" x1="23.4206" y1="18.3658" x2="23.3516" y2="16.5247" gradientUnits="userSpaceOnUse">
        <stop offset="0.31" stopColor="#17FF8C" />
        <stop offset="0.48" stopColor="#13F482" />
        <stop offset="0.77" stopColor="#09D866" />
        <stop offset="0.98" stopColor="#00BF4E" />
      </linearGradient>
      <linearGradient id="paint21_linear_5128_51871" x1="24.2694" y1="18.0361" x2="24.2227" y2="16.791" gradientUnits="userSpaceOnUse">
        <stop offset="0.31" stopColor="#01E34D" />
        <stop offset="0.55" stopColor="#01D846" />
        <stop offset="0.98" stopColor="#00BC35" />
      </linearGradient>
      <linearGradient id="paint22_linear_5128_51871" x1="22.9385" y1="18.7076" x2="22.9092" y2="17.9238" gradientUnits="userSpaceOnUse">
        <stop offset="0.29" stopColor="#0BEF3F" />
        <stop offset="0.5" stopColor="#09E43D" />
        <stop offset="0.85" stopColor="#03C837" />
        <stop offset="0.98" stopColor="#00BC35" />
      </linearGradient>
      <linearGradient id="paint23_linear_5128_51871" x1="23.1101" y1="18.4908" x2="23.7349" y2="17.1648" gradientUnits="userSpaceOnUse">
        <stop offset="0.31" stopColor="white" />
        <stop offset="0.37" stopColor="#F4F4F4" />
        <stop offset="0.47" stopColor="#D7D7D7" />
        <stop offset="0.61" stopColor="#A8A8A8" />
        <stop offset="0.76" stopColor="#676767" />
        <stop offset="0.94" stopColor="#161616" />
        <stop offset="0.99" />
      </linearGradient>
      <radialGradient id="paint24_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(22.6333 17.0108) rotate(-2.14574) scale(0.237758 0.230858)">
        <stop offset="0.01" stopColor="white" />
        <stop offset="0.08" stopColor="#E9E9E9" />
        <stop offset="0.34" stopColor="#989898" />
        <stop offset="0.57" stopColor="#575757" />
        <stop offset="0.77" stopColor="#282828" />
        <stop offset="0.92" stopColor="#0B0B0B" />
        <stop offset={1} />
      </radialGradient>
      <radialGradient id="paint25_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(23.3473 16.5249) rotate(-2.14573) scale(0.0624878 0.0606741)">
        <stop offset="0.01" stopColor="white" />
        <stop offset="0.08" stopColor="#E9E9E9" />
        <stop offset="0.34" stopColor="#989898" />
        <stop offset="0.57" stopColor="#575757" />
        <stop offset="0.77" stopColor="#282828" />
        <stop offset="0.92" stopColor="#0B0B0B" />
        <stop offset={1} />
      </radialGradient>
      <linearGradient id="paint26_linear_5128_51871" x1="8.83812" y1="18.6899" x2="8.74481" y2="16.1996" gradientUnits="userSpaceOnUse">
        <stop offset="0.02" stopColor="#00A520" />
        <stop offset="0.05" stopColor="#00A924" />
        <stop offset="0.34" stopColor="#02D752" />
        <stop offset="0.56" stopColor="#04F46E" />
        <stop offset="0.69" stopColor="#04FF79" />
      </linearGradient>
      <linearGradient id="paint27_linear_5128_51871" x1="8.82524" y1="18.3662" x2="8.7562" y2="16.5236" gradientUnits="userSpaceOnUse">
        <stop offset="0.31" stopColor="#17FF8C" />
        <stop offset="0.48" stopColor="#13F482" />
        <stop offset="0.77" stopColor="#09D866" />
        <stop offset="0.98" stopColor="#00BF4E" />
      </linearGradient>
      <linearGradient id="paint28_linear_5128_51871" x1="9.67376" y1="18.0351" x2="9.62711" y2="16.7899" gradientUnits="userSpaceOnUse">
        <stop offset="0.31" stopColor="#01E34D" />
        <stop offset="0.55" stopColor="#01D846" />
        <stop offset="0.98" stopColor="#00BC35" />
      </linearGradient>
      <linearGradient id="paint29_linear_5128_51871" x1="8.34313" y1="18.708" x2="8.31371" y2="17.9228" gradientUnits="userSpaceOnUse">
        <stop offset="0.29" stopColor="#0BEF3F" />
        <stop offset="0.5" stopColor="#09E43D" />
        <stop offset="0.85" stopColor="#03C837" />
        <stop offset="0.98" stopColor="#00BC35" />
      </linearGradient>
      <linearGradient id="paint30_linear_5128_51871" x1="8.51284" y1="18.4912" x2="9.1376" y2="17.1638" gradientUnits="userSpaceOnUse">
        <stop offset="0.31" stopColor="white" />
        <stop offset="0.37" stopColor="#F4F4F4" />
        <stop offset="0.47" stopColor="#D7D7D7" />
        <stop offset="0.61" stopColor="#A8A8A8" />
        <stop offset="0.76" stopColor="#676767" />
        <stop offset="0.94" stopColor="#161616" />
        <stop offset="0.99" />
      </linearGradient>
      <radialGradient id="paint31_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(8.03773 17.0112) rotate(-2.14573) scale(0.237759 0.230858)">
        <stop offset="0.01" stopColor="white" />
        <stop offset="0.08" stopColor="#E9E9E9" />
        <stop offset="0.34" stopColor="#989898" />
        <stop offset="0.57" stopColor="#575757" />
        <stop offset="0.77" stopColor="#282828" />
        <stop offset="0.92" stopColor="#0B0B0B" />
        <stop offset={1} />
      </radialGradient>
      <radialGradient id="paint32_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(8.75194 16.5239) rotate(-2.14573) scale(0.0624878 0.0606741)">
        <stop offset="0.01" stopColor="white" />
        <stop offset="0.08" stopColor="#E9E9E9" />
        <stop offset="0.34" stopColor="#989898" />
        <stop offset="0.57" stopColor="#575757" />
        <stop offset="0.77" stopColor="#282828" />
        <stop offset="0.92" stopColor="#0B0B0B" />
        <stop offset={1} />
      </radialGradient>
      <linearGradient id="paint33_linear_5128_51871" x1="7.77466" y1="17.4427" x2="9.80331" y2="17.4427" gradientUnits="userSpaceOnUse">
        <stop offset="0.01" stopColor="white" />
        <stop offset="0.08" stopColor="#E9E9E9" />
        <stop offset="0.34" stopColor="#989898" />
        <stop offset="0.57" stopColor="#575757" />
        <stop offset="0.77" stopColor="#282828" />
        <stop offset="0.92" stopColor="#0B0B0B" />
        <stop offset={1} />
      </linearGradient>
      <linearGradient id="paint34_linear_5128_51871" x1="15.9503" y1="12.9268" x2="15.9503" y2="21.8499" gradientUnits="userSpaceOnUse">
        <stop stopColor="#07D36D" />
        <stop offset="0.26" stopColor="#28E38B" />
        <stop offset="0.56" stopColor="#45F3A7" />
        <stop offset="0.81" stopColor="#58FCB8" />
        <stop offset="0.99" stopColor="#5EFFBE" />
      </linearGradient>
      <linearGradient id="paint35_linear_5128_51871" x1="12.402" y1="14.3326" x2="15.9503" y2="14.3326" gradientUnits="userSpaceOnUse">
        <stop offset="0.01" stopColor="#A6FCD5" />
        <stop offset="0.15" stopColor="#A0FCD3" />
        <stop offset="0.34" stopColor="#8FFBCC" />
        <stop offset="0.56" stopColor="#74FAC1" />
        <stop offset="0.8" stopColor="#4DF9B2" />
        <stop offset={1} stopColor="#26F7A2" />
      </linearGradient>
      <linearGradient id="paint36_linear_5128_51871" x1="15.9502" y1="20.4429" x2="19.4984" y2="20.4429" gradientUnits="userSpaceOnUse">
        <stop stopColor="#05913A" />
        <stop offset="0.02" stopColor="#05933C" />
        <stop offset="0.44" stopColor="#06B656" />
        <stop offset="0.78" stopColor="#07CB67" />
        <stop offset={1} stopColor="#07D36D" />
      </linearGradient>
      <linearGradient id="paint37_linear_5128_51871" x1="19.0368" y1="19.6188" x2="19.0368" y2="15.1572" gradientUnits="userSpaceOnUse">
        <stop stopColor="#07D36D" />
        <stop offset="0.26" stopColor="#28E38B" />
        <stop offset="0.56" stopColor="#45F3A7" />
        <stop offset="0.81" stopColor="#58FCB8" />
        <stop offset="0.99" stopColor="#5EFFBE" />
      </linearGradient>
      <linearGradient id="paint38_linear_5128_51871" x1="12.4021" y1="20.4429" x2="15.9503" y2="20.4429" gradientUnits="userSpaceOnUse">
        <stop stopColor="#07D36D" />
        <stop offset="0.22" stopColor="#0FD775" />
        <stop offset="0.56" stopColor="#24E38A" />
        <stop offset="0.98" stopColor="#46F6AD" />
        <stop offset={1} stopColor="#48F7AF" />
      </linearGradient>
      <linearGradient id="paint39_linear_5128_51871" x1="15.9488" y1="20.6893" x2="15.9488" y2="14.0879" gradientUnits="userSpaceOnUse">
        <stop stopColor="#87F4BE" />
        <stop offset="0.02" stopColor="#89F4BF" />
        <stop offset="0.44" stopColor="#ACFAD2" />
        <stop offset="0.78" stopColor="#C1FEDD" />
        <stop offset={1} stopColor="#C9FFE1" />
      </linearGradient>
      <linearGradient id="paint40_linear_5128_51871" x1="14.8179" y1="21.0964" x2="17.2365" y2="16.429" gradientUnits="userSpaceOnUse">
        <stop offset="0.55" stopColor="white" />
        <stop offset="0.59" stopColor="#F4F4F4" />
        <stop offset="0.65" stopColor="#D7D7D7" />
        <stop offset="0.74" stopColor="#A8A8A8" />
        <stop offset="0.85" stopColor="#676767" />
        <stop offset="0.96" stopColor="#161616" />
        <stop offset="0.99" />
      </linearGradient>
      <radialGradient id="paint41_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(15.9975 14.125) scale(0.9968 0.967785)">
        <stop stopColor="white" />
        <stop offset="0.12" stopColor="#C6C6C6" />
        <stop offset="0.24" stopColor="#929292" />
        <stop offset="0.37" stopColor="#666666" />
        <stop offset="0.5" stopColor="#414141" />
        <stop offset="0.62" stopColor="#242424" />
        <stop offset="0.75" stopColor="#101010" />
        <stop offset="0.88" stopColor="#040404" />
        <stop offset={1} />
      </radialGradient>
      <radialGradient id="paint42_radial_5128_51871" cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(18.5718 19.069) scale(0.658437 0.639271)">
        <stop stopColor="white" />
        <stop offset="0.07" stopColor="#E1E1E1" />
        <stop offset="0.21" stopColor="#A6A6A6" />
        <stop offset="0.36" stopColor="#747474" />
        <stop offset="0.5" stopColor="#4A4A4A" />
        <stop offset="0.64" stopColor="#2A2A2A" />
        <stop offset="0.77" stopColor="#131313" />
        <stop offset="0.89" stopColor="#050505" />
        <stop offset={1} />
      </radialGradient>
    </defs>
  </svg>
);

export default Svg;
