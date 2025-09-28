
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
            toValue: -8,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(sakuraAnimation, {
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

      // Start petal falling animation
      Animated.loop(
        Animated.timing(petalAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [fontsLoaded]);

  const handleStartAdventure = () => {
    console.log('Starting adventure!');
    router.push('/explanation');
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
              top: 50,
              left: 50,
              width: 20,
              height: 20,
              backgroundColor: colors.rose,
              borderRadius: 10,
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
              right: 80,
              width: 15,
              height: 15,
              backgroundColor: colors.primary,
              borderRadius: 8,
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

        {/* Sparkles */}
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 120,
              left: 30,
              width: 12,
              height: 12,
              backgroundColor: colors.accent,
              borderRadius: 6,
              opacity: sparkleAnimation,
            }
          ]}
        />
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 150,
              right: 50,
              width: 10,
              height: 10,
              backgroundColor: colors.purple,
              borderRadius: 5,
              opacity: sparkleAnimation,
            }
          ]}
        />

        {/* Title */}
        <Text style={[commonStyles.title, { fontSize: 16, marginBottom: 10 }]}>
          🌸 Sakura Dream Land 🌸
        </Text>
        <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 30, color: colors.text }]}>
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
          {/* Main sakura flower - no face as requested */}
          <Text style={{ fontSize: 60, position: 'absolute' }}>🌸</Text>
          
          {/* Cute sparkles around the flower */}
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.accent,
            borderRadius: 4,
            position: 'absolute',
            left: 15,
            top: 20,
          }} />
          <View style={{
            width: 6,
            height: 6,
            backgroundColor: colors.coral,
            borderRadius: 3,
            position: 'absolute',
            right: 20,
            top: 25,
          }} />
          <View style={{
            width: 10,
            height: 10,
            backgroundColor: colors.accent,
            borderRadius: 5,
            position: 'absolute',
            left: 20,
            bottom: 15,
          }} />
          <View style={{
            width: 7,
            height: 7,
            backgroundColor: colors.purple,
            borderRadius: 4,
            position: 'absolute',
            right: 15,
            bottom: 20,
          }} />
        </Animated.View>

        {/* Dialog Box */}
        <View style={commonStyles.dialogBox}>
          <Text style={[commonStyles.pixelText, { marginBottom: 12, fontSize: 9 }]}>
            🌸 Olá, aventureiro(a)! Bem-vindo ao mundo da pesquisa sobre Inteligência Artificial e Gamificação na Educação.
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 9 }]}>
            Vamos desbloquear juntos o próximo nível? ✨
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { marginTop: 30, width: '70%', backgroundColor: colors.primary }]}
          onPress={handleStartAdventure}
        >
          <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 10 }]}>
            🌸 Iniciar Aventura 🌸
          </Text>
        </TouchableOpacity>

        {/* Cute decorative elements */}
        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', width: '100%' }}>
          <Text style={{ fontSize: 20 }}>🌸</Text>
          <Text style={{ fontSize: 15 }}>✨</Text>
          <Text style={{ fontSize: 18 }}>🌺</Text>
          <Text style={{ fontSize: 15 }}>✨</Text>
          <Text style={{ fontSize: 20 }}>🌸</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
