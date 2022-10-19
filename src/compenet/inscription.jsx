import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Agreement, Button, Container, Form, Input, Title, Wrapper } from './style'
import axios from 'axios'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const Registeruser = () => {
    const [hover, setHover] = useState(false)
    const valider = () => {
        setHover(!hover)
    }

    const [formdata, setFormdata] = useState({})
    const { name, email, password } = formdata
    console.log(formdata)


    const [file, setFile] = useState([])
    const [index, setIndex] = useState()
    const [userFile, setUserFile] = useState({})
    /******************************************************************
     * 
     * registre user with select image from file
     */
    const inscription = async (e) => {
        e.preventDefault()
        const userfile = {
            name: formdata.name,
            email: formdata.email,
            password: formdata.password,
            imageUser: formdata.imageUser
        }
        const res = await axios.post("http://127.0.0.1:3000/api/signup", userfile)
        console.log(res)


    }


    /****************************************************
     * 
     * end
     */

    /******************************uploadFile singel selection*(select un seul image)**** */
    const uploadFile = async (e) => {
        e.preventDefault()
        const datafile = new FormData()
        datafile.append('image', e.target.files[0])

        const res = await axios.post("http://127.0.0.1:3000/api/file", datafile)
        console.log(res)
        const data = await res.data
        console.log(data)
        setFile(data)
        console.log(res)
    }
    /***********************
     * end Upload File
     */

    console.log(file)

    /*****************************************************************
     *   image  schemas 
     */
    const SchemasFile = async () => {

        const datafile = {
            imageup: file
        }
        const res = await axios.post("http://127.0.0.1:3000/api/newfile", datafile)
        console.log(res)
        const data = await res.data.data
        console.log(data)
        setUserFile(data)

    }
    useEffect(() => {
        if (file.length !== 0) {
            SchemasFile()
        }
    }, [file])
    /******************************************************
     * end image Schemas
     */
    /*********************************************************************
     * 
     * bonus   filter with name user frontend
     */
    console.log(index)
    const [serchname, setSerchname] = useState("")
    const sercher = async () => {
        const res = await axios.get(`http://127.0.0.1:3000/serch/${serchname}`)


        console.log(res)

        const data = await res.data
        console.log(data)
    }
    useEffect(() => {
        if (serchname.length !== 0) {
            sercher()
        }
    }, [serchname])

    console.log(serchname)
    /**********************************************
     * 
     * end
     */

    return (
        <div>
            <Container>
                <Wrapper>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form>

                        <Input type='text' placeholder="name" value={name} onChange={((e) => setFormdata({ ...formdata, name: e.target.value }))} />
                        <Input type='email' placeholder="xyz@mail.com" value={email} onChange={((e) => setFormdata({ ...formdata, email: e.target.value }))} />
                        <Input type='password' placeholder="password" value={password} onChange={((e) => setFormdata({ ...formdata, password: e.target.value }))} />
                        {/* <Input type='password' placeholder="repite votre password" value={chekPassword} onChange={((e) => setFormdata({ ...formdata, chekPassword: e.target.value }))} /> */}
                        <Input type='file' label="chouseFile" onChange={((e) => { uploadFile(e) })} />

                        <FormControlLabel control={<Checkbox />} onChange={((e) => { setFormdata({ ...formdata, imageUser: userFile }); valider() })} label="confirmer" />

                        {hover && <Button onClick={((e) => { inscription(e) })} >uservalider</Button>}


                    </Form>
                </Wrapper>
            </Container>

            <Input type='search' label='serch' onChange={((e) => { setSerchname(e.target.value) })} />
        </div>
    )
}

export default Registeruser