import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoaderProps {
  loadingStatus: boolean;
}

const skBounce = keyframes`
0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;
const Preloader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999999;
  & #status {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    & .spinner {
      width: 40px;
      height: 40px;
      position: relative;
      margin: 100px auto;
      & .double-bounce1,
      .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #ffe063;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: ${skBounce} 2s infinite ease-in-out;
        animation: ${skBounce} 2s infinite ease-in-out;
      }
      & .double-bounce2 {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
      }
    }
  }
`;

const Loader = ({ loadingStatus }: LoaderProps) => {
  if (!loadingStatus) return null;

  return (
    <Preloader>
      <div id="status">
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      </div>
    </Preloader>
  );
};

export default Loader;
