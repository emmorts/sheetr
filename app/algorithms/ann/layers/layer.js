export default class Layer {

  construct(neuronCount, inputCount) {
    this.neuronCount = Math.max(1, neuronCount);
    this.inputCount = Math.max(1, inputCount);
    this.neurons = new Array(neuronCount);
    this.output = new Array(neuronCount);
  }

  compute(input) {
    this.neurons.forEach((neuron, i) => {
      this.output[i] = neuron.compute(input);
    });

    return this.output;
  }

  randomize() {
    this.neurons.forEach(neuron => neuron.randomize());
  }

  _initialize() {
    for (let i = 0; i < this.neuronCount; i++) {
      this.neurons[i] = new Neuron(this.inputCount);
    }
  }

}