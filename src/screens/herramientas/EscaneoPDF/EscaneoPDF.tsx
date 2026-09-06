import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PasosTramite } from '../../../components/PasosTramite';
import { colors, spacing, typography } from '../../../theme';

export default function EscaneoPDF({ navigation }: any) {
  const [paginas, setPaginas] = useState<string[]>([]);
  const [paso, setPaso] = useState(1);
  const reiniciar = () => { setPaginas([]); setPaso(1); navigation.navigate('Home'); };
  const agregar = () => setPaginas(prev => [...prev, `pending://page-${prev.length + 1}`]);
  const continuar = () => {
    if (paso === 1 && !paginas.length) return Alert.alert('Agrega páginas', 'Necesitamos al menos una página.');
    if (paso < 4) setPaso(paso + 1); else Alert.alert('PDF listo', 'El generador PDF nativo se conectará en la siguiente etapa.');
  };
  return <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>🗂️ Escaneo múltiple a PDF</Text>
    <PasosTramite pasoActual={paso} onReiniciar={reiniciar} />
    {paso===1 && <View><Text style={styles.help}>Agrega todas las páginas. Después podrás revisar su orden.</Text><Pressable style={styles.secondary} onPress={agregar}><Text style={styles.secondaryText}>📷 Agregar página</Text></Pressable><Text style={styles.counter}>Páginas: {paginas.length}</Text></View>}
    {paso===2 && <View><Text style={styles.help}>Mejoraremos cada página para facilitar su lectura.</Text><View style={styles.info}><Text style={styles.infoText}>✨ Corrección de perspectiva{`\n`}✨ Nitidez{`\n`}✨ Contraste{`\n`}✨ Reducción de ruido</Text></View></View>}
    {paso===3 && <View><Text style={styles.help}>Revisa el orden de las páginas.</Text>{paginas.map((_,i)=><View key={i} style={styles.row}><Text style={styles.page}>Página {i+1}</Text><Pressable disabled={i===0} onPress={()=>setPaginas(p=>{const a=[...p];[a[i-1],a[i]]=[a[i],a[i-1]];return a;})} style={styles.small}><Text>⬆️</Text></Pressable><Pressable disabled={i===paginas.length-1} onPress={()=>setPaginas(p=>{const a=[...p];[a[i],a[i+1]]=[a[i+1],a[i]];return a;})} style={styles.small}><Text>⬇️</Text></Pressable></View>)}</View>}
    {paso===4 && <View><Text style={styles.help}>¡Excelente! Tu expediente está listo para convertirse en un solo PDF.</Text><View style={styles.info}><Text style={styles.infoText}>📄 {paginas.length} páginas{`\n`}📐 Tamaño carta{`\n`}📤 Guardar y compartir</Text></View></View>}
    <Pressable style={styles.primary} onPress={continuar}><Text style={styles.primaryText}>{paso===4?'📄 Generar PDF':'Continuar →'}</Text></Pressable>
  </ScrollView>;
}
const styles=StyleSheet.create({container:{padding:spacing.md,paddingBottom:50,backgroundColor:colors.background,flexGrow:1},title:{fontSize:typography.title,fontWeight:'900',color:colors.text},help:{fontSize:typography.body,lineHeight:27,color:colors.text,marginVertical:spacing.md},primary:{minHeight:60,borderRadius:18,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center',marginTop:20},primaryText:{color:'#FFF',fontSize:18,fontWeight:'900'},secondary:{minHeight:60,borderRadius:18,backgroundColor:'#DBEAFE',alignItems:'center',justifyContent:'center'},secondaryText:{fontSize:18,fontWeight:'900',color:'#1E3A8A'},counter:{fontSize:18,fontWeight:'800',color:colors.success,marginTop:16},info:{backgroundColor:'#F3F4F6',borderRadius:18,padding:20},infoText:{fontSize:18,lineHeight:32,color:colors.text,fontWeight:'600'},row:{flexDirection:'row',alignItems:'center',backgroundColor:'#FFF',borderRadius:14,padding:10,marginBottom:8},page:{flex:1,fontSize:18,fontWeight:'700',color:colors.text},small:{width:48,height:48,alignItems:'center',justifyContent:'center',borderRadius:12,backgroundColor:'#F3F4F6',marginLeft:6}}
);
