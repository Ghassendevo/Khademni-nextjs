import React from "react";
import styles from "../../styles/Khademni.module.css";
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineWorkOutline } from 'react-icons/md'; AiOutlineSetting
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from "next/router";
const KhademniHeader = ({ select="black", fori }) => {
    const router = useRouter();
   const navigateToPost=()=>{
        router.push('/khademni/info');
   }
   const navigateTohome = ()=>{
    router.push('/khademni')
   }
   const logout = ()=>{
    localStorage.removeItem("session");
    router.push('/login')
   }
   const navigateToSetting = () =>{
    router.push('/khademni/setting')
   }
    return (
        <div className={styles.header}>
            <h3 style={{color:'#0070f3'}}>Khadmen<a style={{textDecoration:'underline'}}>i</a></h3>
            <div className={styles.inheader}>
                <AiOutlineHome onClick={navigateTohome} color={fori=="home"?"#0070f3":"black"} cursor="pointer" size={25} />
                <MdOutlineWorkOutline onClick={navigateToPost} color={fori=="job"?"#0070f3":"black"} cursor="pointer" size={25} />
                <AiOutlineSetting onClick={navigateToSetting} color={fori=="setting"?"#0070f3":"black"} cursor="pointer" size={25} />
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    )
}
export default KhademniHeader;