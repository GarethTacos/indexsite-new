import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const config = {
  // Use the 'preprocess' function you've imported
  preprocess: preprocess(), 

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    paths: {
      // You can set a base path if your site is hosted in a subdirectory
      // base: '/my-static-site',
    },
  }
};

export default config;
