# MILK Roadmap

MILK is being built in five phases. Each phase should be runnable and
testable on a real phone via Expo Go before moving to the next.

- [x] **Phase 1 — Camera & capture.** Live viewfinder, shutter, flip camera,
      flash toggle, save to library. (`apps/mobile`)
- [ ] **Phase 2 — Manual controls.** Aperture/shutter-speed/ISO/exposure
      dials with real camera-dial feel. Requires moving off `expo-camera`
      to a module exposing native manual exposure control
      (Camera2 on Android, custom `AVCaptureDevice` exposure mode on iOS) —
      likely `react-native-vision-camera` behind a custom dev client, since
      Expo Go can't load custom native modules.
- [ ] **Phase 3 — LOOK / preset engine.** GPU-shader render pipeline
      (`packages/looks-engine`) driven by `LookDefinition`
      (`packages/core/src/look.ts`): tone curve, color grading, grain,
      vignette. Built-in looks (film, high-contrast B&W, clean/neutral).
      User-created looks via an in-app editor.
- [ ] **Phase 4 — Save, organize, share presets.** Local preset library,
      export/import as a shareable file, thumbnails.
- [ ] **Phase 5 — Marketplace & Lightroom export.** Backend for
      community/marketplace (`apps/api`, `apps/web`), buy/sell presets,
      and `.xmp` export mapped from `LookDefinition`.

## Why the structure is shaped this way

- `packages/core` holds the types every phase shares
  (`CameraSessionState`, `LookDefinition`, `Preset`) so Camera, Look,
  Preset, Community and Marketplace can be built as separate concerns
  that agree on the same data shapes from day one.
- `packages/looks-engine` isolates the rendering pipeline from the mobile
  app so it can later run in a marketplace web preview too, without
  depending on React Native.
- `apps/mobile` only contains UI and device integration
  (`src/features/camera`, later `src/features/looks`,
  `src/features/presets`, ...).
