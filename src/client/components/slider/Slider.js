import React, { Component } from 'react';
import styles from './Slider.module.css';
import { Carousel, Icon } from 'antd';
import banner1 from '../../../assets/images/1.png';
import banner2 from '../../../assets/images/2.png';
import banner3 from '../../../assets/images/3.png';
import banner4 from '../../../assets/images/banner4.jpg';
import banner5 from '../../../assets/images/4.png';

class Slider extends Component {
  constructor(props){
    super(props);
    this.carousel = React.createRef();
  }

  next = () => {
    this.carousel.next();
  }

  previous = () => {
    this.carousel.prev();
  }

  render() {
    return (
      <div className={`main-slider ${styles.mainSlider}`}>
        <Icon type="left-circle" className={styles.previousBtn} onClick={this.previous} />
        <Carousel className={styles.carouselSlide} autoplay effect="fade" ref={node => (this.carousel = node)}>
          <div className={styles.sliderItem}>
            <img src={banner5} alt="" />
          </div>
          <div className={styles.sliderItem}>
            <img src={banner1} alt="" />
          </div>
          <div className={styles.sliderItem}>
            <img src={banner2} alt="" />
          </div>
          <div className={styles.sliderItem}>
            <img src={banner3} alt="" />
          </div>
          <div className={styles.sliderItem}>
            <img src={banner4} alt="" />
          </div>
        </Carousel>
        <Icon type="right-circle" className={styles.nextBtn} onClick={this.next} />
      </div>
    )
  }
}

export default Slider;