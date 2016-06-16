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

    this._draw.call(this, bufferLength, dataArray);
  }

  render() {
    return (
      <canvas ref={ c => this._canvas = c }></canvas>
    );
  }

  _draw(binCount, dataArray) {
    this.drawVisual = requestAnimationFrame(() => this._draw.call(this, binCount, dataArray));

    this.props.analyser.getByteFrequencyData(dataArray);

    this.canvasContext.fillStyle = 'rgb(0, 0, 0)';
    this.canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);

    const barWidth = (this._canvas.width / binCount) * 2.5;

    let barHeight;
    let x = 0;

    for (let i = 0; i < binCount; i++) {
      barHeight = dataArray[i] * 3;

      this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
      this.canvasContext.fillRect(x, this._canvas.height - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }
    this._drawDetails.call(this, binCount, dataArray);
  }

  _drawDetails(binCount, dataArray) {
    const max = Math.max(...dataArray);
    const avg = ~~(dataArray.reduce((c, n) => c + n, 0) / binCount);
    this.canvasContext.font = '18pt serif';
    this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
    this.canvasContext.fillText(`Max Frequency: ${max}`, 10, 40);
    this.canvasContext.fillText(`Average Frequency: ${avg}`, 10, 80);
  }
}
