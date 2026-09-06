import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, nativeElevation, typography } from '../theme';

interface Props { icono: string; texto: string; color: string; onPress: () => void; }

export function TarjetaHerramienta({ icono, texto, color, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: color }, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Abrir herramienta ${texto}`}
    >
      <Text style={styles.icon}>{icono}</Text>
      <Text style={styles.text}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: '47%', minHeight: 150, marginBottom: 14, borderRadius: 22, padding: 18, alignItems: 'center', justifyContent: 'center', ...nativeElevation },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  icon: { fontSize: 42, marginBottom: 8 },
  text: { fontSize: typography.button, lineHeight: 23, fontWeight: '800', color: colors.text, textAlign: 'center' },
});
