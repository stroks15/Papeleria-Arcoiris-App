import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import FotoPDF from '../screens/herramientas/FotoPDF/FotoPDF';
import EscaneoPDF from '../screens/herramientas/EscaneoPDF/EscaneoPDF';
import ModuloPlaceholder from '../screens/ModuloPlaceholder';
import { ArcoirisAIAssistant } from '../components/ArcoirisAIAssistant';

export type RootStackParamList = {
  Home: undefined;
  CFE: undefined; TenenciaCDMX: undefined; TenenciaEDOMEX: undefined;
  MultasEDOMEX: undefined; MultasCDMX: undefined; AguaSACMEX: undefined;
  FotoPDF: undefined; EscaneoPDF: undefined; ComprimirPDF: undefined; RestaurarFotos: undefined;
  Cheatsheet: undefined; AnuncioLocal: undefined; Flashcards: undefined; PedidoImpresion: undefined;
  FotoCredencial: undefined; Recordatorios: undefined; Formatos: undefined; Investigacion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const gobierno = {
  CFE: ['💡', 'Recibo de luz CFE', 'Consulta tu recibo de luz y completa los datos con ayuda.'],
  TenenciaCDMX: ['🚗', 'Tenencia CDMX', 'Consulta la tenencia de un vehículo en Ciudad de México.'],
  TenenciaEDOMEX: ['🚘', 'Tenencia Estado de México', 'Consulta la tenencia de un vehículo en el Estado de México.'],
  MultasEDOMEX: ['⚠️', 'Multas Estado de México', 'Consulta infracciones y adeudos vehiculares.'],
  MultasCDMX: ['🚦', 'Multas CDMX', 'Consulta infracciones y adeudos de tránsito.'],
  AguaSACMEX: ['💧', 'Agua SACMEX', 'Consulta información de tu cuenta de agua.'],
} as const;

const herramientas = {
  ComprimirPDF: ['🗜️', 'Comprimir PDF', 'Reduce el tamaño de un PDF para compartirlo más fácilmente.'],
  RestaurarFotos: ['🖼️', 'Restaurar fotos', 'Prepara fotografías antiguas o dañadas para restauración.'],
  Cheatsheet: ['🗒️', 'Hoja de resumen visual', 'Convierte información en una hoja clara para estudiar.'],
  AnuncioLocal: ['📣', 'Anuncio / cartel', 'Crea material publicitario para un negocio local.'],
  Flashcards: ['🧠', 'Flashcards', 'Convierte conceptos importantes en tarjetas de estudio.'],
  PedidoImpresion: ['🖨️', 'Pedido de impresión', 'Prepara un pedido para imprimir en la papelería.'],
  FotoCredencial: ['🪪', 'Foto tipo credencial', 'Prepara fotografías para credencial o trámite.'],
  Recordatorios: ['⏰', 'Recordatorios', 'Registra fechas de vencimiento y recordatorios.'],
  Formatos: ['📋', 'Llenado de formatos', 'Completa formatos comunes con asistencia paso a paso.'],
  Investigacion: ['🔎', 'Investigación de un tema', 'Organiza una investigación con fuentes verificables.'],
} as const;

export default function AppNavigator() {
  return (
    <View style={styles.root}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FotoPDF" component={FotoPDF} />
        <Stack.Screen name="EscaneoPDF" component={EscaneoPDF} />
        {(Object.entries(gobierno) as [keyof typeof gobierno, readonly string[]][]).map(([name, data]) => (
          <Stack.Screen key={name} name={name}>
            {() => <ModuloPlaceholder icono={data[0]} titulo={data[1]} descripcion={data[2]} gobierno />}
          </Stack.Screen>
        ))}
        {(Object.entries(herramientas) as [keyof typeof herramientas, readonly string[]][]).map(([name, data]) => (
          <Stack.Screen key={name} name={name}>
            {() => <ModuloPlaceholder icono={data[0]} titulo={data[1]} descripcion={data[2]} />}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
      <ArcoirisAIAssistant />
    </View>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
