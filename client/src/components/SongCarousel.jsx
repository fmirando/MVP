/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import AudioPlayer from 'react-audio-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';
import SongCard from './SongCard';

import 'swiper/swiper-bundle.css';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

function SongCarousel({ music, CDN_MUSIC_URL, CDN_IMAGES_URL }) {
  if (music.length !== 0) {
    return (
      <div className="container">
        <h1>Song Card Carousel</h1>
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {music.map((song) => (
            <SwiperSlide>
              <SongCard
                key={song.id}
                song={song}
                CDN_MUSIC_URL={CDN_MUSIC_URL}
                CDN_IMAGES_URL={CDN_IMAGES_URL}
              />
            </SwiperSlide>
          ))}

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline" />
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline" />
            </div>
            <div className="swiper-pagination" />
          </div>
        </Swiper>
      </div>

    );
  }
}
export default SongCarousel;
