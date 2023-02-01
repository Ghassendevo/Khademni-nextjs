import Layout from "../../components/Layout";
import styles from "../../../styles/Khademni.module.css"
import LayoutSetting from "../../components/LayoutSetting";
import { TbFaceIdError } from "react-icons/tb";
import { Loading, Grid, Input, Spacer, Collapse, Row, Button, Card, Text, Modal } from "@nextui-org/react"
import { AiOutlineSearch, AiOutlineProject, AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiTwotoneLock } from "react-icons/ai"
import { useState } from "react";
import { useEffect } from "react";
import { MdOutlinePlace } from "react-icons/md"
import axios from "axios";
import { useRouter } from "next/router";

const Setting = () => {
    const [isloading, setislaoding] = useState(true)
    const [userinfo, setUserinfo] = useState();
    const [id, setid] = useState("");

    useEffect(() => {
        let id = localStorage.getItem("session");
        setid(id);
        axios.post("http://localhost:3001/getInfo", {
            data: id,
        }).then(res => {
            setUserinfo(res.data);
            setislaoding(false)
        })
    }, [])
    return (
        <Layout fori="setting">
            <LayoutSetting disabled="overview">
                <div className={styles.mainTwo}>
                    {isloading && <Loading type="default" /> || <Overview id={id} userinfo={userinfo} />
                    }
                </div>
            </LayoutSetting>
        </Layout>
    )
}
const Overview = ({ id, userinfo }) => {
    const router = useRouter();
    const [invalid, seInvalid] = useState(false);
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [infoVisible, setinfovisible] = useState(false)
    const [fullname, setFullname] = useState(userinfo.fullname);
    const [username, setusername] = useState(userinfo.username);
    const [password, setPassword] = useState()
    const [email, setEmail] = useState(userinfo.email)
    const [phone, setPhone] = useState(userinfo.phone);
    const [city, setCity] = useState(userinfo.city);
    const [userInfo, setUserinfo] = useState(userinfo);
    const [msgerr, setmsgerr] = useState(false)
    //changed pass
    const [currentPassword, setCurrentpassword] = useState()
    const [passerr, setpasserr] = useState(false);
    const [newPassowrd, setNewpassword] = useState("")
    const [newConfirmpassword, setConfirmpassword] = useState("");

    //

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    }
    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i))
            setVisible(true)
        }
    }
    const closeInfo = () => {
        setinfovisible(false)
    }
    const uploadImage = async (event) => {
        const body = new FormData();
        body.append("file", image)
        body.append("id", id)
        axios.post("http://localhost:3001/uploadimg", body, {
            headers: { "Content-type": "multipart/form-data" }
        }).then(res => {
            //console.log res;
            setVisible(false)
        })
    }
    const submitInfo = () => {
        if (password != "" && password != userInfo.password) {
            setmsgerr(true);
            setInterval(() => {
                setmsgerr(false)
            }, 2000);
        } else {
            axios.post("http://localhost:3001/updateinfo", {
                data: {
                    id: id,
                    fullname: fullname,
                    username: username,
                    email: email,
                    phone: phone,
                    city: city,
                },
            }).then(res => {
                setinfovisible(false)
            }).catch(err => alert(err))
        }
    }
    const ChangePass = () =>{
        if(currentPassword!="" && newPassowrd!="" && newConfirmpassword!=""){
            if(currentPassword!= userInfo.password){
                setpasserr(true)
                setInterval(() => {
                    setpasserr(false)
                }, 2000);
            }else{
                axios.post("http://localhost:3001/updatepassword",{
                    data:{
                        id:id,
                        password:newPassowrd
                    }
                }).then(res=>{
                    router.reload(window.location.pathname)
                }).catch(err=>{
                    alert(err)
                })
                
            }
        }
    }
    return (
        <Grid.Container gap={2}>
            <Grid style={{ width: '100%' }}>
                <Card isHoverable variant="bordered">
                    <Card.Body className={styles.bordered}>
                        <h4 className="nextui-collapse-title">Change profile picture</h4>
                        <Row justify="space-between">
                            <Text style={{ color: 'rgb(128 141 155)' }}>Change your image to make it easy to people to know you</Text>
                            <input onChange={e => handleChange(e)} accept="image/*" type="file" id="myfile" name="myfile" style={{ display: 'none' }} />
                            <Button color="primary" label="label" css={{ width: -50 }} auto >
                                <label id="label" style={{ cursor: 'pointer', padding: 0, margin: 0 }} name="label" for="myfile">Upload</label>
                            </Button>
                        </Row>
                    </Card.Body>

                    <Card.Body>
                        <h4 className="nextui-collapse-title">Change Personal info</h4>
                        <Row justify="space-between">
                            <Text style={{ color: 'rgb(128 141 155)' }}>Change your Personal info inluding username and fullname</Text>
                            <input onChange={e => handleChange(e)} accept="image/*" type="file" id="myfile" name="myfile" style={{ display: 'none' }} />
                            <Button onClick={() => setinfovisible(true)} color="primary" bordered auto>
                                Change
                            </Button>
                        </Row>
                    </Card.Body>
                </Card>
                <Spacer />
                <Card isHoverable variant="bordered">
                    <Card.Body className={styles.bordered}>
                        <h4 className="nextui-collapse-title">Password</h4>
                        <Row justify="space-between">
                            <div>
                                <Text style={{ color: 'rgb(128 141 155)' }}>Secure your account and change your password to create a new<br></br> password u have to meet all of the following requirements</Text>
                                <Spacer />
                                <Input clearable bordered fullWidth underlined color="primary" placeholder="Current password"  contentLeft={<AiTwotoneLock fill="currentColor" />} size="lg" onChange={e=> setCurrentpassword(e.target.value)}  />
                                <Spacer />
                                <Input clearable bordered fullWidth underlined color="primary" placeholder="New password"  contentLeft={<AiTwotoneLock fill="currentColor" />} size="lg" onChange={e => setNewpassword(e.target.value)} />
                                <Spacer />
                                <Input clearable bordered fullWidth underlined color="primary" placeholder="confirm password"  contentLeft={<AiTwotoneLock fill="currentColor" />} size="lg" onChange={e => setConfirmpassword(e.target.value)} />
                                <Spacer />
                                {passerr && <Text style={{color:'red'}}>Current password not correct</Text>}
                                <Button auto onClick={ChangePass}>submit</Button>
                            </div>
                            <div style={{ backgroundColor: '#e5ecf7', width: '40%', height: '300px', borderRadius: 5, display: 'flex', flexDirection: 'column', alignItems: '' }}>
                                <h4 style={{ marginLeft: 30, marginTop: 30, color: '#838f9d' }}>
                                    Rules of password
                                </h4>
                                <Spacer />
                                <h6 style={{ marginLeft: 30, color: '#838f9d' }}>
                                    To create a new password , you have to meet all of the following requirements:
                                    <Spacer />
                                    <li>Minimum 8 character</li>
                                    <li>At least one special character</li>
                                    <li>Can't be the same as a previous</li>
                                </h6>
                            </div>
                        </Row>
                    </Card.Body>


                </Card>
            </Grid>
            <Modal
                width="50%"
                closeButton
                aria-labelledby="modal-title"
                open={infoVisible}
                onClose={closeInfo}
            >
                <Modal.Header>
                    <Text id="modal-title" css={{ textAlign: 'left' }} size={18}>
                        Update  <Text b size={18}>
                            personal info
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input clearable bordered fullWidth color="primary" labelPlaceholder="Fullname" placeholder="Fullname" initialValue={userinfo.fullname} contentLeft={<AiOutlineUser fill="currentColor" />} size="lg" onChange={e => setFullname(e.target.value)} />
                    <Input clearable bordered fullWidth color="primary" placeholder="Username" initialValue={userinfo.username} contentLeft={<AiOutlineUser fill="currentColor" />} size="lg" onChange={e => setusername(e.target.value)} />
                    <Input clearable bordered fullWidth color="primary" placeholder="Email" initialValue={userinfo.email} contentLeft={<AiOutlineMail fill="currentColor" />} size="lg" onChange={e => setEmail(e.target.value)} />
                    <Row justify="space-between">
                        <Input clearable bordered width="48%" color="primary" placeholder="Phone number" initialValue={userinfo.phone} contentLeft={<AiOutlinePhone fill="currentColor" />} size="lg" onChange={e => setPhone(e.target.value)} />
                        <Input clearable bordered width="48%" color="primary" placeholder="City" initialValue={userinfo.city} contentLeft={<MdOutlinePlace fill="currentColor" />} size="lg" onChange={e => setCity(e.target.value)} />

                    </Row>
                    <Text>To change your info please enter your password</Text>
                    <Input clearable bordered fullWidth underlined color="primary" placeholder="Your password" contentLeft={<AiTwotoneLock fill="currentColor" />} size="lg" onChange={e => setPassword(e.target.value)} />
                    {msgerr && <Text style={{ color: 'red' }}>Incorrect password</Text>}
                </Modal.Body>
                <Modal.Footer>
                    <Button auto bordered color="primary" onPress={closeInfo}>
                        Cancel
                    </Button>
                    <Button auto onPress={submitInfo}>
                        submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Upload your <Text b size={18}>
                            Image
                        </Text>

                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <img src={createObjectURL} height="350" />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Cancel
                    </Button>
                    <Button auto onPress={uploadImage}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </Grid.Container>
    )
}
export default Setting;