import preprocess from 'svelte-preprocess';
// Auto adapter has problems in this old version with Vercel
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		adapter: adapter()
	}
};

export default config;
