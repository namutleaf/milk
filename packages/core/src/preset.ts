import type { LookDefinition } from './look';

/**
 * A Preset wraps a LookDefinition with the metadata needed for the
 * community/marketplace phases (authorship, pricing, distribution).
 * Phase 1-3 only ever construct local presets (no author/price); the
 * marketplace fields are optional until Phase 5 turns them on.
 */
export interface PresetAuthor {
  id: string;
  displayName: string;
  avatarUrl?: string;
}

export interface PresetPricing {
  isFree: boolean;
  priceCents?: number;
  currency?: string;
}

export interface Preset {
  id: string;
  look: LookDefinition;
  author?: PresetAuthor;
  pricing?: PresetPricing;
  createdAt: string; // ISO date
  thumbnailUri?: string;
  downloadCount?: number;
}

export interface CapturedPhoto {
  id: string;
  uri: string;
  width: number;
  height: number;
  takenAt: string; // ISO date
  appliedPresetId?: string;
}
