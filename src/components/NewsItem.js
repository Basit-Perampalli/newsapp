import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,author,date,description, imageUrl, newsUrl} = this.props
    return (
      <div className='my-3'>
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title+"..."}</h5>
                <p className="card-text">{description+"..."}</p>
                <p className='card-text'><small className='text-muted'>By {author?author:"Unkonwn"} on {new Date(date).toUTCString()}</small></p>
                <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
