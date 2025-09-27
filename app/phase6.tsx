
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase6() {
  const router = useRouter();
  const [defeatedBosses, setDefeatedBosses] = useState<string[]>([]);
  const [showNPCDialogs, setShowNPCDialogs] = useState(false);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [cooperativeAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const globalBosses = [
    { 
      id: 'saturacao', 
      name: '📱 Saturação Digital', 
      description: 'Excesso de tecnologia prejudica o aprendizado',
      color: colors.red
    },
    { 
      id: 'vulnerabilidade', 
      name: '💔 Vulnerabilidade Social', 
      description: 'Desigualdades impedem acesso equitativo',
      color: colors.orange
    },
    { 
      id: 'medo', 
      name: '😰 Medo da IA', 
      description: 'Resistência e falta de compreensão tecnológica',
      color: colors.purple
    }
  ];

  const npcDialogs = [
    { 
      name: 'Leon et al.', 
      dialog: 'A IA pode monitorar emoções dos estudantes de enfermagem durante simulações clínicas!' 
    },
    { 
      name: 'Chen et al.', 
      dialog: 'Ela age de forma preventiva, identificando dificuldades antes que se tornem problemas!' 
    },
    { 
      name: 'Kim & Kim', 
      dialog: 'Mas precisamos de transparência e formação contínua dos professores!' 
    }
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -18,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(sakuraAnimation, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Cooperative battle animation
    Animated.loop(
      Animated.timing(cooperativeAnimation, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const challengeBoss = (bossId: string) => {
    if (!defeatedBosses.includes(bossId)) {
      setDefeatedBosses([...defeatedBosses, bossId]);
      console.log(`Global boss challenged: ${bossId}`);
    }
  };

  const defeatBoss = () => {
    if (defeatedBosses.length === globalBosses.length && !showNPCDialogs) {
      setShowNPCDialogs(true);
      console.log('All bosses defeated, showing NPC dialogs');
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 7');
    router.push('/phase7');
  };

  const isPhaseComplete = defeatedBosses.length === globalBosses.length && showNPCDialogs;

  useEffect(() => {
    if (defeatedBosses.length === globalBosses.length) {
      defeatBoss();
    }
  }, [defeatedBosses]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={[commonStyles.phaseTitle, { color: colors.accent }]}>
          🌸 Fase 6 - Batalha Cooperativa 🌸
        </Text>

        {/* Cooperative Battle Environment */}
        <View style={[commonStyles.card, { backgroundColor: colors.sky, marginBottom: 20, width: '95%' }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 30, textAlign: 'center', marginBottom: 10 }]}>
            🤝 🌍 ⚔️ 🌍 🤝
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, textAlign: 'center', color: colors.darkText }]}>
            Arena Global - Brasil & Coreia Unidos
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 6, textAlign: 'center', color: colors.text, marginTop: 5 }]}>
            Enfrentando Desafios Universais Juntos
          </Text>
        </View>

        {/* Cooperative Flags */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <Animated.View 
            style={[
              {
                alignItems: 'center',
                marginRight: 20,
                transform: [
                  {
                    scale: cooperativeAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={{ fontSize: 40 }}>🇧🇷</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.green }]}>
              Brasil
            </Text>
          </Animated.View>

          <Text style={[commonStyles.pixelText, { fontSize: 16, color: colors.primary, marginHorizontal: 10 }]}>
            🤝
          </Text>

          <Animated.View 
            style={[
              {
                alignItems: 'center',
                marginLeft: 20,
                transform: [
                  {
                    scale: cooperativeAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1.1, 1]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={{ fontSize: 40 }}>🇰🇷</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.red }]}>
              Coreia
            </Text>
          </Animated.View>
        </View>

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
          🌸 Chefes Globais Derrotados: {defeatedBosses.length}/3
        </Text>

        {/* Global Bosses */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.accent }]}>
          🌸 Chefes Globais:
        </Text>

        <View style={commonStyles.collectibleGrid}>
          {globalBosses.map((boss) => (
            <TouchableOpacity
              key={boss.id}
              style={[
                buttonStyles.cuteButton,
                { 
                  backgroundColor: defeatedBosses.includes(boss.id) ? boss.color : colors.grey,
                  opacity: defeatedBosses.includes(boss.id) ? 1 : 0.6,
                  borderColor: colors.accent,
                  width: 140,
                  height: 70,
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

        {/* Show defeated boss descriptions */}
        {defeatedBosses.map((bossId) => {
          const boss = globalBosses.find(b => b.id === bossId);
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

        {/* NPC Dialogs after victory */}
        {showNPCDialogs && (
          <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.primary, fontSize: 10 }]}>
              🌸 Especialistas Falam:
            </Text>
            
            {npcDialogs.map((npc, index) => (
              <View key={index} style={[commonStyles.dialogBox, { marginVertical: 5, width: '95%', backgroundColor: colors.cream }]}>
                <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText, marginBottom: 5 }]}>
                  🌸 {npc.name}:
                </Text>
                <Text style={[commonStyles.pixelText, { fontSize: 6, color: colors.text }]}>
                  {npc.dialog}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 12 }]}>
              🌸✨ Cooperação Global Vitoriosa! ✨🌸
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.green }]}
              onPress={nextPhase}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                Mapa Mágico → 🌸
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
