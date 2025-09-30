
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

export default function Phase1() {
  const router = useRouter();
  const [stars, setStars] = useState([
    { id: '1', collected: false, text: 'O mundo está mudando rápido com a tecnologia! (UNESCO, 2024)' },
    { id: '2', collected: false, text: 'No Brasil, enfrentamos desigualdades e evasão escolar. (INEP, 2023)' },
    { id: '3', collected: false, text: 'Na Coreia do Sul, há pressão acadêmica e problemas de saúde mental. (OECD, 2022)' },
    { id: '4', collected: false, text: 'A IA e a Gamificação podem transformar a educação! (Moran, 2022)' },
    { id: '5', collected: false, text: 'Mas falta um modelo adaptado ao Brasil. Vamos atrás disso!' },
  ]);
  
  const [channelAnimation] = useState(new Animated.Value(0));
  const [sparkleAnimation] = useState(new Animated.Value(0));
  const [starAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  let [nunitoFontsLoaded] = useNunitoFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded && nunitoFontsLoaded) {
      // Start Wii-style animations
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

      Animated.loop(
        Animated.timing(sparkleAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(starAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(starAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [fontsLoaded, nunitoFontsLoaded, channelAnimation, sparkleAnimation, starAnimation]);

  const collectStar = (starId: string) => {
    console.log(`Collecting star ${starId}`);
    setStars(prevStars => 
      prevStars.map(star => 
        star.id === starId ? { ...star, collected: true } : star
      )
    );
  };

  const nextPhase = () => {
    console.log('Moving to Phase 2');
    router.push('/phase2');
  };

  const collectedCount = stars.filter(star => star.collected).length;
  const allStarsCollected = collectedCount === stars.length;

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
              top: 30,
              left: 30,
              width: 10,
              height: 10,
              backgroundColor: colors.wiiBlue,
              borderRadius: 5,
              opacity: sparkleAnimation,
              zIndex: 1,
            }
          ]}
        />
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 60,
              right: 40,
              width: 8,
              height: 8,
              backgroundColor: colors.wiiYellow,
              borderRadius: 4,
              opacity: sparkleAnimation,
              zIndex: 1,
            }
          ]}
        />

        {/* Wii-style Phase Title */}
        <Text style={[commonStyles.wiiTitle, { fontSize: 18, marginBottom: 10 }]}>
          📚 Fase 1 - Introdução
        </Text>
        <Text style={[commonStyles.wiiSubtitle, { marginBottom: 20 }]}>
          Biblioteca Colorida
        </Text>

        {/* Ana Character */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <View style={[commonStyles.sakuraCharacter, { width: 80, height: 80 }]}>
            <Image 
              source={require('../assets/images/1eb82ef6-1309-4eb9-ae29-33ce88661c60.png')}
              style={{ width: 70, height: 70, borderRadius: 35 }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Mission Description - Wii Style */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
          <Text style={[commonStyles.wiiText, { fontWeight: '600', marginBottom: 8 }]}>
            🎯 Missão: Coletar 5 estrelas de conhecimento
          </Text>
          <Text style={[commonStyles.wiiText, { fontSize: 12, color: colors.wiiTextLight }]}>
            Toque nas estrelas para descobrir fatos importantes sobre educação e tecnologia!
          </Text>
        </View>

        {/* Progress Bar - Wii Style */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[commonStyles.wiiText, { textAlign: 'center', marginBottom: 10, fontWeight: '600' }]}>
            Progresso: {collectedCount}/5 ⭐
          </Text>
          <View style={commonStyles.progressBar}>
            <Animated.View 
              style={[
                commonStyles.progressFill, 
                { 
                  width: `${(collectedCount / stars.length) * 100}%`,
                  backgroundColor: colors.wiiBlue,
                }
              ]} 
            />
          </View>
        </View>

        {/* Stars Grid - Wii Channel Style */}
        <View style={commonStyles.wiiChannelGrid}>
          {stars.map((star, index) => (
            <Animated.View
              key={star.id}
              style={[
                {
                  transform: [
                    {
                      scale: starAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, star.collected ? 1 : 1.1]
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
                    backgroundColor: star.collected ? colors.wiiYellow : colors.wiiWhite,
                    borderColor: star.collected ? colors.wiiOrange : colors.wiiDarkGray,
                    borderWidth: 2,
                  }
                ]}
                onPress={() => collectStar(star.id)}
                disabled={star.collected}
              >
                <Text style={{ fontSize: 24, marginBottom: 5 }}>
                  {star.collected ? '⭐' : '☆'}
                </Text>
                <Text style={[commonStyles.wiiText, { 
                  fontSize: 10, 
                  textAlign: 'center',
                  color: star.collected ? colors.wiiTextDark : colors.wiiTextLight,
                  fontWeight: '600'
                }]}>
                  Estrela {star.id}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Knowledge Display */}
        {stars.filter(star => star.collected).map((star) => (
          <View key={`knowledge-${star.id}`} style={[commonStyles.dialogBox, { marginVertical: 5 }]}>
            <Text style={[commonStyles.wiiText, { fontSize: 12, textAlign: 'center' }]}>
              ⭐ {star.text}
            </Text>
          </View>
        ))}

        {/* Next Phase Button - Wii Style */}
        {allStarsCollected && (
          <Animated.View
            style={[
              { 
                marginTop: 30, 
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
        )}

        {/* Back Button - Wii Style */}
        <View style={{ marginTop: 20, marginBottom: 30, alignItems: 'center' }}>
          <TouchableOpacity
            style={[buttonStyles.wiiMenuButton, { paddingHorizontal: 25 }]}
            onPress={() => router.back()}
          >
            <Text style={[commonStyles.wiiText, { color: colors.wiiTextDark, fontWeight: '600' }]}>
              ← Voltar ao Menu
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
