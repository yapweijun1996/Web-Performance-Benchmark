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

## UI Guide

The interface is intentionally simple, but a few labels are easy to misread:

- `语言`: switch the interface language.
- `方法论`: jump to the methodology section.
- `模式`: choose the benchmark profile.
- `快速`: shorter run, useful for a fast check.
- `标准`: default balance of speed and repeatability.
- `压力`: sustained load observations, not a comparable score run.
- `次数`: choose how many runs to repeat.
- `GPU / 评分`: score-based GPU benchmark that can contribute to the overall score.
- `GPU / 压力`: stress observation mode for GPU behavior under load.
- `Run Benchmark`: start the benchmark.
- `历史记录`: view previously saved runs.
- `全部清除`: clear the stored history.

### Device Summary Chips

The chips near the top summarize the current environment:

- Browser name and version.
- Operating system and platform.
- Logical CPU core count.
- Approximate RAM amount.
- GPU renderer string.
- Screen resolution and pixel ratio.
- Color depth.
- Network / connection hints.
- Touch capability.
- UI locale.

### History Rows

Each history entry shows:

- Timestamp of the run.
- Browser family and benchmark mode.
- Overall score or observed-value label.
- CPU, multi-core, GPU, and RAM module scores.
- A qualitative rating such as `优秀`, `强`, or `谨慎`.

### Methodology Summary

The methodology section explains:

- The benchmark measures browser-runtime performance, not raw native hardware speed.
- The overall score is composed only from modules that are included and scorable.
- `已纳入` means the module contributes to the overall score.
- `仅供参考` means the module produced data but was excluded from the overall score.
- `不可评分` means observation-only output.
- `失败` means the module did not complete successfully.
- `不可用` means no usable result was produced.
- The best comparisons are on the same device, browser family, and benchmark version.

## Browser Compatibility

The benchmark is designed for modern Chromium, Firefox, and Safari builds. Some metrics may be unavailable or less comparable depending on GPU, browser engine, power mode, and background throttling.

## Deployment

- Host the files from the same origin as the app shell.
- Keep `index.html`, `sw.js`, `manifest.json`, `assets/`, and `icons/` together.
- If you deploy under a subpath instead of the origin root, update the manifest scope and service worker registration together.

## License

No explicit license file is included in this snapshot.
