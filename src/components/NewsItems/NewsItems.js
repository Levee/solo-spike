import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewsItems extends Component {
  render() {
    const { news } = this.props;
    return (
      <>
        <h2>AppID: {news.appid}</h2>
        {
          news.newsitems.map((x, i) =>
            <div className='news-item' key={i}>
              <h1>{x.title}</h1>
              <p>Author: {x.author}</p>
              <a href={x.url}>View post on steam</a>
              <p>{x.contents}</p>
            </div>
          )
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news
  }
}

export default connect(mapStateToProps)(NewsItems);