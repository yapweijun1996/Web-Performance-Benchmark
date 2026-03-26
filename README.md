# Web Performance Benchmark

A lightweight, zero-install browser-based benchmarking tool that measures real-world device performance across CPU, GPU, and memory — producing a single comparable score.

## What It Measures

| Component | Method | Key Metric |
|-----------|--------|------------|
| CPU (Single-thread) | Math-heavy loop on main thread | ops/sec, elapsed ms |
| CPU (Multi-thread) | Web Workers distributed across cores | scaling efficiency % |
| GPU | WebGL fragment shader stress test | avg FPS, frame stability % |
| Memory | 64 MB ArrayBuffer read/write/copy | throughput MB/s |

All scores are **normalized against a 2023 mid-range laptop baseline** (score 1000 = baseline). Higher is better.

## Quick Start

```bash
npm install
npm run dev
```

Open the local URL, click **Run Benchmark**, and view your scores.

## Project Structure

```
├── index.html                  # Entry point / UI layout
├── src/
│   ├── main.js                 # Orchestrator: device detection, benchmark flow, export
│   ├── cpu.js                  # Single-thread + multi-thread (Web Workers) CPU tests
│   ├── gpu.js                  # WebGL shader-based GPU benchmark
│   ├── memory.js               # ArrayBuffer allocation & throughput tests
│   ├── scoring.js              # Baseline normalization + weighted scoring
│   ├── style.css               # Dark theme UI
│   └── workers/
│       └── cpu-worker.js       # Web Worker for parallel CPU computation
├── sample-logic-study-only/    # Reference implementations for study
│   ├── benchmark.js-main/      # JSPerf benchmark.js library
│   ├── Speedometer-main/       # WebKit Speedometer browser benchmark
│   └── stats.js-r17/           # Real-time FPS/memory stats monitor
├── MVP.md                      # Full specification & roadmap
└── docs/                       # Documentation
    ├── architecture.md         # System design & execution flow
    ├── sample-logic.md         # Educational code patterns to learn
    └── api-reference.md        # Module API reference
```

## Scoring System

```
Component Score = (Baseline / Measured) * 1000
Overall Score   = CPU Single (25%) + CPU Multi (35%) + GPU (25%) + RAM (15%)
```

A score of **2000** means 2x faster than baseline. A score of **500** means 2x slower.

## Export

Results can be exported as timestamped JSON for archival and cross-device comparison.

## Browser APIs Used

- `performance.now()` — microsecond-precision timing
- `navigator.hardwareConcurrency` — CPU core detection
- `navigator.deviceMemory` — device RAM estimation
- `Web Workers` — parallel computation
- `WebGL` — GPU rendering
- `requestAnimationFrame` — frame-rate measurement
- `ArrayBuffer` / `Float64Array` — memory bandwidth testing

## Tech Stack

- Vanilla JavaScript (ES6 modules)
- HTML5 / CSS3
- WebGL 1.0
- Vite (build tool)

## Cross-Device Testing Tips

- Use the same browser family across devices
- Disable power-saving / battery saver mode
- Close background apps
- Run 2-3 times and take the median

## Roadmap

- **Phase 2:** WebGPU support, median-based scoring
- **Phase 3:** Online leaderboard, result sharing
- **Phase 4:** WASM benchmarks, ML workloads

## License

See individual files in `sample-logic-study-only/` for their respective licenses.
