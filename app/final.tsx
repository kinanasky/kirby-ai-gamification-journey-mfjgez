
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';
import SimpleBottomSheet from '../components/BottomSheet';

export default function FinalPhase() {
  const router = useRouter();
  const [collectedGoldStars, setCollectedGoldStars] = useState<string[]>([]);
  const [collectedSilverStars, setCollectedSilverStars] = useState<string[]>([]);
  const [showCredits, setShowCredits] = useState(false);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [starAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  const [showGoldStarsModal, setShowGoldStarsModal] = useState(false);
  const [showSilverStarsModal, setShowSilverStarsModal] = useState(false);
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const goldStars = [
    { id: 'revisao', name: '⭐ Limitação: Revisão Teórica' },
    { id: 'ausencia', name: '⭐ Limitação: Ausência Brasil–Coreia' },
    { id: 'predominio', name: '⭐ Limitação: Predomínio Quantitativo' },
    { id: 'contexto', name: '⭐ Limitação: Contexto Específico' },
    { id: 'temporal', name: '⭐ Limitação: Recorte Temporal' }
  ];

  const silverStars = [
    { id: 'empiricos', name: '✨ Futuro: Estudos Empíricos' },
    { id: 'saude', name: '✨ Futuro: Saúde Mental' },
    { id: 'etica', name: '✨ Futuro: Ética e Privacidade' },
    { id: 'formacao', name: '✨ Futuro: Formação Docente' },
    { id: 'cultura', name: '✨ Futuro: Aspectos Culturais' }
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

    // Star twinkling animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(starAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(starAnimation, {
          toValue: 0.3,
          duration: 1500,
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
  const isGoldStarsComplete = collectedGoldStars.length === 5;
  const isSilverStarsComplete = collectedSilverStars.length === 5;

  if (!fontsLoaded) {
    return null;
  }

  if (showCredits) {
    return (
      <SafeAreaView style={commonStyles.container}>
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

          {/* Credits Title */}
          <Text style={[commonStyles.title, { fontSize: 16, marginBottom: 20 }]}>
            🌸 Créditos 🌸
          </Text>

          {/* Sakura Character */}
          <Animated.View 
            style={[
              commonStyles.sakuraCharacter,
              { transform: [{ translateY: sakuraAnimation }], marginBottom: 20 }
            ]}
          >
            <Text style={{ fontSize: 50, position: 'absolute' }}>🌸</Text>
            
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

          {/* Developer Attribution */}
          <View style={[commonStyles.card, { backgroundColor: colors.rose, marginBottom: 20 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 10, marginBottom: 10, color: colors.darkText }]}>
              🌸 Desenvolvido por 🌸
            </Text>
            <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 10, color: colors.darkText }]}>
              Ana Carla Ortega
            </Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
              Obrigada pela presença na apresentação de TCC! ✨
            </Text>
          </View>

          {/* Thank You Message */}
          <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 9, marginBottom: 10 }]}>
              🌸 OBRIGADO POR JOGAR! 🌸
            </Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
              Continue explorando o mundo da IA e Gamificação na Educação!
            </Text>
          </View>

          {/* Korean Message */}
          <View style={[commonStyles.card, { backgroundColor: colors.purple, marginBottom: 20 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
              최선이 아니라 (사실은 말이야)
            </Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
              최고가 되고 말 거야
            </Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
              세상에서 제일가는 우리가 될 거야
            </Text>
          </View>

          {/* References */}
          <Text style={[commonStyles.pixelText, { fontSize: 10, marginBottom: 15, color: colors.text }]}>
            🌸 Referências (ABNT 2025) 🌸
          </Text>
          
          <View style={{ width: '100%', marginBottom: 20 }}>
            {references.map((ref, index) => (
              <View key={index} style={[commonStyles.card, { backgroundColor: colors.cream, marginVertical: 3 }]}>
                <Text style={[commonStyles.pixelText, { fontSize: 6, color: colors.darkText }]}>
                  {ref}
                </Text>
              </View>
            ))}
          </View>

          {/* Restart Button */}
          <TouchableOpacity
            style={[buttonStyles.pixelButton, { backgroundColor: colors.primary }]}
            onPress={restartGame}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
              🌸 Jogar Novamente 🌸
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

          {/* Cute graphic elements */}
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', width: '100%' }}>
            <Image 
              source={require('../assets/images/a0ec4a2b-45d2-467b-b1a1-dd085aff862a.jpeg')}
              style={{ width: 20, height: 20, borderRadius: 10 }}
              resizeMode="cover"
            />
            <Image 
              source={require('../assets/images/fe75fb18-a9af-410c-b9c0-ddf8ba28fcf0.jpeg')}
              style={{ width: 18, height: 18, borderRadius: 9 }}
              resizeMode="cover"
            />
            <Image 
              source={require('../assets/images/03cb0ecf-6fb7-48d8-b0c2-361fe3375bff.jpeg')}
              style={{ width: 16, height: 16, borderRadius: 8 }}
              resizeMode="cover"
            />
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
          🌸 Fase Final - Sala do Trono 🌸
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

        {/* Final Message */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 10 }]}>
            🌸 IA e Gamificação têm potencial incrível, mas precisamos cuidar do bem-estar.
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
            A tecnologia deve sempre servir ao humano integral! ✨
          </Text>
        </View>

        {/* Gold Stars Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.accent, marginBottom: 15, width: 250 }]}
          onPress={() => setShowGoldStarsModal(true)}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
            🌸 Estrelas Douradas (Limitações): {collectedGoldStars.length}/5 🌸
          </Text>
        </TouchableOpacity>

        {/* Silver Stars Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.mint, marginBottom: 20, width: 250 }]}
          onPress={() => setShowSilverStarsModal(true)}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
            🌸 Estrelas Prateadas (Futuro): {collectedSilverStars.length}/5 🌸
          </Text>
        </TouchableOpacity>

        {/* Phase Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 10 }]}>
              🎉 Jogo Completo! 🌸
            </Text>
            
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.purple }]}
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
          <Text style={{ fontSize: 18 }}>👑</Text>
          <Text style={{ fontSize: 12 }}>✨</Text>
          <Text style={{ fontSize: 15 }}>🌸</Text>
        </View>

        {/* Cute graphic elements */}
        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', width: '100%' }}>
          <Image 
            source={require('../assets/images/5d6b783c-4a9b-49d2-b0e6-8300d8d48aab.jpeg')}
            style={{ width: 20, height: 20, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Image 
            source={require('../assets/images/a982b36c-80bc-44c0-a026-35c6227ea0f0.jpeg')}
            style={{ width: 18, height: 18, borderRadius: 9 }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Gold Stars Modal */}
      <SimpleBottomSheet
        isVisible={showGoldStarsModal}
        onClose={() => setShowGoldStarsModal(false)}
        keepOpen={!isGoldStarsComplete}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 20, color: '#FFFFFF', lineHeight: 16 }]}>
            🌸 Estrelas Douradas (Limitações) 🌸
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
            {goldStars.map((star) => (
              <Animated.View
                key={star.id}
                style={[
                  {
                    opacity: collectedGoldStars.includes(star.id) ? 0.3 : starAnimation,
                    margin: 3
                  }
                ]}
              >
                <TouchableOpacity
                  style={[
                    buttonStyles.starButton,
                    { 
                      backgroundColor: collectedGoldStars.includes(star.id) ? colors.grey : colors.accent,
                      width: 100,
                      height: 70
                    }
                  ]}
                  onPress={() => collectGoldStar(star.id)}
                  disabled={collectedGoldStars.includes(star.id)}
                >
                  <Text style={[commonStyles.pixelText, { fontSize: 7, color: '#FFFFFF', lineHeight: 9 }]}>
                    {star.name}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {isGoldStarsComplete && (
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent, marginTop: 10 }]}
              onPress={() => setShowGoldStarsModal(false)}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
                🌸 Fechar 🌸
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SimpleBottomSheet>

      {/* Silver Stars Modal */}
      <SimpleBottomSheet
        isVisible={showSilverStarsModal}
        onClose={() => setShowSilverStarsModal(false)}
        keepOpen={!isSilverStarsComplete}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 20, color: '#FFFFFF', lineHeight: 16 }]}>
            🌸 Estrelas Prateadas (Futuro) 🌸
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
            {silverStars.map((star) => (
              <Animated.View
                key={star.id}
                style={[
                  {
                    opacity: collectedSilverStars.includes(star.id) ? 0.3 : starAnimation,
                    margin: 3
                  }
                ]}
              >
                <TouchableOpacity
                  style={[
                    buttonStyles.starButton,
                    { 
                      backgroundColor: collectedSilverStars.includes(star.id) ? colors.grey : colors.mint,
                      width: 100,
                      height: 70
                    }
                  ]}
                  onPress={() => collectSilverStar(star.id)}
                  disabled={collectedSilverStars.includes(star.id)}
                >
                  <Text style={[commonStyles.pixelText, { fontSize: 7, color: '#FFFFFF', lineHeight: 9 }]}>
                    {star.name}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {isSilverStarsComplete && (
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent, marginTop: 10 }]}
              onPress={() => setShowSilverStarsModal(false)}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
                🌸 Fechar 🌸
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
