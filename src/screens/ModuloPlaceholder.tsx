import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { PasosTramite } from '../components/PasosTramite';

interface Props {
  titulo: string;
  icono: string;
  descripcion: string;
  gobierno?: boolean;
}

export default function ModuloPlaceholder({ titulo, icono, descripcion, gobierno = false }: Props) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.icon}>{icono}</Text>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.description}>{descripcion}</Text>
        <PasosTramite pasoActual={1} onReiniciar={() => {}} />
        <View style={styles.card} accessibilityRole="summary">
          <Text style={styles.cardTitle}>{gobierno ? 'Trámite de gobierno' : 'Herramienta de Papelería'}</Text>
          <Text style={styles.cardText}>
            Este módulo ya está conectado a la navegación general. Aquí incorporaremos el flujo funcional completo en la siguiente etapa.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 120 },
  icon: { fontSize: 52, textAlign: 'center', marginTop: spacing.md },
  title: { fontSize: typography.title, fontWeight: '800', color: colors.text, textAlign: 'center', marginTop: spacing.sm },
  description: { fontSize: typography.body, lineHeight: 28, color: colors.muted, textAlign: 'center', marginVertical: spacing.md },
  card: { backgroundColor: colors.surface, borderRadius: 20, padding: spacing.lg, marginTop: spacing.md, elevation: 3 },
  cardTitle: { fontSize: typography.section, fontWeight: '800', color: colors.primary },
  cardText: { fontSize: typography.body, lineHeight: 28, color: colors.text, marginTop: spacing.sm },
});
