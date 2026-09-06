import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { colors, spacing, typography } from '../theme';

interface Props { multiple?: boolean; imagenes: string[]; onCambiar: (uris: string[]) => void; }
const extraerUris = (response: ImagePickerResponse) => (response.assets ?? []).map(a => a.uri).filter((u): u is string => Boolean(u));

export function SelectorImagen({ multiple = false, imagenes, onCambiar }: Props) {
  const agregarGaleria = async () => {
    const response = await launchImageLibrary({ mediaType: 'photo', selectionLimit: multiple ? 20 : 1, quality: 1 });
    if (!response.didCancel && !response.errorCode) { const nuevas = extraerUris(response); onCambiar(multiple ? [...imagenes, ...nuevas] : nuevas.slice(0, 1)); }
  };
  const tomarFoto = async () => {
    const response = await launchCamera({ mediaType: 'photo', cameraType: 'back', quality: 1, saveToPhotos: false });
    if (!response.didCancel && !response.errorCode) { const nuevas = extraerUris(response); if (nuevas.length) onCambiar(multiple ? [...imagenes, ...nuevas] : nuevas.slice(0, 1)); }
  };
  return <View>
    <View style={styles.actions}>
      <Pressable style={styles.button} onPress={tomarFoto}><Text style={styles.buttonText}>📷 Cámara</Text></Pressable>
      <Pressable style={styles.button} onPress={agregarGaleria}><Text style={styles.buttonText}>🖼️ Galería</Text></Pressable>
    </View>
    {imagenes.length > 0 && <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.previewRow}>
      {imagenes.map((uri, i) => <View key={`${uri}-${i}`} style={styles.card}><Image source={{ uri }} style={styles.image} resizeMode="cover" /><Text style={styles.number}>Página {i + 1}</Text></View>)}
    </ScrollView>}
  </View>;
}
const styles = StyleSheet.create({ actions:{flexDirection:'row',gap:10},button:{flex:1,minHeight:60,borderRadius:18,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center',paddingHorizontal:spacing.sm},buttonText:{color:'#FFF',fontSize:typography.button,fontWeight:'800'},previewRow:{paddingVertical:spacing.md,gap:12},card:{width:110,backgroundColor:colors.surface,borderRadius:14,overflow:'hidden',elevation:2},image:{width:110,height:140},number:{fontSize:16,fontWeight:'700',color:colors.text,padding:8,textAlign:'center'} });
