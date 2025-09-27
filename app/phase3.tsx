
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase3() {
  const router = useRouter();
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [talkedToNPCs, setTalkedToNPCs] = useState<string[]>([]);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [labAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const items = [
    { id: 'prisma', name: '🔮 PRISMA', description: 'Protocolo para revisões sistemáticas' },
    { id: 'scopus', name: '🔍 Scopus', description: 'Base de dados científica' },
    { id: 'webofscience', name: '🌐 Web of Science', description: 'Plataforma de pesquisa acadêmica' },
    { id: 'riss', name: '🇰🇷 RISS Korea', description: 'Sistema de informação acadêmica coreano' },
    { id: 'scielo', name: '🇧🇷 SciELO', description: 'Biblioteca científica brasileira' },
    { id: 'rayyan', name: '⚡ Rayyan', description: 'Ferramenta de triagem de artigos' }
  ];

  const npcs = [
    { id: 'bibliotecario', name: '👨‍🔬 Dr. Silva', dialog: 'Critério temporal: 2015-2025 para capturar a evolução recente!' },
    { id: 'pesquisadora', name: '👩‍💻 Profa. Kim', dialog: 'Foco em IA e Gamificação na educação Brasil-Coreia!' },
    { id: 'analista', name: '🧑‍🔬 Especialista', dialog: 'Efeitos mensuráveis são essenciais para validação!' },
    { id: 'metodologista', name: '👩‍🏫 Dra. Santos', dialog: 'IRaMuTeQ e JBI garantem rigor metodológico!' }
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -10,
          duration: 2800,
          useNativeDriver: true,
        }),
        Animated.timing(sakuraAnimation, {
          toValue: 0,
          duration: 2800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Lab equipment animation
    Animated.loop(
      Animated.timing(labAnimation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const collectItem = (itemId: string) => {
    if (!collectedItems.includes(itemId)) {
      setCollectedItems([...collectedItems, itemId]);
      console.log(`Item collected: ${itemId}`);
    }
  };

  const talkToNPC = (npcId: string) => {
    if (!talkedToNPCs.includes(npcId)) {
      setTalkedToNPCs([...talkedToNPCs, npcId]);
      console.log(`Talked to NPC: ${npcId}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 4');
    router.push('/phase4');
  };

  const isPhaseComplete = collectedItems.length >= 4 && talkedToNPCs.length >= 3;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={[commonStyles.phaseTitle, { color: colors.blue }]}>
          Fase 3 - Laboratório Real 🔬
        </Text>

        {/* Laboratory Environment */}
        <View style={commonStyles.labBackground}>
          <Text style={[commonStyles.pixelText, { fontSize: 30, textAlign: 'center', marginBottom: 10 }]}>
            🔬 ⚗️ 🧪 💻 📊
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, textAlign: 'center', color: colors.darkText }]}>
            Laboratório de Tecnologia Educacional - UNICAMP
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 6, textAlign: 'center', color: colors.text, marginTop: 5 }]}>
            Centro de Pesquisa em IA e Gamificação
          </Text>
        </View>

        {/* Floating lab equipment */}
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 160,
              left: 25,
              transform: [
                {
                  translateY: labAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -12]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={{ fontSize: 25 }}>💻</Text>
        </Animated.View>

        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 190,
              right: 35,
              transform: [
                {
                  translateY: labAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -8]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={{ fontSize: 20 }}>📊</Text>
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
          🌸 Itens: {collectedItems.length}/6 | NPCs: {talkedToNPCs.length}/4
        </Text>

        {/* Items Grid */}
        <Text style={[commonStyles.pixelText, { marginBottom: 10, color: colors.blue }]}>
          Ferramentas de Pesquisa:
        </Text>
        <View style={commonStyles.collectibleGrid}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                buttonStyles.powerUpButton,
                { 
                  backgroundColor: collectedItems.includes(item.id) ? colors.blue : colors.grey,
                  opacity: collectedItems.includes(item.id) ? 1 : 0.6,
                  borderColor: colors.blue
                }
              ]}
              onPress={() => collectItem(item.id)}
              disabled={collectedItems.includes(item.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show collected item descriptions */}
        {collectedItems.map((itemId) => {
          const item = items.find(i => i.id === itemId);
          return item ? (
            <View key={itemId} style={[commonStyles.dialogBox, { marginVertical: 3, width: '90%', backgroundColor: colors.lab }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText }]}>
                {item.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* NPCs */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 10, color: colors.purple }]}>
          Especialistas do Laboratório:
        </Text>
        <View style={commonStyles.collectibleGrid}>
          {npcs.map((npc) => (
            <TouchableOpacity
              key={npc.id}
              style={[
                buttonStyles.cuteButton,
                { 
                  backgroundColor: talkedToNPCs.includes(npc.id) ? colors.sakura : colors.grey,
                  opacity: talkedToNPCs.includes(npc.id) ? 1 : 0.6,
                  borderColor: colors.purple
                }
              ]}
              onPress={() => talkToNPC(npc.id)}
              disabled={talkedToNPCs.includes(npc.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
                {npc.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show NPC dialogs */}
        {talkedToNPCs.map((npcId) => {
          const npc = npcs.find(n => n.id === npcId);
          return npc ? (
            <View key={npcId} style={[commonStyles.dialogBox, { marginVertical: 3, width: '90%', backgroundColor: colors.cream }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText }]}>
                🌸 {npc.dialog}
              </Text>
            </View>
          ) : null;
        })}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.blue, marginBottom: 15, fontSize: 12 }]}>
              🌸✨ Metodologia Completa! ✨🌸
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent }]}
              onPress={nextPhase}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                Arena Pokémon → 🌸
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
