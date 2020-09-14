import React from 'react';
import Webcam from 'react-webcam';

import { navigate } from '@reach/router';

class CaptureImage extends React.Component {
    // using state to save the image in base64 image value to imageData
    state = {
        imageData: null,
        imageName: "",
        saveImage: false
    }

    // used to activate the webcam
    setRef = (webcam) => {
        this.webcam = webcam;
    }

    // used to capture the photo
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            imageData: imageSrc
        })
        
    };

    // this allows for a retake
    onClickRetake = (e) => {
        e.persist();
        this.setState({
            imageData: null
        })
    }
    
    // this is used to change the saveImage state, 
    // allows user to turn off the webcam after capture w/ conditional statement
    onClickSave = (e) => {
        e.persist();
        this.setState((previousState) => {
            return{
                saveImage: !previousState.saveImage
            }
        })
    }

    // this allows the user to change the image file name
    handleChange = (e) => {
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // this is suppose to handle the save photo button
    // but currently no database to save the base64 image
    // need to create a function to handle the saveJobImage
    handleSaveSubmit = (e) => {
        e.preventDefault();
        let imageObject = {
            image_name: this.state.image_name,
            job_id: this.props.job_id,
            image_data: this.state.imageData
        }
        console.log(imageObject);
        // this.props.saveJobImage(imageObject);
    }
    scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    saveForm = () => {
        return(
            <div>
                <form onSubmit={this.handleSaveSubmit}>
                    <p>
                        <label>Image Name:</label>
                        <input
                            name="image_name"
                            value={this.state.image_name}
                            onChange={this.handleChange}
                        />
                        <input type='submit' value='Save'/>
                    </p>
                </form>
            </div>
        )
    }

    //this renders the webcam components
    render() {
        const videoConstraints ={
            width: 1280,
            height:720,
            facingMode: 'user',
        };

    return (
        <div>
            <Webcam
                audio={false}
                height={350}
                ref={this.setRef}
                screenshotFormat='image/jpeg'
                width={350}
                videoConstraints={videoConstraints}
            />
            <div className="button-container">
               <button class="button is-info" onClick={this.capture}>Capture Photo</button>
            </div>
            {''}
            {this.state.imageData ?
            <div>
                    <p><img src ={this.state.imageData} alt=""/></p>
                    <span><button onClick={this.onClickRetake}>Retake Photo</button></span> {' '}
                    <span><button onClick={this.onClickSave}>Save Photo</button></span>
                    {this.state.saveImage ? this.saveForm() : null}
                </div>
            : null}

            {/* button does not work due to not being logged in */}
           
            <button class="button is-info" onClick={() => this.scrollToTop()}>Go to Chat</button>

        </div>
    );
    }
}

export default CaptureImage;