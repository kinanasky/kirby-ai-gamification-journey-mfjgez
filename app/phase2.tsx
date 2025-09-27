
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase2() {
  const router = useRouter();
  const [collectedPowerUps, setCollectedPowerUps] = useState<string[]>([]);
  const [defeatedEnemies, setDefeatedEnemies] = useState(0);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [enemyAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const powerUps = [
    { id: 'ia', name: '💙 IA', description: 'Absorve dados e cria rotas personalizadas de aprendizado' },
    { id: 'gamificacao', name: '💛 Gamificação', description: 'Aumenta motivação e engajamento dos estudantes' }
  ];

  const timelineEvents = [
    { decade: '70s', event: 'Tutores inteligentes pioneiros!' },
    { decade: '80s', event: 'Sistemas especialistas educacionais!' },
    { decade: '90s', event: 'Agentes autônomos de aprendizagem!' },
    { decade: '2010+', event: 'Deep Learning revoluciona a educação!' },
    { decade: 'Hoje', event: 'Gamificação nos dá Autonomia, Competência e Conexão Social!' }
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -10,
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

    // Enemy (flying books) animation
    Animated.loop(
      Animated.timing(enemyAnimation, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const collectPowerUp = (powerUpId: string) => {
    if (!collectedPowerUps.includes(powerUpId)) {
      setCollectedPowerUps([...collectedPowerUps, powerUpId]);
      console.log(`Power-up collected: ${powerUpId}`);
    }
  };

  const defeatEnemy = () => {
    if (defeatedEnemies < 5) {
      setDefeatedEnemies(defeatedEnemies + 1);
      console.log(`Enemy defeated! Total: ${defeatedEnemies + 1}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 3');
    router.push('/phase3');
  };

  const isPhaseComplete = collectedPowerUps.length === 2 && defeatedEnemies >= 3;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={[commonStyles.phaseTitle, { color: colors.purple }]}>
          🌸 Fase 2 - Fundamentação Teórica 🌸
        </Text>

        {/* Floating enemy books */}
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 120,
              left: 20,
              transform: [
                {
                  translateX: enemyAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={{ fontSize: 25 }}>📚</Text>
        </Animated.View>

        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 160,
              right: 30,
              transform: [
                {
                  translateX: enemyAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -80]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={{ fontSize: 20 }}>📖</Text>
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
          🌸 Power-ups: {collectedPowerUps.length}/2 | Inimigos: {defeatedEnemies}/5
        </Text>

        {/* Power-ups */}
        <Text style={[commonStyles.pixelText, { marginBottom: 10, color: colors.purple }]}>
          Power-ups Coletáveis:
        </Text>
        <View style={commonStyles.collectibleGrid}>
          {powerUps.map((powerUp) => (
            <TouchableOpacity
              key={powerUp.id}
              style={[
                buttonStyles.powerUpButton,
                { 
                  backgroundColor: collectedPowerUps.includes(powerUp.id) ? colors.blue : colors.grey,
                  opacity: collectedPowerUps.includes(powerUp.id) ? 1 : 0.6,
                  borderColor: colors.purple
                }
              ]}
              onPress={() => collectPowerUp(powerUp.id)}
              disabled={collectedPowerUps.includes(powerUp.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
                {powerUp.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show collected power-up descriptions */}
        {collectedPowerUps.map((powerUpId) => {
          const powerUp = powerUps.find(p => p.id === powerUpId);
          return powerUp ? (
            <View key={powerUpId} style={[commonStyles.dialogBox, { marginVertical: 5, width: '90%', backgroundColor: colors.cream }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText }]}>
                🌸 {powerUp.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Enemy Battle */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 10, color: colors.red }]}>
          🌸 Derrote os Livros Voadores:
        </Text>
        <TouchableOpacity
          style={[
            buttonStyles.pixelButton,
            { 
              backgroundColor: defeatedEnemies >= 5 ? colors.green : colors.red,
              marginBottom: 20
            }
          ]}
          onPress={defeatEnemy}
          disabled={defeatedEnemies >= 5}
        >
          <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
            {defeatedEnemies >= 5 ? '🌸 Todos Derrotados! 🌸' : `⚔️ Atacar (${defeatedEnemies}/5)`}
          </Text>
        </TouchableOpacity>

        {/* Timeline */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.accent }]}>
          🌸 Linha do Tempo da IA:
        </Text>
        {timelineEvents.map((event, index) => (
          <View key={index} style={[commonStyles.dialogBox, { marginVertical: 3, width: '90%', backgroundColor: colors.mint }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText, marginBottom: 5 }]}>
              {event.decade}
            </Text>
            <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.text }]}>
              🌸 {event.event}
            </Text>
          </View>
        ))}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.purple, marginBottom: 15, fontSize: 12 }]}>
              🌸✨ Teoria Dominada! ✨🌸
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.blue }]}
              onPress={nextPhase}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                Laboratório → 🌸
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
