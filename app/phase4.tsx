
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase4() {
  const router = useRouter();
  const [battlePhase, setBattlePhase] = useState(0);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [pokemonAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const battleData = [
    { category: 'IA', percentage: 52, color: colors.blue },
    { category: 'Gamificação', percentage: 28, color: colors.purple },
    { category: 'IA+Gamificação', percentage: 20, color: colors.accent },
    { category: 'Brasil', percentage: 52, color: colors.green },
    { category: 'Coreia', percentage: 48, color: colors.red },
    { category: 'Quantitativos', percentage: 72, color: colors.orange },
    { category: 'Qualitativos', percentage: 16, color: colors.mint },
    { category: 'Mistos', percentage: 12, color: colors.coral }
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -12,
          duration: 2800,
          useNativeDriver: true,
        }),
        Animated.timing(sakuraAnimation, {
          toValue: 0,
          duration: 2800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pokemon battle animation
    Animated.loop(
      Animated.timing(pokemonAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const performAttack = () => {
    if (battlePhase < battleData.length) {
      setBattlePhase(battlePhase + 1);
      console.log(`Attack performed! Phase: ${battlePhase + 1}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 5');
    router.push('/phase5');
  };

  const isPhaseComplete = battlePhase >= battleData.length;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={[commonStyles.phaseTitle, { color: colors.accent }]}>
          🌸 Fase 4 - Arena Pokémon 🌸
        </Text>

        {/* Arena Environment */}
        <View style={[commonStyles.card, { backgroundColor: colors.sky, marginBottom: 20, width: '95%' }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 30, textAlign: 'center', marginBottom: 10 }]}>
            ⚔️ 🏟️ ⚔️
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, textAlign: 'center', color: colors.darkText }]}>
            Arena de Batalha de Dados
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 6, textAlign: 'center', color: colors.text, marginTop: 5 }]}>
            Brasil vs Coreia - Análise Comparativa
          </Text>
        </View>

        {/* Pokemon Battle */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
          {/* Brazil Pokemon */}
          <Animated.View 
            style={[
              {
                alignItems: 'center',
                transform: [
                  {
                    scale: pokemonAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={{ fontSize: 40 }}>👻</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.green }]}>
              🇧🇷 Gengar Brasil
            </Text>
          </Animated.View>

          {/* VS */}
          <Text style={[commonStyles.pixelText, { fontSize: 20, color: colors.darkText, alignSelf: 'center' }]}>
            VS
          </Text>

          {/* Korea Pokemon */}
          <Animated.View 
            style={[
              {
                alignItems: 'center',
                transform: [
                  {
                    scale: pokemonAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1.1, 1]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={{ fontSize: 40 }}>🦏</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.red }]}>
              🇰🇷 Nidorino Coreia
            </Text>
          </Animated.View>
        </View>

        {/* Sakura Character */}
        <Animated.View 
          style={[
            commonStyles.sakuraCharacter,
            { transform: [{ translateY: sakuraAnimation }], marginBottom: 20 }
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

        {/* Battle Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          🌸 Ataques Revelados: {battlePhase}/{battleData.length}
        </Text>

        {/* Attack Button */}
        {!isPhaseComplete && (
          <TouchableOpacity
            style={[buttonStyles.pixelButton, { backgroundColor: colors.accent, marginBottom: 20 }]}
            onPress={performAttack}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
              ⚔️ Atacar e Revelar Dados! 🌸
            </Text>
          </TouchableOpacity>
        )}

        {/* Battle Results */}
        {battleData.slice(0, battlePhase).map((data, index) => (
          <View key={index} style={[commonStyles.dialogBox, { marginVertical: 3, width: '90%', backgroundColor: data.color }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText, marginBottom: 5 }]}>
              🌸 {data.category}: {data.percentage}%
            </Text>
            <View style={[commonStyles.progressBar, { height: 15 }]}>
              <View 
                style={[
                  commonStyles.progressFill, 
                  { width: `${data.percentage}%`, backgroundColor: colors.darkText }
                ]} 
              />
            </View>
          </View>
        ))}

        {/* Battle Conclusion */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View style={[commonStyles.dialogBox, { backgroundColor: colors.cream, marginBottom: 15 }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
                🌸 Narrador: A luta é equilibrada... mas o inimigo real é equilibrar desempenho e bem-estar! 💕
              </Text>
            </View>
            
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 12 }]}>
              🌸✨ Batalha Completa! ✨🌸
            </Text>
            
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.purple }]}
              onPress={nextPhase}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                Dungeon IRaMuTeQ → 🌸
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
