export default class ActivationNeuron extends Neuron {

  construct(inputCount, activationFunction) {
    super(inputCount);

    if (!activationFunction) {
      throw new Error("Activation function must be provided.");
    }

    this.activationFunction = activationFunction;
  }

  compute(input) {
    super(input);

    let sum = 0;

    for (let i = 0; i < this.inputCount; i++) {
      sum += input[i] * this.weights[i];
    }

    sum += this.threshold;

    return activationFunction.activate(sum);
  }

  _randomize() {
    super();

    this.threshold = Math.random();
  }

}
