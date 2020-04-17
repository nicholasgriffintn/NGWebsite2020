---
title: Making my site's content static with Nuxt
published: true
description: Separating my app from the server with static content and Nuxt
tags: javascript,Nuxt,Vue,Static Site,Markdown
thumbnail: https://cdn.nicholasgriffin.dev/nuxt-thumbnail.png
header: https://cdn.nicholasgriffin.dev/images/Screenshot+2019-05-30+at+22.44.00.png
ctime: 2019-05-30
---

So a few months ago I wrote about how [i created a blog for myself with Node, Express and Mongo](https://nicholasgriffin.dev/post-single/5c7be6e2a1e5fbe51cd94950). I've been using that system for a couple of months now and it worked well in terms of allowing me to play around with Mongo and Express, however, it is not the best solution on offer.

So yesterday, I decided that noow would be a good time to start creating a  new static site setup that would allow my application to be hosted separately from the server. I also wanted my app to be a static site so that i could host it on S3.

There are a range of options out there for creating static sites with Node, however, I wanted to do more with Vue.js and so II decided that Nuxt would be the best option.

## Getting started with Nuxt

Setting up Nuxt is actually incredibly simple via their create-nuxt-app tool.

To start with it you'll need to make sure that you have npx and npm installed. Once you do, you simply need to run the following command: `yarn create nuxt-app <project-name>`.

![](https://cdn.nicholasgriffin.dev/images/Screenshot+2019-05-30+at+22.59.00.png)

This should then do everything for you, aside from answering a few questions about your app, which it will leave to you.

I won't go through the rest as the next part will depend on your own project, however, there are a ton of Nuxt tutorials out there and it's really simple,  I moved this website over night and while it does still have  a couple of issues (and I still need to do  the server part), the process was painless thanks  to Nuxt and Vue.

## Moving our blog to Nuxt with Markdown

So as you might have already gathered, since I am going completely static, I am going to have to move my blog from the old Mongo install to something slightly more static.

To do that, I decided that I would use a Markdown transform to create the static HTML pages on Nuxt build.

**Adding our dependencies**

To get started with this we will need to install the following dependencies:

- frontmatter markdown loader
- markdownit (nuxtjs)
- Moment

We will install those with the following:

```
yarn add --save-dev frontmatter-markdown-loader @nuxtjs/markdownit moment
```

We'll be using frontmatter to load the markdown files on the front-end via Webpack, it does this by generating Compiled HTML and Attributes for the Markdown file.

To set this up, we will need to add the following extension  to our build config with the nuxt config file.

```javascript
build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: ['raw-loader']
      });
    }
}
```

This will basically push any markdown files to the raw-loader.

**Extending our store**

Next up, we need to build our store file to allow us to handle data from the Markdown files within  our app.

In  particular, we will  be using it to show our blog posts on other pages, such as a blog page or homepage.

We'll first need to set up a state for our blog  listings:

```javascript
export  const  state  = () => ({
  bloglist: []
});

export  const  mutations  = {
	set(state, list) {
		state.bloglist  =  list;
	}
};
```

And now we will need to actually set our state for the bloglist.

To do that, we will be using the `nuxtServerInit` function,  which is built into Vuex for updating the store on the fly. We will be using it to read the articles folder and then commit the information from those articles to the store alongside that  articles attributes.

```javascript
export const actions = { 
	async nuxtServerInit({ commit }) { 
		const fm = require('front-matter'); 
		const moment = require('moment');
		 let files = await require.context('~/articles/', false, /\.md$/); 
		 let posts = files 
		 .keys() 
		 .map(key => {{ 
			 let res = files(key); 
			 res.slug = key.slice(2, -3); 
			 return res; 
		 }) 
		 .map(post => { 
			 let attributes = fm(post.default)
			 .attributes; 
			 attributes.slug = post.slug; 
			 attributes.ctime = moment(attributes.ctime).format('YYYY-MM-DD'); 
			 return attributes; 
		 }) 
		 .sort((a, b) => { 
			 return a.ctime < b.ctime; 
		 }); 
		 await commit("set", posts); 
	 }
 };
 ```

A couple things to note here:

- I am using YYYY-MM-DD to format the data but you can use anything that moment supports.
- I am also setting a sort to  show the latest posts first, if you want to change this, you'll need to edit this sort functionality.

**Creating the bloglist component**

Next, we are going to create a component that will use this store to show your bloglist in any location that you want.

We'll also add a slot in this for determining if this list should be paginated to make it more reusable.

In the component, we will have the following config:

```javascript
export  default {
	computed: {
		bloglist() {
			if ( !  this.isPaginated ) {
				return this.$store.state.bloglist.slice(0,this.postsPerPage);
			} else {
				return  this.$store.state.bloglist;
			}
		},
		totalPages() 
			return this.isPaginated  ?  Math.ceil(this.$store.state.bloglist.length /  this.postsPerPage) :  1
		}
	},
	props: 
	isPaginated:  Boolean,
	postsPerPage:  Number
	}
};
```

You  can then create v-for loop to display the  content for the post, like the following:

```html
<article  v-for="(post,key) in  bloglist" :key="key"  class="ui card">
<div  class="image">
	<img
		:src="post.thumbnail"
		:alt="post.title"
		loading="lazy"
	/>
</div>
```

You can expand that with as many attributes as you have in your markdown files.

**Creating the page template and route for our blog posts**

Now that we have our blog list, we need to create our actual  blog post page.

To do this, we will need to split the content from the markdown file from the attributes.

For this to work, you'll need to set attributes at  the top of the markdown file for each parameter that you want within your attributes, like the following:

```markdown

---
title:  Making my site's content static with Nuxt
published:  true
description:  Separating my app from the server with static content and Nuxt
tags:  javascript,Nuxt,Vue,Static Site,Markdown
thumbnail:  https://cdn.nicholasgriffin.dev/images/Screenshot+2019-05-30+at+22.51.01.png
header:  https://cdn.nicholasgriffin.dev/images/Screenshot+2019-05-30+at+22.44.00.png
ctime:  2019-05-30
---

```

We will be able to use  these on both the blog page and the single blog page.

Now we need to create an index file for the page path of our single post, for me that starts by creating a folder within the pages folder called 'single-post',  then within that,  we will create our route folder, which for this is '_post'.

Finally, within the _post folder we will create an index.vue file, within that we'll need the following script, which will set up our data and get us started.

```javascript
const  hljs  =  require('highlight.js');
const  fm  =  require("front-matter");
const  md  =  require("markdown-it")({
	html:  true,
	langPrefix:  '',
	typographer:  true,
	highlight:  function (str, lang) {
		if (lang  &&  hljs.getLanguage(lang)) {
			try {
				return  hljs.highlight(lang, str).value;
			} catch (__) {}
		}
		return  '';
	}
});

export  default {
	async  asyncData({ params }) {
		const  fileContent  =  await  import(`~/articles/${params.post}.md`)
		let  res  =  fm(fileContent.default);
		return {
			attributes:  res.attributes,
			content:  md.render(res.body)
		};
	},

	head() {
		return {
            title:  this.attributes.title  +  ' | Nicholas Griffin',
            meta: [

                    {
                        hid:  "description",
                        name:  "description",
                        content:  this.attributes.description
                    }
            ]
        };
    }
};
```

We can then use that with something like the following:

```html
<div :key="$route.params.post">
	<div  class="single-page">
		<div  class="header-single-image-full">
			<img
				:src="attributes.header"
				:alt="attributes.title"
				loading="lazy"
			/>
		</div>
```

## And that's it

And that's about just about all I had to do to get started with Nuxt and static sites, besides the actual building of it.

For that I have another article planned that should go through how I get this onto S3, for which I have a Codepipeline  setup.

Something to look forward to I guess.

![](https://media.giphy.com/media/idFxmiV2dayJEqzXaW/giphy.gif)
