import React, { useEffect } from "react";
import styles from "../../styles/Khademni.module.css";
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineWorkOutline } from 'react-icons/md'; AiOutlineSetting
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import {BiLogOutCircle} from "react-icons/bi"
const KhademniHeader = ({ select="black", fori }) => {
    const router = useRouter();
    useEffect(()=>{
        let id = localStorage.getItem("session")
        if(id==null) router.push('/login')
    },[])
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
            <h3 onClick={()=> router.push('/khademni')} style={{color:'#0070f3',cursor:'pointer'}}>Khadmen<a style={{textDecoration:'underline'}}>i</a></h3>
            <div className={styles.inheader}>
                <AiOutlineHome onClick={navigateTohome} color={fori=="home"?"#0070f3":"black"} cursor="pointer" size={25} />
                <MdOutlineWorkOutline onClick={navigateToPost} color={fori=="job"?"#0070f3":"black"} cursor="pointer" size={25} />
                <AiOutlineSetting onClick={navigateToSetting} color={fori=="setting"?"#0070f3":"black"} cursor="pointer" size={25} />
                <Button auto onClick={logout}><BiLogOutCircle size={18} /></Button>
            </div>
        </div>
    )
}
export default KhademniHeader;