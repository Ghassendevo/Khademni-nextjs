import React, { useRef, useState } from "react";
import { ReactDOM } from "react";
import styles from "../../styles/landing.module.css"
import 'react-slidedown/lib/slidedown.css'
import logo from "../../assets/logo.jpg"
import article from "../../assets/undraw_articles_wbpb.png"
import work from "../../assets/undraw_Working_re_ddwy.png"
import staff from "../../assets/undraw_Working_re_ddwy.png"
import { CSSTransition } from 'react-transition-group';
import { Router } from "react-router-dom";
import { useRouter } from "next/router";
const Header = () => {
    const router = useRouter();
    const respdown = useRef()
    const [resp, setResp] = useState(false)
    const [thiss, setThiss] = useState('none')
    const [border, setBorder] = useState({
        borderHome: true,
        borderAbout: false,
        borderMem: false,
        borderTeam: false,
        borderWork: false,
    })
    const show = () => {
        setResp(true)
        setThiss('block')
    }
    const close = () => {
        setResp(false)
        setThiss('none')
    }
    const setStateHome = (e) => {
        setBorder({
            borderHome: true,
            borderAbout: false,
            borderMem: false,
            borderTeam: false,
            borderWork: false,
        })
    }
    const setStateAbout = (e) => {
        setBorder({
            borderHome: false,
            borderAbout: true,
            borderMem: false,
            borderTeam: false,
            borderWork: false,
        })
    }
    const setStateMem = (e) => {
        setBorder({
            borderHome: false,
            borderAbout: false,
            borderMem: true,
            borderTeam: false,
            borderWork: false,
        })
    }
    const setStateTeam = (e) => {
        setBorder({
            borderHome: false,
            borderAbout: false,
            borderMem: false,
            borderTeam: true,
            borderWork: false,
        })
    }
    const setStateWork = (e) => {
        setBorder({
            borderHome: false,
            borderAbout: false,
            borderMem: false,
            borderTeam: false,
            borderWork: true,
        })
    }
    return (
        <header className={styles.header}>
            <div className={styles.inHeader}>
                <div>
                <h3  style={{color:'#0070f3',cursor:'pointer'}}>Khadmen<a style={{textDecoration:'underline'}}>i</a></h3>
                </div>
                <div className="inHeaderArrrow">
                  
                </div>
                <div className={styles.navs}>
                    <div onClick={setStateHome}>
                        <a href="#home" className={border.borderHome ? styles.navS : styles.navA}>Home</a>
                        {
                            border.borderHome ? (
                                <div className={styles.borderWork}>
                                </div>
                            ) : (
                                <div className={styles.bordderWork}>
                                </div>
                            )
                        }
                    </div>
                    <div onClick={setStateAbout}>
                        <a href="#about" className={border.borderAbout ? styles.navS : styles.navA}>About us</a>
                        {
                            border.borderAbout ? (
                                <div className={styles.borderWork}>
                                </div>
                            ) : (
                                <div className={styles.bordderWork}>
                                </div>
                            )
                        }
                    </div>
                    <div onClick={setStateMem}>
                        <a href="#members" className={border.borderMem ? styles.navS : styles.navA}>Members</a>
                        {
                            border.borderMem ? (
                                <div className={styles.borderWork}>
                                </div>
                            ) : (
                                <div className={styles.bordderWork}>
                                </div>
                            )
                        }
                    </div>
                    <div onClick={setStateTeam}>
                        <a href="#team" className={border.borderTeam ? styles.navS : styles.navA} onClick={setStateTeam}>Our Team</a>
                        {
                            border.borderTeam ? (
                                <div className={styles.borderWork}>
                                </div>
                            ) : (
                                <div className={styles.bordderWork}>
                                </div>
                            )
                        }
                    </div>
                    <div onClick={setStateWork}>
                        <a href="#workshop" className={border.borderWork ? styles.navS : styles.navA} onClick={setStateWork}>Workshop</a>
                        {
                            border.borderWork ? (
                                <div className={styles.borderWork}>
                                </div>
                            ) : (
                                <div className={styles.bordderWork}>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <a onClick={() => router.push('/')} className={styles.touch} href="#contactus">
                            <p>Get in Touch </p>
                        </a>
                    </div>
                </div>
            </div>
            <CSSTransition
                in = {true}
                timeout={100}
                classNames="fadein"
                unmountOnExit
            >
                <div className={styles.RespElement} style={{display:thiss}} ref={respdown}>
                    <div className={styles.divRes}>
                        <img src={logo} style={{ marginLeft: '10px', width: "20px" }} />
                        <a onClick={setStateHome} id="respHome" className={border.borderHome ? styles.respnavs : styles.respnava} href="#home">Home</a>
                    </div>
                    <div className={styles.divRes}>
                        <img src={article} style={{ marginLeft: '10px', width: "20px" }} />
                        <a onClick={setStateAbout} className={border.borderAbout ? styles.respnavs : styles.respnava} href="#about">About</a>
                    </div>
                    <div className={styles.divRes}>
                        <img src={work} style={{ marginLeft: "10px", width: "20px" }} />
                        <a onClick={setStateMem} className={border.borderMem ? styles.respnavs :styles.respnava} href="#member">Members</a>
                    </div>
                    <div className={styles.divRes}>
                        <img src={staff} style={{ marginLeft: "10px", width: "20px" }} alt="" />
                        <a onClick={setStateTeam} id="respStaff" className={border.borderTeam ? styles.respnavs : styles.respnava} href="#team">Our Team</a>
                    </div>
                    <div className={styles.divRes}>
                        <img src={work} style={{ marginLeft: "10px", width: "20px" }} alt="" />
                        <a onClick={setStateWork} id="respWork" className={border.borderWork ? styles.respnavs : styles.respnava} href="#workshop">Workshop</a>
                    </div>
                    <div className={styles.divRes}>
                        <a style={{ color: "rgba(0, 0, 0, 0.781)" }} id="respHome" className={styles.respnava} href="#contactus">Take To touch</a>
                    </div>
                </div>
            </CSSTransition>

        </header>
    )
}
export default Header;