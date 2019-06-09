import React from 'react';
import styled from 'styled-components';

const ButtonSt = styled.button`
  background-color: #e31837;
  color: #fff;
  border: none;
  padding: 0;
  border-radius: 35px;
  min-width: 205px;
  line-height: 56px;
  font-size: 20px;
  font-weight: 500;
  z-index: 20;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    box-shadow: 0 0 0 2px #e31837;
    color: #e31837;
  }

  &:disabled,
  &:disabled:hover,
  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
    background-color: #e31837;
    color: #fff;
    box-shadow: none;
    opacity: 0.5;
  }
`;

const Button = props => (
  <ButtonSt type='button' disabled={props.disabled} onClick={props.onClick}>
    {props.title}
  </ButtonSt>
);

export default Button;
