import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TarjetaHerramienta } from '../components/TarjetaHerramienta';
import { colors, spacing, typography } from '../theme';

const tools = [
  ['📸','Foto a PDF','FotoPDF','#FDE68A'], ['🗂️','Escaneo múltiple a PDF','EscaneoPDF','#BFDBFE'],
  ['🗜️','Comprimir PDF','ComprimirPDF','#C7D2FE'], ['🖼️','Restaurar fotos','RestaurarFotos','#FBCFE8'],
  ['🗒️','Hoja de resumen visual','Cheatsheet','#A7F3D0'], ['📣','Anuncio / cartel','AnuncioLocal','#FED7AA'],
  ['🧠','Flashcards','Flashcards','#DDD6FE'], ['🖨️','Pedido de impresión','PedidoImpresion','#BAE6FD'],
  ['🪪','Foto tipo credencial','FotoCredencial','#FDE68A'], ['⏰','Recordatorios','Recordatorios','#BBF7D0'],
  ['📋','Llenado de formatos','Formatos','#FECACA'], ['🔎','Investigación de un tema','Investigacion','#CFFAFE'],
];

export default function Home({ navigation }: any) {
  return <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}><Text style={styles.title}>Hola, soy tu asistente de{`\n`}Papelería Arcoíris 🌈</Text><Text style={styles.subtitle}>Te ayudamos paso a paso.</Text></View>
    <Text style={styles.section}>🛠️ Herramientas de Papelería</Text>
    <View style={styles.grid}>{tools.map(([icon,text,route,color]) => <TarjetaHerramienta key={route} icono={icon} texto={text} color={color} onPress={() => navigation.navigate(route)} />)}</View>
    <Text style={styles.ai}>🤖 ArcoirisAI Assistant{`\n`}Estoy aquí para ayudarte.</Text>
  </ScrollView>;
}
const styles=StyleSheet.create({container:{padding:spacing.md,paddingBottom:40,backgroundColor:colors.background},header:{paddingVertical:spacing.md},title:{fontSize:typography.title,fontWeight:'900',color:colors.text},subtitle:{fontSize:typography.body,color:colors.muted,marginTop:8},section:{fontSize:typography.section,fontWeight:'900',marginVertical:spacing.md,color:colors.text},grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},ai:{marginTop:spacing.md,padding:18,borderRadius:18,backgroundColor:'#EDE9FE',fontSize:typography.body,fontWeight:'700',color:colors.primary}}
);
