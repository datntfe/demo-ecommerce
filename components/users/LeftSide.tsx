import Icon, { IconName } from 'components/common/Icon';
import NumberAlert from 'components/common/NumberAlert';
import en from 'locales/en';
import vn from 'locales/vn';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import styled from 'styled-components';

interface StyledMenuProps {
  active: boolean;
  countSubMenu: number;
}

const StyledMenu = styled.div<StyledMenuProps>`
  .parent-item {
    font-size: 16px;
    color: #858585;
    padding: 10px;
    &.active,
    &:hover {
      background: #f0f0f0;
      border-radius: 4px;
      color: #222631;
    }
  }
  .submenu {
    transition: all 3s ease-out;
    .item {
      font-size: 16px;
      padding: 10px 38px;
      color: #858585;
      &:hover {
        background: #f0f0f0;
        border-radius: 4px;
        color: #222631;
      }
    }
    .active {
      background: #f0f0f0;
      border-radius: 4px;
      color: #222631;
    }
  }
  .arrow {
    transition: all 3s ease-out;
    transform: ${(props) =>
      !props.active ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

interface LeftSideProps {
  activeMenu: string;
}
const LeftSide: React.FC<LeftSideProps> = ({ activeMenu }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;
  const unreadNotificationQty = useSelector(
    (state: RootState) => state.user.systemStatus?.unreadNotificaitionCount,
  );

  const MENU = [
    {
      id: 1,
      title: t.myAccount,
      icon: 'user',
      submenu: [
        { title: t.infor, id: 1, path: '/user/account/profile' },
        { title: t.address, id: 2, path: '/user/account/address' },
        { title: t.changePasswordLow, id: 3, path: '/user/account/password' },
      ],
    },
    {
      id: 6,
      title: t.shopdiXu,
      icon: 'coin-small',
      submenu: [
        { title: t.history, id: 1, path: '/user/wallet/' },
        // { title: t.depositCoin, id: 2, path: '/user/wallet/deposit/' },
        // { title: t.transferCoin, id: 3, path: '/user/wallet/transfer/' },
        { title: t.voucher, id: 4, path: '/user/wallet/voucher/' },
      ],
      path: '/user/wallet',
    },
    {
      id: 2,
      title: t.history,
      icon: 'history',
      submenu: [],
      path: '/user/history',
    },
    {
      id: 3,
      title: t.headerOrder,
      icon: 'list-board',
      submenu: [],
      path: '/user/purchase',
    },
    // {
    //   id: 7,
    //   title: t.returnOrder,
    //   icon: 'returnOrder',
    //   submenu: [],
    //   path: '/user/returnOrder',
    // },
    {
      id: 4,
      title: t.notification,
      icon: 'bell',
      submenu: [],
      path: '/user/notification',
    },
    {
      id: 5,
      title: t.myReview,
      icon: 'star-profile',
      submenu: [],
      path: '/user/comment',
    },
    {
      id: 7,
      title: t.affiliate,
      icon: 'affiliate',
      submenu: [],
      path: '/user/affiliate',
    },
  ];

  return (
    <div className="left-side-profile">
      <div className="d-flex align-items-center mb-4 title text-uppercase headline-01">
        {t.profile}
      </div>
      <div className="">
        {MENU.map((item) => (
          <StyledMenu
            className=""
            active={activeMenu.slice(0, 1) === String(item.id)}
            countSubMenu={item.submenu.length}
            key={item.id}
          >
            <div
              className={`parent-item d-flex align-items-center justify-content-between cursor-pointer ${
                activeMenu === String(item.id) && item.submenu.length === 0
                  ? 'active'
                  : ''
              }`}
            >
              <div
                className="d-flex align-items-center"
                onClick={() => {
                  if (item.submenu.length === 0) {
                    router.push(item.path ?? '');
                  } else {
                    router.push(item.submenu[0].path);
                  }
                }}
              >
                <div className="relative">
                  <Icon name={item.icon as IconName} />
                  {unreadNotificationQty > 0 &&
                    item.path === '/user/notification' && (
                      <NumberAlert qty={unreadNotificationQty} />
                    )}
                </div>

                <span className="font-bold ml-2 cursor-pointer mt-1">
                  {item.title}
                </span>
              </div>
              {/* {item.submenu.length > 0 && (
                <span className="arrow" onClick={() => setArrow(item.id)}>
                  <Icon name="arrow-bottom" />
                </span>
              )} */}
            </div>
            {item.submenu.length > 0 && (
              <div className="submenu">
                {item.submenu.map((sub) => (
                  <div
                    className={`item font-bold cursor-pointer text-gray3 ${
                      activeMenu !== `${item.id}-${sub.id}` ? '' : 'active'
                    }`}
                    onClick={() => router.push(sub.path)}
                    key={sub.id}
                  >
                    {sub.title}
                  </div>
                ))}
              </div>
            )}
          </StyledMenu>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
