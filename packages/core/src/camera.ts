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

/**
 * Curated stop lists for the manual exposure UI (a left-right stepper strip,
 * not a rotary dial — precise finger rotation doesn't work well on a phone
 * screen). Each list is the authoritative set of values the ruler can land
 * on, so the future native exposure module reads the same stops the UI
 * offers.
 */
export const APERTURE_STOPS: Aperture[] = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16];

export const SHUTTER_SPEED_STOPS: ShutterSpeed[] = [
  { kind: 'fraction', denominator: 4000 },
  { kind: 'fraction', denominator: 2000 },
  { kind: 'fraction', denominator: 1000 },
  { kind: 'fraction', denominator: 500 },
  { kind: 'fraction', denominator: 250 },
  { kind: 'fraction', denominator: 125 },
  { kind: 'fraction', denominator: 60 },
  { kind: 'fraction', denominator: 30 },
  { kind: 'fraction', denominator: 15 },
  { kind: 'fraction', denominator: 8 },
  { kind: 'fraction', denominator: 4 },
  { kind: 'fraction', denominator: 2 },
  { kind: 'seconds', value: 1 },
];

export const ISO_STOPS: ISO[] = [100, 200, 400, 800, 1600, 3200, 6400];

/** Whole-stop EV compensation. Third-stop granularity is a later refinement. */
export const EXPOSURE_COMPENSATION_STOPS: number[] = [-3, -2, -1, 0, 1, 2, 3];

export function formatAperture(aperture: Aperture): string {
  return `F${aperture}`;
}

export function formatShutterSpeed(shutter: ShutterSpeed): string {
  return shutter.kind === 'fraction' ? `1/${shutter.denominator}` : `${shutter.value}″`;
}

export function formatIso(iso: ISO): string {
  return `ISO ${iso}`;
}

export function formatExposureCompensation(ev: number): string {
  if (ev === 0) return '0';
  return ev > 0 ? `+${ev}` : `${ev}`;
}
