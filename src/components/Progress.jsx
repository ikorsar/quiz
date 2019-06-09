import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ProgressSt = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  height: 30px;
  z-index: 20;

  @media screen and (min-width: 600px) {
    height: 36px;
  }
`;

const ProgressBg = styled.div`
  background-color: #e31837;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  width: ${props => props.width || '10%'};
  min-width: 90px;
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.span`
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;

  @media screen and (min-width: 600px) {
    font-size: 15px;
  }
`;

const Progress = props => {
  const { current, questionsQuantity } = props;
  const ProgressWidth = `${Math.round((current * 100) / questionsQuantity)}%`;

  return (
    <ProgressSt>
      <ProgressBg width={ProgressWidth}>
        <ProgressText>
          {current} out of {questionsQuantity}
        </ProgressText>
      </ProgressBg>
    </ProgressSt>
  );
};

Progress.propTypes = {
  current: PropTypes.number,
  questionsQuantity: PropTypes.number,
};

export default Progress;
