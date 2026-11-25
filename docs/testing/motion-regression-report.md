# Motion & Reduced-Motion Verification Report

- **Animation Runtime**: GSAP + ScrollTrigger registered in `src/animations/gsapSetup.ts`.
- **Context Cleanup**: All route timelines clean up via `gsap.context()` / ScrollTrigger revert on route transitions.
- **Reduced Motion Compliance**: `prefersReducedMotion()` disables animated offsets/opacity traps when `(prefers-reduced-motion: reduce)` matches, keeping all headings, body copy, and interactive controls visible immediately.
- **Video Motion Controls**: Background videos on `/cinematic/home-cinematic` and `/overview` include poster fallbacks, `muted`, `playsInline`, and `loop`.
