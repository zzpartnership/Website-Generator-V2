// @ts-check
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Static by default. Routes that opt out with `export const prerender = false` run on the Worker.
  output: 'static',
  // No sessions. Without this the adapter adds a SESSION KV binding the Worker never uses and a first deploy has to provision.
  session: false,
  adapter: cloudflare({
    // Optimise images at build time. No Cloudflare Images binding required.
    imageService: 'compile',
    // Prerender in Node rather than workerd. Same output, fewer moving parts at build time.
    prerenderEnvironment: 'node',
  }),
  vite: {
    plugins: [tailwindcss()],
    // @zz/motion is linked by path; make it use this site's copy of GSAP and Lenis.
    resolve: { dedupe: ['gsap', 'lenis'] },
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      SUPABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      SUPABASE_SERVICE_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      NOTIFY_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      FROM_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true, default: 'site@zzpartnership.com.au' }),
    },
  },
});
