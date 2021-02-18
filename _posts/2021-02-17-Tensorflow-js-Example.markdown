---
layout: post
title:  "Tensorflow.js Example"
date:   2021-02-17 21:34:10 -0800
categories: jekyll update
---

The "Tensor:" text that pops up is a result of a tensorflow.js model running in the background.  The slight pause is due to the network training.

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js">
</script>
<body>
<div id="output_field"></div>
</body>
<script>
async function learnLinear(){

const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

model.compile({
loss: 'meanSquaredError',
optimizer: 'sgd'
});

const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

await model.fit(xs, ys, {epochs: 250});

document.getElementById('output_field').innerText = 
model.predict(tf.tensor2d([10], [1, 1]));
}
learnLinear()
</script>
