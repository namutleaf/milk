/**
 * Manual camera controls, modeled after real camera dials.
 * Phase 1 only uses `facing`/`flash` from CameraSessionState; the rest
 * (aperture/shutterSpeed/iso/exposureCompensation) are wired up in Phase 2
 * once we move from expo-camera to a module that exposes native manual
 * exposure control (Camera2 on Android, AVFoundation custom exposure on iOS).
 */
export type CameraFacing = 'front' | 'back';

export type FlashMode = 'off' | 'on' | 'auto';

/** f-stop values on a standard full-stop aperture ring. */
export type Aperture = 1.4 | 2 | 2.8 | 4 | 5.6 | 8 | 11 | 16;

/** Shutter speed expressed as 1/denominator seconds, or whole seconds. */
export type ShutterSpeed =
  | { kind: 'fraction'; denominator: number }
  | { kind: 'seconds'; value: number };

export type ISO = 100 | 200 | 400 | 800 | 1600 | 3200 | 6400;

export interface ManualExposureSettings {
  aperture: Aperture;
  shutterSpeed: ShutterSpeed;
  iso: ISO;
  /** EV compensation, in 1/3 stops, typically -3..+3 */
  exposureCompensation: number;
}

export type ExposureMode = 'auto' | 'manual';

export interface CameraSessionState {
  facing: CameraFacing;
  flash: FlashMode;
  exposureMode: ExposureMode;
  manualExposure: ManualExposureSettings;
}

export const DEFAULT_MANUAL_EXPOSURE: ManualExposureSettings = {
  aperture: 2.8,
  shutterSpeed: { kind: 'fraction', denominator: 125 },
  iso: 200,
  exposureCompensation: 0,
};

export const DEFAULT_CAMERA_SESSION: CameraSessionState = {
  facing: 'back',
  flash: 'off',
  exposureMode: 'auto',
  manualExposure: DEFAULT_MANUAL_EXPOSURE,
};
