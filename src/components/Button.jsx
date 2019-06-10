import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

  &.animation {
    animation-fill-mode: both;
    animation-duration: 0.5s;
    animation-name: pulse;
  }

  @keyframes pulse {
    from {
      transform: scale3d(1, 1, 1);
    }

    50% {
      transform: scale3d(1.05, 1.05, 1.05);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }
`;

const Button = props => {
  const { disabled, onClick, className, title } = props;

  return (
    <ButtonSt
      type='button'
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {title}
    </ButtonSt>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default Button;
