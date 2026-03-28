# Web Performance Benchmark

A static, zero-install browser benchmark that measures CPU, GPU, and memory performance and reports a single comparable score.

This repository is a shipped snapshot, not the original source tree. It contains the built app shell, hashed assets, icons, manifest, and service worker needed to run the benchmark as a standalone site.

## What It Measures

| Component | Method | Key Metric |
|---|---|---|
| CPU (Single-thread) | Math-heavy loop on the main thread | ops/sec, elapsed ms |
| CPU (Multi-thread) | Web Workers distributed across cores | scaling efficiency % |
| GPU | WebGL fragment shader stress test | avg FPS, frame stability % |
| Memory | ArrayBuffer read/write/copy benchmark | throughput MB/s |

Scores are normalized against a baseline and are intended for comparisons on the same browser family and version.

## Run It Locally

Serve the repository as static files and open the local URL in a browser:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

Any static file server will work. No `npm install` or build step is required for this snapshot.

## Repository Layout

```text
├── index.html                  # App shell and UI markup
├── sw.js                       # Service worker for offline caching
├── manifest.json               # PWA metadata
├── assets/
│   ├── index-r4GnO-rm.js       # Bundled application logic
│   ├── index-Zl2XYTO-.css      # Bundled styles
│   └── cpu-worker-CXL0w28z.js  # Web Worker used by the CPU benchmark
├── icons/
│   ├── icon-192.svg
│   └── icon-512.svg
└── README.md
```

## Notes

- The service worker currently assumes a root deployment.
- The manifest and app shell use relative asset paths.
- The benchmark uses `performance.now()`, Web Workers, WebGL, `requestAnimationFrame`, and `ArrayBuffer`-based memory tests.
- Results can be exported as JSON and shared through the browser share or clipboard APIs when available.

## Browser Compatibility

The benchmark is designed for modern Chromium, Firefox, and Safari builds. Some metrics may be unavailable or less comparable depending on GPU, browser engine, power mode, and background throttling.

## Deployment

- Host the files from the same origin as the app shell.
- Keep `index.html`, `sw.js`, `manifest.json`, `assets/`, and `icons/` together.
- If you deploy under a subpath instead of the origin root, update the manifest scope and service worker registration together.

## License

No explicit license file is included in this snapshot.
