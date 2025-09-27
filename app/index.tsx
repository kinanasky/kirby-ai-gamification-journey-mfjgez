
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
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [sparkleAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      // Start Sakura bounce animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(sakuraAnimation, {
            toValue: -12,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(sakuraAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Start sparkle animation
      Animated.loop(
        Animated.timing(sparkleAnimation, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        })
      ).start();

      // Start petal falling animation
      Animated.loop(
        Animated.timing(petalAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [fontsLoaded]);

  const handleStartAdventure = () => {
    console.log('Starting adventure!');
    router.push('/explanation');
  };

  const handleDirectStart = () => {
    console.log('Direct start to Phase 1!');
    router.push('/phase1');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.content}>
        {/* Floating petals */}
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 40,
              left: 40,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: colors.rose,
              opacity: sparkleAnimation,
              transform: [
                {
                  translateY: petalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200]
                  })
                }
              ]
            }
          ]}
        />
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 80,
              right: 60,
              width: 15,
              height: 15,
              borderRadius: 8,
              backgroundColor: colors.primary,
              opacity: sparkleAnimation,
              transform: [
                {
                  translateY: petalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 250]
                  })
                }
              ]
            }
          ]}
        />
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 120,
              left: 80,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.coral,
              opacity: sparkleAnimation,
              transform: [
                {
                  translateY: petalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 180]
                  })
                }
              ]
            }
          ]}
        />

        {/* Title */}
        <Text style={[commonStyles.title, { fontSize: 16, marginBottom: 8, color: colors.primary }]}>
          Kirby Dream Land
        </Text>
        <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 25, color: colors.text }]}>
          A Jornada da IA e Gamificação Brasil–Coreia
        </Text>

        {/* Sakura Character (replacing Kirby) */}
        <Animated.View 
          style={[
            {
              width: 120,
              height: 120,
              backgroundColor: colors.rose,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              transform: [{ translateY: sakuraAnimation }]
            }
          ]}
        >
          {/* Sakura petals */}
          <Text style={{ fontSize: 60, position: 'absolute' }}>🌸</Text>
          {/* Cute eyes */}
          <View style={{
            width: 14,
            height: 14,
            backgroundColor: colors.darkText,
            borderRadius: 7,
            position: 'absolute',
            left: 30,
            top: 35,
          }} />
          <View style={{
            width: 14,
            height: 14,
            backgroundColor: colors.darkText,
            borderRadius: 7,
            position: 'absolute',
            right: 30,
            top: 35,
          }} />
          {/* Happy mouth */}
          <View style={{
            width: 20,
            height: 10,
            backgroundColor: colors.darkText,
            borderRadius: 10,
            position: 'absolute',
            bottom: 35,
          }} />
          {/* Blush cheeks */}
          <View style={{
            width: 10,
            height: 10,
            backgroundColor: colors.coral,
            borderRadius: 5,
            position: 'absolute',
            left: 18,
            top: 50,
          }} />
          <View style={{
            width: 10,
            height: 10,
            backgroundColor: colors.coral,
            borderRadius: 5,
            position: 'absolute',
            right: 18,
            top: 50,
          }} />
        </Animated.View>

        {/* Dialog Box */}
        <View style={[commonStyles.dialogBox, { backgroundColor: colors.cream }]}>
          <Text style={[commonStyles.pixelText, { marginBottom: 12, fontSize: 9, color: colors.darkText }]}>
            Olá, aventureiro(a)! Bem-vindo ao mundo da pesquisa sobre Inteligência Artificial e Gamificação na Educação. 🌸
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 9, color: colors.darkText }]}>
            Vamos desbloquear juntos o próximo nível?
          </Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { marginTop: 25, width: '80%', backgroundColor: colors.primary }]}
          onPress={handleStartAdventure}
        >
          <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 10 }]}>
            🌸 Aprender sobre IA & Gamificação
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyles.pixelButton, { marginTop: 15, width: '80%', backgroundColor: colors.accent }]}
          onPress={handleDirectStart}
        >
          <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 10 }]}>
            ⭐ Iniciar Aventura Diretamente ⭐
          </Text>
        </TouchableOpacity>

        {/* Cute footer */}
        <Text style={[commonStyles.pixelText, { marginTop: 30, fontSize: 6, color: colors.text, opacity: 0.7 }]}>
          Um jogo educativo fofo e pixelado 💕
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
