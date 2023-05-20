import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { useRouter } from 'next/router';
import en from 'locales/en';
import vn from 'locales/vn';

const StyledViewMore = styled.div<StyledShowProps>`
  text-align: center;
  color: ${theme.blue};
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  font-weight: bold;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  padding-top: ${(props) => (props.showMore ? '0px' : ' 20px')};
  span:hover {
    opacity: 0.8;
  }
`;
interface StyledShowProps {
  showMore: boolean;
}
const StyledShow = styled.div<StyledShowProps>`
  height: ${(props) => (props.showMore ? '100%' : ' 500px')};
  overflow: hidden;
  position: relative;
  padding-bottom: 30px;
`;
interface ShowTextProps {
  text: React.ReactNode;
  additionalAttr: { code: string; label: string; value: string }[];
}
const ShowText: React.FC<ShowTextProps> = ({ text, additionalAttr }) => {
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : vn;

  return (
    <StyledShow showMore={showMore}>
      <div className="d-flex justify-content-center">
        <div className="d-flex align-items-center flex-column w-50-responsive mb-5 mt-3">
          {(additionalAttr ?? []).map((item) => (
            <div className="d-flex w-100 item-attribute" key={item.code}>
              <div className="w-25">{item.label}</div>
              <div className="w-75">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div>{text}</div>
      <StyledViewMore
        onClick={() => setShowMore(!showMore)}
        showMore={showMore}
      >
        <span>{showMore ? t.showLess : t.showMore}</span>
      </StyledViewMore>
    </StyledShow>
  );
};
export default ShowText;
