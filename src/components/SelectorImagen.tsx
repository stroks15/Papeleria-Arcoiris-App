import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface Props {
  multiple?: boolean;
  imagenes: string[];
  onCambiar: (uris: string[]) => void;
}

export function SelectorImagen({ multiple = false, imagenes, onCambiar }: Props) {
  const seleccionar = () => {
    Alert.alert('Agregar fotos', 'En la siguiente integración conectaremos cámara y galería Android. Esta base ya maneja una o varias imágenes.', [
      { text: 'Entendido' },
    ]);
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={seleccionar} accessibilityRole="button">
        <Text style={styles.buttonText}>📷 {multiple ? 'Agregar fotos' : 'Elegir foto'}</Text>
      </Pressable>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.previewRow}>
        {imagenes.map((uri, i) => <Text key={`${uri}-${i}`} style={styles.item}>📄 Foto {i + 1}</Text>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 60, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg },
  buttonText: { color: '#FFF', fontSize: typography.button, fontWeight: '800' },
  previewRow: { paddingVertical: spacing.md, gap: 8 },
  item: { fontSize: typography.body, color: colors.text, backgroundColor: '#F3F4F6', padding: 12, borderRadius: 12 },
});
