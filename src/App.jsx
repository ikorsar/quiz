import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import QuizQuestions from './components/QuizQuestions';
import Loader from './components/Loader';
import { Title } from './components/Title';
import Button from './components/Button';

const apiUrl = `https://printful.com/test-quiz.php?action=`;

const Main = styled.section`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 30px;
  height: 56px;
  border-radius: 4.5px;
  border-width: 2px;
  border-style: solid;
  background-color: #ffffff;
  font-size: 18px;
  line-height: 52px;
  max-width: 500px;

  @media screen and (min-width: 600px) {
    padding: 0 30px;
    height: 86px;
    border-radius: 6px;
    border-width: 3px;
    font-size: 24px;
    line-height: 80px;
    margin-bottom: 20px;
  }
`;

class App extends Component {
  state = {
    start: false,
    isLoading: false,
    name: '',
    quizzes: [],
    quizId: null,
    questions: [],
  };

  componentDidMount() {
    axios.get(`${apiUrl}quizzes`).then(res => {
      const quizzes = res.data;
      this.setState({ quizzes });
    });
  }

  handleUserInput = e => {
    const { value } = e.target;

    this.setState({ name: value });
  };

  handleChange = e => {
    this.setState({ quizId: e.target.value });
  };

  handleClick = () => {
    const { quizId } = this.state;

    axios
      .get(`${apiUrl}questions&quizId=${quizId}`)
      .then(res => {
        const questions = res.data;
        this.setState({ questions, isLoading: false });
      })
      .then(this.setState({ start: true, isLoading: true }));
  };

  render() {
    const { isLoading } = this.state;
    const { quizzes, questions, name, quizId, start } = this.state;

    return (
      <Main role='main'>
        {isLoading && <Loader />}
        {!start && (
          <>
            <Title>Quiz</Title>
            <Input
              type='text'
              placeholder='What is your name?'
              onChange={this.handleUserInput}
              value={name}
              required
            />
            <select disabled={!name} onChange={this.handleChange}>
              <option>Please choose quiz</option>
              {quizzes.map((item, i) => (
                <option key={i.toString()} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <Button
              title='start'
              text='Start'
              disabled={!quizId}
              onClick={this.handleClick}
            />
          </>
        )}
        {start && (
          <QuizQuestions
            questions={questions}
            questionsQuantity={questions.length}
            quizId={quizId}
            {...this.state}
          />
        )}
      </Main>
    );
  }
}

export default App;
