import Layout from "../../components/Layout";
import styles from "../../../styles/Khademni.module.css"
import LayoutSetting from "../../components/LayoutSetting";
import { TbFaceIdError } from "react-icons/tb";
import { Loading, Grid, Input, Spacer, Collapse, Row, Button, Card, Text, Modal } from "@nextui-org/react"
import { AiOutlineSearch, AiOutlineProject } from "react-icons/ai"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
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
                    {isloading && <Loading type="default" /> || <Overview id={id} />
                    }
                </div>
            </LayoutSetting>
        </Layout>
    )
}
const Overview = ({id}) => {
    const [invalid, seInvalid] = useState(false);
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
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
    const uploadImage = async(event)=>{
        const body = new FormData();
        body.append("file",image)
        body.append("id",id)
        axios.post("http://localhost:3001/uploadimg", body, {
            headers: { "Content-type": "multipart/form-data" }
        }).then(res => {
           //console.log res;
           setVisible(false)
        })
    }
    return (
        <Grid.Container gap={2}>
            <Grid style={{ width: '100%' }}>
                <Card isHoverable variant="bordered">

                    <Card.Body>
                        <h4 className="nextui-collapse-title">Change profile picture</h4>
                        <Row justify="space-between">
                            <Text style={{ color: 'rgb(128 141 155)' }}>Change your image to make it easy to people to know you</Text>
                            <input onChange={e => handleChange(e)} accept="image/*" type="file" id="myfile" name="myfile" style={{ display: 'none' }} />
                            <Button color="primary" label="label" css={{ width: -50 }} auto >
                                <label id="label" style={{ cursor: 'pointer', padding: 0, margin: 0 }} name="label" for="myfile">Upload</label>
                            </Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Grid>
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
                    <img src={createObjectURL} height="350"/>
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