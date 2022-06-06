# WebsiteMonitor
 A mini project that ping the websites by using Cloudflare Worker and store the records by Cloudflare Worker KV. This react app is deployed on Cloudflare Pages.

## Cloudflare Workers
```
npm install -g wrangler
wrangler login
wrangler generate website-monitor
wrangler kv:namespace create "WEBSITES"
wrangler publish
```
