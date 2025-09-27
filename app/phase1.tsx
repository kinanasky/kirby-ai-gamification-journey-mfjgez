
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase1() {
  const router = useRouter();
  const [collectedStars, setCollectedStars] = useState(0);
  const [currentDialog, setCurrentDialog] = useState(0);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [bookAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const dialogs = [
    "O mundo está mudando rápido com a tecnologia! (UNESCO, 2024)",
    "No Brasil, enfrentamos desigualdades e evasão escolar. (INEP, 2024)",
    "Na Coreia do Sul, há pressão acadêmica e problemas de saúde mental. (OECD, 2023)",
    "A IA e a Gamificação podem transformar a educação! (Moran, 2022)",
    "Mas falta um modelo adaptado ao Brasil. Vamos atrás disso!"
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -8,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(sakuraAnimation, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Book floating animation
    Animated.loop(
      Animated.timing(bookAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const collectStar = () => {
    if (collectedStars < 5) {
      setCollectedStars(collectedStars + 1);
      setCurrentDialog(collectedStars);
      console.log(`Star collected! Total: ${collectedStars + 1}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 2');
    router.push('/phase2');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={[commonStyles.phaseTitle, { color: colors.primary }]}>
          Fase 1 - Biblioteca Real 📚
        </Text>

        {/* Library Environment */}
        <View style={commonStyles.libraryBackground}>
          <Text style={[commonStyles.pixelText, { fontSize: 30, textAlign: 'center', marginBottom: 10 }]}>
            📚 📖 📕 📗 📘
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, textAlign: 'center', color: colors.darkText }]}>
            Biblioteca da Universidade de São Paulo
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 6, textAlign: 'center', color: colors.text, marginTop: 5 }]}>
            Seção de Tecnologia Educacional
          </Text>
        </View>

        {/* Floating books */}
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 150,
              left: 30,
              transform: [
                {
                  translateY: bookAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={{ fontSize: 25 }}>📖</Text>
        </Animated.View>

        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 180,
              right: 40,
              transform: [
                {
                  translateY: bookAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={{ fontSize: 20 }}>📕</Text>
        </Animated.View>

        {/* Sakura Character */}
        <Animated.View 
          style={[
            commonStyles.sakuraCharacter,
            { transform: [{ translateY: sakuraAnimation }] }
          ]}
        >
          {/* Sakura petals */}
          <Text style={{ fontSize: 60, position: 'absolute' }}>🌸</Text>
          {/* Cute eyes */}
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.darkText,
            borderRadius: 6,
            position: 'absolute',
            left: 32,
            top: 38,
          }} />
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.darkText,
            borderRadius: 6,
            position: 'absolute',
            right: 32,
            top: 38,
          }} />
          {/* Happy mouth */}
          <View style={{
            width: 18,
            height: 9,
            backgroundColor: colors.darkText,
            borderRadius: 9,
            position: 'absolute',
            bottom: 35,
          }} />
          {/* Blush cheeks */}
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.coral,
            borderRadius: 4,
            position: 'absolute',
            left: 20,
            top: 52,
          }} />
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.coral,
            borderRadius: 4,
            position: 'absolute',
            right: 20,
            top: 52,
          }} />
        </Animated.View>

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          🌸 Estrelas de Conhecimento: {collectedStars}/5
        </Text>

        <View style={commonStyles.progressBar}>
          <View 
            style={[
              commonStyles.progressFill, 
              { width: `${(collectedStars / 5) * 100}%` }
            ]} 
          />
        </View>

        {/* Stars Grid */}
        <View style={commonStyles.collectibleGrid}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                buttonStyles.starButton,
                { 
                  backgroundColor: index < collectedStars ? colors.accent : colors.grey,
                  opacity: index < collectedStars ? 1 : 0.6,
                  borderColor: colors.primary
                }
              ]}
              onPress={collectStar}
              disabled={index < collectedStars}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 18 }]}>⭐</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dialog Box */}
        {collectedStars > 0 && (
          <View style={[commonStyles.dialogBox, { marginTop: 20, backgroundColor: colors.cream }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
              🌸 Kirby: {dialogs[currentDialog]}
            </Text>
          </View>
        )}

        {/* Mission Complete */}
        {collectedStars === 5 && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.primary, marginBottom: 15, fontSize: 12 }]}>
              🌸✨ Missão Completa! ✨🌸
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.green }]}
              onPress={nextPhase}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                Próxima Fase → 🌸
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Back Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.grey, marginTop: 20 }]}
          onPress={() => router.back()}
        >
          <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
            ← Voltar 🌸
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
