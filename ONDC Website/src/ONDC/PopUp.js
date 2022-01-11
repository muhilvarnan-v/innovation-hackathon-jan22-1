import React from "react";
import { render } from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import tw from "twin.macro";

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-teal-600 text-gray-100 hocus:bg-teal-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  state = {
    open: true
  };

  onCloseModal = () => {
    this.setState({ open: false });
    sessionStorage.setItem('acceptDisclaimer', 1);
  };

  onLogoutClicked = (event) => 
  {
    sessionStorage.clear();
    window.location.reload();
  };

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <Modal open={open} onClose={this.onLogoutClicked}>
          <h2>Disclaimer</h2>
          <br></br>
          <h6>This application is offered as a demo instance and RBEI is not liable for any damages arising in contract or otherwise from the use of or inability to use this site or any material contained in it, or from any action or decision taken as a result of using the site.</h6>
          <br></br>
          <h6>The materials on this site comprise of data uploaded by the end users.</h6>
          <br></br>
          <h6>RBEI, Bosch or its other legal entities are not responsible for the content of any linked site or data uploaded to the site. Users are advised to respect license and privacy rights of authors for any third party content they may upload.</h6>
          <br></br>
          <h6>All data and content will be removed from our servers once the demo instance goes offline.</h6>
          <PrimaryAction onClick={this.onCloseModal}>Accept and Continue</PrimaryAction>
        </Modal>
      </div>
    );
  }
}

export default App;