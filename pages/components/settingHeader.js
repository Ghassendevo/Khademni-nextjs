import styles from "../../styles/Khademni.module.css"
import {  Text } from "@nextui-org/react";
import { Button, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
const SettingHeader = ({disabled})=>{
    const router = useRouter();
    const navigatetojobs = ()=>{
        router.push('/khademni/setting');
    }
    const navigatetoprop = ()=>{
        router.push('/khademni/setting/advanced')
    }
    return(
        <div className={styles.mainTwo}>
           <h3 style={{fontSize:27}}>Profile</h3>
           <Spacer  y={2}/>
           <div  style={{ borderBottom: '1px solid rgb(230, 230, 230)',display:'flex',flexDirection:'row', }}>
                <Text onClick={navigatetojobs} className={disabled=="overview" ? styles.index: styles.not_index}>Overview</Text>
                <Text onClick={navigatetoprop} className={disabled!="overview" ? styles.index: styles.not_index}>Setting</Text>
           </div>
        </div>
    )
}
export default SettingHeader;