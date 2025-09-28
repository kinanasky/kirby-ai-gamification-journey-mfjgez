
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase4() {
  const router = useRouter();
  const [battlePhase, setBattlePhase] = useState(0);
  const [attacks, setAttacks] = useState(0);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [battleAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const battleData = [
    { stat: 'IA', percentage: '52%', color: colors.blue },
    { stat: 'Gamificação', percentage: '28%', color: colors.purple },
    { stat: 'IA+Gamificação', percentage: '20%', color: colors.coral },
    { stat: 'Brasil', percentage: '52%', color: colors.green },
    { stat: 'Coreia', percentage: '48%', color: colors.red },
    { stat: 'Métodos Quantitativos', percentage: '72%', color: colors.accent },
    { stat: 'Métodos Qualitativos', percentage: '16%', color: colors.orange },
    { stat: 'Métodos Mistos', percentage: '12%', color: colors.mint }
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

    // Battle animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(battleAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(battleAnimation, {
          toValue: 0.7,
          duration: 1000,
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
  }, [battleAnimation, petalAnimation, sakuraAnimation]);

  const performAttack = () => {
    if (attacks < battleData.length) {
      setAttacks(attacks + 1);
      console.log(`Attack performed: ${attacks + 1}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 5');
    router.push('/phase5');
  };

  const isPhaseComplete = attacks >= battleData.length;

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

        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          🌸 Fase 4 - Arena Pokémon 🌸
        </Text>

        {/* Sakura Character (faceless) */}
        <Animated.View 
          style={[
            commonStyles.sakuraCharacter,
            { transform: [{ translateY: sakuraAnimation }], marginBottom: 20 }
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

        {/* Battle Arena */}
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
          {/* Pokémon do Brasil: Gengar */}
          <Animated.View style={{
            position: 'absolute',
            left: 30,
            top: 20,
            opacity: battleAnimation,
            alignItems: 'center'
          }}>
            <Image 
              source={require('../assets/images/ce6d3b7b-68d2-4d48-9d4b-0658fd03e70b.png')}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
            <Text style={[commonStyles.pixelText, { fontSize: 6, color: colors.darkText, marginTop: 5, textAlign: 'center' }]}>
              Brasil
            </Text>
          </Animated.View>

          {/* VS */}
          <Text style={[commonStyles.pixelText, { fontSize: 20, color: colors.darkText }]}>
            VS
          </Text>

          {/* Pokémon da Coreia: Nidorino */}
          <Animated.View style={{
            position: 'absolute',
            right: 30,
            top: 20,
            opacity: battleAnimation,
            alignItems: 'center'
          }}>
            <Image 
              source={require('../assets/images/8c81e7ac-07c5-41b0-a1e0-7bfd5f0c6dbf.png')}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
            <Text style={[commonStyles.pixelText, { fontSize: 6, color: colors.darkText, marginTop: 5, textAlign: 'center' }]}>
              Coreia
            </Text>
          </Animated.View>
        </View>

        {/* Battle Data Revealed */}
        <Text style={[commonStyles.pixelText, { fontSize: 10, marginBottom: 15, color: colors.text }]}>
          🌸 Dados Revelados: {attacks}/{battleData.length} 🌸
        </Text>

        {/* Data Display */}
        <View style={{ width: '100%', marginBottom: 20 }}>
          {battleData.slice(0, attacks).map((data, index) => (
            <View key={index} style={[commonStyles.card, { backgroundColor: data.color, marginVertical: 5 }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
                {data.stat}: {data.percentage}
              </Text>
            </View>
          ))}
        </View>

        {/* Attack Button */}
        {!isPhaseComplete && (
          <TouchableOpacity
            style={[buttonStyles.pixelButton, { backgroundColor: colors.red, marginBottom: 20 }]}
            onPress={performAttack}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
              ⚔️ Atacar! ⚔️
            </Text>
          </TouchableOpacity>
        )}

        {/* Battle Complete Message */}
        {isPhaseComplete && (
          <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
              🌸 A luta é equilibrada… mas o inimigo real é equilibrar desempenho e bem-estar! ✨
            </Text>
          </View>
        )}

        {/* Phase Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 10 }]}>
              🎉 Fase 4 Completa! 🌸
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
          <Text style={{ fontSize: 18 }}>⚔️</Text>
          <Text style={{ fontSize: 12 }}>✨</Text>
          <Text style={{ fontSize: 15 }}>🌸</Text>
        </View>

        {/* Cute graphic elements */}
        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', width: '100%' }}>
          <Image 
            source={require('../assets/images/a982b36c-80bc-44c0-a026-35c6227ea0f0.jpeg')}
            style={{ width: 20, height: 20, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Image 
            source={require('../assets/images/fe75fb18-a9af-410c-b9c0-ddf8ba28fcf0.jpeg')}
            style={{ width: 18, height: 18, borderRadius: 9 }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
