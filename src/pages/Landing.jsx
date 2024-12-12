import React from 'react'
import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Experience from '../models/Experience';
// import Button from '../components/Button';


const Landing = () => {
  return (
    <section className="w-screen h-screen mt-10 bg-white ">
      {/* <div className="max-w-full mx-auto object-cover ">
      <img className="max-w-full max-h-full object-cover" src={Background}/>
      </div> */}

      {/* render 3D text and "Donuts" */}

    

      <Canvas
        className="w-100dvw h-100dvh "
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 5, 2, 8 ]
        } }
        gl={{ clearColor: 'white' }}
    >
      
        <Experience/>

   

    </Canvas>
    
    {/* Display LOG IN BUTTON */}
    {/* <><Button/></>  */}
 

    </section>




  );
}

export default Landing;
