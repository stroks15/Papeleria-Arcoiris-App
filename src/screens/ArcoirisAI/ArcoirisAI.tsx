import React, { useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { askArcoirisAI } from '../../ai/arcoirisApi';
import { executeArcoirisAction } from '../../ai/actionRouter';
import { colors, spacing, typography } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ArcoirisAI'>;
type Message = { id: string; role: 'user' | 'assistant'; text: string };

export default function ArcoirisAI({ navigation }: Props) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', text: '¡Hola! Soy ArcoirisAI 🌈. Dime qué necesitas y te ayudo paso a paso.' },
  ]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { id: `${Date.now()}-u`, role: 'user', text }]);
    setLoading(true);
    try {
      const result = await askArcoirisAI({ message: text, currentModule: 'ArcoirisAI', currentStep: 1 });
      const reply = result.message || 'Listo. Te ayudo con el siguiente paso.';
      setMessages(prev => [...prev, { id: `${Date.now()}-a`, role: 'assistant', text: reply }]);
      if (result.action) {
        const actionResult = executeArcoirisAction(result.action, navigation);
        if (!actionResult.ok) {
          setMessages(prev => [...prev, { id: `${Date.now()}-e`, role: 'assistant', text: actionResult.error }]);
        } else if (actionResult.requiresConfirmation) {
          setMessages(prev => [...prev, { id: `${Date.now()}-c`, role: 'assistant', text: 'Esta acción necesita tu confirmación antes de continuar.' }]);
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: `${Date.now()}-e`, role: 'assistant', text: error instanceof Error ? error.message : 'No pude conectarme. Intenta nuevamente.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}><Text style={styles.title}>🤖 ArcoirisAI Assistant</Text><Text style={styles.subtitle}>Te acompaño paso a paso.</Text></View>
      <FlatList data={messages} keyExtractor={item => item.id} contentContainerStyle={styles.list} renderItem={({ item }) => (
        <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}><Text style={styles.bubbleText}>{item.text}</Text></View>
      )} />
      {loading && <View style={styles.loading}><ActivityIndicator size="small" /><Text style={styles.loadingText}>Estoy pensando…</Text></View>}
      <View style={styles.composer}>
        <TextInput value={input} onChangeText={setInput} placeholder="Escribe lo que necesitas…" placeholderTextColor={colors.muted} style={styles.input} multiline accessibilityLabel="Mensaje para ArcoirisAI" />
        <Pressable onPress={send} disabled={loading || !input.trim()} style={[styles.send, (loading || !input.trim()) && styles.disabled]} accessibilityRole="button" accessibilityLabel="Enviar mensaje"><Text style={styles.sendText}>Enviar</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, paddingTop: spacing.xl, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  title: { fontSize: typography.title, fontWeight: '900', color: colors.text },
  subtitle: { marginTop: 4, fontSize: typography.body, color: colors.muted },
  list: { padding: spacing.md, paddingBottom: spacing.lg },
  bubble: { maxWidth: '88%', borderRadius: 18, padding: spacing.md, marginBottom: spacing.sm },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#DDD6FE' },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: colors.surface, elevation: 2 },
  bubbleText: { fontSize: typography.body, lineHeight: 26, color: colors.text },
  loading: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  loadingText: { fontSize: 16, color: colors.muted },
  composer: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, padding: spacing.md, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  input: { flex: 1, minHeight: 56, maxHeight: 130, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, fontSize: typography.body, color: colors.text, backgroundColor: '#FFF' },
  send: { minHeight: 56, minWidth: 82, paddingHorizontal: 16, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#FFF', fontSize: typography.button, fontWeight: '900' },
  disabled: { opacity: 0.45 },
});
