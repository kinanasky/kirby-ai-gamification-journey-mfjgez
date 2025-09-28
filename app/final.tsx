
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
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [throneAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  
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
    "CHEN, L. et al. Artificial intelligence in education: A review. IEEE Access, v. 8, p. 75264-75278, 2020.",
    "DAMASCENO, A. et al. What can be found from student interaction logs of online courses offered in Brazil. In: CONGRESSO BRASILEIRO DE INFORMÁTICA NA EDUCAÇÃO (CBIE), 8., 2019, Brasília/DF. Anais [...]. Porto Alegre: Sociedade Brasileira de Computação, 2019. p. 1641-1650.",
    "DETERDING, S. et al. Gamification: towards a definition. In: CHI WORKSHOP ON GAMIFICATION, 1., 2011, Vancouver. Anais... Vancouver, 2011, p. 12-15.",
    "FRIEDRICH-NAUMANN-STIFTUNG FÜR DIE FREIHEIT. South Korea slows down on AI education. freiheit.org, 16 jun. 2025.",
    "HAN, J. et al. Examining young children's perception toward augmented reality-infused dramatic play. Educational Technology Research and Development, v. 63, p. 455–474, 2015.",
    "HOLMES, W.; BIALIK, M.; FADEL, C. Artificial intelligence in education: promises and implications for teaching and learning. Boston, MA: Center for Curriculum Redesign, 2019.",
    "INEP. Censo Escolar da Educação Básica 2023: Ensino Médio tem maior taxa de repetência e evasão da educação básica. Brasília: Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira, 2024.",
    "KIM, H.; KWON, Y. The Effects of a Voice-based AI Chatbot on Korean EFL Students' Speaking Ability and Affective Factors. International Journal of Computer Science and Information Technology in Education, v. 3, n. 2, p. 11-23, 2020.",
    "KIM, N. J.; KIM, M. K. Teacher's perceptions of using an artificial intelligence-based educational tool for scientific writing. Frontiers in Education, v. 7, 755914, 2022.",
    "LEON, C. G. R. M. P. de et al. Artificial intelligence in the analysis of emotions of nursing students undergoing clinical simulation. Revista Brasileira de Enfermagem, v. 76, p. e20210909, 2023.",
    "MORAN, J. Metodologias Ativas para uma Aprendizagem Mais Profunda. 3. ed. Porto Alegre: Penso, 2022.",
    "ORGANISATION FOR ECONOMIC CO-OPERATION AND DEVELOPMENT. PISA 2022 Results (Volume I): The State of Learning and Equity in Education. Paris: OECD Publishing, 2023.",
    "PAGE, M. J. et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ, v. 372, n. 71, 2021.",
    "RUSSELL, S. J.; NORVIG, P. Artificial intelligence: a modern approach. 4. ed. Hoboken, NJ: Pearson Education, 2020.",
    "SILVA, J. B. da; SALES, G. L.; CASTRO, J. B. de. Gamificação como estratégia de aprendizagem ativa no ensino de Física. Revista Brasileira de Ensino de Física, v. 41, n. 4, p. e20180309, 2019.",
    "SILVA, M. V. et al. Vulnerabilidade e saúde mental de estudantes de uma universidade pública. Revista Baiana de Enfermagem, v. 35, e37494, 2021.",
    "UNESCO. Guia para a IA generativa na educação e na pesquisa. Paris: UNESCO, 2024.",
    "WOOLF, B. P. Building intelligent interactive tutors: student-centered strategies for revolutionizing e-learning. Burlington, MA: Morgan Kaufmann, 2008."
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -8,
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

    // Petal animation
    Animated.loop(
      Animated.timing(petalAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

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
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20 }}>
          {/* Floating petals */}
          <Animated.View 
            style={[
              {
                position: 'absolute',
                top: 50,
                left: 30,
                width: 15,
                height: 15,
                borderRadius: 8,
                backgroundColor: colors.rose,
                transform: [
                  {
                    translateY: petalAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 100]
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
                top: 80,
                right: 40,
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: colors.primary,
                transform: [
                  {
                    translateY: petalAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 120]
                    })
                  }
                ]
              }
            ]}
          />

          <Text style={[commonStyles.title, { color: colors.primary, marginBottom: 20, fontSize: 18 }]}>
            🌸 Créditos 🌸
          </Text>

          <Text style={[commonStyles.pixelText, { color: colors.darkText, marginBottom: 20, fontSize: 10, textAlign: 'center' }]}>
            Sakura Dream Land: A Jornada da IA e Gamificação Brasil–Coreia
          </Text>

          {/* Developer credit */}
          <View style={[commonStyles.card, { backgroundColor: colors.rose, marginBottom: 20 }]}>
            <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 10, marginBottom: 10 }]}>
              🌸 Desenvolvido por 🌸
            </Text>
            <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 12, marginBottom: 10 }]}>
              Ana Carla Ortega
            </Text>
            <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8, textAlign: 'center' }]}>
              Obrigada pela presença na apresentação de TCC! 🌸✨
            </Text>
          </View>

          <Text style={[commonStyles.pixelText, { color: colors.primary, marginBottom: 20, fontSize: 10 }]}>
            📚 Referências ABNT 2025 📚
          </Text>

          {references.map((ref, index) => (
            <View key={index} style={[commonStyles.card, { marginBottom: 10, backgroundColor: colors.card }]}>
              <Text style={[commonStyles.pixelText, { 
                color: colors.darkText, 
                fontSize: 7,
                textAlign: 'left',
                lineHeight: 12
              }]}>
                {ref}
              </Text>
            </View>
          ))}

          <Text style={[commonStyles.pixelText, { 
            color: colors.primary, 
            marginTop: 30, 
            marginBottom: 15,
            fontSize: 10
          }]}>
            🇰🇷 최선이 아니라 (사실은 말이야) 🇰🇷
          </Text>
          <Text style={[commonStyles.pixelText, { 
            color: colors.primary, 
            marginBottom: 15,
            fontSize: 10
          }]}>
            최고가 되고 말 거야
          </Text>
          <Text style={[commonStyles.pixelText, { 
            color: colors.primary, 
            marginBottom: 30,
            fontSize: 10
          }]}>
            세상에서 제일가는 우리가 될 거야
          </Text>

          <Text style={[commonStyles.title, { color: colors.accent, marginBottom: 20, fontSize: 16 }]}>
            🎉 OBRIGADO POR JOGAR! 🎉
          </Text>

          <Text style={[commonStyles.pixelText, { 
            color: colors.darkText, 
            textAlign: 'center',
            fontSize: 8,
            marginBottom: 30
          }]}>
            Continue explorando o mundo da IA e Gamificação na Educação! 🌸✨
          </Text>

          <TouchableOpacity
            style={[buttonStyles.pixelButton, { backgroundColor: colors.primary, marginBottom: 20 }]}
            onPress={restartGame}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
              🎮 Jogar Novamente 🌸
            </Text>
          </TouchableOpacity>

          {/* Cute decorative elements */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
            <Text style={{ fontSize: 20 }}>🌸</Text>
            <Text style={{ fontSize: 15 }}>✨</Text>
            <Text style={{ fontSize: 18 }}>🌺</Text>
            <Text style={{ fontSize: 15 }}>✨</Text>
            <Text style={{ fontSize: 20 }}>🌸</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
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
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.rose,
              transform: [
                {
                  translateY: petalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 80]
                  })
                }
              ]
            }
          ]}
        />

        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          🌸 Fase Final - Sala do Trono 🌸
        </Text>

        {/* Throne Room */}
        <Animated.View 
          style={[
            {
              width: 250,
              height: 180,
              backgroundColor: colors.cream,
              borderWidth: 3,
              borderColor: colors.primary,
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
          {/* Cute sparkles */}
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.accent,
            borderRadius: 4,
            position: 'absolute',
            left: 20,
            top: 20,
          }} />
          <View style={{
            width: 6,
            height: 6,
            backgroundColor: colors.coral,
            borderRadius: 3,
            position: 'absolute',
            right: 25,
            top: 30,
          }} />
        </Animated.View>

        {/* Sakura Character (faceless) */}
        <Animated.View 
          style={[
            {
              width: 100,
              height: 100,
              backgroundColor: colors.rose,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              transform: [{ translateY: sakuraAnimation }]
            }
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

        {/* Sakura's Final Message */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 10 }]}>
            🌸 IA e Gamificação têm potencial incrível, mas precisamos cuidar do bem-estar.
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
            A tecnologia deve sempre servir ao humano integral! ✨
          </Text>
        </View>

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          ⭐ Douradas: {collectedGoldStars.length}/5 | 🌟 Prateadas: {collectedSilverStars.length}/5
        </Text>

        {/* Gold Stars (Limitations) */}
        <Text style={[commonStyles.pixelText, { marginBottom: 10, color: colors.accent }]}>
          🌸 Estrelas Douradas - Limitações 🌸
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
                🌸 {star.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Silver Stars (Future) */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 10, color: colors.grey }]}>
          🌸 Estrelas Prateadas - Futuro 🌸
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
                🌸 {star.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 12 }]}>
              🎉 JORNADA COMPLETA! 🌸✨
            </Text>
            
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent }]}
              onPress={showCreditsScreen}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                🌸 Ver Créditos 🌸
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
          <Text style={{ fontSize: 18 }}>🌺</Text>
          <Text style={{ fontSize: 12 }}>✨</Text>
          <Text style={{ fontSize: 15 }}>🌸</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
