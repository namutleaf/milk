import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import type { ExposureParam } from './ManualControlPanel';

const TAB_LABEL: Record<ExposureParam, string> = {
  aperture: 'F',
  shutter: 'S',
  iso: 'ISO',
  ev: 'EV',
};

interface Props {
  selected: ExposureParam;
  onSelect: (param: ExposureParam) => void;
}

export function ParameterTabs({ selected, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {(Object.keys(TAB_LABEL) as ExposureParam[]).map((param) => {
        const active = param === selected;
        return (
          <Pressable
            key={param}
            onPress={() => onSelect(param)}
            style={[styles.tab, active && styles.tabActive]}
          >
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{TAB_LABEL[param]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  tabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.creamDim,
  },
  tabLabelActive: {
    color: colors.background,
  },
});
