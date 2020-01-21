import React, { Component } from 'react';


class Home extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }
    render() { 
        return ( 
        <a href="/Account">
             {/* <div className='section'>  */}
             {/* <h1 class='name'>Test </h1> */}
             <div className='video-container'> 
        <video width="100%" height="100%" playsinline='true' autoPlay={true} loop={true} >
            <source src='video.mp4' type="video/mp4" />
        </video> 
        </div>
        {/* </div> */}
        </a>
        );
    }
}
 
export default Home;