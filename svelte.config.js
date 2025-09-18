import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html' // Optional: For SPA fallback
    }),
    paths: {
      base: '/indexsite-new' // e.g., '/indexsite-new'
    }
  }
};

