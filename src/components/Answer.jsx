import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RadioBlockInner = styled.label`
  display: flex;
  position: relative;
  cursor: pointer;

  input {
    border: medium none;
    cursor: pointer;
    height: 18px;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    width: 18px;
    z-index: 1;

    &:checked + div {
      box-shadow: inset 0 0 0 3px #000;

      div {
        background-color: #000;
        border-color: #000;
      }
    }
  }
`;

const RadioBlockContent = styled.div`
  font-size: 21px;
  font-weight: 500;
  background: #ffffff;
  border-radius: 35px;
  min-height: 70px;
  padding: 10px 45px;
  box-shadow: inset 0 0 0 3px transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: box-shadow 0.15s ease-in-out;
  text-align: center;

  &:hover {
    box-shadow: inset 0 0 0 3px #000;
  }
`;

const Answer = props => {
  const { title, id, onChange } = props;

  return (
    <RadioBlockInner htmlFor={id}>
      <input
        type='radio'
        id={id}
        name='question'
        onChange={onChange}
        value={title}
      />
      <RadioBlockContent>
        <span className='radio_label_val'>{title}</span>
      </RadioBlockContent>
    </RadioBlockInner>
  );
};

Answer.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  onChange: PropTypes.func,
};

export default Answer;
