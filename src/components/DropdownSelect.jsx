import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DropdownSelectSt = styled.div`
  border: none;
  background-color: transparent;
  padding: 0;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Choosen = styled.span`
  font-size: 18px;
  line-height: 24px;
  color: #000;
  text-align: center;
  font-weight: 500;
  height: 34px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.25);
  width: 100%;
  span {
    color: rgba(0, 0, 0, 0.5);
  }

  &:hover {
    color: #000;
  }

  @media screen and (min-width: 600px) {
    font-size: 24px;
    line-height: 30px;
    height: 48px;
  }
`;

const SelectInner = styled.select`
  opacity: 0;
  position: absolute;
  left: 0;
  width: 100%;
  cursor: pointer;
  padding: 0;
  bottom: -3px;
  top: 0;
`;

class DropdownSelect extends Component {
  render() {
    const { list, placeholder, disabled, onChange, name } = this.props;

    return (
      <DropdownSelectSt list={list}>
        {name === '' && (
          <Choosen>
            <span>{placeholder}</span>
          </Choosen>
        )}
        {name !== '' && <Choosen>{name}</Choosen>}
        <SelectInner name={name} onChange={onChange} disabled={disabled}>
          {list.map((item, i) => (
            <option key={i.toString()} value={item.id} name={item.title}>
              {item.title}
            </option>
          ))}
        </SelectInner>
      </DropdownSelectSt>
    );
  }
}

DropdownSelect.propTypes = {
  list: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default DropdownSelect;
