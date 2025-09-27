
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
  const [currentDialog, setCurrentDialog] = useState(0);
  const [kirbyAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const powerUps = [
    { id: 'ia', name: '💙 IA', description: 'Absorve dados e cria rotas personalizadas' },
    { id: 'gamification', name: '💛 Gamificação', description: 'Aumenta motivação e engajamento' }
  ];

  const timelineDialogs = [
    "70s: Tutores inteligentes!",
    "80s: Sistemas especialistas!",
    "90s: Agentes autônomos!",
    "2010+: Deep Learning!",
    "A Gamificação nos dá Autonomia, Competência e Conexão Social!"
  ];

  useEffect(() => {
    // Kirby floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(kirbyAnimation, {
          toValue: -6,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(kirbyAnimation, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
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
      setCurrentDialog(defeatedEnemies);
      console.log(`Enemy defeated! Total: ${defeatedEnemies + 1}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 3');
    router.push('/phase3');
  };

  const isPhaseComplete = collectedPowerUps.length === 2 && defeatedEnemies === 5;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          Fase 2 - Fundamentação Teórica
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

        {/* Power-ups Section */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          Power-ups Coletáveis:
        </Text>

        <View style={commonStyles.collectibleGrid}>
          {powerUps.map((powerUp) => (
            <TouchableOpacity
              key={powerUp.id}
              style={[
                buttonStyles.powerUpButton,
                { 
                  backgroundColor: collectedPowerUps.includes(powerUp.id) ? colors.accent : colors.blue,
                  opacity: collectedPowerUps.includes(powerUp.id) ? 1 : 0.7
                }
              ]}
              onPress={() => collectPowerUp(powerUp.id)}
              disabled={collectedPowerUps.includes(powerUp.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
                {powerUp.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show power-up descriptions */}
        {collectedPowerUps.map((powerUpId) => {
          const powerUp = powerUps.find(p => p.id === powerUpId);
          return powerUp ? (
            <View key={powerUpId} style={[commonStyles.dialogBox, { marginVertical: 5 }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
                {powerUp.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Enemies Section */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 15, color: colors.text }]}>
          Inimigos: Livros Voadores 📚
        </Text>

        <Text style={[commonStyles.pixelText, { marginBottom: 10, color: colors.text }]}>
          Derrotados: {defeatedEnemies}/5
        </Text>

        <View style={commonStyles.progressBar}>
          <View 
            style={[
              commonStyles.progressFill, 
              { width: `${(defeatedEnemies / 5) * 100}%` }
            ]} 
          />
        </View>

        <TouchableOpacity
          style={[
            buttonStyles.pixelButton, 
            { 
              backgroundColor: colors.red,
              marginVertical: 15,
              opacity: defeatedEnemies >= 5 ? 0.5 : 1
            }
          ]}
          onPress={defeatEnemy}
          disabled={defeatedEnemies >= 5}
        >
          <Text style={[commonStyles.pixelText, { color: colors.card }]}>
            ⚔️ Derrotar Livro
          </Text>
        </TouchableOpacity>

        {/* Timeline Dialog */}
        {defeatedEnemies > 0 && (
          <View style={[commonStyles.dialogBox, { marginTop: 10 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
              {timelineDialogs[currentDialog]}
            </Text>
          </View>
        )}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15 }]}>
              🎉 Fundamentação Completa! 🎉
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
