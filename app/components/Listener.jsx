import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Listener.css';

export default class Listener extends Component {

  componentDidMount() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.distortion = this.audioContext.createWaveShaper();
    this.gainNode = this.audioContext.createGain();
    this.biquadFilter = this.audioContext.createBiquadFilter();
  }

  render() {
    return (
      <div>
        <div>
          <h2>Listener</h2>
        </div>
      </div>
    );
  }
}
