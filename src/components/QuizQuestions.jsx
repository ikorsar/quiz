import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Progress from './Progress';
import AnswersList from './AnswersList';

const Section = styled.div`
  display: ${props => (props.current === props.index ? 'block' : 'none')};
`;

class QuizQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      result: ``,
      final: {
        total: null,
        correct: null,
      },
      finish: false,
    };
  }

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
            <h1>{item.title}</h1>
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
            <p>Thanks, {name}</p>
            <p>
              You responded correctly {final.correct} out of {final.total}{' '}
              questions
            </p>
          </>
        )}
      </>
    );
  }
}

QuizQuestions.propTypes = {
  questions: PropTypes.array,
  quizId: PropTypes.number,
  questionsQuantity: PropTypes.number,
  name: PropTypes.string,
};

export default QuizQuestions;
