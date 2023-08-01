import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    
    static defaultProps = {
        country: "in",
        pageSize:8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    nextClick = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=73f6654b07764b9892139030f88c1af5&pageSize=${this.props.pageSize}&page=${this.state.page+1}`
        this.setState({
            loading:true
        })
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            loading: false,
            page:this.state.page+1,
            articles: parseData.articles,
            
        })
    }
    prevClick = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=73f6654b07764b9892139030f88c1af5&pageSize=${this.props.pageSize}&page=${this.state.page-1}`
        this.setState({
            loading:true
        })
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            loading:false,
            page:this.state.page-1,
            articles: parseData.articles,
        })
    }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=73f6654b07764b9892139030f88c1af5&pageSize=${this.props.pageSize}&page=${this.state.page+1}`
        this.setState({
            loading:true
        })
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            loading: false,
            articles: this.state.articles.concat(parseData.articles) ,
            page: this.state.page+1
        })
      };

    constructor(props){
        super(props)
        console.log("Hello I am consstructor from news component");
        this.state = {
            articles: [],
            page:1,
            loading: false,
            totalResults : 0
        }
        document.title= `${this.props.category} - NewsMokey`
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=73f6654b07764b9892139030f88c1af5&pageSize=${this.props.pageSize}&page=${this.state.page}`
        this.setState({
            loading:true
        })
        let data = await fetch(url)
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
            articles: parseData.articles,
             totalResults:parseData.totalResults,
             loading:false
            })
    }

  render() {
    return (
      <div>
        <div className="container my-3">
            <h1 className='text-center'>NewsMonkey - Top {this.props.category} Headlines</h1>
            {/* {this.state.loading&&<Spinner/>} */}


                
            <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                    <NewsItem  title={!element.title?"":element.title} author={element.author} date={element.publishedAt} description={!element.description?"":element.description} imageUrl={element.urlToImage?element.urlToImage:"data:image/jpeg;base64,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"} newsUrl={element.url}/>
                </div>
            })}
            </div>
            <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length!==this.state.totalResults} loader={<Spinner/>}></InfiniteScroll>
        </div>
      </div>
    )
}
}

export default News
