// Sample dataset
const dataset = [
    { math: 85, science: 78, english: 92, pass: 1 },
    { math: 54, science: 67, english: 45, pass: 0 },
    { math: 76, science: 85, english: 88, pass: 1 },
    { math: 45, science: 56, english: 52, pass: 0 },
    { math: 90, science: 92, english: 95, pass: 1 },
    { math: 40, science: 45, english: 48, pass: 0 }
];

let perceptron = {
    weights: [0, 0, 0],
    learningRate: 0.01,
    epochs: 100,
    train: function (data) {
        for (let epoch = 0; epoch < this.epochs; epoch++) {
            data.forEach(point => {
                const inputs = [point.math, point.science, point.english];
                const target = point.pass;
                const output = this.predict(inputs);
                const error = target - output;

                this.weights = this.weights.map((w, i) => w + this.learningRate * error * inputs[i]);
            });
        }
    },
    predict: function (inputs) {
        const sum = inputs.reduce((acc, val, i) => acc + val * this.weights[i], 0);
        return sum >= 0 ? 1 : 0;
    }
};

function calculateAccuracy(data) {
    let correctPredictions = 0;

    data.forEach(point => {
        const inputs = [point.math, point.science, point.english];
        const prediction = perceptron.predict(inputs);
        if (prediction === point.pass) {
            correctPredictions++;
        }
    });

    return (correctPredictions / data.length) * 100;
}

function trainModel() {
    const learningRate = parseFloat(document.getElementById('learningRate').value);
    const epochs = parseInt(document.getElementById('epochs').value);
    const accuracyThreshold = parseFloat(document.getElementById('accuracyThreshold').value);

    perceptron.learningRate = learningRate;
    perceptron.epochs = epochs;

    perceptron.train(dataset);

    const accuracy = calculateAccuracy(dataset);

    let resultMessage = `Model trained with learning rate: ${learningRate} and epochs: ${epochs}. Accuracy: ${accuracy.toFixed(2)}%`;
    if (accuracy >= accuracyThreshold) {
        resultMessage += ` - Meets the desired accuracy threshold of ${accuracyThreshold}%`;
    } else {
        resultMessage += ` - Does not meet the desired accuracy threshold of ${accuracyThreshold}%`;
    }

    document.getElementById('accuracy').innerText = resultMessage;
}

function testModel() {
    const math = parseFloat(document.getElementById('math').value);
    const science = parseFloat(document.getElementById('science').value);
    const english = parseFloat(document.getElementById('english').value);

    const prediction = perceptron.predict([math, science, english]);

    document.getElementById('prediction').innerText = `Prediction: ${prediction === 1 ? 'Pass' : 'Fail'}`;
}
