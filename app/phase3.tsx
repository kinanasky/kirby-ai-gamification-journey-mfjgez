
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';
import SimpleBottomSheet from '../components/BottomSheet';

export default function Phase3() {
  const router = useRouter();
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [usedTools, setUsedTools] = useState<string[]>([]);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [itemAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [showToolsModal, setShowToolsModal] = useState(false);
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const items = [
    { id: 'prisma', name: '🔮 Pokébola PRISMA', description: 'Metodologia de revisão' },
    { id: 'rayyan', name: '⚡ Rayyan', description: 'Ferramenta de triagem' },
    { id: 'iramuteq', name: '🧠 IRaMuTeQ', description: 'Análise textual' },
    { id: 'jbi', name: '📊 JBI', description: 'Avaliação crítica' },
    { id: 'matriz', name: '📋 Matriz de Extração', description: 'Coleta de dados' }
  ];

  const researchTools = [
    { id: 'scopus', name: '🔍 Scopus', description: 'Base de dados científica' },
    { id: 'webofscience', name: '🌐 Web of Science', description: 'Indexação internacional' },
    { id: 'riss', name: '🇰🇷 RISS Korea', description: 'Pesquisa coreana' },
    { id: 'scielo', name: '🇧🇷 Scielo', description: 'Pesquisa brasileira' },
    { id: 'rabbit', name: '🐰 Research Rabbit', description: 'Descoberta de artigos' }
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

    // Item glowing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(itemAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(itemAnimation, {
          toValue: 0.4,
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

  const collectItem = (itemId: string) => {
    if (!collectedItems.includes(itemId)) {
      setCollectedItems([...collectedItems, itemId]);
      console.log(`Item collected: ${itemId}`);
    }
  };

  const useTool = (toolId: string) => {
    if (!usedTools.includes(toolId)) {
      setUsedTools([...usedTools, toolId]);
      console.log(`Research tool used: ${toolId}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 4');
    router.push('/phase4');
  };

  const isPhaseComplete = collectedItems.length === 5 && usedTools.length === 5;
  const isItemsComplete = collectedItems.length === 5;
  const isToolsComplete = usedTools.length === 5;

  if (!fontsLoaded) {
    return null;
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
          🌸 Fase 3 - Laboratório Pixelado 🌸
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

        {/* Mission Description */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
            🌸 Missão: Colete todos os itens e use cada ferramenta de pesquisa para descobrir os critérios (2015–2025, IA/gamificação, Brasil/Coreia, efeitos mensuráveis)! ✨
          </Text>
        </View>

        {/* Items Section Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.purple, marginBottom: 15, width: 200 }]}
          onPress={() => setShowItemsModal(true)}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
            🌸 Itens Coletáveis 🌸
          </Text>
        </TouchableOpacity>

        {/* Research Tools Section Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.green, marginBottom: 20, width: 200 }]}
          onPress={() => setShowToolsModal(true)}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
            🌸 Ferramentas de Pesquisa 🌸
          </Text>
        </TouchableOpacity>

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          🌸 Itens: {collectedItems.length}/5 | Ferramentas: {usedTools.length}/5 🌸
        </Text>

        {/* Phase Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 10 }]}>
              🎉 Fase 3 Completa! 🌸
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
          <Text style={{ fontSize: 18 }}>🔮</Text>
          <Text style={{ fontSize: 12 }}>✨</Text>
          <Text style={{ fontSize: 15 }}>🌸</Text>
        </View>

        {/* Cute graphic elements */}
        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', width: '100%' }}>
          <Image 
            source={require('../assets/images/03cb0ecf-6fb7-48d8-b0c2-361fe3375bff.jpeg')}
            style={{ width: 20, height: 20, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Image 
            source={require('../assets/images/5d6b783c-4a9b-49d2-b0e6-8300d8d48aab.jpeg')}
            style={{ width: 18, height: 18, borderRadius: 9 }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Items Modal */}
      <SimpleBottomSheet
        isVisible={showItemsModal}
        onClose={() => setShowItemsModal(false)}
        keepOpen={!isItemsComplete}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 20, color: '#FFFFFF', lineHeight: 16 }]}>
            🌸 Itens Coletáveis 🌸
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
            {items.map((item) => (
              <Animated.View
                key={item.id}
                style={[
                  {
                    opacity: collectedItems.includes(item.id) ? 0.3 : itemAnimation,
                    margin: 5
                  }
                ]}
              >
                <TouchableOpacity
                  style={[
                    buttonStyles.powerUpButton,
                    { 
                      backgroundColor: collectedItems.includes(item.id) ? colors.grey : colors.purple,
                      width: 100,
                      height: 80
                    }
                  ]}
                  onPress={() => collectItem(item.id)}
                  disabled={collectedItems.includes(item.id)}
                >
                  <Text style={[commonStyles.pixelText, { fontSize: 10, marginBottom: 3, color: '#FFFFFF', lineHeight: 12 }]}>
                    {item.name}
                  </Text>
                  <Text style={[commonStyles.pixelText, { fontSize: 6, color: '#FFFFFF', lineHeight: 8 }]}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {isItemsComplete && (
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent, marginTop: 10 }]}
              onPress={() => setShowItemsModal(false)}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
                🌸 Fechar 🌸
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SimpleBottomSheet>

      {/* Research Tools Modal */}
      <SimpleBottomSheet
        isVisible={showToolsModal}
        onClose={() => setShowToolsModal(false)}
        keepOpen={!isToolsComplete}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 20, color: '#FFFFFF', lineHeight: 16 }]}>
            🌸 Ferramentas de Pesquisa 🌸
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
            {researchTools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={[
                  buttonStyles.pixelButton,
                  { 
                    backgroundColor: usedTools.includes(tool.id) ? colors.grey : colors.green,
                    margin: 5,
                    width: 100,
                    height: 70
                  }
                ]}
                onPress={() => useTool(tool.id)}
                disabled={usedTools.includes(tool.id)}
              >
                <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 2, color: '#FFFFFF', lineHeight: 10 }]}>
                  {tool.name}
                </Text>
                <Text style={[commonStyles.pixelText, { fontSize: 6, color: '#FFFFFF', lineHeight: 8 }]}>
                  {tool.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {isToolsComplete && (
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent, marginTop: 10 }]}
              onPress={() => setShowToolsModal(false)}
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
