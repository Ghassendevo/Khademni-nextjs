import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import KhademniHeader from "../components/KhademniHeader";
import Image from "next/image";
import tn from "../../assets/tn.png"
import { AiOutlineStar as Star } from "react-icons/ai"
import { AiOutlineUser as Us } from "react-icons/ai"
import high from "../../assets/high.svg"
import { IoMdDoneAll } from "react-icons/io";
import { Card, Row, Spacer, Grid, Loading, Text, Tooltip, Button, Input, Textarea, } from "@nextui-org/react";
import { HiOutlineLocationMarker } from "react-icons/hi"
const Onejob = () => {
    const router = useRouter();
    const { job } = router.query;
    const [isloading, setisloading] = useState(false);
    const [jobinfo, setjobinfo] = useState({});
    const [days, setDays] = useState("7");
    const [amount, setAmount] = useState("");
    const [desc, setDesc] = useState("");
    const [userId, setUserId] = useState("");
    const [userInfo, setuserInfo] = useState({});
    const [bidloading, setbidloading] = useState(false);
    useEffect(() => {
        let userid = localStorage.getItem("session");
        setUserId(userid);
        setisloading(true);
        axios.post('http://localhost:3001/getone', {
            data: job,
        }).then(res => {
            setjobinfo(res.data);
            setisloading(null)
        }).catch(err => {
            alert(err)
        })//
        axios.post('http://localhost:3001/getInfo', {
            data: userid,
        }).then(res => {
            setuserInfo(res.data);
            console.log(res.data)
        }).catch(err => {
        })//
    }, [])
    const setBid = () => {
        let data = {
            userid: userId,
            postid: jobinfo._id,
            amount: amount,
            days: days,
            desc: desc,
            fullname: userInfo.fullname,
        }
        if (amount !== "" && days !== "" && desc !== "") {
            setbidloading(true);
            axios.post('http://localhost:3001/bid', {
                data: data
            }).then(res => {
                setbidloading(null)
                router.push('/khademni')
            })
        }
    }
    return (
        <>
            <KhademniHeader />
            {
                isloading && (<><Spacer y={8}></Spacer> <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loading type="default" />
                </Grid></>) ||
                <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', paddingTop: 50, paddingBottom: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ width: '70%' }}>
                        <Card variant="bordered" css={{ mw: "100%", borderRadius: 5 }}>
                            <Card.Header style={{ borderBottom: '1px solid rgb(230, 230, 230)' }}>
                                <Row justify="space-between">
                                    <h3>Project details</h3>
                                    <h4>{jobinfo.budgetFrom}DT - {jobinfo.budgetTo}DT</h4>
                                </Row>

                            </Card.Header>

                            <Card.Body>

                                <h5 style={{ color: '#0070f3' }}>{jobinfo.title}</h5>
                                <Text>{jobinfo.description}</Text>
                                <Spacer></Spacer>
                                <h5>Skills required</h5>
                                <Row justify="space-between">
                                    <Tooltip content={"Developers love Next.js"}>
                                        <Button auto flat>
                                            Web site desing
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content={"Developers love Next.js"}>
                                        <Button auto flat>
                                            Web developer
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content={"Developers love Next.js"}>
                                        <Button auto flat>
                                            Android and ios develper
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content={"Developers love Next.js"}>
                                        <Button auto flat>
                                            Back end developer
                                        </Button>
                                    </Tooltip>
                                </Row>
                                <Spacer></Spacer>
                                <Text>Project ID: {jobinfo._id}</Text>

                            </Card.Body>
                        </Card>
                        <Spacer></Spacer>
                        <Card variant="bordered" css={{ mw: "100%", borderRadius: 5 }}>
                            <Card.Header style={{ borderBottom: '1px solid rgb(230, 230, 230)' }}>
                                <h3>Place a Bid on this Project</h3>
                            </Card.Header>
                            <Card.Body>
                                <Text>
                                    You will be able to edit your bid until the project is awarded to someone.
                                </Text>
                                <Spacer></Spacer>
                                <Row justify="space-between">
                                    <div style={{ width: '50%' }}>
                                        <h5>Bid amount</h5>
                                        <Input onChange={e => setAmount(e.target.value)} width="90%" placeholder="Enter bid amount" />
                                    </div>
                                    <div style={{ width: '50%' }}>
                                        <h5>This project will be delivered in</h5>
                                        <Input onChange={e => setDays(e.target.value)} width="90%" type="number" initialValue="7" placeholder="Enter bid amount" />
                                    </div>
                                </Row>
                                <Spacer y={2}></Spacer>
                                <h5>Describe your proposal</h5>
                                <Textarea
                                    onChange={e => setDesc(e.target.value)}
                                    placeholder="What makes you the best condidate for this project?"
                                    rows={5}
                                />
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={setBid} color="primary" auto>
                                    {
                                        bidloading ? <Loading color="white" variant={true} /> : bidloading == null ? <IoMdDoneAll size={20} color="white" /> : " Place Bid"
                                    }
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div style={{ width: '28%', flexDirection: 'column' }}>
                        <div style={{ width: '100%', }}>
                            <Card variant="bordered" css={{ mw: "100%", borderRadius: 5 }}>
                                <Card.Header style={{ borderBottom: '1px solid rgb(230, 230, 230)' }}>
                                    <h4>About the client</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Row justify="space-between" style={{ width: '30%', alignItems: 'center' }}><HiOutlineLocationMarker color="black" /><Text>Tunisia</Text></Row>
                                    <Row justify="space-between" style={{ width: '30%', alignItems: 'center' }}>
                                        <Image
                                            src={tn}
                                            width={20}
                                            height={20}
                                        /><Text>Tunisia</Text></Row>
                                    <Row justify="space-between" style={{ width: '80%', alignItems: 'center' }}><Us color="black" /><Text>{userInfo.fullname}</Text><Star color="gray" size={25} /><Star color="gray" size={25} /><Star color="gray" size={25} /><Star color="gray" size={25} /><Star color="gray" size={25} /><Text>0.0</Text></Row>
                                </Card.Body>
                            </Card>
                        </div>
                        <Spacer></Spacer>
                        <div style={{ width: '100%' }}>
                            <Card variant="bordered" css={{ mw: "100%", borderRadius: 5 }}>
                                <Card.Header style={{ borderBottom: '1px solid rgb(230, 230, 230)' }}>
                                    <h4>How to write a winning bid</h4>
                                </Card.Header>
                                <Card.Body css={{width:'80%',marginLeft:'auto',marginRight:'auto',textAlign:'left'}}>
                                    <div style={{alignItems:'center',justifyContent:'center',width:'100%',display:'flex'}}>
                                        <Image src={high} width={120} heigh={200} />
                                    </div>
                                    <Text>Your best chance of winning this project is writing a great bid proposal here!</Text>
                                    <Spacer>

                                    </Spacer>
                                    <Text>Great bids are ones that:</Text>
                                    <li>Are engaging and well written without spelling or grammatical errors</li>
                                    <li>Show a clear understanding of what is required for this specific project - personalize your response!</li>
                                    <li>Explain how your skills & experience relate to the project and your approach to working on it</li>
                                    <li>Ask questions to clarify any unclear details</li>
                                </Card.Body>
                            </Card>

                        </div>

                    </div>

                </div>
            }
        </>
    )
}
export default Onejob;