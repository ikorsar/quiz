import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import { getAnswersUrl, setAnswersUrl } from './api';
import Answer from './Answer';

const AnswersListSt = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

class AnswersList extends Component {
  state = {
    list: [],
    final: null,
  };

  componentDidMount() {
    const { questionId, quizId } = this.props;

    axios
      .get(`${getAnswersUrl}${quizId}&questionId=${questionId}`)
      .then(res => {
        const list = res.data;
        this.setState({ list });
      });
  }

  handleChange = e => {
    const {
      setCurrent,
      current,
      setResults,
      result,
      questionId,
      questionsQuantity,
      quizId,
      setFinal,
    } = this.props;

    const answerId = e.target.id;
    const answer = `&answers[]=${questionId}&answers[]=${answerId}`;

    setResults(result + answer);

    setCurrent(current + 1);

    if (current === questionsQuantity - 1) {
      axios.get(`${setAnswersUrl}${quizId}${result}`).then(res => {
        const final = res.data;
        setFinal(final);
      });
    }
  };

  render() {
    const { list, final } = this.state;
    const { questionsQuantity } = this.props;

    return (
      <AnswersListSt>
        {list.map((item, i) => (
          <Answer
            questionsQuantity={questionsQuantity}
            key={i.toString()}
            title={item.title}
            id={item.id}
            onChange={this.handleChange}
            {...this.props}
          />
        ))}
        {final}
      </AnswersListSt>
    );
  }
}

AnswersList.propTypes = {
  setCurrent: PropTypes.func,
  setResults: PropTypes.func,
  setFinal: PropTypes.func,
  questions: PropTypes.array,
  questionId: PropTypes.number,
  quizId: PropTypes.string,
  current: PropTypes.number,
  result: PropTypes.string,
  questionsQuantity: PropTypes.number,
  name: PropTypes.string,
};

export default AnswersList;
