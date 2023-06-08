/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';
import SongCard from './SongCard';

import 'swiper/swiper-bundle.css';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

function SongCarousel({
  music, images, CDN_MUSIC_URL, CDN_IMAGES_URL,
}) {
  // TODO: axios.get from db to get song and image urls all in one array
  // [{songURL, imageURL}, {}, etc]

  const swiperRef = useRef(null);

  const handleNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  if (music.length !== 0) {
    return (
      <div className="container">
        <Swiper
          effect="coverflow"
          grabCursor="true"
          centeredSlides="true"
          loop="true"
          slidesPerView="3"
          spaceBetween="5"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 5,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {music.map((song, i) => (
            <SwiperSlide >
              <SongCard
                song={song}
                image={images[i]}
                CDN_MUSIC_URL={CDN_MUSIC_URL}
                CDN_IMAGES_URL={CDN_IMAGES_URL}
                key={i}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow" onClick={handlePrevSlide}>
            <ion-icon name="arrow-back-outline" />
          </div>
          <div className="swiper-button-next slider-arrow" onClick={handleNextSlide}>
            <ion-icon name="arrow-forward-outline" />
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
    );
  }
}
export default SongCarousel;
