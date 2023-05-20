import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { setReponseDataCart } from 'redux/action/cart';
import { setBiddingProcess } from 'redux/action/home';
import { RootState } from 'redux/reducer';

const SignalRContainer: React.FC<PropsFromRedux> = ({
  profile,
  setReponseDataCartAction,
  setBiddingProcessAction,
}) => {
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const user = useSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    if (!profile && connection) {
      return;
    }

    const joinRoom = async () => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl(process.env.REACT_SOCKET_URL ?? '')
          .withAutomaticReconnect()
          .build();

        connection.on('notifications', (systems) => {
          console.log('-systems', systems);
        });

        connection.on('notification_bidding', (bidding) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          console.log('Bidding Notification', bidding);
          setBiddingProcessAction(bidding || []);
          //   console.log('User___', user);
        });

        connection.on('notification_cart', (bidding, cart, deposit) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          // console.log('List BiddingA', bidding);
          // console.log('List Cart', cart);
          console.log('depositdepositdeposit', deposit);
          // setReponseDataCartAction(cart);
          setBiddingProcessAction(bidding || []);
        });

        connection.onclose((e) => {
          setConnection(undefined);
        });

        if (profile?.phone && connection !== undefined) {
          console.log('Start connect', `${profile.phone}-${profile.userId}`);
          await connection.start();

          console.log(`JOIN ${profile?.phone},${profile?.userId} `);
          await connection.invoke('JoinRoom', {
            user: profile?.phone,
            code: profile?.userId,
          });
        }

        setConnection(connection);
      } catch (e) {
        console.log(e);
      }
    };

    if (connection === undefined) {
      joinRoom();
    }

    // eslint-disable-next-line consistent-return
    return () => {
      setConnection(undefined);
      connection?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return null;
};

// export default CartContainer;

interface SignalRContainerProps {}
const mapStateToProps = (
  state: RootState,
  ownProps: SignalRContainerProps,
) => ({
  ...ownProps,
  profile: state.user.profile,
});
const connector = connect(mapStateToProps, {
  setReponseDataCartAction: setReponseDataCart,
  setBiddingProcessAction: setBiddingProcess,
});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SignalRContainer);
