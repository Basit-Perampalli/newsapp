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
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`
        this.setState({
            loading:true
        })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parseData = await data.json()
        console.log(parseData);
        this.props.setProgress(70)
        this.setState({
            articles: parseData.articles,
             totalResults:parseData.totalResults,
             loading:false
            })
        this.props.setProgress(100)
    }

  render() {
    return (
      <div>
        <div className="container" style={{padding:"4rem 0"}}>
            <h1 className='text-center'>NewsMonkey - Top {this.props.category} Headlines</h1>
            {/* {this.state.loading&&<Spinner/>} */}


                
            <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                    <NewsItem  title={!element.title?"":element.title} author={element.author} date={element.publishedAt} description={!element.description?"":element.description} imageUrl={element.urlToImage?element.urlToImage:"https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"} newsUrl={element.url}/>
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
