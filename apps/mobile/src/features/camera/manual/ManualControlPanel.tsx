import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  APERTURE_STOPS,
  EXPOSURE_COMPENSATION_STOPS,
  ISO_STOPS,
  SHUTTER_SPEED_STOPS,
  formatAperture,
  formatExposureCompensation,
  formatIso,
  formatShutterSpeed,
  type ExposureMode,
  type ManualExposureSettings,
} from '@milk/core';
import { colors } from '@/theme/colors';
import { ParameterTabs } from './ParameterTabs';
import { ValueRuler } from './ValueRuler';

export type ExposureParam = 'aperture' | 'shutter' | 'iso' | 'ev';

interface Props {
  mode: ExposureMode;
  onToggleMode: () => void;
  settings: ManualExposureSettings;
  onChange: (next: ManualExposureSettings) => void;
}

export function ManualControlPanel({ mode, onToggleMode, settings, onChange }: Props) {
  const [selectedParam, setSelectedParam] = useState<ExposureParam>('aperture');
  const isManual = mode === 'manual';

  const apertureIndex = APERTURE_STOPS.indexOf(settings.aperture);
  const shutterIndex = SHUTTER_SPEED_STOPS.findIndex(
    (s) => formatShutterSpeed(s) === formatShutterSpeed(settings.shutterSpeed)
  );
  const isoIndex = ISO_STOPS.indexOf(settings.iso);
  const evIndex = EXPOSURE_COMPENSATION_STOPS.indexOf(settings.exposureCompensation);

  const rulerFor: Record<ExposureParam, { labels: string[]; selectedIndex: number; onChange: (i: number) => void }> = {
    aperture: {
      labels: APERTURE_STOPS.map(formatAperture),
      selectedIndex: apertureIndex,
      onChange: (i) => onChange({ ...settings, aperture: APERTURE_STOPS[i] }),
    },
    shutter: {
      labels: SHUTTER_SPEED_STOPS.map(formatShutterSpeed),
      selectedIndex: shutterIndex,
      onChange: (i) => onChange({ ...settings, shutterSpeed: SHUTTER_SPEED_STOPS[i] }),
    },
    iso: {
      labels: ISO_STOPS.map(formatIso),
      selectedIndex: isoIndex,
      onChange: (i) => onChange({ ...settings, iso: ISO_STOPS[i] }),
    },
    ev: {
      labels: EXPOSURE_COMPENSATION_STOPS.map(formatExposureCompensation),
      selectedIndex: evIndex,
      onChange: (i) => onChange({ ...settings, exposureCompensation: EXPOSURE_COMPENSATION_STOPS[i] }),
    },
  };

  const active = rulerFor[selectedParam];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable style={[styles.modePill, isManual && styles.modePillActive]} onPress={onToggleMode}>
          <Text style={[styles.modeLabel, isManual && styles.modeLabelActive]}>
            {isManual ? 'M' : 'AUTO'}
          </Text>
        </Pressable>
        {isManual && (
          <Text style={styles.readout} numberOfLines={1}>
            {formatAperture(settings.aperture)} · {formatShutterSpeed(settings.shutterSpeed)} ·{' '}
            {formatIso(settings.iso)} · EV {formatExposureCompensation(settings.exposureCompensation)}
          </Text>
        )}
      </View>

      {isManual && (
        <View style={styles.body}>
          <ParameterTabs selected={selectedParam} onSelect={setSelectedParam} />
          <ValueRuler
            labels={active.labels}
            selectedIndex={active.selectedIndex}
            onChange={active.onChange}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modePill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.overlayScrim,
  },
  modePillActive: {
    backgroundColor: colors.accent,
  },
  modeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.cream,
  },
  modeLabelActive: {
    color: colors.background,
  },
  readout: {
    flex: 1,
    fontSize: 12,
    color: colors.creamDim,
  },
  body: {
    alignItems: 'center',
    gap: 10,
  },
});
