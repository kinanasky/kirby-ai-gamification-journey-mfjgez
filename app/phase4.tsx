
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase4() {
  const router = useRouter();
  const [battlePhase, setBattlePhase] = useState(0);
  const [revealedData, setRevealedData] = useState<string[]>([]);
  const [kirbyAnimation] = useState(new Animated.Value(0));
  const [pokemonAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const battleData = [
    { id: 'ia', text: 'IA: 52%', color: colors.blue },
    { id: 'gamification', text: 'Gamificação: 28%', color: colors.purple },
    { id: 'combined', text: 'IA+Gamificação: 20%', color: colors.accent },
    { id: 'countries', text: 'Brasil: 52% | Coreia: 48%', color: colors.green },
    { id: 'methods', text: 'Métodos: 72% Quantitativos, 16% Qualitativos, 12% Mistos', color: colors.coral }
  ];

  useEffect(() => {
    // Kirby floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(kirbyAnimation, {
          toValue: -6,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(kirbyAnimation, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pokemon battle animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pokemonAnimation, {
          toValue: 5,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pokemonAnimation, {
          toValue: -5,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const performAttack = () => {
    if (battlePhase < battleData.length) {
      setRevealedData([...revealedData, battleData[battlePhase].id]);
      setBattlePhase(battlePhase + 1);
      console.log(`Attack performed! Phase: ${battlePhase + 1}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 5');
    router.push('/phase5');
  };

  const isBattleComplete = revealedData.length === battleData.length;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          Fase 4 - Arena Pokémon
        </Text>

        {/* Battle Arena */}
        <View style={{
          width: '100%',
          height: 200,
          backgroundColor: colors.mint,
          borderWidth: 2,
          borderColor: colors.darkText,
          borderRadius: 10,
          marginBottom: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 20
        }}>
          {/* Gengar (Brasil) */}
          <Animated.View 
            style={[
              {
                width: 80,
                height: 80,
                backgroundColor: colors.purple,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: colors.darkText,
                alignItems: 'center',
                justifyContent: 'center',
              },
              { transform: [{ translateX: pokemonAnimation }] }
            ]}
          >
            <Text style={[commonStyles.pixelText, { fontSize: 20 }]}>👻</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 6, marginTop: 5 }]}>Gengar</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 6 }]}>Brasil</Text>
          </Animated.View>

          {/* VS */}
          <Text style={[commonStyles.pixelText, { fontSize: 16, color: colors.red }]}>VS</Text>

          {/* Nidorino (Coreia) */}
          <Animated.View 
            style={[
              {
                width: 80,
                height: 80,
                backgroundColor: colors.blue,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: colors.darkText,
                alignItems: 'center',
                justifyContent: 'center',
              },
              { transform: [{ translateX: pokemonAnimation.interpolate({
                inputRange: [-5, 5],
                outputRange: [5, -5]
              }) }] }
            ]}
          >
            <Text style={[commonStyles.pixelText, { fontSize: 20 }]}>🦏</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 6, marginTop: 5 }]}>Nidorino</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 6 }]}>Coreia</Text>
          </Animated.View>
        </View>

        {/* Kirby Narrator */}
        <Animated.View 
          style={[
            commonStyles.kirbyCharacter,
            { 
              width: 80,
              height: 80,
              transform: [{ translateY: kirbyAnimation }] 
            }
          ]}
        >
          {/* Eyes */}
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.darkText,
            borderRadius: 6,
            position: 'absolute',
            left: 18,
            top: 22,
          }} />
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.darkText,
            borderRadius: 6,
            position: 'absolute',
            right: 18,
            top: 22,
          }} />
          {/* Mouth */}
          <View style={{
            width: 8,
            height: 4,
            backgroundColor: colors.darkText,
            borderRadius: 4,
            position: 'absolute',
            bottom: 26,
          }} />
          {/* Cheeks */}
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.red,
            borderRadius: 4,
            position: 'absolute',
            left: 8,
            top: 34,
          }} />
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.red,
            borderRadius: 4,
            position: 'absolute',
            right: 8,
            top: 34,
          }} />
        </Animated.View>

        {/* Battle Progress */}
        <Text style={[commonStyles.pixelText, { marginVertical: 15, color: colors.text }]}>
          Dados Revelados: {revealedData.length}/{battleData.length}
        </Text>

        {/* Attack Button */}
        {!isBattleComplete && (
          <TouchableOpacity
            style={[buttonStyles.pixelButton, { backgroundColor: colors.red, marginBottom: 15 }]}
            onPress={performAttack}
          >
            <Text style={[commonStyles.pixelText, { color: colors.card }]}>
              ⚔️ Atacar e Revelar Dados
            </Text>
          </TouchableOpacity>
        )}

        {/* Revealed Data */}
        {revealedData.map((dataId) => {
          const data = battleData.find(d => d.id === dataId);
          return data ? (
            <View 
              key={dataId} 
              style={[
                commonStyles.dialogBox, 
                { 
                  backgroundColor: data.color,
                  marginVertical: 5,
                  width: '90%'
                }
              ]}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
                {data.text}
              </Text>
            </View>
          ) : null;
        })}

        {/* Final Narration */}
        {isBattleComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View style={[commonStyles.dialogBox, { marginBottom: 15 }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
                A luta é equilibrada… mas o inimigo real é equilibrar desempenho e bem-estar!
              </Text>
            </View>
            
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15 }]}>
              🎉 Batalha Completa! 🎉
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
