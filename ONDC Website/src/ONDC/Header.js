import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoschLogo from 'images/BoschLogo.png';
import MakeinIndia from 'images/MakeInIndia.jpg';
import tw from "twin.macro";
import MyBosch from 'images/MyBosch.png'
import ContactUs from 'images/ContactUs.png'

const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-blue-800 font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-blue-700 hocus:-translate-y-px hocus:shadow-xl`;
const SixColumns = tw.div`flex flex-wrap text-center sm:text-left justify-center sm:justify-start md:justify-between -mt-10`;

class Header extends React.Component
{
  render()
  {
    const onLogoutClicked = (event) => 
    {
      sessionStorage.clear();
      window.location.reload();
    };

    const handleScroll = (event) =>{
      window.scroll({
        top: document.body.offsetHeight,
        left: 0, 
        behavior: 'smooth',
      });
    }

    return (
      <div class="">
          <nav class="navbar navbar-expand-sm">
           <img className="boschLogo" src={BoschLogo} alt="BoschLogo"/>
           <img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/>
           <img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/>
           <img className="makeInIndiaLogo" src={MakeinIndia} alt="MakeInIndiaLogo"/>
           <img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/>
           <img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/>
           <img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/><img/>
           <button><img src={MyBosch} className="headerIcon" alt="my image" onClick={onLogoutClicked} /></button>
           <span>
           <button style={{textAlign:'center',fontSize:20, fontWeight: 'bold'}} onClick={onLogoutClicked}>{sessionStorage.getItem("userName")}</button>
           <br></br>
        <button style={{textAlign:'center',fontSize:16, fontStyle: 'italic'}} onClick={onLogoutClicked}>{"Bharat Stores, Jayanagar, Bengaluru"}</button>
        <br></br>
        <button style={{textAlign:'center',fontSize:15}} onClick={onLogoutClicked}>{"Home Decor"}</button>
      </span>
            {/* <img className="headerIcon" src={ContactUs} alt="BoschLogo"/>
            <button onClick={handleScroll}>Contact</button> */}
      </nav>
      </div>
         
    )
  }
}
export default Header;