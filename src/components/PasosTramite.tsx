import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface Props {
  pasoActual: number;
  onReiniciar: () => void;
}

const pasos = ['Elegir trámite', 'Capturar datos', 'Validar información', 'Finalizar'];

export function PasosTramite({ pasoActual, onReiniciar }: Props) {
  const actual = Math.min(4, Math.max(1, pasoActual));

  const reiniciar = () => {
    Alert.alert('Nuevo trámite', '¿Quieres empezar un trámite nuevo?\n\nSe borrará lo que llevas.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sí, empezar de nuevo', style: 'destructive', onPress: onReiniciar },
    ]);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.steps} accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: 4, now: actual }}>
        {pasos.map((nombre, index) => {
          const n = index + 1;
          const completed = n < actual;
          const active = n === actual;
          return (
            <React.Fragment key={nombre}>
              <View style={styles.step}>
                <View style={[styles.circle, completed && styles.completed, active && styles.active]}>
                  <Text style={styles.circleText}>{completed ? '✓' : n}</Text>
                </View>
                <Text numberOfLines={2} style={[styles.label, active && styles.activeLabel]}>{nombre}</Text>
              </View>
              {n < 4 && <View style={[styles.line, n < actual && styles.completedLine]} />}
            </React.Fragment>
          );
        })}
      </View>
      <Text style={styles.help}>
        {actual === 1 ? 'Primero elige lo que deseas hacer. ¡Vamos juntos!' :
          actual === 2 ? 'Vamos paso a paso. Captura tus datos con calma.' :
          actual === 3 ? 'Revisa con calma que toda tu información sea correcta.' :
          '¡Excelente! Ya casi terminamos.'}
      </Text>
      <Pressable style={styles.reset} onPress={reiniciar} accessibilityRole="button" accessibilityLabel="Nuevo trámite">
        <Text style={styles.resetText}>🔄 Nuevo trámite</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.md },
  steps: { flexDirection: 'row', alignItems: 'flex-start' },
  step: { width: 76, alignItems: 'center' },
  circle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  active: { backgroundColor: colors.primary },
  completed: { backgroundColor: colors.success },
  circleText: { color: '#FFFFFF', fontWeight: '800', fontSize: 17 },
  label: { marginTop: 5, fontSize: 12, textAlign: 'center', color: colors.muted },
  activeLabel: { color: colors.primary, fontWeight: '800' },
  line: { flex: 1, height: 4, backgroundColor: '#E5E7EB', marginTop: 19 },
  completedLine: { backgroundColor: colors.success },
  help: { fontSize: typography.body, lineHeight: 25, color: colors.text, marginTop: spacing.sm },
  reset: { minHeight: 56, borderRadius: 16, backgroundColor: colors.danger, alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm },
  resetText: { color: '#FFFFFF', fontSize: typography.button, fontWeight: '800' },
});
