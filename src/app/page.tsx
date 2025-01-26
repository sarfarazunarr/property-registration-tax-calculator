import React from 'react'
import LandMainCompnent from './components/LandMainCompnent'


const Home = () => {

  return (
    <div className='main_container'>
      <h1>Land Registry Taxes Calculation</h1>
      <p>This project is now under <a href="https://techryzer.com">Techryzer</a>.</p>
      <p className={"mb-20"}>Currently it shows data of Hala, Saeedabad, Matiari</p>
      <LandMainCompnent />
      <p className="notification_message">Soon we are enabling users to add thier own valuation data!</p>
      <p className="notification_message">Some new features will be added soon!</p>
    </div>
  )
}

export default Home
