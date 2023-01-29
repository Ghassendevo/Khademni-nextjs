import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import LayoutSecond from "../../components/LayoutSecond";
import styles from "../../../styles/Khademni.module.css"
import { MdOutlineDelete } from "react-icons/md"
import { AiFillStar } from "react-icons/ai"
import { AiOutlineStar } from "react-icons/ai"
import { Collapse, Grid, Row, Text, Input, Button, Spacer, Card, Avatar, Modal, Textarea } from "@nextui-org/react";
import { AiOutlineProject } from "react-icons/ai"
import { BsCashCoin } from "react-icons/bs"
import { BiCategory } from "react-icons/bi"
import { Loading } from "@nextui-org/react";
import { AiOutlineSearch } from "react-icons/ai"
import { MdOutlineSubtitles } from "react-icons/md"
import { TbFaceIdError } from 'react-icons/tb'
import { BsPencil } from "react-icons/bs"
import { FaCity } from "react-icons/fa"
import Khademni from "..";
import Router, { useRouter } from "next/router";
const Post = ({ data }) => {
    const [post, setPost] = useState([]);
    const [id, setId] = useState("");
    const [isloading, setisLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        let id = localStorage.getItem("session");
       
        setId(id);
        axios.post("http://localhost:3001/myallpost", {
            data: id,
        }).then(res => {
            setPost(res.data)
            setisLoading(false);
        })
    }, [])
    return (
        <Layout select="#0070f3" fori="job">
            <LayoutSecond disabled="posts">
                <div className={styles.mainTwo}>
                    {isloading && <Loading type="default" /> || (
                        post.length > 0 && (
                            <Projects id={id} post={post} />

                        ) || (
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                <TbFaceIdError size={90} />
                                <h4>Nothing to show</h4>
                            </div>
                        )
                    )
                    }
                </div>
            </LayoutSecond>

        </Layout>
    )
}
const Projects = ({ id, post }) => {

    const [userinfo, setUserinfo] = useState();
    const [isLoading, setIsloading] = useState(true);
    const [password, setPassword] = useState("");
    const [invalid, setinvalid] = useState(false);
    const [poste, setPoste] = useState([]);
    const [modalid, setmodalid] = useState("")
    const [visible, setVisible] = useState(false);
    const [visibleChange, setVisibleChanger] = useState(false);
    const [changerdata, setchangerData] = useState("");
    const [searchvalue, setsearchvalue] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    //data;
    const [title, settitle] = useState(changerdata.title);
    const [budgetfrom, setbudgetfrom] = useState(changerdata.budgetFrom);
    const [budgetto, setbudgetto] = useState(changerdata.budgetTo);
    const [city, setcity] = useState(changerdata.city);
    const [description, setdescription] = useState(changerdata.description);
    const [categorie, setcategorie] = useState(changerdata.categorie);
    useEffect(() => {
        setPoste(post);
        axios.post("http://localhost:3001/getInfo", {
            data: id
        }).then(res => {
            setUserinfo(res.data)
            setIsloading(false);
            console.log(res.data)
        })
    }, [])
    const router = useRouter();
    const deletePosts = () => {
        if (password != "" && password == userinfo.password) {
            axios.post("http://localhost:3001/deleteAll", {
                data: id
            }).then(res => {
                router.reload(window.location.pathname)
            })
        } else {
            if (password != "") {
                setinvalid(true);
                setTimeout(() => {
                    setinvalid(false)
                }, 2000);
            }
        }

    }
    const closeHandler = () => {
        setVisible(false)
    }
    const closeChanger = () => {
        setVisibleChanger(false)
    }
    const deleteProject = (e) => {
        setVisible(true);
        setmodalid(e)
    }
    const confirmDelete = () => {
        axios.post("http://localhost:3001/deleteone", {
            data: modalid
        }).then(res => {
            router.reload(window.location.pathname)
        })
    }
    const confirmChange = () => {
        if (title !== "" && budgetfrom !== "" && budgetto !== "" && description !== "" && categorie !== "" && city !== "") {
            axios.post("http://localhost:3001/updatepost", {
                data: {
                    id: changerdata._id,
                    title,
                    budgetfrom,
                    budgetto,
                    description,
                    categorie,
                    city,
                }
            }).then(res => {
                router.reload(window.location.pathname);
            }).catch(err => {
                setVisibleChanger(false)
            })
        } else {
            setVisibleChanger(false);
        }
    }
    const changeProject = (e) => {
        setchangerData(e);
        setVisibleChanger(true);
    }
    const goTojob = (e) => {
        router.push(
            {
                pathname: '/khademni/[job]',
                query: { job: e },
            }
        )
    }
    const searchingPost = (e)=>{
        axios.post("http://localhost:3001/searchForid",{
            data:{
                title:e.target.value,
                id:id,
            }
        }).then(res=>{
            setPoste(res.data);
        })
    }
    return (
        isLoading ? null : (

            <>
                <Grid.Container gap={2}>
                    <Grid style={{ width: '100%' }}>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            onChange={e => searchingPost(e)}
                            color="primary"
                            size="lg"
                            placeholder="Search for your jobs"
                            contentLeft={<AiOutlineSearch fill="currentColor" />}
                        /><Spacer />
                        <Collapse
                            arrowIcon={<AiOutlineProject color="black" size={25} />}
                            shadow
                            bordered
                            title={<h3 className="nextui-collapse-title">Total projects <span style={{ color: 'red' }}>{post.length}</span></h3>}
                            subtitle="Click to Delete all the Posts"
                        >
                            <Row justify="space-between" style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <Input onChange={e => setPassword(e.target.value)} label="Enter your password to delete" placeholder="Password" width='70%' /><Button onClick={deletePosts} color="error" style={{ borderRadius: 4 }}>Delete</Button>
                            </Row>
                            {invalid && <Text style={{ color: 'red' }}>You have entered an incorrect password</Text>}
                        </Collapse>
                    </Grid>
                    <Grid style={{ width: '100%' }}>
                        <Collapse.Group shadow>
                            {
                               poste.length>0?(
                                poste.map(e => {
                                    return (
                                        <>
                                            <Collapse title={`Project ID: ${e._id}`}
                                                subtitle={e.date}
                                            >
                                                <h5>Bids: {e.bids}</h5>
                                                <h5>Category: {e.categorie}</h5>
                                                <Collapse bordered={true} title={<h5>View project</h5>}>
                                                    <Card
                                                        onClick={n => goTojob(e._id)}
                                                        isPressable
                                                        isHoverable
                                                        variant="bordered"
                                                        css={{ mw: "6000px", borderRadius: 5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                                                    >
                                                        <Card.Body>
                                                            <Row justify="space-between">
                                                                <Text style={{ color: '#0070f3', fontSize: 18, fontWeight: 600 }}>{e.title}</Text>
                                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                    <Text>{e.bids} Bids</Text>
                                                                    <Spacer></Spacer>
                                                                    <div style={{ flexDirection: 'column' }}>
                                                                        <Text style={{ fontWeight: 600 }}>45.00DT</Text>
                                                                        <Text>Average bids</Text>
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                            <Text style={{ fontWeight: 600 }}>Budget {e.budgetFrom} – {e.budgetTo} DT</Text>
                                                            <Text>{e.description}</Text>
                                                            <Spacer></Spacer>
                                                            <Text style={{ color: '#0070f3' }}>Java
                                                                Data Entry .
                                                                Mobile App Development .
                                                                iPhone .
                                                                Android</Text>
                                                            <Spacer></Spacer>
                                                            <Row justify="space-between">
                                                                <div>
                                                                    <Row justify="space-between">
                                                                        <AiFillStar size={26} color="	#FFD700" /><AiFillStar size={26} color="	#FFD700" /><AiFillStar size={26} color="	#FFD700" /><AiOutlineStar size={26} color="gray" /><AiOutlineStar size={26} color="gray" />
                                                                    </Row>
                                                                </div>
                                                            </Row>
                                                        </Card.Body>
                                                    </Card>

                                                </Collapse>
                                                <Spacer></Spacer>
                                                <Grid.Container gap={2} css={{ color: "$text" }}>
                                                    <Grid>
                                                        <Avatar style={{ cursor: 'pointer' }} onClick={er => deleteProject(e._id)} squared icon={<MdOutlineDelete size={20} fill="currentColor" />} />
                                                    </Grid>
                                                    <Grid>
                                                        <Avatar style={{ cursor: 'pointer' }} onClick={er => changeProject(e)} squared icon={<BsPencil size={20} fill="currentColor" />} />
                                                    </Grid>
                                                </Grid.Container>
                                            </Collapse>

                                        </>
                                    )
                                })
                               ):<Text>Nothing to show</Text>
                            }
                        </Collapse.Group>
                    </Grid>

                </Grid.Container>
                <div>
                    <Modal
                        closeButton
                        aria-labelledby="modal-title"
                        open={visible}
                        onClose={closeHandler}
                    >
                        <Modal.Header>
                            <Text id="modal-title" size={18}>
                                Project ID: <Text b size={18}>
                                    {modalid}
                                </Text>

                            </Text>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: 'center' }}>
                            <h5>Are u sure that you want to delete this project ?</h5>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button auto flat onPress={closeHandler}>
                                Cancel
                            </Button>
                            <Button onPress={confirmDelete} auto color="error" >
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div>
                    <Modal
                        width="800px"
                        closeButton
                        aria-labelledby="modal-title"
                        open={visibleChange}
                        onClose={closeChanger}
                    >{visibleChange == "" ? "Loading" : (
                        <>
                            <Modal.Header>
                                <Text id="modal-title" size={18}>
                                    Project ID : <Text b size={18}>
                                        {changerdata._id}
                                    </Text>
                                </Text>
                            </Modal.Header>
                            <Modal.Body style={{ textAlign: 'center' }}>
                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    onChange={e => settitle(e.target.value)}
                                    initialValue={changerdata.title}
                                    color="primary"
                                    size="lg"
                                    placeholder="Title"
                                    contentLeft={<MdOutlineSubtitles fill="currentColor" />}
                                />
                                <Row justify="space-between">
                                    <Input
                                        clearable
                                        bordered
                                        onChange={e => setbudgetfrom(e.target.value)}
                                        fullWidth
                                        initialValue={changerdata.budgetFrom}
                                        color="primary"
                                        size="lg"
                                        placeholder="Budget From"
                                        contentLeft={<BsCashCoin fill="currentColor" />}
                                    />
                                    <Spacer></Spacer>
                                    <Input
                                        clearable
                                        bordered
                                        onChange={e => setbudgetto(e.target.value)}
                                        fullWidth
                                        initialValue={changerdata.budgetTo}
                                        color="primary"
                                        size="lg"
                                        placeholder="Budget To"
                                        contentLeft={<BsCashCoin fill="currentColor" />}
                                    />
                                </Row>
                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    onChange={e => setcity(e.target.value)}
                                    initialValue={changerdata.city}
                                    color="primary"
                                    size="lg"
                                    placeholder="City"
                                    contentLeft={<FaCity fill="currentColor" />}
                                />
                                <Textarea
                                    clearable
                                    bordered
                                    fullWidth
                                    Row={4}
                                    onChange={e => setdescription(e.target.value)}
                                    initialValue={changerdata.description}
                                    color="primary"
                                    size="lg"
                                    placeholder="Description"
                                    contentLeft={<FaCity fill="currentColor" />}
                                />
                                <Input
                                    clearable
                                    bordered
                                    fullWidth
                                    onChange={e => setcategorie(e.target.value)}
                                    initialValue={changerdata.categorie}
                                    color="primary"
                                    size="lg"
                                    placeholder="Category"
                                    contentLeft={<BiCategory fill="currentColor" />}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button auto flat onPress={closeChanger}>
                                    Cancel
                                </Button>
                                <Button onPress={confirmChange} auto  >
                                    Update
                                </Button>
                            </Modal.Footer>
                        </>
                    )}
                    </Modal>
                </div>

            </>
        )


    )
}

export default Post;