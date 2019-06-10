import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import arrow from './down-icon.svg';

const Dropdown = styled.button`
  width: 100%;
  max-width: 500px;
  font-weight: 500;
  text-align: left;
  height: 56px;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: #000;
  background-color: #ffffff;
  padding: 0 30px;
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
  font-family: 'Raleway', Helvetica Neue, Helvetica, Arial, sans-serif;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media screen and (min-width: 600px) {
    padding: 0 30px;
    height: 86px;
    border-radius: 6px;
    border-width: 3px;
    font-size: 24px;
    line-height: 80px;
    margin-bottom: 40px;
  }
`;

const Arrow = styled.img`
  width: 22px;
  height: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
`;

const Select = styled.select`
  opacity: 0;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:disabled,
  &:disabled:hover,
  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
  }
`;

class DropdownSelect extends Component {
  render() {
    const { className, quizName, quizzes, onChange, disabled } = this.props;

    return (
      <Dropdown className={className}>
        {!quizName ? 'Please choose quiz' : quizName}
        <Arrow src={arrow} />
        <Select disabled={disabled} onChange={onChange}>
          <option>Please choose quiz</option>
          {quizzes.map((item, i) => (
            <option key={i.toString()} value={item.id} name={item.title}>
              {item.title}
            </option>
          ))}
        </Select>
      </Dropdown>
    );
  }
}

DropdownSelect.propTypes = {
  quizzes: PropTypes.array,
  className: PropTypes.string,
  quizName: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DropdownSelect;
