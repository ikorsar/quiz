import React from 'react';
import styled from 'styled-components';

const LoaderSt = styled.div`
  display: inline-block;
  height: 200px;
  position: relative;
  transition: all 0.2s ease;
`;

const LoaderInner = styled.div`
  position: relative;
  height: 80px;
  width: 80px;
  border-radius: 80px;
  border: 3px solid rgba(0, 0, 0, 0.7);
  top: calc(50% - 43px);
  left: calc(50% - 43px);
  transform-origin: 50% 50%;
  animation: loader1 3s linear infinite;

  &:after {
    content: '';
    position: absolute;
    top: -5px;
    left: 20px;
    width: 11px;
    height: 11px;
    border-radius: 10px;
    background-color: #000;
  }

  @keyframes loader1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => (
  <LoaderSt>
    <LoaderInner />
  </LoaderSt>
);

export default Loader;
