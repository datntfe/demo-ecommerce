import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { fromUnixTime } from 'date-fns';
import Loader from 'components/common/loading';
import { loadDataLogin, logOut } from 'redux/action/user';
import { RootState } from 'redux/reducer';
import { storePrevPath } from 'redux/action/authth';
import axios from 'axios';
import { HostAPIENV } from 'config';

interface AuthRoutesProps {
  children: ReactNode;
}

export const CheckLoggedUser = () => {
  const token = localStorage.getItem('_u');
  return !!token;
};

export const INIT_PAGE = [
  '/guide',
  '/login',
  '/404',
  '/_error',
  '/register',
  '/',
  '/products/[...products]',
  // '/search/[...search]',
  '/search',
  '/forgot',
  '/store/[...storeId]',
  '/stores',
  '/hot-deal',
  '/limit-product',
  '/suggestion',
  '/brands',
  '/brands/[brandId]',
  '/shopdi-xu',
  '/thong-tin-du-an',
  '/chinh-sach-bao-mat',
  '/chinh-sach-quyen-rieng-tu',
  '/quy-che-hoat-dong',
  '/cau-hoi-thuong-gap',
  '/huong-dan',
  '/dieu-khoan-dich-vu',
  '/marketing',
  '/release',
  '/ldp-connect',
  '/ldp-connect-welcome',
];

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.profile?.userId);
  const dispatch = useDispatch();
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const authFunction = async () => {
      const token = localStorage.getItem('_u');
      const refreshToken = localStorage.getItem('_uRefresh');
      if (!token) {
        if (!INIT_PAGE.includes(Router.pathname)) {
          Router.replace(
            `/login?next=${Router.pathname.substring(
              1,
              Router.pathname.length,
            )}`,
          );
          dispatch(storePrevPath(Router.pathname));
        }
        setLoading(false);
      } else {
        const jwt = jwtDecode(token ?? '') as any;
        const expired = fromUnixTime(jwt.exp);
        if (expired.getTime() > new Date().getTime()) {
          setLoading(false);
          if (!user) {
            dispatch(
              loadDataLogin({ token, refreshToken: refreshToken ?? '' }),
            );

            if (['/login', '/register'].includes(Router.pathname)) {
              Router.replace('/');
            }
          }
        } else {
          if (!refreshToken) {
            localStorage.removeItem('_u');
            dispatch(logOut());
            if (!INIT_PAGE.includes(Router.pathname)) {
              Router.replace(
                `/login?next=${Router.pathname.substring(
                  1,
                  Router.pathname.length,
                )}`,
              );
              dispatch(storePrevPath(Router.pathname));
            }
          } else {
            let jwtToken = '';
            axios
              .post(`${HostAPIENV}/api/v1/auth/refresh_token`, {
                refresh_token: refreshToken,
              })
              .then((res) => {
                jwtToken = res.data.data.access_token;
                localStorage.setItem('_uRefresh', res.data.data.refresh_token);
                localStorage.setItem('_u', jwtToken);
                dispatch(
                  loadDataLogin({
                    token: jwtToken,
                    refreshToken: res.data.data.refresh_token ?? '',
                  }),
                );
              })
              .catch((error) => {
                localStorage.removeItem('_uRefresh');
                localStorage.removeItem('_u');
                dispatch(logOut());
                if (!INIT_PAGE.includes(Router.pathname)) {
                  Router.replace(
                    `/login?next=${Router.pathname.substring(
                      1,
                      Router.pathname.length,
                    )}`,
                  );
                  dispatch(storePrevPath(Router.pathname));
                }
              });
          }

          setLoading(false);
        }

        // if (['/login', '/register'].includes(Router.pathname)) {
        //   Router.replace('/');
        // }
      }
    };

    // authFunction();
  }, [Router, dispatch, user]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return loading ? <Loader loadingStatus /> : <>{children}</>;
};

export default AuthRoutes;
