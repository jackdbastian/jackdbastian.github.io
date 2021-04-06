---
layout: post
title:  "Welcome to Jekyll!"
date:   2021-02-16 21:34:10 -0800
categories: jekyll update
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

JEKYLL requires BLOG post files to be named according to the following format:

{% include apts_list.html %}

`YEAR-MONTH-DAY-title.MARKUP`

Where `YEAR` is a four-digit number, `MONTH` and `DAY` are both two-digit numbers, and `MARKUP` is the file extension representing the format used in the file. After that, include the necessary front matter. Take a look at the source for this post to get an idea about how it works.

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

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

<iframe src="/files/viz.html" height="600px" width="100%" style="border:none;">

</iframe>

<iframe src="https://github.com/jackdbastian/misc/blob/master/apts_map.html" height="600px" width="100%" style="border:none;">

</iframe>

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
