import React from 'react';
import { connect } from 'react-redux';

class NewsItems extends React.Component {
  render() {
    const { news } = this.props;
    const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });
    return (
      <>
        <h2>AppID: {news.appid}</h2>
        {
          news.newsitems.map((x, i) =>
            <div className='news-item' key={i}>
              <h1>{x.title}</h1>
              <p>Author: {x.author}</p>
              <a href={x.url}>View post on steam</a><br />
              <div>{
                renderHTML(
                  x.contents
                    .replace(/\[/g, '<')
                    .replace(/\]/g, '>')
                    .replace(/<a/g, '<a target="_blank" ')
                    // .replace(/<list>/g, '<ul>')
                    // .replace(/<*>/g, '<li>')
                    // .replace(/<\/list>/g, '</list>')
                )
              }</div>
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