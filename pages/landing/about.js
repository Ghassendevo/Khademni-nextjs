import img from '../../assets/undraw_design_inspiration_re_tftx.svg'
import { FaCheck, FaAngleRight, FaStreetView, FaUserCog, FaChalkboardTeacher } from 'react-icons/fa'
import Fade from 'react-reveal/Fade';
import backI from '../../assets/geometrical.png'
import mission from '../../assets/undraw_game_world_re_e44j.svg'
import out from '../../assets/rec.png'
import styles from "../../styles/landing.module.css"
import Image from 'next/image';
const About = () => {
    return (
        <div className={styles.about} id='about'>
            <div className={styles.first_about}>
                <div className={styles.in_about1}>
                    <Image src={img} width="500" />
                </div>
                <div className={styles.in_about2}>
                    <Fade right>
                        <p id='about_p1'> About us</p>
                        <h1>Short story about Khademniapp</h1>
                    </Fade>
                    <Fade up>
                        <p id='about_p2'> Khademni is an app , sharp developpers working together to create an amazing content and make sure the world sees it.</p>

                        <div>
                            <div className={styles.forh}>
                                <div class={styles.linkH}>
                                    <FaCheck className={styles.facheck} style={{ color: '#0070f3' }} />
                                </div>
                                <div className={styles.an}>
                                    Communication Skills to getting in touch
                                </div>
                            </div>
                            <div className={styles.forh}>
                                <div class={styles.linkH}>
                                    <FaCheck className={styles.facheck} style={{ color: '#0070f3' }} />
                                </div>
                                <div className={styles.an}>
                                    Share knowledge
                                </div>
                            </div>
                            <div className={styles.forh}>
                                <div class={styles.linkH}>
                                    <FaCheck className={styles.facheck} style={{ color: '#0070f3' }} />
                                </div>
                                <div className={styles.an}>
                                    Create events and workshops
                                </div>
                            </div>
                            <div className={styles.forh}>
                                <div class={styles.linkH}>
                                    <FaCheck className={styles.facheck} style={{ color: '#0070f3' }} />
                                </div>
                                <div className={styles.an}>
                                    Better information
                                </div>
                            </div>
                            <div className={styles.learnmore}>
                                <p>LEARN MORE</p>
                                <div className={styles.ilearn}>
                                    <FaAngleRight style={{ color: 'black', fontSize: '19px' }} />
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>

            </div>
            <div className={styles.second_about}>
                <div className={styles.in_aboutt2}>
                    <Fade left>
                        <p id='aboup2'>Our Mission & Vision</p>
                        <h1>  Better Information and knowledge</h1>
                    </Fade>
                    <Fade up>
                        <p>"Learn as though you would never be able to master it; hold it as though you would be in fear of losing it."</p>
                        <div id='inabout' style={{
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}>
                            <div className={styles.moin}>
                                <div>
                                    <div className={styles.headerinf}>
                                        <FaStreetView id='i' style={{ color: '#0070f3', fontSize: '30px' }} />
                                    </div>
                                    <h4 style={{ fontFamily: 'Mulish, sans-serif', letterSpacing: '0.5px', marginTop: '20px', textTransform: 'uppercase' }}>
                                        Professional satff</h4>
                                    <p style={{ fontFamily: 'Mulish, sans-serif', color: '#7d7d7d', lineHeight: '1.6em', letterSpacing: '0.5px', marginTop: '-10px' }}>
                                        The pain itself is a lot of pain, it is the main focus.</p>
                                </div>
                            </div>
                            <div className={styles.moin}>
                                <div>
                                    <div className={styles.headerinf}>
                                        <FaUserCog id='i' style={{ color: '#0070f3', fontSize: '30px' }} />
                                    </div>
                                    <h4 style={{ fontFamily: 'Mulish, sans-serif', letterSpacing: '0.5px', marginTop: '20px', textTransform: 'uppercase' }}>
                                        Professional satff</h4>
                                    <p style={{ fontFamily: 'Mulish, sans-serif', color: '#7d7d7d', lineHeight: '1.6em', letterSpacing: '0.5px', marginTop: '-10px' }}>
                                        The pain itself is a lot of pain, it is the main focus.</p>
                                </div>
                            </div>
                            <div className={styles.moin}>
                                <div>
                                    <div className={styles.headerinf}>
                                        <FaChalkboardTeacher id='i' style={{ color: '#0070f3', fontSize: '30px' }} />
                                    </div>
                                    <h4 style={{ fontFamily: 'Mulish, sans-serif', letterSpacing: '0.5px', marginTop: '20px', textTransform: 'uppercase' }}>
                                        Professional satff</h4>
                                    <p style={{ fontFamily: 'Mulish, sans-serif', color: '#7d7d7d', lineHeight: '1.6em', letterSpacing: '0.5px', marginTop: '-10px' }}>
                                        The pain itself is a lot of pain, it is the main focus.</p>
                                </div>
                            </div>
                            <div className={styles.moin}>
                                <div>
                                    <div className={styles.headerinf}>
                                        <FaUserCog id='i' style={{ color: '#0070f3', fontSize: '30px' }} />
                                    </div>
                                    <h4 style={{ fontFamily: 'Mulish, sans-serif', letterSpacing: '0.5px', marginTop: '20px', textTransform: 'uppercase' }}>
                                        Professional satff</h4>
                                    <p style={{ fontFamily: 'Mulish, sans-serif', color: '#7d7d7d', lineHeight: '1.6em', letterSpacing: '0.5px', marginTop: '-10px' }}>
                                        The pain itself is a lot of pain, it is the main focus.</p>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
                <div id='forInImg'>
                    <Image src={mission} width="500" />
                </div>
            </div >
        </div >
    )
}
export default About;