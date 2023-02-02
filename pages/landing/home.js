import React from "react";
import { ReactDOM, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import styles from "../../styles/landing.module.css"
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import und from '../../assets/undraw_articles_wbpb.png'
import und2 from '../../assets/undraw_Statistic_chart_re_w0pk.png'
import und3 from '../../assets/undraw_Working_re_ddwy.png'
import { FaLayerGroup } from "react-icons/fa";
import { Zoom, Fade , Bounce } from 'react-reveal';
import Image from "next/image";
const Home = () => {
    return (
        <>
            <div className={styles.backImg}>
                <p style={{ visibility: 'hidden' }}>s</p>
            </div>
            <Swiper className={styles.swiper} id="home"
                modules={[Pagination, Navigation, EffectFade, Autoplay]}
                navigation={true}
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                speed={1000}
                autoplay={{ delay: 3000 }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide className={styles.slideOne}>
                    <div className={styles.insideSwiper}>
                        <div className={styles.inswiper} >
                            <Fade left>
                                <p id="p1">  You are not alone</p>
                                <h1 style={{ fontSize: '50px' }}> Changing lives through learning and inventing </h1>
                                <p>"Learn as though you would never be able to master it; hold it as though you would be in fear of losing it." Confucius </p>
                                <div className={styles.btn_main}>
                                    <div className={styles.btnT}>
                                        <p>Get a touch </p>
                                        <div className={styles.hovt}>
                                            <FaLayerGroup />
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        </div>
                        <div className={styles.inswiper2}>
                            <Image  src={und} width={490} height={480} />
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.slideOne}>
                    <div className={styles.insideSwiper}>
                        <div className={styles.inswiper} data-aos="fade-up"
                            data-aos-delay="50"
                            data-aos-duration="800">
                            <p id="p1">We supporting you</p>
                            <h1> W'll help you to find the best solution </h1>
                            <p>"Learn as though you would never be able to master it; hold it as though you would be in fear of losing it." Confucius</p>
                            <div className={styles.btn_main}>
                                <div className={styles.btnT}>
                                    <p>Get a touch </p>
                                    <div className={styles.hovt}>
                                        <FaLayerGroup />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.inswiper2}>
                        <Image  src={und2} width={490} height={480} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.slideOne}>
                    <div className={styles.insideSwiper}>
                        <div className={styles.inswiper}>
                            <p id="p1">You are not alone</p>
                            <h1>  Changing lives through learning and inventing </h1>
                            <p> "Learn as though you would never be able to master it; hold it as though you would be in fear of losing it." Confucius</p>
                            <div className={styles.btn_main}>
                                <div className={styles.btnT}>
                                    <p>Get a touch </p>
                                    <div className={styles.hovt}>
                                        <FaLayerGroup />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.inswiper2}>
                        <Image  src={und3} width={560} height={400} />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper >
        </>
    )
}
export default Home;