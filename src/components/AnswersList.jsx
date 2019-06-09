import React, { Component } from 'react';
import axios from 'axios';

import Answer from './Answer';

const apiUrl = `https://printful.com/test-quiz.php?action=answers&quizId=`;

class OptionsList extends Component {
  state = {
    list: [],
    final: null,
  };

  componentDidMount() {
    const { questionId, quizId } = this.props;

    axios.get(`${apiUrl}${quizId}&questionId=${questionId}`).then(res => {
      const list = res.data;
      this.setState({ list });
    });
  }

  handleChange = e => {
    // e.preventDefault();
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
      axios
        .get(
          `https://printful.com/test-quiz.php?action=submit&quizId=${quizId}${result}`
        )
        .then(res => {
          const final = res.data;
          setFinal(final);
        });
    }
  };

  render() {
    const { list, final } = this.state;
    const { questionsQuantity } = this.props;

    return (
      <div>
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
      </div>
    );
  }
}

export default OptionsList;
