import './App.css';

import React from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import ResultContainerPlugin from './ResultContainerPlugin.jsx'
import HowToUse from './HowToUse.jsx'
import app_logo from './images/app_ico0.png'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedResults: []
    }

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    // console.log(this.state.decodedResults)
    return (
      <div className="App">
        <section className="App-section">

        <img className='parkit_logo'  src={app_logo} alt="logo" />

          <div className="App-section-title"> Park-IT Paiement</div>
          <br />
          
          <br />
          <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}
            />
          <ResultContainerPlugin results={this.state.decodedResults} />

         


          {/* <HowToUse /> */}
        </section>
      </div>
    );
  }

  onNewScanResult(decodedText, decodedResult) {
    console.log(
      "App [result]", decodedResult);

    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      return state;
    });
  }
}

export default App;
