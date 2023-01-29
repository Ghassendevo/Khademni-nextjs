import styles from '../styles/Loginsignup.module.css'
import { Header } from './components/header'
import { Input, Spacer, useSSR } from "@nextui-org/react";
import { UnLockIcon } from "./UnLockIcon.js";
import { LockIcon } from "./LockIcon.js";
import { UserIcon } from './UserIcon';
import { AiOutlineLogin } from 'react-icons/ai';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Progress, Grid,Text } from "@nextui-org/react";
import { useEffect } from 'react';
 const Login =  () => {
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [islogin, setisLogin] = useState(false);
    const [isLoading,  setisLoading] = useState(false);
    const [incorrect ,setIncorrect]  = useState(false)
    const dispatch = useDispatch();
    const isSinged = useSelector(state=> state.islogin)
    const router = useRouter();
    
    const signin = ()=>{
        return{
            type:'ISLOGIN'
        }
    }
    const login = ()=>{
        if(username!=="" || password!==""){
            setisLoading(true);
            const data = {
                username : username,
                password : password,
            }
            axios.post('http://localhost:3001/login',{
                data:data,
            }).then(res=>{
               if(res.data.msg) router.push('/khademni'),localStorage.setItem("session",res.data.id);
               else setIncorrect(true), setisLoading(false), setInterval(() => {
                setIncorrect(false)
               }, 2000);
            }).catch(err=>{
                alert(err)
            })
        }
    }
    useEffect(()=>{
        let id = localStorage.getItem("session");
        if(id!==null) router.push('/khademni');
    },[])
    return (
       <>
        {
            isLoading && <Grid.Container xs={1} sm={100} gap={1}>
            <Grid>
              <Progress
              size='sm'
                indeterminated
                value={50}
                color="primary"
                status="primary"
              />
            </Grid>
          </Grid.Container>
          }
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Header />
            <div className={styles.loginmain}>
                <h3>Login</h3>
                <p>Open your account and change the world ! </p>
                <div style={{ marginTop: 10,width:'100%'}}>
                    <Spacer y={1.6} />
                    <Input labelPlaceholder='username' onChange={e=>setUsername(e.target.value)} width={'100%'} className={styles.input}/>
                    <Spacer y={1.6} />
                    <Input.Password labelPlaceholder="Password" onChange={e=>setPassword(e.target.value)} width='100%' height='200px'  />
               {incorrect &&  <Text color="red">
                    Incorrect username or password 
                </Text>}

                    <Spacer y={1.6} />
                    <button className={styles.login}  onClick={login}>
                           <p>Login</p> <AiOutlineLogin size={20} />
                    </button>
                    <Spacer y={0.5} />
                    <Link href='/'>
                        <a style={{fontSize:15,textDecoration:'underline'}}>Go back to home</a>
                    </Link>
                </div>
            </div>
        </div>
       </>
        

    )
}
export default Login;