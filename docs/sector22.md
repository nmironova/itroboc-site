# Sector 22 Halloween panel

Hidden URL: `https://itroboc.com/x22-7f3c9a`. No navigation or sitemap entry.

Before the game:

1. Set `NTFY_TOPIC` in `src/Sector22.tsx` to your ntfy topic and subscribe to that exact topic in the Android ntfy app. The placeholder blocks publishing until replaced.
2. Keep photographs in `public/sector22/routes/`, named `route-01.jpg` through `route-57.jpg` (lowercase). All 57 photographs have been added. If the number changes, update `ROUTE_COUNT` in `src/Sector22.tsx`.
3. Build and deploy, then test an emergency message and a route on the actual phone. Verify the corresponding image URL opens publicly. Photos must be deployed before route attachments work.

The panel uses browser GET requests to ntfy's `/publish` endpoint with URL-encoded query parameters. Successful status means ntfy returned a message receipt, not confirmation that a phone displayed it. Errors never automatically retry; if a request times out, check the receiving phone before manually retrying.

All transmission buttons lock synchronously during a request and for at least two seconds per send to prevent accidental duplicate taps. Requests time out after 15 seconds. The topic and hidden route are public client-side configuration, not authentication.

No backend, dependencies, or additional infrastructure. The exact Vercel rewrite supports direct navigation to the hidden route. The existing landing page is unchanged.
