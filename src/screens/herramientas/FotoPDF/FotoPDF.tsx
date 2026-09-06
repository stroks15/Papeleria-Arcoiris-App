import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PasosTramite } from '../../../components/PasosTramite';
import { colors, spacing, typography } from '../../../theme';

export default function FotoPDF({ navigation }: any) {
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [nombre, setNombre] = useState('');
  const [paso, setPaso] = useState(1);

  const reiniciar = () => { setImagenes([]); setNombre(''); setPaso(1); navigation.navigate('Home'); };
  const continuar = () => {
    if (!imagenes.length) return Alert.alert('Falta una foto', 'Agrega al menos una imagen para continuar.');
    if (paso < 4) setPaso(paso + 1);
    else Alert.alert('PDF listo', 'La generación nativa del PDF se conectará en la siguiente etapa.');
  };

  return <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>📸 Foto a PDF</Text>
    <PasosTramite pasoActual={paso} onReiniciar={reiniciar} />
    {paso === 1 && <View><Text style={styles.help}>Paso 1. Elige las fotos de tu documento.</Text><Pressable style={styles.primary} onPress={() => setImagenes(['pending://image-1'])}><Text style={styles.primaryText}>📷 Elegir / tomar foto</Text></Pressable><Text style={styles.counter}>{imagenes.length ? '✓ 1 foto agregada' : 'Aún no has agregado fotos'}</Text><TextInput value={nombre} onChangeText={setNombre} placeholder="Nombre del documento (opcional)" style={styles.input} placeholderTextColor="#6B7280" /> </View>}
    {paso === 2 && <View><Text style={styles.help}>Paso 2. Mejoraremos técnicamente la imagen sin cambiar su contenido.</Text><View style={styles.info}><Text style={styles.infoText}>✨ Nitidez{`\n`}✨ Perspectiva{`\n`}✨ Brillo y contraste{`\n`}✨ Reducción de ruido</Text></View></View>}
    {paso === 3 && <View><Text style={styles.help}>Paso 3. Revisa el resultado antes de crear el PDF.</Text><View style={styles.preview}><Text style={styles.previewText}>🖼️ Vista previa{`\n\n`}La comparación original/mejorada se conectará con el procesador de imágenes.</Text></View></View>}
    {paso === 4 && <View><Text style={styles.help}>Paso 4. Tu documento está preparado para convertirse en PDF tamaño carta.</Text><View style={styles.info}><Text style={styles.infoText}>📄 Una página por imagen{`\n`}📐 Proporción original{`\n`}📤 Guardar y compartir</Text></View></View>}
    <Pressable style={styles.primary} onPress={continuar}><Text style={styles.primaryText}>{paso === 4 ? '📄 Generar PDF' : 'Continuar →'}</Text></Pressable>
  </ScrollView>;
}
const styles=StyleSheet.create({container:{padding:spacing.md,paddingBottom:50,backgroundColor:colors.background,flexGrow:1},title:{fontSize:typography.title,fontWeight:'900',color:colors.text},help:{fontSize:typography.body,lineHeight:27,color:colors.text,marginVertical:spacing.md},primary:{minHeight:60,borderRadius:18,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center',marginTop:spacing.md},primaryText:{color:'#FFF',fontSize:typography.button,fontWeight:'900'},counter:{fontSize:typography.body,marginTop:spacing.md,color:colors.success,fontWeight:'700'},input:{minHeight:58,borderWidth:1,borderColor:'#D1D5DB',borderRadius:16,paddingHorizontal:16,fontSize:18,marginTop:16,color:colors.text,backgroundColor:'#FFF'},info:{backgroundColor:'#F3F4F6',borderRadius:18,padding:20},infoText:{fontSize:18,lineHeight:32,color:colors.text,fontWeight:'600'},preview:{minHeight:260,borderRadius:18,backgroundColor:'#FFF',borderWidth:2,borderColor:'#E5E7EB',alignItems:'center',justifyContent:'center',padding:20},previewText:{fontSize:18,lineHeight:28,textAlign:'center',color:colors.muted}}
);
