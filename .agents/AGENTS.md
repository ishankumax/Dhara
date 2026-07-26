# DharaPod Project Guidelines

## Branding & Terminology
- The platform is named **DharaPod** (not Dhara or Dhara+). Always use "DharaPod" across UI titles, metadata, headers, footers, error boundaries, and documentation.

## Design System & Layout
- **Seamless Single-Canvas Matrix**: Avoid separate outer card borders (`border`) or individual container background boxes around major grid sections. Allow the unified **Topographic Background Canvas** to flow continuously behind all spatial components using `bg-transparent border-none`.
- **Topographic Background**: Use smooth ambient topographic contour lines (`TopographicBackground.tsx`). Do NOT re-introduce mouse parallax or cursor-tracking event listeners to maintain 60 FPS performance with zero CPU overhead.
- **Fixed Layout Height**: Lock top-level container to `h-screen max-h-screen overflow-hidden select-none` with fixed top bar and bottom status bar. Internal scrolling belongs strictly inside individual card scroll containers.

## Status Bar & Timezone Rules
- **Default Clock**: Always display standard IST time formatted without seconds: `HH:MM AM/PM IST` (e.g. `10:52 PM IST`).
- **Country Selection Clock**: When any nation is selected (e.g. USA, CHN, AUS, RUS, JPN), prepend its local time to the **LEFT SIDE** of IST in pure neon text: `{COUNTRY_ID}: HH:MM AM/PM | 10:52 PM IST`.
- **Formatting Constraints**: Do NOT include a clock icon `🕒`, seconds `:SS`, sub-timezone acronyms (`AEST`/`EDT`), or outer pill container boxes around the status bar time. Render directly in neon accent text with drop-shadow glow.

## Vercel Deployment & Git Workflow
- **Vercel Config**: Keep `vercel.json` minimal (`{ "framework": "nextjs" }`) to leverage Vercel's native zero-config `@vercel/next` builder. Do NOT add explicit `buildCommand` overrides in `vercel.json` for Next.js 14 App Router.
- **Data Repository**: Maintain static seed profile imports (`usa.json`, `chn.json`, `ind.json`, etc.) with safe fallback profile objects for unseeded nations to prevent Webpack `MODULE_NOT_FOUND` runtime crashes.
- **Git Synchronization**: Always keep `V.1.0.0` and `main` branches synced, pushing commits to both `origin/V.1.0.0` and `origin/main` with a clean working tree.
