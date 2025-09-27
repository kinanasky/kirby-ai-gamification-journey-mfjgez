
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase5() {
  const router = useRouter();
  const [defeatedBosses, setDefeatedBosses] = useState<string[]>([]);
  const [currentBoss, setCurrentBoss] = useState<string | null>(null);
  const [kirbyAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const bosses = [
    { 
      id: 'ferramentas', 
      name: '🔧 Ferramentas', 
      superclass: 'A',
      description: 'Classe 1 (13,9%): Ferramentas tecnológicas → IA, machine learning, análise de dados.',
      color: colors.blue
    },
    { 
      id: 'afeto', 
      name: '💝 Afeto', 
      superclass: 'A',
      description: 'Classe 4 (12,5%): Contexto e fatores afetivos → Coreia do Sul, enfermagem, ansiedade, aceitação da tecnologia.',
      color: colors.red
    },
    { 
      id: 'metodologia', 
      name: '📊 Metodologia', 
      superclass: 'A',
      description: 'Classe 6 (20,8%): Metodologia → estudos experimentais, casos, levantamentos; foco em rigor científico.',
      color: colors.purple
    },
    { 
      id: 'eficacia', 
      name: '⚡ Eficácia', 
      superclass: 'B',
      description: 'Classe 3 (18,1%): Eficácia/desempenho → validação de ferramentas (chatbots, gamificação).',
      color: colors.green
    },
    { 
      id: 'experiencia', 
      name: '🌟 Experiência', 
      superclass: 'B',
      description: 'Classe 2 (16,7%): Qualidade da experiência → motivação, feedback, personalização, fluxo de aprendizagem.',
      color: colors.accent
    },
    { 
      id: 'percepcao', 
      name: '🎯 Percepção', 
      superclass: 'B',
      description: 'Classe 5 (18,1%): Mensuração dos resultados → combinação de métricas objetivas e percepções subjetivas; acesso ≠ desempenho.',
      color: colors.coral
    }
  ];

  useEffect(() => {
    // Kirby floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(kirbyAnimation, {
          toValue: -5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(kirbyAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const challengeBoss = (bossId: string) => {
    setCurrentBoss(bossId);
    console.log(`Challenging boss: ${bossId}`);
  };

  const defeatBoss = () => {
    if (currentBoss && !defeatedBosses.includes(currentBoss)) {
      setDefeatedBosses([...defeatedBosses, currentBoss]);
      console.log(`Boss defeated: ${currentBoss}`);
      setCurrentBoss(null);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 6');
    router.push('/phase6');
  };

  const isPhaseComplete = defeatedBosses.length === bosses.length;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          Fase 5 - Dungeon IRaMuTeQ
        </Text>

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

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          Chefes Derrotados: {defeatedBosses.length}/{bosses.length}
        </Text>

        {/* Superclass A */}
        <Text style={[commonStyles.pixelText, { marginBottom: 10, color: colors.text, fontSize: 10 }]}>
          Superclasse A: Fundamentos e Estruturas da Pesquisa Educacional
        </Text>

        {bosses.filter(boss => boss.superclass === 'A').map((boss) => (
          <View key={boss.id} style={{ width: '100%', alignItems: 'center', marginVertical: 8 }}>
            <TouchableOpacity
              style={[
                buttonStyles.pixelButton,
                { 
                  backgroundColor: defeatedBosses.includes(boss.id) ? colors.grey : boss.color,
                  opacity: defeatedBosses.includes(boss.id) ? 0.6 : 1,
                  width: '90%'
                }
              ]}
              onPress={() => challengeBoss(boss.id)}
              disabled={defeatedBosses.includes(boss.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 9, color: colors.darkText }]}>
                {boss.name} {defeatedBosses.includes(boss.id) ? '✓' : ''}
              </Text>
            </TouchableOpacity>
            
            {defeatedBosses.includes(boss.id) && (
              <View style={[commonStyles.dialogBox, { marginTop: 5, width: '90%' }]}>
                <Text style={[commonStyles.pixelText, { fontSize: 7 }]}>
                  {boss.description}
                </Text>
              </View>
            )}
          </View>
        ))}

        {/* Superclass B */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 10, color: colors.text, fontSize: 10 }]}>
          Superclasse B: Experiências da Intervenção Pedagógica
        </Text>

        {bosses.filter(boss => boss.superclass === 'B').map((boss) => (
          <View key={boss.id} style={{ width: '100%', alignItems: 'center', marginVertical: 8 }}>
            <TouchableOpacity
              style={[
                buttonStyles.pixelButton,
                { 
                  backgroundColor: defeatedBosses.includes(boss.id) ? colors.grey : boss.color,
                  opacity: defeatedBosses.includes(boss.id) ? 0.6 : 1,
                  width: '90%'
                }
              ]}
              onPress={() => challengeBoss(boss.id)}
              disabled={defeatedBosses.includes(boss.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 9, color: colors.darkText }]}>
                {boss.name} {defeatedBosses.includes(boss.id) ? '✓' : ''}
              </Text>
            </TouchableOpacity>
            
            {defeatedBosses.includes(boss.id) && (
              <View style={[commonStyles.dialogBox, { marginTop: 5, width: '90%' }]}>
                <Text style={[commonStyles.pixelText, { fontSize: 7 }]}>
                  {boss.description}
                </Text>
              </View>
            )}
          </View>
        ))}

        {/* Current Battle */}
        {currentBoss && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.red, marginBottom: 10 }]}>
              Enfrentando: {bosses.find(b => b.id === currentBoss)?.name}
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.red }]}
              onPress={defeatBoss}
            >
              <Text style={[commonStyles.pixelText, { color: colors.card }]}>
                ⚔️ Derrotar Chefe
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View style={[commonStyles.dialogBox, { marginBottom: 15 }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
                Kirby explica cada categoria e libera novas rotas para a pesquisa!
              </Text>
            </View>
            
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15 }]}>
              🎉 Dungeon Completa! 🎉
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
