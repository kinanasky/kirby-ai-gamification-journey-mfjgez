
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase1() {
  const router = useRouter();
  const [collectedStars, setCollectedStars] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [starAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const stars = [
    { id: 'tech', name: '⭐ Tecnologia', position: { top: 100, left: 50 } },
    { id: 'brasil', name: '⭐ Brasil', position: { top: 150, right: 60 } },
    { id: 'coreia', name: '⭐ Coreia', position: { top: 200, left: 80 } },
    { id: 'ia', name: '⭐ IA', position: { top: 250, right: 40 } },
    { id: 'gamificacao', name: '⭐ Gamificação', position: { top: 300, left: 60 } }
  ];

  const messages = [
    "🌸 O mundo está mudando rápido com a tecnologia! (UNESCO, 2024)",
    "🌸 No Brasil, enfrentamos desigualdades e evasão escolar. (INEP, 2024)",
    "🌸 Na Coreia do Sul, há pressão acadêmica e problemas de saúde mental. (OECD, 2023)",
    "🌸 A IA e a Gamificação podem transformar a educação! (Moran, 2022)",
    "🌸 Mas falta um modelo adaptado ao Brasil. Vamos atrás disso! ✨"
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -10,
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

    // Star twinkling animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(starAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(starAnimation, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Petal falling animation
    Animated.loop(
      Animated.timing(petalAnimation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const collectStar = (starId: string) => {
    if (!collectedStars.includes(starId)) {
      setCollectedStars([...collectedStars, starId]);
      if (currentMessage < messages.length - 1) {
        setCurrentMessage(currentMessage + 1);
      }
      console.log(`Star collected: ${starId}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 2');
    router.push('/phase2');
  };

  const isPhaseComplete = collectedStars.length === 5;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Floating petals */}
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 30,
              left: 30,
              width: 15,
              height: 15,
              borderRadius: 8,
              backgroundColor: colors.rose,
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
              top: 50,
              right: 50,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.primary,
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

        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          🌸 Fase 1 - Biblioteca Colorida 🌸
        </Text>

        {/* Library Background */}
        <View style={{
          width: 300,
          height: 200,
          backgroundColor: colors.cream,
          borderWidth: 3,
          borderColor: colors.primary,
          borderRadius: 15,
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <Text style={[commonStyles.pixelText, { fontSize: 30 }]}>📚</Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, marginTop: 10 }]}>
            Biblioteca do Conhecimento
          </Text>
          
          {/* Cute book decorations */}
          <View style={{
            width: 20,
            height: 15,
            backgroundColor: colors.blue,
            borderRadius: 3,
            position: 'absolute',
            left: 20,
            top: 30,
          }} />
          <View style={{
            width: 18,
            height: 13,
            backgroundColor: colors.green,
            borderRadius: 3,
            position: 'absolute',
            right: 25,
            top: 40,
          }} />
          <View style={{
            width: 22,
            height: 16,
            backgroundColor: colors.purple,
            borderRadius: 3,
            position: 'absolute',
            left: 30,
            bottom: 30,
          }} />

          {/* Stars to collect */}
          {stars.map((star) => (
            <Animated.View
              key={star.id}
              style={[
                {
                  position: 'absolute',
                  opacity: collectedStars.includes(star.id) ? 0.3 : starAnimation,
                  ...star.position
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  buttonStyles.starButton,
                  { 
                    backgroundColor: collectedStars.includes(star.id) ? colors.grey : colors.accent,
                    width: 30,
                    height: 30
                  }
                ]}
                onPress={() => collectStar(star.id)}
                disabled={collectedStars.includes(star.id)}
              >
                <Text style={[commonStyles.pixelText, { fontSize: 12 }]}>⭐</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Sakura Character (faceless) */}
        <Animated.View 
          style={[
            commonStyles.sakuraCharacter,
            { transform: [{ translateY: sakuraAnimation }] }
          ]}
        >
          {/* Main sakura flower - no face */}
          <Text style={{ fontSize: 50, position: 'absolute' }}>🌸</Text>
          
          {/* Cute sparkles around */}
          <View style={{
            width: 6,
            height: 6,
            backgroundColor: colors.accent,
            borderRadius: 3,
            position: 'absolute',
            left: 12,
            top: 15,
          }} />
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.coral,
            borderRadius: 4,
            position: 'absolute',
            right: 15,
            bottom: 12,
          }} />
        </Animated.View>

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          🌸 Estrelas coletadas: {collectedStars.length}/5 🌸
        </Text>

        {/* Current Message */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
            {messages[currentMessage]}
          </Text>
        </View>

        {/* Mission Description */}
        <View style={[commonStyles.card, { backgroundColor: colors.rose, marginBottom: 20 }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 9, marginBottom: 10, color: colors.darkText }]}>
            🎯 Missão: Coletar 5 estrelas de conhecimento
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText }]}>
            Toque nas estrelas para descobrir os fundamentos da pesquisa! ✨
          </Text>
        </View>

        {/* Phase Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 10 }]}>
              🎉 Fase 1 Completa! 🌸
            </Text>
            
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent }]}
              onPress={nextPhase}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                🌸 Próxima Fase 🌸
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
            🌸 Voltar
          </Text>
        </TouchableOpacity>

        {/* Cute decorative elements */}
        <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-around', width: '100%' }}>
          <Text style={{ fontSize: 15 }}>🌸</Text>
          <Text style={{ fontSize: 12 }}>✨</Text>
          <Text style={{ fontSize: 18 }}>📚</Text>
          <Text style={{ fontSize: 12 }}>✨</Text>
          <Text style={{ fontSize: 15 }}>🌸</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
