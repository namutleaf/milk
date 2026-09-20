import { useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

const TICK_GAP = 54;
const TRACK_WIDTH = 258;

interface Props {
  labels: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * A horizontal, left-right value strip instead of a rotary dial — a finger
 * drag (or the chevron buttons) steps between discrete camera stops.
 * Modeled on the exposure scrubbers found in native camera apps: easier to
 * hit precisely on a phone than rotating a virtual ring.
 */
export function ValueRuler({ labels, selectedIndex, onChange }: Props) {
  const [dragOffset, setDragOffset] = useState(0);
  const startIndexRef = useRef(selectedIndex);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 2,
      onPanResponderGrant: () => {
        startIndexRef.current = selectedIndex;
      },
      onPanResponderMove: (_, gesture) => {
        setDragOffset(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        const steps = Math.round(-gesture.dx / TICK_GAP);
        const nextIndex = clamp(startIndexRef.current + steps, 0, labels.length - 1);
        setDragOffset(0);
        if (nextIndex !== selectedIndex) onChange(nextIndex);
      },
      onPanResponderTerminate: () => setDragOffset(0),
    })
  ).current;

  const step = (delta: number) => onChange(clamp(selectedIndex + delta, 0, labels.length - 1));

  const translateX = -selectedIndex * TICK_GAP + dragOffset;

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => step(-1)}
        disabled={selectedIndex === 0}
        hitSlop={12}
        style={styles.chevron}
      >
        <Text style={[styles.chevronLabel, selectedIndex === 0 && styles.chevronDisabled]}>‹</Text>
      </Pressable>

      <View style={styles.track} {...panResponder.panHandlers}>
        <View style={styles.centerMark} pointerEvents="none" />
        <View
          style={[
            styles.tickRow,
            { transform: [{ translateX: TRACK_WIDTH / 2 - TICK_GAP / 2 + translateX }] },
          ]}
        >
          {labels.map((label, index) => (
            <View key={`${label}-${index}`} style={styles.tick}>
              <View style={[styles.tickMark, index === selectedIndex && styles.tickMarkActive]} />
              <Text style={[styles.tickLabel, index === selectedIndex && styles.tickLabelActive]}>
                {label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        onPress={() => step(1)}
        disabled={selectedIndex === labels.length - 1}
        hitSlop={12}
        style={styles.chevron}
      >
        <Text
          style={[styles.chevronLabel, selectedIndex === labels.length - 1 && styles.chevronDisabled]}
        >
          ›
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chevron: {
    width: 28,
    alignItems: 'center',
    paddingVertical: 8,
  },
  chevronLabel: {
    color: colors.cream,
    fontSize: 20,
    fontWeight: '600',
  },
  chevronDisabled: {
    color: colors.creamDim,
    opacity: 0.35,
  },
  track: {
    width: TRACK_WIDTH,
    height: 46,
    overflow: 'hidden',
  },
  centerMark: {
    position: 'absolute',
    left: TRACK_WIDTH / 2 - 1,
    top: 0,
    width: 2,
    height: 14,
    backgroundColor: colors.accent,
  },
  tickRow: {
    flexDirection: 'row',
    position: 'absolute',
    top: 14,
  },
  tick: {
    width: TICK_GAP,
    alignItems: 'center',
  },
  tickMark: {
    width: 1,
    height: 8,
    backgroundColor: colors.hairline,
  },
  tickMarkActive: {
    backgroundColor: colors.accent,
  },
  tickLabel: {
    marginTop: 4,
    fontSize: 11,
    color: colors.creamDim,
  },
  tickLabelActive: {
    color: colors.cream,
    fontWeight: '700',
  },
});
