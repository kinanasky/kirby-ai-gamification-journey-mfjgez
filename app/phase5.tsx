
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase5() {
  const router = useRouter();
  const [defeatedBosses, setDefeatedBosses] = useState<string[]>([]);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [dungeonAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const bosses = [
    { 
      id: 'ferramentas', 
      name: '🔧 Chefe Ferramentas', 
      description: 'Superclasse A: IA, machine learning, análise de dados (13,9%)',
      color: colors.blue
    },
    { 
      id: 'afeto', 
      name: '💖 Chefe Afeto', 
      description: 'Superclasse A: Coreia do Sul, enfermagem, ansiedade, aceitação (12,5%)',
      color: colors.coral
    },
    { 
      id: 'metodologia', 
      name: '📊 Chefe Metodologia', 
      description: 'Superclasse A: Estudos experimentais, casos, rigor científico (20,8%)',
      color: colors.purple
    },
    { 
      id: 'eficacia', 
      name: '⚡ Chefe Eficácia', 
      description: 'Superclasse B: Validação de ferramentas, chatbots, gamificação (18,1%)',
      color: colors.accent
    },
    { 
      id: 'experiencia', 
      name: '✨ Chefe Experiência', 
      description: 'Superclasse B: Motivação, feedback, personalização, fluxo (16,7%)',
      color: colors.green
    },
    { 
      id: 'percepcao', 
      name: '👁️ Chefe Percepção', 
      description: 'Superclasse B: Métricas objetivas e percepções subjetivas (18,1%)',
      color: colors.orange
    }
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -15,
          duration: 3200,
          useNativeDriver: true,
        }),
        Animated.timing(sakuraAnimation, {
          toValue: 0,
          duration: 3200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Dungeon atmosphere animation
    Animated.loop(
      Animated.timing(dungeonAnimation, {
        toValue: 1,
        duration: 4500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const challengeBoss = (bossId: string) => {
    if (!defeatedBosses.includes(bossId)) {
      setDefeatedBosses([...defeatedBosses, bossId]);
      console.log(`Boss challenged: ${bossId}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 6');
    router.push('/phase6');
  };

  const isPhaseComplete = defeatedBosses.length >= 6;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={[commonStyles.phaseTitle, { color: colors.purple }]}>
          🌸 Fase 5 - Dungeon IRaMuTeQ 🌸
        </Text>

        {/* Dungeon Environment */}
        <View style={[commonStyles.card, { backgroundColor: colors.darkText, marginBottom: 20, width: '95%' }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 30, textAlign: 'center', marginBottom: 10, color: colors.card }]}>
            🏰 ⚔️ 🗡️ 🛡️ 🏰
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, textAlign: 'center', color: colors.primary }]}>
            Dungeon das Classes Temáticas
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 6, textAlign: 'center', color: colors.card, marginTop: 5 }]}>
            Análise IRaMuTeQ - Classificação Hierárquica
          </Text>
        </View>

        {/* Floating dungeon elements */}
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 140,
              left: 15,
              transform: [
                {
                  translateY: dungeonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={{ fontSize: 25 }}>🗡️</Text>
        </Animated.View>

        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 170,
              right: 25,
              transform: [
                {
                  translateY: dungeonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={{ fontSize: 20 }}>🛡️</Text>
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

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          🌸 Chefes Derrotados: {defeatedBosses.length}/6
        </Text>

        {/* Bosses Grid */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.purple }]}>
          🌸 Chefes da Dungeon:
        </Text>

        <View style={commonStyles.collectibleGrid}>
          {bosses.map((boss) => (
            <TouchableOpacity
              key={boss.id}
              style={[
                buttonStyles.cuteButton,
                { 
                  backgroundColor: defeatedBosses.includes(boss.id) ? boss.color : colors.grey,
                  opacity: defeatedBosses.includes(boss.id) ? 1 : 0.6,
                  borderColor: colors.purple,
                  width: 120,
                  height: 60,
                  margin: 8
                }
              ]}
              onPress={() => challengeBoss(boss.id)}
              disabled={defeatedBosses.includes(boss.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText, textAlign: 'center' }]}>
                {boss.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show defeated boss explanations */}
        {defeatedBosses.map((bossId) => {
          const boss = bosses.find(b => b.id === bossId);
          return boss ? (
            <View key={bossId} style={[commonStyles.dialogBox, { marginVertical: 5, width: '95%', backgroundColor: boss.color }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText, marginBottom: 5 }]}>
                🌸 {boss.name} Derrotado!
              </Text>
              <Text style={[commonStyles.pixelText, { fontSize: 6, color: colors.darkText }]}>
                {boss.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Kirby's explanation when all bosses are defeated */}
        {isPhaseComplete && (
          <View style={[commonStyles.dialogBox, { backgroundColor: colors.cream, marginTop: 15, marginBottom: 15 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
              🌸 Kirby: Cada categoria foi explicada e novas rotas de conhecimento foram liberadas! Agora entendemos melhor como IA e Gamificação se organizam na pesquisa! 💕
            </Text>
          </View>
        )}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.purple, marginBottom: 15, fontSize: 12 }]}>
              🌸✨ Dungeon Conquistada! ✨🌸
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent }]}
              onPress={nextPhase}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                Desafio Universal → 🌸
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
