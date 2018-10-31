import React, { Component } from 'react'

export default class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      carouselOffset: 0,
      images: [],
      blurbs: [],
      summary: null,
      numSlides: 0,
      slideDots: [],
      slideWidth: null
    }
    this.arrowHandler = this.arrowHandler.bind(this)
  }

  componentDidMount() {
    const piece = this.props.data,
      imgPath = "/img/portfolio/" + piece.slug + "/img/",
      summary = piece.summary,
      numSlides = piece.blurbs.length
    let slideWidth,
      images = [],
      blurbs = []

      for(let i=1; i<=numSlides; i++) {
        images.push(imgPath + `${i}.jpg`)
        blurbs.push(piece.blurbs[i-1])
      }

      if (this.props.size === 'md') {
        slideWidth = 480
      } else if (this.props.size === 'sm') {
        slideWidth = 360
      } else {
        slideWidth = 745
      }

      this.setState({images, blurbs, summary, numSlides, slideWidth, slideDots: new Array(numSlides+1).join('0').split('')})
      console.log(this.state.data)

    }

    arrowHandler(side) {
      if (side === "left") {
        (this.state.carouselOffset < 0) ?
          this.setState({carouselOffset: this.state.carouselOffset + this.state.slideWidth})
        :
          this.setState({carouselOffset: (this.state.numSlides-1)*-this.state.slideWidth})
      } else if (side === "right") {
        (this.state.carouselOffset > (this.state.numSlides-1)*-this.state.slideWidth) ?
          this.setState({carouselOffset: this.state.carouselOffset - this.state.slideWidth})
        :
          this.setState({carouselOffset: 0})
      }
    }

  render() {
      const cursor = this.state.data.url ? "pointer" : "default"
      let carouselStyle = {
        width: this.state.numSlides*this.state.slideWidth + "px",
        marginLeft: this.state.carouselOffset,
        cursor: cursor
      }

      const carousel = this.state.images.map((img,i) => {
          return (
            <div className="carousel__item" key={`slide${i}`}>
             <img src={img} alt={this.state.blurbs[i]} />
             <div className="carousel__caption">
               <p>{this.state.blurbs[i]}</p>
             </div>
           </div>
         )
       })

       const slideDots = this.state.slideDots.map((dot, i) => {
         return (
           <div onClick={()=>this.setState({carouselOffset: (i*this.state.slideWidth*-1)})}
            className={"carousel__dot" + (this.state.carouselOffset/this.state.slideWidth*-1 === i ? " current" : "")}
            key={`dot${i}`}>
           </div>
        )
      })

      return (
        <div className="carousel__wrap">
          <div className="carousel__arrow--left" onClick={() => this.arrowHandler("left") }><span>&lsaquo;</span></div>
          <div className="carousel__arrow--right" onClick={() => this.arrowHandler("right") }><span>&rsaquo;</span></div>

          <div className="carousel__dots__wrap">
            <div className="carousel__dots">
              {slideDots}
            </div>
          </div>

          <div className="carousel" style={carouselStyle} onClick={() => this.state.data.url ? window.open(this.state.data.url) : null}>
            {carousel}
          </div>
        </div>
      );
  }
}
