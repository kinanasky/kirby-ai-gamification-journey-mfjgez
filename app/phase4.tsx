
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { 
  useFonts as useNunitoFonts, 
  Nunito_400Regular, 
  Nunito_600SemiBold, 
  Nunito_700Bold 
} from '@expo-google-fonts/nunito';
import { useRouter } from 'expo-router';

export default function Phase4() {
  const router = useRouter();
  const [battleStarted, setBattleStarted] = useState(false);
  const [currentAttack, setCurrentAttack] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const [battleAnimation] = useState(new Animated.Value(0));
  const [sparkleAnimation] = useState(new Animated.Value(0));
  const [channelAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  let [nunitoFontsLoaded] = useNunitoFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const attacks = [
    { name: 'IA Pura', percentage: '52%', description: 'Estudos focados apenas em Inteligência Artificial' },
    { name: 'Gamificação', percentage: '28%', description: 'Pesquisas sobre elementos de jogos na educação' },
    { name: 'IA + Gamificação', percentage: '20%', description: 'Combinação de ambas as tecnologias' },
  ];

  const countries = [
    { name: 'Brasil', percentage: '52%', pokemon: 'Gengar', image: require('../assets/images/c6ae08a2-41f2-4174-b71e-2a09d61bcdb6.png') },
    { name: 'Coreia', percentage: '48%', pokemon: 'Nidorino', image: require('../assets/images/8c81e7ac-07c5-41b0-a1e0-7bfd5f0c6dbf.png') },
  ];

  const methods = [
    { name: 'Quantitativos', percentage: '72%' },
    { name: 'Qualitativos', percentage: '16%' },
    { name: 'Mistos', percentage: '12%' },
  ];

  useEffect(() => {
    if (fontsLoaded && nunitoFontsLoaded) {
      // Start Wii-style animations
      Animated.loop(
        Animated.sequence([
          Animated.timing(battleAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(battleAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.timing(sparkleAnimation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        })
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(channelAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(channelAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [fontsLoaded, nunitoFontsLoaded, battleAnimation, sparkleAnimation, channelAnimation]);

  const performAttack = () => {
    console.log('Performing attack!');
    if (currentAttack < attacks.length - 1) {
      setCurrentAttack(currentAttack + 1);
    } else {
      setShowResults(true);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 5');
    router.push('/phase5');
  };

  if (!fontsLoaded || !nunitoFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.phaseContainer}>
        {/* Wii-style floating elements */}
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 20,
              left: 20,
              width: 12,
              height: 12,
              backgroundColor: colors.wiiRed,
              borderRadius: 6,
              opacity: sparkleAnimation,
              zIndex: 1,
            }
          ]}
        />
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 50,
              right: 30,
              width: 10,
              height: 10,
              backgroundColor: colors.wiiBlue,
              borderRadius: 5,
              opacity: sparkleAnimation,
              zIndex: 1,
            }
          ]}
        />

        {/* Wii-style Phase Title */}
        <Text style={[commonStyles.wiiTitle, { fontSize: 18, marginBottom: 10 }]}>
          ⚔️ Fase 4 - Resultados
        </Text>
        <Text style={[commonStyles.wiiSubtitle, { marginBottom: 20 }]}>
          Arena Pokémon
        </Text>

        {/* Battle Arena - Wii Channel Style */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
          <Text style={[commonStyles.wiiText, { fontWeight: '600', marginBottom: 15, textAlign: 'center' }]}>
            🏟️ Arena de Batalha dos Dados
          </Text>
          
          {/* Pokemon Display */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
            {countries.map((country, index) => (
              <Animated.View
                key={country.name}
                style={[
                  {
                    alignItems: 'center',
                    transform: [
                      {
                        scale: battleAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.1]
                        })
                      }
                    ]
                  }
                ]}
              >
                <View style={[commonStyles.wiiChannelItem, { width: 80, height: 80, marginBottom: 10 }]}>
                  <Image 
                    source={country.image}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[commonStyles.wiiText, { fontSize: 12, fontWeight: '600', textAlign: 'center' }]}>
                  {country.pokemon}
                </Text>
                <Text style={[commonStyles.wiiText, { fontSize: 11, color: colors.wiiTextLight, textAlign: 'center' }]}>
                  {country.name}
                </Text>
                <Text style={[commonStyles.wiiText, { fontSize: 10, color: colors.wiiBlue, fontWeight: '600', textAlign: 'center' }]}>
                  {country.percentage}
                </Text>
              </Animated.View>
            ))}
          </View>

          {/* VS Indicator */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={[commonStyles.wiiTitle, { fontSize: 16, color: colors.wiiRed }]}>
              VS
            </Text>
          </View>
        </View>

        {/* Attack Data - Wii Channel Grid */}
        {!showResults ? (
          <View>
            <Text style={[commonStyles.wiiText, { textAlign: 'center', marginBottom: 15, fontWeight: '600' }]}>
              💥 Ataques Revelam Dados da Pesquisa
            </Text>
            
            <View style={commonStyles.wiiChannelGrid}>
              {attacks.map((attack, index) => (
                <Animated.View
                  key={attack.name}
                  style={[
                    {
                      transform: [
                        {
                          scale: channelAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, index <= currentAttack ? 1.05 : 1]
                          })
                        }
                      ]
                    }
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      commonStyles.wiiChannelItem,
                      { 
                        backgroundColor: index <= currentAttack ? colors.wiiYellow : colors.wiiWhite,
                        borderColor: index <= currentAttack ? colors.wiiOrange : colors.wiiDarkGray,
                        borderWidth: 2,
                        width: 120,
                        height: 100,
                      }
                    ]}
                    onPress={performAttack}
                    disabled={index > currentAttack}
                  >
                    <Text style={{ fontSize: 20, marginBottom: 5 }}>
                      {index <= currentAttack ? '💥' : '⚡'}
                    </Text>
                    <Text style={[commonStyles.wiiText, { 
                      fontSize: 10, 
                      textAlign: 'center',
                      fontWeight: '600',
                      marginBottom: 3,
                    }]}>
                      {attack.name}
                    </Text>
                    {index <= currentAttack && (
                      <Text style={[commonStyles.wiiText, { 
                        fontSize: 12, 
                        textAlign: 'center',
                        color: colors.wiiBlue,
                        fontWeight: '700',
                      }]}>
                        {attack.percentage}
                      </Text>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            {/* Attack Descriptions */}
            {attacks.slice(0, currentAttack + 1).map((attack, index) => (
              <View key={`desc-${index}`} style={[commonStyles.dialogBox, { marginVertical: 5 }]}>
                <Text style={[commonStyles.wiiText, { fontSize: 12, textAlign: 'center' }]}>
                  💥 <Text style={{ fontWeight: '600' }}>{attack.name}: {attack.percentage}</Text> - {attack.description}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {/* Final Results */}
            <Text style={[commonStyles.wiiText, { textAlign: 'center', marginBottom: 15, fontWeight: '600' }]}>
              📊 Resultados Finais da Batalha
            </Text>

            {/* Methods Data */}
            <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
              <Text style={[commonStyles.wiiText, { fontWeight: '600', marginBottom: 10, textAlign: 'center' }]}>
                🔬 Métodos de Pesquisa
              </Text>
              {methods.map((method, index) => (
                <Text key={method.name} style={[commonStyles.wiiText, { fontSize: 12, textAlign: 'center', marginBottom: 5 }]}>
                  • {method.name}: <Text style={{ color: colors.wiiBlue, fontWeight: '600' }}>{method.percentage}</Text>
                </Text>
              ))}
            </View>

            {/* Battle Conclusion */}
            <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
              <Text style={[commonStyles.wiiText, { fontSize: 13, textAlign: 'center', fontWeight: '600', marginBottom: 8 }]}>
                🏆 Conclusão da Batalha
              </Text>
              <Text style={[commonStyles.wiiText, { fontSize: 12, textAlign: 'center', color: colors.wiiTextLight }]}>
                A luta é equilibrada... mas o inimigo real é equilibrar desempenho e bem-estar!
              </Text>
            </View>

            {/* Next Phase Button */}
            <Animated.View
              style={[
                { 
                  alignItems: 'center',
                  transform: [
                    {
                      scale: channelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05]
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity
                style={[buttonStyles.wiiActionButton, { paddingHorizontal: 30 }]}
                onPress={nextPhase}
              >
                <Text style={[commonStyles.wiiText, { color: colors.wiiWhite, fontWeight: '600' }]}>
                  🚀 Próxima Fase
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}

        {/* Back Button */}
        <View style={{ marginTop: 20, marginBottom: 30, alignItems: 'center' }}>
          <TouchableOpacity
            style={[buttonStyles.wiiMenuButton, { paddingHorizontal: 25 }]}
            onPress={() => router.back()}
          >
            <Text style={[commonStyles.wiiText, { color: colors.wiiTextDark, fontWeight: '600' }]}>
              ← Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
