import { FaLaptopCode, FaFillDrip, FaBlog, FaUserSecret } from "react-icons/fa";
import { Zoom, Fade, Bounce } from 'react-reveal';
import styles from "../../styles/landing.module.css"
const Depar = () => {
    return (
        <div className={styles.depar} id="depar">
            <div className={styles.inDep}>
                <p id="pp1">Main Services</p>
                <h1> Our Main Services</h1>
                <p>In this app we care about web development and software development. Our formators and senior members will guide you </p>
                <Zoom>
                    <div className={styles.fourDep}>
                        <div className={[styles.Depar, styles.deph].join(" ")}>
                            <div id="dep" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <div id="ped" style={{
                                    width: '85%',
                                    height: '250px',
                                    marginTop: '5px'
                                }}>
                                    <div className={styles.IconH}>
                                        <FaLaptopCode size={25} color='white' />
                                    </div>
                                    <h3>Jobs</h3>
                                    <p className={styles.shit}>In this department we care about web development and software development.</p>
                                </div>
                            </div>
                        </div>
                        <div className={[styles.Depar, styles.deph].join(" ")}>
                            <div id="dep" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <div id="ped" style={{
                                    width: '85%',
                                    height: '250px',
                                    marginTop: '5px'
                                }}>
                                    <div className={styles.IconH}>
                                        <FaFillDrip size={25} color='white' />
                                    </div>
                                    <h3>Bids</h3>
                                    <p className="shit">In this department we care about web development and software development.</p>
                                </div>
                            </div>
                        </div>
                        <div className={[styles.Depar, styles.deph].join(" ")}>
                            <div id="dep" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <div id="ped" style={{
                                    width: '85%',
                                    height: '250px',
                                    marginTop: '5px'
                                }}>
                                    <div className={styles.IconH}>
                                        <FaBlog size={25} color='white' />
                                    </div>
                                    <h3>Spons</h3>
                                    <p className="shit">In this department we care about web development and software development.</p>
                                </div>
                            </div>
                        </div>
                        <div className={[styles.Depar, styles.deph].join(" ")}>
                            <div id="dep" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <div id="ped"  style={{
                                    width: '85%',
                                    height: '250px',
                                    marginTop: '5px'
                                }}>
                                    <div className={styles.IconH}>
                                        <FaUserSecret size={25} color='white' />
                                    </div>
                                    <h3>Security</h3>
                                    <p className={styles.shit}>In this department we care about web development and software development.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Zoom>
            </div>

        </div>

    )
}
export default Depar;