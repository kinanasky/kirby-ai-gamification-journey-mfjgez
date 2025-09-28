
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
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
    router.push('/phase1');
  };

  const handleGuide = () => {
    console.log('Opening guide!');
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

        {/* Title - Changed to Ana's DreamLand */}
        <Text style={[commonStyles.title, { fontSize: 16, marginBottom: 10 }]}>
          🌸 Ana's DreamLand 🌸
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

        {/* Dialog Box - Fixed text alignment */}
        <View style={[commonStyles.dialogBox, { alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={[commonStyles.pixelText, { marginBottom: 12, fontSize: 9, textAlign: 'center' }]}>
            🌸 Olá, aventureiro(a)! Bem-vindo ao mundo da pesquisa sobre Inteligência Artificial e Gamificação na Educação.
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 9, textAlign: 'center' }]}>
            Vamos desbloquear juntos o próximo nível? ✨
          </Text>
        </View>

        {/* Menu Buttons */}
        <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
          {/* Start Adventure Button */}
          <TouchableOpacity
            style={[buttonStyles.pixelButton, { marginBottom: 15, width: '70%', backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }]}
            onPress={handleStartAdventure}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 10, textAlign: 'center' }]}>
              🌸 Iniciar Aventura 🌸
            </Text>
          </TouchableOpacity>

          {/* Guide Button (Separated) */}
          <TouchableOpacity
            style={[buttonStyles.pixelButton, { marginBottom: 15, width: '70%', backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }]}
            onPress={handleGuide}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 10, textAlign: 'center' }]}>
              📚 Guia de IA e Gamificação 📚
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cute decorative elements */}
        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', width: '100%' }}>
          <Text style={{ fontSize: 20 }}>🌸</Text>
          <Text style={{ fontSize: 15 }}>✨</Text>
          <Text style={{ fontSize: 18 }}>🌺</Text>
          <Text style={{ fontSize: 15 }}>✨</Text>
          <Text style={{ fontSize: 20 }}>🌸</Text>
        </View>

        {/* Cute graphic elements using provided images */}
        <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-around', width: '100%' }}>
          <Image 
            source={require('../assets/images/b0462bac-ce40-4426-85e7-7441474a9766.jpeg')}
            style={{ width: 30, height: 30, borderRadius: 15 }}
            resizeMode="cover"
          />
          <Image 
            source={require('../assets/images/745c21d8-d092-4f93-99c1-c2cc531fb239.jpeg')}
            style={{ width: 25, height: 25, borderRadius: 12 }}
            resizeMode="cover"
          />
          <Image 
            source={require('../assets/images/0c5e2954-df29-4cc6-955a-81207bc59f0a.jpeg')}
            style={{ width: 28, height: 28, borderRadius: 14 }}
            resizeMode="cover"
          />
          <Image 
            source={require('../assets/images/2595260a-77d5-4793-835a-1e1dce880580.jpeg')}
            style={{ width: 26, height: 26, borderRadius: 13 }}
            resizeMode="cover"
          />
          <Image 
            source={require('../assets/images/5e8a3f35-ca6c-4275-9669-7ed177ebb68d.jpeg')}
            style={{ width: 24, height: 24, borderRadius: 12 }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
