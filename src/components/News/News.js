import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewsItems from '../NewsItems/NewsItems';

class News extends Component {
  state = {
    id: '',
  }

  getInfo = () => {
    this.props.dispatch({ type: 'FETCH_NEWS', payload: this.state.id });
    this.setState({ id: '' });
  }

  setId = (e) => this.setState({ id: e.target.value });

  render() {
    const { news } = this.props;
    return (
      <>
        <input onChange={this.setId} type='number' value={this.state.id} />
        <button onClick={this.getInfo}>Get Game News!</button><br />
        {news === null ? <h3>Enter an app ID above to get the latest news on a game!</h3> : <NewsItems />}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news,
  }
}

export default connect(mapStateToProps)(News);