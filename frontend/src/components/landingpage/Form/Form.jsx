import React from 'react'
import "./Form.css"


const AboveFooter = () => {
  return (
    <div className='abovefoot'>
      <img className="i5"src="./images/vectorGreen.png" alt="" />
      <div className='subscribe'> 
          <h2>Subscribe to our Newsletter</h2>
          <div className="sub-para">
          <p>Stay updated with our educational news. We promise not to spam mail update. Subscribe now</p>
          </div>
          <label>
            <input type="email" placeholder='Enter you email' id="email" name="email"/>
            <button className='btn'>Send</button>
          </label>
          
        
      </div>
    </div>
  )
}

export default AboveFooter