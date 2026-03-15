import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { moderateScale, scaleFont } from '../utils/responsive';

type Variant = 'primary' | 'secondary' | 'danger';

type Props = {
  text: string;
  onPress?: () => void;
  variant?: Variant;
};

const Button=({ text, onPress, variant = 'primary' }: Props)=> {
  const background =
    variant === 'primary'
      ? '#2563eb'
      : variant === 'secondary'
      ? '#6b7280'
      : '#ef4444';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: background }]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
export default Button
const styles = StyleSheet.create({
  button: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    minWidth: moderateScale(80),
  },
  text: {
    color: '#fff',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
});
