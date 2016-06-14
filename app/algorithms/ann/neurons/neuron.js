export default class Neuron {

  construct(inputCount) {
    this.inputCount = Math.max(1, inputCount);
    this.weights = [];
    this.output = 0;

    this._randomize();
  }

  compute(input) {
    if (!(input instanceof Array)) {
      throw new TypeError("Input must be an array.");
    }
    if (input.length !== this.inputCount) {
      throw new Error(`Given input size '${input.length}' does not match neuron's input size '${this.inputCount}'.`);
    }
  }

  _randomize() {
    for (let i = 0; i < this.inputCount; i++) {
      this.weights[i] = Math.random();
    }
  }

}