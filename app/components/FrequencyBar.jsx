import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FrequencyBar.css';

export default class FrequencyBar extends Component {

  componentDidMount() {
    this.audioContext = new AudioContext();

    this.analyser = this.audioContext.createAnalyser();

    this.source = this.audioContext.createMediaStreamSource(stream);
    this.analysersource.connect(analyser);
    analyser.connect(distortion);
  }

  render() {
    return (
      <div>
        <div>
          <h2>FrequencyBar</h2>
        </div>
      </div>
    );
  }
}
