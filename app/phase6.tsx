
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase6() {
  const router = useRouter();
  const [defeatedBosses, setDefeatedBosses] = useState<string[]>([]);
  const [currentBoss, setCurrentBoss] = useState<string | null>(null);
  const [showNPCDialogs, setShowNPCDialogs] = useState(false);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [bossAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const globalBosses = [
    { 
      id: 'saturacao', 
      name: '📱 Saturação Digital', 
      description: 'Excesso de tecnologia prejudica o aprendizado'
    },
    { 
      id: 'vulnerabilidade', 
      name: '🏚️ Vulnerabilidade Social', 
      description: 'Desigualdades impedem acesso à educação'
    },
    { 
      id: 'medo', 
      name: '😰 Medo da IA', 
      description: 'Resistência à adoção de novas tecnologias'
    }
  ];

  const npcDialogs = [
    { name: 'Leon', message: '"A IA pode monitorar emoções dos estudantes!"' },
    { name: 'Chen', message: '"Ela age de forma preventiva para ajudar!"' },
    { name: 'Kim & Kim', message: '"Mas precisamos de transparência e formação contínua!"' }
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
  }, []);

  const challengeBoss = (bossId: string) => {
    setCurrentBoss(bossId);
    console.log(`Challenging global boss: ${bossId}`);
  };

  const defeatBoss = () => {
    if (currentBoss && !defeatedBosses.includes(currentBoss)) {
      setDefeatedBosses([...defeatedBosses, currentBoss]);
      setCurrentBoss(null);
      console.log(`Global boss defeated: ${currentBoss}`);
      
      if (defeatedBosses.length + 1 === globalBosses.length) {
        setShowNPCDialogs(true);
      }
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 7');
    router.push('/phase7');
  };

  const isPhaseComplete = defeatedBosses.length === 3 && showNPCDialogs;

  if (!fontsLoaded) {
    return null;
  }

  const currentBossData = currentBoss ? globalBosses.find(b => b.id === currentBoss) : null;

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
          🌸 Fase 6 - Batalha Cooperativa 🌸
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

        {/* Cooperation Message */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
            🌸 Brasil e Coreia lutam juntos contra os desafios globais! ✨
          </Text>
        </View>

        {/* Current Boss Battle */}
        {currentBossData && (
          <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 9, marginBottom: 10, color: colors.darkText }]}>
              🌸 Enfrentando: {currentBossData.name} 🌸
            </Text>
            <Text style={[commonStyles.pixelText, { fontSize: 7, marginBottom: 10, color: colors.text }]}>
              {currentBossData.description}
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.red }]}
              onPress={defeatBoss}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
                🤝 Derrotar Juntos! 🤝
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Global Bosses */}
        <Text style={[commonStyles.pixelText, { fontSize: 10, marginBottom: 15, color: colors.text }]}>
          🌸 Chefes Globais: {defeatedBosses.length}/3 🌸
        </Text>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
          {globalBosses.map((boss) => (
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
                    backgroundColor: defeatedBosses.includes(boss.id) ? colors.grey : colors.red,
                    width: 100,
                    height: 80
                  }
                ]}
                onPress={() => challengeBoss(boss.id)}
                disabled={defeatedBosses.includes(boss.id) || currentBoss !== null}
              >
                <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 5, color: colors.darkText }]}>
                  {boss.name}
                </Text>
                <Text style={[commonStyles.pixelText, { fontSize: 6, color: colors.darkText }]}>
                  {boss.description}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* NPC Dialogs */}
        {showNPCDialogs && (
          <View style={{ width: '100%', marginBottom: 20 }}>
            <Text style={[commonStyles.pixelText, { fontSize: 10, marginBottom: 15, color: colors.text, textAlign: 'center' }]}>
              🌸 Ao vencer, NPCs falam: 🌸
            </Text>
            {npcDialogs.map((npc, index) => (
              <View key={index} style={[commonStyles.card, { backgroundColor: colors.mint, marginVertical: 5 }]}>
                <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 5, color: colors.darkText }]}>
                  {npc.name}:
                </Text>
                <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.text }]}>
                  {npc.message}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Phase Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 10 }]}>
              🎉 Fase 6 Completa! 🌸
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
          <Text style={{ fontSize: 18 }}>🤝</Text>
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
    </SafeAreaView>
  );
}
