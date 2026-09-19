/**
 * A LOOK describes a rendering pipeline, not a color filter: it changes how
 * tone and color are reconstructed from the source image, not just its hue.
 * This shape is intentionally close to what Lightroom's Develop settings
 * (and therefore .xmp presets) can express, so Phase 5 export is a mapping
 * rather than a rewrite.
 */
export interface ToneCurvePoint {
  input: number; // 0-255
  output: number; // 0-255
}

export interface LookToneAdjustments {
  exposure: number; // stops, e.g. -5..5
  contrast: number; // -100..100
  highlights: number; // -100..100
  shadows: number; // -100..100
  whites: number; // -100..100
  blacks: number; // -100..100
  toneCurve?: ToneCurvePoint[];
}

export interface LookColorAdjustments {
  temperature: number; // Kelvin shift, -100..100 relative
  tint: number; // -100..100
  saturation: number; // -100..100
  vibrance: number; // -100..100
  /** Per-hue HSL adjustments, keyed by the 8 standard color bands. */
  hueSaturationLuminance?: Partial<
    Record<
      'red' | 'orange' | 'yellow' | 'green' | 'aqua' | 'blue' | 'purple' | 'magenta',
      { hue: number; saturation: number; luminance: number }
    >
  >;
  splitToning?: {
    shadowHue: number;
    shadowSaturation: number;
    highlightHue: number;
    highlightSaturation: number;
    balance: number;
  };
}

export interface LookTextureAdjustments {
  clarity: number; // -100..100, local midtone contrast
  texture: number; // -100..100
  grainAmount: number; // 0..100
  grainSize: number; // 0..100
  vignetteAmount: number; // -100..100
}

export interface LookDefinition {
  id: string;
  name: string;
  description?: string;
  /** 'film' | 'bw' | 'clean' | 'custom' etc — used for grouping in the picker UI. */
  category: string;
  tone: LookToneAdjustments;
  color: LookColorAdjustments;
  texture: LookTextureAdjustments;
  /** Monochrome looks skip color adjustments entirely at render time. */
  isMonochrome: boolean;
}
