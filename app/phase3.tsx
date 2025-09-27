
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
  const [kirbyAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const collectibleItems = [
    { id: 'prisma', name: '🔮 Pokébola PRISMA', description: 'Metodologia de revisão sistemática' },
    { id: 'scopus', name: '📊 Terminal Scopus', description: 'Base de dados científica' },
    { id: 'webofscience', name: '🌐 Web of Science', description: 'Plataforma de pesquisa' },
    { id: 'riss', name: '🇰🇷 RISS Korea', description: 'Sistema coreano de informação' },
    { id: 'scielo', name: '🇧🇷 Scielo', description: 'Biblioteca científica brasileira' },
    { id: 'rabbit', name: '🐰 Research Rabbit', description: 'Descoberta de literatura' }
  ];

  const specialItems = [
    { id: 'rayyan', name: '⚡ Rayyan', description: 'Triagem de artigos' },
    { id: 'iramuteq', name: '🧠 IRaMuTeQ', description: 'Análise textual' },
    { id: 'jbi', name: '📋 JBI', description: 'Avaliação crítica' },
    { id: 'matriz', name: '📝 Matriz de Extração', description: 'Organização de dados' }
  ];

  const npcs = [
    { id: 'metodologista', name: '👨‍🔬 Dr. Método', criteria: '2015-2025: Período temporal' },
    { id: 'especialista', name: '👩‍💻 Dra. IA', criteria: 'IA/Gamificação: Tecnologias' },
    { id: 'geografo', name: '🌍 Prof. Global', criteria: 'Brasil/Coreia: Contextos' },
    { id: 'avaliador', name: '📊 Dra. Métricas', criteria: 'Efeitos mensuráveis: Resultados' }
  ];

  useEffect(() => {
    // Kirby floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(kirbyAnimation, {
          toValue: -4,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(kirbyAnimation, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
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

  const allItems = [...collectibleItems, ...specialItems];
  const isPhaseComplete = collectedItems.length === allItems.length && talkedToNPCs.length === npcs.length;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          Fase 3 - Laboratório Pixelado
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
          Itens: {collectedItems.length}/{allItems.length} | NPCs: {talkedToNPCs.length}/{npcs.length}
        </Text>

        {/* Collectible Items */}
        <Text style={[commonStyles.pixelText, { marginBottom: 10, color: colors.text }]}>
          Terminais e Ferramentas:
        </Text>

        <View style={commonStyles.collectibleGrid}>
          {collectibleItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                buttonStyles.powerUpButton,
                { 
                  backgroundColor: collectedItems.includes(item.id) ? colors.accent : colors.blue,
                  opacity: collectedItems.includes(item.id) ? 1 : 0.7,
                  width: 120,
                  height: 60
                }
              ]}
              onPress={() => collectItem(item.id)}
              disabled={collectedItems.includes(item.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 7, textAlign: 'center' }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special Items */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 10, color: colors.text }]}>
          Itens Especiais:
        </Text>

        <View style={commonStyles.collectibleGrid}>
          {specialItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                buttonStyles.powerUpButton,
                { 
                  backgroundColor: collectedItems.includes(item.id) ? colors.purple : colors.mint,
                  opacity: collectedItems.includes(item.id) ? 1 : 0.7,
                  width: 100,
                  height: 50
                }
              ]}
              onPress={() => collectItem(item.id)}
              disabled={collectedItems.includes(item.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 7, textAlign: 'center' }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* NPCs Section */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 10, color: colors.text }]}>
          Especialistas para Consultar:
        </Text>

        {npcs.map((npc) => (
          <View key={npc.id} style={{ width: '100%', alignItems: 'center', marginVertical: 5 }}>
            <TouchableOpacity
              style={[
                buttonStyles.pixelButton,
                { 
                  backgroundColor: talkedToNPCs.includes(npc.id) ? colors.green : colors.coral,
                  opacity: talkedToNPCs.includes(npc.id) ? 1 : 0.8,
                  width: '90%'
                }
              ]}
              onPress={() => talkToNPC(npc.id)}
              disabled={talkedToNPCs.includes(npc.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
                {npc.name}
              </Text>
            </TouchableOpacity>
            
            {talkedToNPCs.includes(npc.id) && (
              <View style={[commonStyles.dialogBox, { marginTop: 5, width: '90%' }]}>
                <Text style={[commonStyles.pixelText, { fontSize: 7 }]}>
                  {npc.criteria}
                </Text>
              </View>
            )}
          </View>
        ))}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15 }]}>
              🎉 Metodologia Estabelecida! 🎉
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
