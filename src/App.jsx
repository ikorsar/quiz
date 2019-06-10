import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import QuizQuestions from './components/QuizQuestions';
import Loader from './components/Loader';
import { Title } from './components/Title';
import DropdownSelect from './components/DropdownSelect';
import Button from './components/Button';

import { apiUrl } from './components/api';

const Main = styled.section`
  width: 100%;
  max-width: 1100px;
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 20px;
  height: 56px;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: #000;
  background-color: #ffffff;
  font-size: 18px;
  line-height: 52px;
  max-width: 500px;
  margin-bottom: 20px;
  font-family: 'Raleway', Helvetica Neue, Helvetica, Arial, sans-serif;

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

class App extends Component {
  state = {
    start: false,
    isLoading: false,
    name: '',
    quizzes: [],
    quizId: '',
    quizName: '',
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
    const index = e.nativeEvent.target.selectedIndex;

    this.setState({
      quizId: e.target.value,
      quizName: e.nativeEvent.target[index].text,
    });
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
    const {
      isLoading,
      quizzes,
      questions,
      name,
      quizId,
      start,
      quizName,
    } = this.state;

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
            <DropdownSelect
              className={!name ? 'disabled' : ''}
              onChange={this.handleChange}
              disabled={!name}
              quizName={quizName}
              quizzes={quizzes}
            />
            <Button
              title='start'
              text='Start'
              disabled={!quizId || !name}
              onClick={this.handleClick}
              className={quizId ? 'animation' : ''}
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
