import styles from "../../styles/Khademni.module.css"
import {  Text } from "@nextui-org/react";
import { Button, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
const JobHeader = ({disabled})=>{
    const router = useRouter();
    const navigatetojobs = ()=>{
        router.push('/khademni/info');
    }
    const navigatetoprop = ()=>{
        router.push('/khademni/info/proposal')
    }
    return(
        <div className={styles.mainTwo}>
           <h3 style={{fontSize:27}}>My Jobs info</h3>
           <Spacer  y={2}/>
           <div  style={{ borderBottom: '1px solid rgb(230, 230, 230)',display:'flex',flexDirection:'row', }}>
                <Text onClick={navigatetojobs} className={disabled=="posts" ? styles.index: styles.not_index}>My jobs</Text>
                <Text onClick={navigatetoprop} className={disabled!="posts" ? styles.index: styles.not_index}>My proposals</Text>
           </div>
        </div>
    )
}
export default JobHeader;