import React from "react";
import KhademniHeader from "../components/KhademniHeader";
import styles from '../../styles/Khademni.module.css';
import Image from "next/image";
import image from "../../assets/img.png"
import { Modal, Input, Row, Checkbox, Dropdown, Button, Spacer, Textarea, } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import { MdOutlineSubtitles } from "react-icons/md"
import AiOutlineMail from 'react-icons/ai';
import { AiFillStar } from "react-icons/ai";
import {BiCategory} from "react-icons/bi"
import { BsCashCoin } from "react-icons/bs"
import { AiOutlineStar } from "react-icons/ai";
import { FaCity } from "react-icons/fa"
import { Card, Text } from "@nextui-org/react";
import { User } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Progress, Grid } from "@nextui-org/react";
import Layout from "../components/Layout";
import { TbFaceIdError } from "react-icons/tb"
const Khademni = () => {
  const [isLoading, setisLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = useState("");
  const [Budgetfrom, setBudgetfrom] = useState("");
  const [Budgetto, setBudgetto] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [cat, setcat] = useState("");
  const [id, setid] = useState("");
  const router = useRouter();

  const handler = () => {
    setVisible(true)
  }
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const [jobs, setjobs] = useState([]);
  useEffect(() => {
    let id = localStorage.getItem("session");
    if(id==null) router.push('/login')
    setid(id);
    axios.post('http://localhost:3001/getPost').then(res => {
      if (res.data !== false) setjobs(res.data);
    });
    axios.post('http://localhost:3001/getInfo', {
      data: id,
    }).then(res => {
      setInfo(res.data)
    })
  }, [])
  const addPost = () => {
    if (title !== "" && Budgetfrom !== "" && Budgetto !== "" && city !== "" && description !== "" && cat !== "") {
      const data = {
        id: id,
        fullname: info.fullname,
        title: title,
        budgetFrom: Budgetfrom,
        budgetTo: Budgetto,
        city: city,
        description: description,
        categorie: cat,
      }
      axios.post('http://localhost:3001/addPost', {
        data: data,
      }).then(res => {
        setVisible(false)
        router.reload(window.location.pathname)
      }).catch(err => {
        alert(err)
      })
    }
  }
  const Search = (e) => {
    setisLoading(true);
    axios.post('http://localhost:3001/search', {
      data: e.target.value,
    }).then(res => {
      let oldArray = jobs;
      if (res.data == false) setjobs([]);
      else setjobs(res.data);
      setisLoading(false);
    }).catch(err => alert(err))
  }
  const goTojob = (e) => {
    router.push(
      {
        pathname: '/khademni/[job]',
        query: { job: e },
      }
    )
  }
  return (
    <Layout fori="home">
      <div className={styles.main}>
        <div style={{ width: '30%', height: '100%' }}>

          <Input onChange={e => Search(e)} clearable label="Search for jobs" placeholder="Search" width="100%" />
          <Spacer></Spacer>
          <Card variant="bordered" css={{ mw: "640px", borderRadius: 5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <Card.Header>
              <Text style={{ fontWeight: 600, fontSize: 20, letterSpacing: 0 }}>Filters</Text>
            </Card.Header>
            <Card.Body>
              <Row justify="space-between">
                <Text style={{ fontWeight: 600, fontSize: 17, }}>Job type</Text>
                <Text style={{ color: '#0070f3' }}>clear</Text>
              </Row>
              <Checkbox.Group
                label="Select cities (uncontrolled)"
                defaultValue={["fixed", "auckland"]}
              >
                <Checkbox value="fixed"><Text style={{ fontWeight: 400, fontSize: 18 }}>Fixed price</Text></Checkbox>
                <Checkbox value="Hourly"><Text style={{ fontWeight: 400, fontSize: 18 }}>Hourly rate</Text></Checkbox>
              </Checkbox.Group>
              <Row justify="space-between">
                <Text style={{ fontWeight: 600, fontSize: 17, }}>Fixed Price</Text>
                <Text style={{ color: '#0070f3' }}>clear</Text>
              </Row>
              <Spacer></Spacer>
              <Row justify="space-between">
                <Text style={{ fontWeight: 600, fontSize: 17, }}>Skills</Text>
                <Text style={{ color: '#0070f3' }}>clear</Text>
              </Row>

              <Input labelPlaceholder="Search for skills" />
              <Spacer></Spacer>
              <Checkbox defaultSelected><Text style={{ fontWeight: 400, fontSize: 18 }}>Java</Text></Checkbox>
              <Checkbox defaultSelected><Text style={{ fontWeight: 400, fontSize: 18 }}>Php</Text></Checkbox>
              <Checkbox defaultSelected><Text style={{ fontWeight: 400, fontSize: 18 }}>React</Text></Checkbox>
              <Checkbox defaultSelected><Text style={{ fontWeight: 400, fontSize: 18 }}>Node</Text></Checkbox>
              <Checkbox defaultSelected><Text style={{ fontWeight: 400, fontSize: 18 }}>Java</Text></Checkbox>
            </Card.Body>
          </Card>
        </div>
        <Spacer></Spacer>
        <div style={{ width: '60%' }}>
          <Card
            onClick={handler}
            isPressable
            isHoverable
            variant="bordered"
            css={{ mw: "6000px", borderTopColor: '#0070f3', borderRadius: 5 }}
          >
            <Card.Body >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <User
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  name=""
                  bordered
                />
                <div className={styles.addjobs}>
                  <p style={{ marginLeft: 30, letterSpacing: 0.1 }}>Add job by just one click</p>
                  <button className={styles.button}>Post</button>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Spacer />
          <div>
            <Card variant="bordered" css={{ mw: "6000px", borderRadius: 5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
              <Card.Body>
                <Row justify="space-between">
                  <Text style={{ fontWeight: 600, letterSpacing: 0.3 }}>Best Results </Text><Text>1-20 of 100 results </Text>
                  <Checkbox defaultSelected><Text>Receive alerts for this search</Text></Checkbox>
                  <Dropdown>
                    <Dropdown.Button color={"light"} light>
                      Light
                    </Dropdown.Button>
                    <Dropdown.Menu
                      color={"light"}
                      variant="light"
                      aria-label="Actions"
                    >
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
              </Card.Body>
            </Card>
            {
              jobs.length > 0 ? jobs.map((n) => {
                return (
                  <>
                    <Card
                      onClick={e => goTojob(n._id)}
                      isPressable
                      isHoverable
                      variant="bordered"
                      css={{ mw: "6000px", borderRadius: 5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                    >
                      <Card.Body>
                        <Row justify="space-between">
                          <Text style={{ color: '#0070f3', fontSize: 18, fontWeight: 600 }}>{n.title}</Text>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text>15 Bids</Text>
                            <Spacer></Spacer>
                            <div style={{ flexDirection: 'column' }}>
                              <Text style={{ fontWeight: 600 }}>45.00DT</Text>
                              <Text>Average bids</Text>
                            </div>
                          </div>
                        </Row>
                        <Text style={{ fontWeight: 600 }}>Budget {n.budgetFrom} – {n.budgetTo} DT</Text>
                        <Text>{n.description}</Text>
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

                  </>
                )
              }) : <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Spacer y={5}/>
                <TbFaceIdError size={90} />
                <h4>Nothing to show</h4>
              </div>
            }
            {
              isLoading && <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loading type="default" />
              </Grid>
            }
          </div>
        </div>

      </div>

      <Modal
      width="40%"
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Easly add <Text b size={18}>
              Job
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>

          <Input clearable bordered fullWidth  contentLeft={<MdOutlineSubtitles fill="currentColor" />} color="primary" placeholder="Title" size="lg"  onChange={e => setTitle(e.target.value)}  />
          <Row justify="space-between">
            <Input  clearable bordered fullWidth  contentLeft={<BsCashCoin fill="currentColor" />} color="primary"  onChange={e => setBudgetfrom(e.target.value)} placeholder="Bugdet from" />
            <Spacer />
            <Input  clearable bordered fullWidth color="primary" contentLeft={<BsCashCoin fill="currentColor" />} onChange={e => setBudgetto(e.target.value)} placeholder="Budget to" />
          </Row>
          <Input  clearable bordered fullWidth color="primary" contentLeft={<FaCity fill="currentColor" />} onChange={e => setCity(e.target.value)} placeholder="City" />
          <Textarea  clearable bordered fullWidth color="primary"  onChange={e => setDescription(e.target.value)} multiple placeholder="Description" />
          <Input clearable bordered fullWidth color="primary" contentLeft={<BiCategory fill="currentColor" />} onChange={e => setcat(e.target.value)} multiple placeholder="Categorie" />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={addPost}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>


    </Layout>
  )
}
export default Khademni;