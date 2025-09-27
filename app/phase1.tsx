
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
  const [kirbyAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const dialogs = [
    "O mundo está mudando rápido com a tecnologia! (UNESCO, 2024)",
    "No Brasil, enfrentamos desigualdades e evasão escolar. (INEP, 2023)",
    "Na Coreia do Sul, há pressão acadêmica e problemas de saúde mental. (OECD, 2022)",
    "A IA e a Gamificação podem transformar a educação! (Moran, 2022)",
    "Mas falta um modelo adaptado ao Brasil. Vamos atrás disso!"
  ];

  useEffect(() => {
    // Kirby floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(kirbyAnimation, {
          toValue: -5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(kirbyAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
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
        <Text style={commonStyles.phaseTitle}>
          Fase 1 - Biblioteca Colorida
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
            width: 14,
            height: 14,
            backgroundColor: colors.darkText,
            borderRadius: 7,
            position: 'absolute',
            left: 22,
            top: 28,
          }} />
          <View style={{
            width: 14,
            height: 14,
            backgroundColor: colors.darkText,
            borderRadius: 7,
            position: 'absolute',
            right: 22,
            top: 28,
          }} />
          {/* Mouth */}
          <View style={{
            width: 10,
            height: 5,
            backgroundColor: colors.darkText,
            borderRadius: 5,
            position: 'absolute',
            bottom: 32,
          }} />
          {/* Cheeks */}
          <View style={{
            width: 10,
            height: 10,
            backgroundColor: colors.red,
            borderRadius: 5,
            position: 'absolute',
            left: 10,
            top: 42,
          }} />
          <View style={{
            width: 10,
            height: 10,
            backgroundColor: colors.red,
            borderRadius: 5,
            position: 'absolute',
            right: 10,
            top: 42,
          }} />
        </Animated.View>

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          Estrelas coletadas: {collectedStars}/5
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
                  opacity: index < collectedStars ? 1 : 0.5
                }
              ]}
              onPress={collectStar}
              disabled={index < collectedStars}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 16 }]}>⭐</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dialog Box */}
        {collectedStars > 0 && (
          <View style={[commonStyles.dialogBox, { marginTop: 20 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
              {dialogs[currentDialog]}
            </Text>
          </View>
        )}

        {/* Mission Complete */}
        {collectedStars === 5 && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15 }]}>
              🎉 Missão Completa! 🎉
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.green }]}
              onPress={nextPhase}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                Próxima Fase →
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
            ← Voltar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
