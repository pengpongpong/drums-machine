import './App.css';
import React from 'react';

const instrument1 = [
  {
    keyCode: 81,
    keyPress: 'Q',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    id: 'heater-1'   
  },
  {
    keyCode: 87,
    keyPress: 'W',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    id: 'heater-2' 
  },
  {
    keyCode: 69,
    keyPress: 'E',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    id: 'heater-3'
  },
  {
    keyCode: 65,
    keyPress: 'A',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    id: 'heater-4'    
  },
  {
    keyCode: 83,
    keyPress: 'S',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    id: 'clap'   
  },
  {
    keyCode: 68,
    keyPress: 'D',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    id: 'open-HH'   
  },
  {
    keyCode: 90,
    keyPress: 'Z',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    id: "kick-n-hat"   
  },
  {
    keyCode: 88,
    keyPress: 'X',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    id: 'kick'   
  },
  {
    keyCode: 67,
    keyPress: 'C',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    id: 'closed-hh'    
  }
];
const instrument2 = [
  {
    keyCode: 81,
    keyPress: 'Q',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
    id: 'chord-1'   
  },
  {
    keyCode: 87,
    keyPress: 'W',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
    id: 'chord-2'    
  },
  {
    keyCode: 69,
    keyPress: 'E',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
    id: 'chord-3'   
  },
  {
    keyCode: 65,
    keyPress: 'A',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
    id: 'shaker'    
  },
  {
    keyCode: 83,
    keyPress: 'S',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
    id: 'open-hh' 
  },
  {
    keyCode: 68,
    keyPress: 'D',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
    id: 'closed-hh'   
  },
  {
    keyCode: 90,
    keyPress: 'Z',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
    id: 'punchy-kick'   
  },
  {
    keyCode: 88,
    keyPress: 'X',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
    id: 'side-stick'  
  },
  {
    keyCode: 67,
    keyPress: 'C',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    id: 'snare'   
  }
];

const toneStyleGray = {
  backgroundColor: "gray",
  border: "1px solid black"
};

const toneStyleLightGray = {
  backgroundColor: "white",
  border: "1px solid black"
}

class Tone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toneStyle: toneStyleGray
    };
    this.handleKey = this.handleKey.bind(this);
    this.playTone = this.playTone.bind(this);
    this.toneColor = this.toneColor.bind(this);
    this.toneColor1 = this.toneColor1.bind(this)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey)
  };

  handleKey(event) {
    console.log(this.props.keyCode)
    if (event.keyCode === this.props.keyCode) {
      this.playTone();
    }
  }

  playTone() {
    const tone = document.getElementById(this.props.keyPress);
    tone.currentTime = 0;
    tone.play();
    this.props.showDisplay(this.props.audioId.replace(/-/g, " "));
    this.toneColor();
    setTimeout(() => this.toneColor1(), 100)
  }

  toneColor() {
    this.setState({toneStyle: toneStyleLightGray});
  }

  toneColor1() {
    this.setState({toneStyle: toneStyleGray})
  }

  render() {

    return (
      <div
      className="toneSample"
      onClick={this.playTone}
      style={this.state.toneStyle}
      >
        <audio
        className="audioTone"
        src={this.props.audioTone}
        id={this.props.keyPress}
        >
        </audio>
        {this.props.keyPress}
      </div>
    )
  }
}

class ToneCollection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let toneCollection;
    toneCollection = this.props.currentInstrument.map((obj, index, toneArr) => {
      return (
        <Tone 
          audioTone={toneArr[index].link}
          keyPress={toneArr[index].keyPress}
          keyCode={toneArr[index].keyCode}
          audioId={toneArr[index].id}
          showDisplay={this.props.showDisplay}
        />
      )
    })
    return <div className="toneCollection">{toneCollection}</div>;
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInstrument: instrument1,
      currVolume: 0.3,
      display: "",
      buttonDisplay: "Change to Chords"
    }
    this.changeInstrument = this.changeInstrument.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.displayShow = this.displayShow.bind(this);
  };

  
  changeInstrument() {
   if (this.state.currentInstrument === instrument1) {
    this.setState({
      currentInstrument: instrument2,
      display: "Chords",
      buttonDisplay: "Change to Drums"
    })
   }
   else if (this.state.currentInstrument === instrument2) {
    this.setState({
      currentInstrument: instrument1,
      display: "Drums",
      buttonDisplay: "Change to Chords"
    })
   }
  };

  changeVolume(event) {
    this.setState({
      currVolume: event.target.value,
      display: (this.state.currVolume * 100).toFixed(0)
    })
  };

  displayShow(title) {
    this.setState({display: title})
  }

  render() {
    // change instrument
    
    const tones = [].slice.call(document.getElementsByClassName("audioTone"));
    tones.forEach(tone => {
      tone.volume = this.state.currVolume;
    })
    
    return (
      <div className="containerMachine">
      <h1 className="headTitle">Drums/Chord Machine</h1>
      <div className="containerDrum">
        <ToneCollection
          toneVolume={this.state.changeVolume}
          currentInstrument={this.state.currentInstrument}
          showDisplay={this.displayShow}
        />
        <div className="containerControls">
        <div className="display">{this.state.display}</div>
        <button onClick={this.changeInstrument}>{this.state.buttonDisplay}</button>
          <div className="volumeSlider">
            <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={this.changeVolume}
            value={this.state.currVolume}
            ></input>
          </div>
        </div>
      </div>

      </div>
    )
  }
}

export default App;
