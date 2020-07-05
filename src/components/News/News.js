import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewsItems from '../NewsItems/NewsItems';

class News extends Component {
  state = {
    name: '',
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_ALL_GAMES' });
  }

  getGameId = (input) => {
    const { games } = this.props;
    for(let i = 0; i < games.length; i++) {
      if(input === games[i].name || Number(input) === games[i].appid) {
        return games[i].appid;
      }
    }
  }

  getInfo = () => {
    this.props.dispatch({ type: 'FETCH_NEWS', payload: this.getGameId(this.state.name) });
    this.setState({ name: '' });
  }

  setName = (e) => this.setState({ name: e.target.value });

  render() {
    const { news } = this.props;
    return (
      <>
        <input onChange={this.setName} type='text' value={this.state.name} />
        <button onClick={this.getInfo}>Get Game News!</button><br />
        {news === null ? <h3>Enter an app ID above to get the latest news on a game!</h3> : <NewsItems />}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    news: state.news,
  }
}

export default connect(mapStateToProps)(News);