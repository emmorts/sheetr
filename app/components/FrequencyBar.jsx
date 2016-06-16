import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FrequencyBar.css';

export default class FrequencyBar extends Component {

  componentWillMount() {
    this.drawVisual = null;
  }

  handleResize() {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }

  componentDidMount() {
    this.canvasContext = this._canvas.getContext('2d');
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  visualize() {
    this.props.analyser.fftSize = 64;

    const bufferLength = this.props.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    this.canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);

    function draw() {
      this.drawVisual = requestAnimationFrame(draw.bind(this));

      this.props.analyser.getByteFrequencyData(dataArray);

      this.canvasContext.fillStyle = 'rgb(0, 0, 0)';
      this.canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);

      const barWidth = (this._canvas.width / bufferLength) * 2.5;

      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 3;

        this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
        this.canvasContext.fillRect(x, this._canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    draw.call(this);
  }

  render() {
    return (
      <canvas ref={ c => this._canvas = c }></canvas>
    );
  }
}
