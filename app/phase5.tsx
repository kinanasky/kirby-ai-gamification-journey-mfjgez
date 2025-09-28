
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';
import SimpleBottomSheet from '../components/BottomSheet';

export default function Phase5() {
  const router = useRouter();
  const [defeatedBosses, setDefeatedBosses] = useState<string[]>([]);
  const [currentBoss, setCurrentBoss] = useState<string | null>(null);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [bossAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  const [showBossesModal, setShowBossesModal] = useState(false);
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const bosses = [
    { 
      id: 'ferramentas', 
      name: '🔧 Ferramentas', 
      description: 'IA, machine learning, análise de dados',
      explanation: 'Superclasse A: Fundamentos e Estruturas da Pesquisa Educacional - Classe 1 (13,9%): Ferramentas tecnológicas → IA, machine learning, análise de dados.'
    },
    { 
      id: 'afeto', 
      name: '💖 Afeto', 
      description: 'Coreia do Sul, enfermagem, ansiedade, aceitação da tecnologia',
      explanation: 'Classe 4 (12,5%): Contexto e fatores afetivos → Coreia do Sul, enfermagem, ansiedade, aceitação da tecnologia.'
    },
    { 
      id: 'metodologia', 
      name: '📊 Metodologia', 
      description: 'Estudos experimentais, casos, levantamentos; foco em rigor científico',
      explanation: 'Classe 6 (20,8%): Metodologia → estudos experimentais, casos, levantamentos; foco em rigor científico.'
    },
    { 
      id: 'eficacia', 
      name: '🎯 Eficácia', 
      description: 'Validação de ferramentas (chatbots, gamificação)',
      explanation: 'Superclasse B: Experiências da Intervenção Pedagógica - Classe 3 (18,1%): Eficácia/desempenho → validação de ferramentas (chatbots, gamificação).'
    },
    { 
      id: 'experiencia', 
      name: '✨ Experiência', 
      description: 'Motivação, feedback, personalização, fluxo de aprendizagem',
      explanation: 'Classe 2 (16,7%): Qualidade da experiência → motivação, feedback, personalização, fluxo de aprendizagem.'
    },
    { 
      id: 'percepcao', 
      name: '👁️ Percepção', 
      description: 'Combinação de métricas objetivas e percepções subjetivas; acesso ≠ desempenho',
      explanation: 'Classe 5 (18,1%): Mensuração dos resultados → combinação de métricas objetivas e percepções subjetivas; acesso ≠ desempenho.'
    }
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

    // Boss animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bossAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bossAnimation, {
          toValue: 0.6,
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
  }, [bossAnimation, petalAnimation, sakuraAnimation]);

  const challengeBoss = (bossId: string) => {
    setCurrentBoss(bossId);
    setShowBossesModal(false); // Close the modal when challenging a boss
    console.log(`Challenging boss: ${bossId}`);
  };

  const defeatBoss = () => {
    if (currentBoss && !defeatedBosses.includes(currentBoss)) {
      setDefeatedBosses([...defeatedBosses, currentBoss]);
      setCurrentBoss(null);
      console.log(`Boss defeated: ${currentBoss}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 6');
    router.push('/phase6');
  };

  const isPhaseComplete = defeatedBosses.length === 6;
  const isBossesComplete = defeatedBosses.length === 6;

  if (!fontsLoaded) {
    return null;
  }

  const currentBossData = currentBoss ? bosses.find(b => b.id === currentBoss) : null;

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
          🌸 Fase 5 - Dungeon IRaMuTeQ 🌸
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

        {/* Current Boss Battle */}
        {currentBossData && (
          <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 9, marginBottom: 10, color: colors.darkText }]}>
              🌸 Enfrentando: {currentBossData.name} 🌸
            </Text>
            <Text style={[commonStyles.pixelText, { fontSize: 7, marginBottom: 10, color: colors.text }]}>
              {currentBossData.explanation}
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.red }]}
              onPress={defeatBoss}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
                ⚔️ Derrotar Chefe! ⚔️
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bosses Section Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.purple, marginBottom: 20, width: 200 }]}
          onPress={() => setShowBossesModal(true)}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
            🌸 Chefes da Dungeon: {defeatedBosses.length}/6 🌸
          </Text>
        </TouchableOpacity>

        {/* Phase Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 10 }]}>
              🎉 Fase 5 Completa! 🌸
            </Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 15, color: colors.text }]}>
              🌸 Sakura explica cada categoria e libera novas rotas! ✨
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
          <Text style={{ fontSize: 18 }}>🏰</Text>
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
            source={require('../assets/images/03cb0ecf-6fb7-48d8-b0c2-361fe3375bff.jpeg')}
            style={{ width: 18, height: 18, borderRadius: 9 }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Bosses Modal */}
      <SimpleBottomSheet
        isVisible={showBossesModal}
        onClose={() => setShowBossesModal(false)}
        keepOpen={false} // Allow the modal to be closed at any time
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 20, color: '#FFFFFF', lineHeight: 16 }]}>
              🌸 Chefes da Dungeon 🌸
            </Text>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
              {bosses.map((boss) => (
                <Animated.View
                  key={boss.id}
                  style={[
                    {
                      opacity: defeatedBosses.includes(boss.id) ? 0.3 : bossAnimation,
                      margin: 5
                    }
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      buttonStyles.pixelButton,
                      { 
                        backgroundColor: defeatedBosses.includes(boss.id) ? colors.grey : colors.purple,
                        width: 120,
                        height: 90
                      }
                    ]}
                    onPress={() => challengeBoss(boss.id)}
                    disabled={defeatedBosses.includes(boss.id)}
                  >
                    <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 3, color: '#FFFFFF', lineHeight: 10 }]}>
                      {boss.name}
                    </Text>
                    <Text style={[commonStyles.pixelText, { fontSize: 6, color: '#FFFFFF', lineHeight: 8 }]}>
                      {boss.description}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent, marginTop: 10 }]}
              onPress={() => setShowBossesModal(false)}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
                🌸 Fechar 🌸
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
