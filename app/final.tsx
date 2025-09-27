
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function FinalPhase() {
  const router = useRouter();
  const [collectedGoldStars, setCollectedGoldStars] = useState<string[]>([]);
  const [collectedSilverStars, setCollectedSilverStars] = useState<string[]>([]);
  const [showCredits, setShowCredits] = useState(false);
  const [kirbyAnimation] = useState(new Animated.Value(0));
  const [throneAnimation] = useState(new Animated.Value(0));
  const [creditsAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const goldStars = [
    { id: 'revisao', name: '⭐ Limitação: Revisão Teórica', description: 'Necessidade de mais estudos empíricos' },
    { id: 'ausencia', name: '⭐ Limitação: Ausência Brasil–Coreia', description: 'Poucos estudos comparativos diretos' },
    { id: 'quantitativo', name: '⭐ Limitação: Predomínio Quantitativo', description: 'Falta de abordagens qualitativas profundas' },
    { id: 'contexto', name: '⭐ Limitação: Contexto Cultural', description: 'Necessidade de adaptação cultural' },
    { id: 'longitudinal', name: '⭐ Limitação: Estudos Longitudinais', description: 'Falta de acompanhamento a longo prazo' }
  ];

  const silverStars = [
    { id: 'empiricos', name: '🌟 Futuro: Estudos Empíricos', description: 'Implementação prática das diretrizes' },
    { id: 'saude', name: '🌟 Futuro: Saúde Mental', description: 'Foco no bem-estar dos estudantes' },
    { id: 'etica', name: '🌟 Futuro: Ética e IA', description: 'Desenvolvimento de frameworks éticos' },
    { id: 'formacao', name: '🌟 Futuro: Formação Docente', description: 'Programas de capacitação continuada' },
    { id: 'cultura', name: '🌟 Futuro: Adaptação Cultural', description: 'Personalização para diferentes contextos' }
  ];

  const references = [
    "INEP. Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira. Censo da Educação Básica 2023. Brasília: INEP, 2023.",
    "MORAN, J. M. Metodologias ativas para uma aprendizagem mais profunda. In: BACICH, L.; MORAN, J. M. (Org.). Metodologias ativas para uma educação inovadora. Porto Alegre: Penso, 2022.",
    "OECD. Organisation for Economic Co-operation and Development. Education at a Glance 2022: OECD Indicators. Paris: OECD Publishing, 2022.",
    "UNESCO. United Nations Educational, Scientific and Cultural Organization. Global Education Monitoring Report 2024: Technology in education. Paris: UNESCO, 2024."
  ];

  useEffect(() => {
    // Kirby floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(kirbyAnimation, {
          toValue: -8,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(kirbyAnimation, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Throne glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(throneAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(throneAnimation, {
          toValue: 0.5,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (showCredits) {
      // Credits scrolling animation
      Animated.timing(creditsAnimation, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      }).start();
    }
  }, [showCredits]);

  const collectGoldStar = (starId: string) => {
    if (!collectedGoldStars.includes(starId)) {
      setCollectedGoldStars([...collectedGoldStars, starId]);
      console.log(`Gold star collected: ${starId}`);
    }
  };

  const collectSilverStar = (starId: string) => {
    if (!collectedSilverStars.includes(starId)) {
      setCollectedSilverStars([...collectedSilverStars, starId]);
      console.log(`Silver star collected: ${starId}`);
    }
  };

  const showCreditsScreen = () => {
    setShowCredits(true);
    console.log('Showing credits');
  };

  const restartGame = () => {
    console.log('Restarting game');
    router.push('/');
  };

  const isPhaseComplete = collectedGoldStars.length === 5 && collectedSilverStars.length === 5;

  if (!fontsLoaded) {
    return null;
  }

  if (showCredits) {
    return (
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.darkText }]}>
        <Animated.View 
          style={[
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: 50,
              transform: [
                {
                  translateY: creditsAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, -1000]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={[commonStyles.title, { color: colors.accent, marginBottom: 30 }]}>
            Créditos
          </Text>

          <Text style={[commonStyles.pixelText, { color: colors.card, marginBottom: 20, fontSize: 10 }]}>
            Kirby Dream Land: A Jornada da IA e Gamificação Brasil–Coreia
          </Text>

          <Text style={[commonStyles.pixelText, { color: colors.primary, marginBottom: 30 }]}>
            Referências ABNT 2025:
          </Text>

          {references.map((ref, index) => (
            <Text key={index} style={[commonStyles.pixelText, { 
              color: colors.card, 
              marginBottom: 20, 
              fontSize: 7,
              textAlign: 'center',
              paddingHorizontal: 20
            }]}>
              {ref}
            </Text>
          ))}

          <Text style={[commonStyles.pixelText, { 
            color: colors.accent, 
            marginTop: 40, 
            marginBottom: 20,
            fontSize: 10
          }]}>
            최선이 아니라 (사실은 말이야)
          </Text>
          <Text style={[commonStyles.pixelText, { 
            color: colors.accent, 
            marginBottom: 20,
            fontSize: 10
          }]}>
            최고가 되고 말 거야
          </Text>
          <Text style={[commonStyles.pixelText, { 
            color: colors.accent, 
            marginBottom: 40,
            fontSize: 10
          }]}>
            세상에서 제일가는 우리가 될 거야
          </Text>

          <Text style={[commonStyles.title, { color: colors.primary, marginBottom: 20 }]}>
            OBRIGADO POR JOGAR!
          </Text>

          <Text style={[commonStyles.pixelText, { 
            color: colors.card, 
            textAlign: 'center',
            fontSize: 8
          }]}>
            Continue explorando o mundo da IA e Gamificação na Educação!
          </Text>

          <TouchableOpacity
            style={[buttonStyles.pixelButton, { backgroundColor: colors.primary, marginTop: 50 }]}
            onPress={restartGame}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
              🎮 Jogar Novamente
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          Fase Final - Sala do Trono
        </Text>

        {/* Throne Room */}
        <Animated.View 
          style={[
            {
              width: 250,
              height: 180,
              backgroundColor: colors.cream,
              borderWidth: 3,
              borderColor: colors.darkText,
              borderRadius: 20,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: throneAnimation
            }
          ]}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 40 }]}>👑</Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, marginTop: 10 }]}>
            Sala do Trono
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 6, marginTop: 5 }]}>
            Conhecimento Conquistado
          </Text>
        </Animated.View>

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

        {/* Kirby's Final Message */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 10 }]}>
            IA e Gamificação têm potencial incrível, mas precisamos cuidar do bem-estar.
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
            A tecnologia deve sempre servir ao humano integral!
          </Text>
        </View>

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          ⭐ Douradas: {collectedGoldStars.length}/5 | 🌟 Prateadas: {collectedSilverStars.length}/5
        </Text>

        {/* Gold Stars (Limitations) */}
        <Text style={[commonStyles.pixelText, { marginBottom: 10, color: colors.accent }]}>
          Estrelas Douradas - Limitações:
        </Text>

        <View style={commonStyles.collectibleGrid}>
          {goldStars.map((star) => (
            <TouchableOpacity
              key={star.id}
              style={[
                buttonStyles.starButton,
                { 
                  backgroundColor: collectedGoldStars.includes(star.id) ? colors.accent : colors.grey,
                  opacity: collectedGoldStars.includes(star.id) ? 1 : 0.5,
                  width: 60,
                  height: 60
                }
              ]}
              onPress={() => collectGoldStar(star.id)}
              disabled={collectedGoldStars.includes(star.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 20 }]}>⭐</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show collected gold star descriptions */}
        {collectedGoldStars.map((starId) => {
          const star = goldStars.find(s => s.id === starId);
          return star ? (
            <View key={starId} style={[commonStyles.dialogBox, { marginVertical: 3, width: '90%' }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 7 }]}>
                {star.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Silver Stars (Future) */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 10, color: colors.grey }]}>
          Estrelas Prateadas - Futuro:
        </Text>

        <View style={commonStyles.collectibleGrid}>
          {silverStars.map((star) => (
            <TouchableOpacity
              key={star.id}
              style={[
                buttonStyles.starButton,
                { 
                  backgroundColor: collectedSilverStars.includes(star.id) ? colors.grey : colors.backgroundAlt,
                  opacity: collectedSilverStars.includes(star.id) ? 1 : 0.5,
                  width: 60,
                  height: 60
                }
              ]}
              onPress={() => collectSilverStar(star.id)}
              disabled={collectedSilverStars.includes(star.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 20 }]}>🌟</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show collected silver star descriptions */}
        {collectedSilverStars.map((starId) => {
          const star = silverStars.find(s => s.id === starId);
          return star ? (
            <View key={starId} style={[commonStyles.dialogBox, { marginVertical: 3, width: '90%' }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 7 }]}>
                {star.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 12 }]}>
              🎉 JORNADA COMPLETA! 🎉
            </Text>
            
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent }]}
              onPress={showCreditsScreen}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                ✨ Ver Créditos ✨
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
