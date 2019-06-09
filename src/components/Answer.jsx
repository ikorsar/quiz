import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Answer extends PureComponent {
  render() {
    const { title, id, onChange } = this.props;

    return (
      <label htmlFor={title}>
        <input
          type='radio'
          id={id}
          name='question'
          onChange={onChange}
          value={title}
        />
        <span>{title}</span>
      </label>
    );
  }
}

Answer.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  onChange: PropTypes.func,
};

export default Answer;
