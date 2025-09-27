
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function MainScreen() {
  const router = useRouter();
  const [kirbyAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      // Start Kirby bounce animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(kirbyAnimation, {
            toValue: -10,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(kirbyAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [fontsLoaded]);

  const handleStartAdventure = () => {
    console.log('Starting adventure!');
    router.push('/phase1');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.content}>
        {/* Title */}
        <Text style={[commonStyles.title, { fontSize: 18, marginBottom: 20 }]}>
          Kirby Dream Land
        </Text>
        <Text style={[commonStyles.pixelText, { fontSize: 10, marginBottom: 30 }]}>
          A Jornada da IA e Gamificação Brasil–Coreia
        </Text>

        {/* Kirby Character */}
        <Animated.View 
          style={[
            {
              width: 120,
              height: 120,
              backgroundColor: colors.primary,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: colors.darkText,
              marginBottom: 30,
              alignItems: 'center',
              justifyContent: 'center',
            },
            { transform: [{ translateY: kirbyAnimation }] }
          ]}
        >
          <View style={{
            width: 20,
            height: 20,
            backgroundColor: colors.darkText,
            borderRadius: 10,
            position: 'absolute',
            left: 30,
            top: 35,
          }} />
          <View style={{
            width: 20,
            height: 20,
            backgroundColor: colors.darkText,
            borderRadius: 10,
            position: 'absolute',
            right: 30,
            top: 35,
          }} />
          <View style={{
            width: 15,
            height: 8,
            backgroundColor: colors.darkText,
            borderRadius: 8,
            position: 'absolute',
            bottom: 40,
          }} />
          {/* Cheeks */}
          <View style={{
            width: 15,
            height: 15,
            backgroundColor: colors.red,
            borderRadius: 8,
            position: 'absolute',
            left: 15,
            top: 50,
          }} />
          <View style={{
            width: 15,
            height: 15,
            backgroundColor: colors.red,
            borderRadius: 8,
            position: 'absolute',
            right: 15,
            top: 50,
          }} />
        </Animated.View>

        {/* Dialog Box */}
        <View style={commonStyles.dialogBox}>
          <Text style={[commonStyles.pixelText, { marginBottom: 15 }]}>
            Olá, aventureiro(a)! Bem-vindo ao mundo da pesquisa sobre Inteligência Artificial e Gamificação na Educação.
          </Text>
          <Text style={commonStyles.pixelText}>
            Vamos desbloquear juntos o próximo nível?
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { marginTop: 30, width: '80%' }]}
          onPress={handleStartAdventure}
        >
          <Text style={[commonStyles.pixelText, { color: colors.card }]}>
            Iniciar Aventura
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
