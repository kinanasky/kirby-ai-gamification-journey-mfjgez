
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
  const [sparkleAnimation] = useState(new Animated.Value(0));
  
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
            toValue: -8,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(kirbyAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Start sparkle animation
      Animated.loop(
        Animated.timing(sparkleAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
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
        {/* Sparkles */}
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 50,
              left: 50,
              width: 20,
              height: 20,
              backgroundColor: colors.accent,
              borderRadius: 10,
              opacity: sparkleAnimation,
            }
          ]}
        />
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 100,
              right: 80,
              width: 15,
              height: 15,
              backgroundColor: colors.purple,
              borderRadius: 8,
              opacity: sparkleAnimation,
            }
          ]}
        />

        {/* Title */}
        <Text style={[commonStyles.title, { fontSize: 16, marginBottom: 10 }]}>
          Kirby Dream Land
        </Text>
        <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 30, color: colors.text }]}>
          A Jornada da IA e Gamificação Brasil–Coreia
        </Text>

        {/* Kirby Character */}
        <Animated.View 
          style={[
            commonStyles.kirbyCharacter,
            { transform: [{ translateY: kirbyAnimation }] }
          ]}
        >
          {/* Eyes */}
          <View style={{
            width: 16,
            height: 16,
            backgroundColor: colors.darkText,
            borderRadius: 8,
            position: 'absolute',
            left: 25,
            top: 30,
          }} />
          <View style={{
            width: 16,
            height: 16,
            backgroundColor: colors.darkText,
            borderRadius: 8,
            position: 'absolute',
            right: 25,
            top: 30,
          }} />
          {/* Mouth */}
          <View style={{
            width: 12,
            height: 6,
            backgroundColor: colors.darkText,
            borderRadius: 6,
            position: 'absolute',
            bottom: 35,
          }} />
          {/* Cheeks */}
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.red,
            borderRadius: 6,
            position: 'absolute',
            left: 12,
            top: 45,
          }} />
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.red,
            borderRadius: 6,
            position: 'absolute',
            right: 12,
            top: 45,
          }} />
        </Animated.View>

        {/* Dialog Box */}
        <View style={commonStyles.dialogBox}>
          <Text style={[commonStyles.pixelText, { marginBottom: 12, fontSize: 9 }]}>
            Olá, aventureiro(a)! Bem-vindo ao mundo da pesquisa sobre Inteligência Artificial e Gamificação na Educação.
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 9 }]}>
            Vamos desbloquear juntos o próximo nível?
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { marginTop: 30, width: '70%' }]}
          onPress={handleStartAdventure}
        >
          <Text style={[commonStyles.pixelText, { color: colors.card, fontSize: 10 }]}>
            ⭐ Iniciar Aventura ⭐
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
