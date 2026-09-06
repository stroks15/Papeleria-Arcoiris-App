import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import FotoPDF from './src/screens/herramientas/FotoPDF/FotoPDF';
import EscaneoPDF from './src/screens/herramientas/EscaneoPDF/EscaneoPDF';

export type RootStackParamList = {
  Home: undefined;
  FotoPDF: undefined;
  EscaneoPDF: undefined;
  ComprimirPDF: undefined;
  RestaurarFotos: undefined;
  Cheatsheet: undefined;
  AnuncioLocal: undefined;
  Flashcards: undefined;
  PedidoImpresion: undefined;
  FotoCredencial: undefined;
  Recordatorios: undefined;
  Formatos: undefined;
  Investigacion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FotoPDF" component={FotoPDF} />
      <Stack.Screen name="EscaneoPDF" component={EscaneoPDF} />
    </Stack.Navigator>
  </NavigationContainer>;
}
