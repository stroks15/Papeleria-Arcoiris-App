import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

export function ArcoirisAIAssistant({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.button} accessibilityRole="button" accessibilityLabel="Abrir ArcoirisAI Assistant">
      <Text style={styles.text}>🤖 ArcoirisAI</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    minHeight: 56,
    paddingHorizontal: 18,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    elevation: 6,
  },
  text: { color: '#FFF', fontSize: 18, fontWeight: '900' },
});
