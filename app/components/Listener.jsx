import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Listener.css';
import FrequencyBar from './FrequencyBar';

export default class Listener extends Component {

  componentWillMount() {
    this.audioContext = new AudioContext();

    this.analyser = this.audioContext.createAnalyser();
    this.gainNode = this.audioContext.createGain();
    this.biquadFilter = this.audioContext.createBiquadFilter();

    this._initialize();
  }

  componentDidMount() {
    navigator.getUserMedia({ audio: true, video: false }, stream => {
      let source = this.audioContext.createMediaStreamSource(stream);

      source.connect(this.analyser);
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.biquadFilter);
      this.biquadFilter.connect(this.audioContext.destination);

      this.biquadFilter.type = 'lowpass';
      this.biquadFilter.frequency.value = 8000;
      this.biquadFilter.gain.value = 50;

      this._frequencyBar.visualize();
    }, this._onError.bind(this));
  }

  render() {
    return (
      <FrequencyBar
        analyser={this.analyser}
        ref={ fb => this._frequencyBar = fb } />
    );
  }

  _initialize() {
    navigator.getUserMedia = navigator.mediaDevices.getUserMedia
      || navigator.getUserMedia
      || navigator.webkitGetUserMedia;
  }

  _onError() {
    console.log('Rejected.', e);
  }
}
