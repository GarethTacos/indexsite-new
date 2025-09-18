import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html' // Optional: For SPA fallback
    }),
    paths: {
      //base: '/<your-repo-name>' // e.g., '/indexsite-new'
    }
  }
};

