import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Progress from './Progress';
import AnswersList from './AnswersList';
import { Title } from './Title';

const Section = styled.div`
  width: 100%;
  display: ${props => (props.current === props.index ? 'block' : 'none')};
`;

const Final = styled.p`
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  span {
    font-weight: bold;
  }

  @media screen and (min-width: 600px) {
    font-size: 24px;
    line-height: 30px;
  }
`;

class QuizQuestions extends Component {
  state = {
    current: 0,
    result: ``,
    final: {
      total: null,
      correct: null,
    },
    finish: false,
  };

  setCurrent = current => {
    this.setState({ current });
  };

  setResults = result => {
    this.setState({ result });
  };

  setFinal = final => {
    this.setState({ final, finish: true });
  };

  render() {
    const { current, result, final, finish } = this.state;
    const { questions, quizId, questionsQuantity, name } = this.props;

    return (
      <>
        {questions.map((item, i) => (
          <Section key={i.toString()} index={i} current={current}>
            <Title>{item.title}</Title>
            <AnswersList
              questionsQuantity={questionsQuantity}
              questionId={item.id}
              quizId={quizId}
              current={current}
              result={result}
              setCurrent={this.setCurrent}
              setResults={this.setResults}
              setFinal={this.setFinal}
              {...this.state}
            />
          </Section>
        ))}

        {!finish && (
          <Progress questionsQuantity={questionsQuantity} current={current} />
        )}

        {current === questionsQuantity && finish && (
          <>
            <Title>Thanks, {name}</Title>
            <Final>
              You responded correctly <span>{final.correct}</span>
              &nbsp;out&nbsp;of&nbsp;<span>{final.total}</span>&nbsp;questions
            </Final>
          </>
        )}
      </>
    );
  }
}

QuizQuestions.propTypes = {
  questions: PropTypes.array,
  quizId: PropTypes.string,
  questionsQuantity: PropTypes.number,
  name: PropTypes.string,
};

export default QuizQuestions;
