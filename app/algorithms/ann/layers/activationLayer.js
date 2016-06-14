export default class ActivationLayer extends Layer {

  construct(neuronCount, inputCount, activationFunction) {
    super(neuronCount, inputCount);

    if (!activationFunction) {
      throw new Error("Activation function must be provided.");
    }

    this.activationFunction = activationFunction;
  }

  _initialize() {
    for (let i = 0; i < this.neuronCount; i++) {
      this.neurons[i] = new ActivationNeuron(this.inputCount, this.activationFunction);
    }
  }

}