
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
          toValue: -12,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(sakuraAnimation, {
          toValue: 0,
          duration: 3000,
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
        duration: 25000,
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
                    outputRange: [800, -2000]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={[commonStyles.title, { color: colors.primary, marginBottom: 30 }]}>
            🌸 Créditos 🌸
          </Text>

          <Text style={[commonStyles.pixelText, { color: colors.card, marginBottom: 20, fontSize: 10 }]}>
            Kirby Dream Land: A Jornada da IA e Gamificação Brasil–Coreia
          </Text>

          <Text style={[commonStyles.pixelText, { color: colors.primary, marginBottom: 30, fontSize: 12 }]}>
            🌸 Referências ABNT 2025 🌸
          </Text>

          {references.map((ref, index) => (
            <Text key={index} style={[commonStyles.pixelText, { 
              color: colors.card, 
              marginBottom: 15, 
              fontSize: 6,
              textAlign: 'center',
              paddingHorizontal: 20,
              lineHeight: 10
            }]}>
              {ref}
            </Text>
          ))}

          <Text style={[commonStyles.pixelText, { 
            color: colors.primary, 
            marginTop: 50, 
            marginBottom: 20,
            fontSize: 12
          }]}>
            🌸 Desenvolvido por 🌸
          </Text>

          <Text style={[commonStyles.title, { 
            color: colors.accent, 
            marginBottom: 40,
            fontSize: 14
          }]}>
            Ana Carla Ortega
          </Text>

          <Text style={[commonStyles.pixelText, { 
            color: colors.primary, 
            marginTop: 30, 
            marginBottom: 15,
            fontSize: 10
          }]}>
            최선이 아니라 (사실은 말이야)
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
            marginBottom: 50,
            fontSize: 10
          }]}>
            세상에서 제일가는 우리가 될 거야
          </Text>

          <Text style={[commonStyles.title, { color: colors.accent, marginBottom: 30, fontSize: 18 }]}>
            🌸 OBRIGADO POR JOGAR! 🌸
          </Text>

          <Text style={[commonStyles.pixelText, { 
            color: colors.card, 
            textAlign: 'center',
            fontSize: 8,
            marginBottom: 50
          }]}>
            Continue explorando o mundo da IA e Gamificação na Educação!
          </Text>

          <TouchableOpacity
            style={[buttonStyles.pixelButton, { backgroundColor: colors.primary, marginTop: 50 }]}
            onPress={restartGame}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
              🌸 Jogar Novamente 🌸
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
        <Text style={[commonStyles.phaseTitle, { color: colors.primary }]}>
          🌸 Fase Final - Sala do Trono 🌸
        </Text>

        {/* Throne Room */}
        <Animated.View 
          style={[
            {
              width: 280,
              height: 200,
              backgroundColor: colors.cream,
              borderWidth: 3,
              borderColor: colors.primary,
              borderRadius: 25,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: throneAnimation,
              boxShadow: '4px 4px 8px rgba(255, 182, 193, 0.4)',
              elevation: 5,
            }
          ]}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 50 }]}>👑</Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, marginTop: 10, color: colors.darkText }]}>
            🌸 Sala do Trono do Conhecimento 🌸
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 6, marginTop: 5, color: colors.text }]}>
            Sabedoria Conquistada com Amor
          </Text>
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

        {/* Kirby's Final Message */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20, backgroundColor: colors.cream }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 10, color: colors.darkText }]}>
            🌸 IA e Gamificação têm potencial incrível, mas precisamos cuidar do bem-estar com muito amor!
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
            A tecnologia deve sempre servir ao humano integral! 💕
          </Text>
        </View>

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          🌸 ⭐ Douradas: {collectedGoldStars.length}/5 | 🌟 Prateadas: {collectedSilverStars.length}/5
        </Text>

        {/* Gold Stars (Limitations) */}
        <Text style={[commonStyles.pixelText, { marginBottom: 10, color: colors.accent }]}>
          🌸 Estrelas Douradas - Limitações:
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
                  width: 65,
                  height: 65,
                  borderColor: colors.primary
                }
              ]}
              onPress={() => collectGoldStar(star.id)}
              disabled={collectedGoldStars.includes(star.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 22 }]}>⭐</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show collected gold star descriptions */}
        {collectedGoldStars.map((starId) => {
          const star = goldStars.find(s => s.id === starId);
          return star ? (
            <View key={starId} style={[commonStyles.dialogBox, { marginVertical: 3, width: '90%', backgroundColor: colors.cream }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText }]}>
                🌸 {star.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Silver Stars (Future) */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 10, color: colors.grey }]}>
          🌸 Estrelas Prateadas - Futuro:
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
                  width: 65,
                  height: 65,
                  borderColor: colors.primary
                }
              ]}
              onPress={() => collectSilverStar(star.id)}
              disabled={collectedSilverStars.includes(star.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 22 }]}>🌟</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show collected silver star descriptions */}
        {collectedSilverStars.map((starId) => {
          const star = silverStars.find(s => s.id === starId);
          return star ? (
            <View key={starId} style={[commonStyles.dialogBox, { marginVertical: 3, width: '90%', backgroundColor: colors.cream }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText }]}>
                🌸 {star.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Text style={[commonStyles.pixelText, { color: colors.primary, marginBottom: 15, fontSize: 14 }]}>
              🌸✨ JORNADA COMPLETA! ✨🌸
            </Text>
            
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.primary }]}
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
            ← Voltar 🌸
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
