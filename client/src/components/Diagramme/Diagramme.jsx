import React, { useEffect } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import './Diagramme.css';

const Diagramme = () => {
  // Initialize GSAP Draggable for cards
  useEffect(() => {
    gsap.registerPlugin(Draggable);

    // Draggable options
    const draggableOptions = {
      type: 'x,y',
      edgeResistance: 0.65,
      bounds: '.container', // Specify the container for boundaries
    };

    // Apply Draggable to elements with class "flair"
    Draggable.create('.flair', draggableOptions);
  }, []);

  return (
    <div className="container">

        <div className='tableau1 '></div>
        <div className='tableau2 '></div>
        <div className='tableau3 '></div>


      <div className="wrapper">
        <div className="flair flair--1" style={{ x: '50%', y: '0%' }}>
        <div class="w3-card-4">

<header class="w3-container w3-blue">
  <h1>1</h1>
</header>

<div class="w3-container">
  <p>Lorem ipsum...</p>
</div>


</div>        </div>
      </div>
      <div className="wrapper">
        <div className="flair flair--2" style={{ x: '100%', y: '50%' }}>
        <div class="w3-card-4">

<header class="w3-container w3-blue">
  <h1>2</h1>
</header>

<div class="w3-container">
  <p>Lorem ipsum...</p>
</div>



</div>        </div>
      </div>
      <div className="wrapper">
        <div className="flair flair--3" style={{ x: '50%', y: '100%' }}>
        <div class="w3-card-4">

<header class="w3-container w3-blue">
  <h1>3</h1>
</header>

<div class="w3-container">
  <p>Lorem ipsum...</p>
</div>


</div>        </div>
      </div>
    </div>
  );
};

export default Diagramme;
