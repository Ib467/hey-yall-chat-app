import React, { useEffect, useState, Fragment } from 'react';
import LogoutButton from '../components/LogoutButton';
import { navigate } from '@reach/router';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Webcam from './Webcam';


// import VideocamIcon from '@material-ui/icons/Videocam';
// import SvgIcon from '@material-ui/core/SvgIcon';


const socket = io.connect('http://localhost:8000')

export default function Inside(props) {
    const [state, setState] = useState({ message: '', name: '' })
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on('message', ({ name, message }) => {
            setChat([...chat, { name, message }])
        })
    })


    const onTextChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onMessageSubmit = (e) => {
        e.preventDefault()
        const { name, message } = state
        socket.emit('message', { name, message })
        setState({ message: '', name })
    }


    const renderChat = () => {
        return chat.map(({ name, message }, index) => (
            <div key={index}>
                <h3>
                    {name} : <span>{message}</span>
                </h3>
            </div>
        ))
    }

    useEffect(() => {
        if (props.loggedName == '') {
            navigate('/')
        }
    })


    //File upload functionality

    // const FileUpload = () => {
    const [file, setFile] = useState(''); //hooks to set state of the file
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };


    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath })
        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server')
            } else {
                console.log(err.response.data.msg)
            }
        }
    };



    return (
        <>
        
        <div class="chat-app">
            {/* <LogoutButton /> */}
            {/* <Typography variant="h3" component="h3"> h1. Heading</Typography> */}
            <div class="header-section"> Hello, {props.loggedName} <LogoutButton />

            </div>

            <form onSubmit={onMessageSubmit}>


                <h2 class="title is-2">Hey Y'all!  Messenger</h2>

                {/* <h1>Messenger</h1> */}

                <div className="name-field">
                    <TextField name="name" onChange={e => onTextChange(e)} value={state.name} label="Name" />
                </div>
                <div >
                    <TextField name="message" onChange={e => onTextChange(e)} value={state.message} id="outlined-multiline-static" variant="outlined" label="Message" />
                </div>

                {/* <Fragment>
                    <form onSubmit={onSubmit}>
                        <div className="custom-file mb-4">
                            <input type="file" className="custom-file-input" id="customFile"
                                onChange={onChange}
                            />
                            <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                        </div>
                        <input type="submit" value="upload" className="btn btn-primary btn-block mt-4"></input>
                    </form>
                </Fragment> */}

                <div class="file has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume"
                            onChange={onChange}
                        />
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Choose a file…
                                </span>
                        </span>
                        <span class="file-name" htmlFor="customFile">

                            {filename}
                        </span>
                    </label>
                </div>


                <button class="button is-success">Send Message</button>
                {/* <button>Send Message</button> */}
            </form>
            {/* <div className="render-chat" >
                    <h1>Chat Log</h1>
                    {renderChat()}
                </div> */}
            <article class="message is-link messsage-box">
                <div class="message-header">
                    <p>Chat Log</p>
                    <button class="delete" aria-label="delete"></button>
                </div>
                <div class="message-body">
                    {renderChat()}
                </div>
            </article>

            <div className="render-video">
                <Webcam />
            </div>
        </div >
        </>



    )
}