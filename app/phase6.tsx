
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';
import SimpleBottomSheet from '../components/BottomSheet';

export default function Phase6() {
  const router = useRouter();
  const [defeatedBosses, setDefeatedBosses] = useState<string[]>([]);
  const [currentBoss, setCurrentBoss] = useState<string | null>(null);
  const [showNPCDialogs, setShowNPCDialogs] = useState(false);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [bossAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  const [showGlobalBossesModal, setShowGlobalBossesModal] = useState(false);
  
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
    setShowGlobalBossesModal(false); // Close the modal when challenging a boss, just like Phase 5
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
  const isGlobalBossesComplete = defeatedBosses.length === 3;

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

        {/* Ana Carla Boas Vindas Image */}
        <View style={{ marginBottom: 20 }}>
          <Image 
            source={require('../assets/images/1eb82ef6-1309-4eb9-ae29-33ce88661c60.png')}
            style={{ width: 120, height: 120, borderRadius: 60 }}
            resizeMode="cover"
          />
        </View>

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

        {/* Global Bosses Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.red, marginBottom: 20, width: 250 }]}
          onPress={() => setShowGlobalBossesModal(true)}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
            🌸 Chefes Globais: {defeatedBosses.length}/3 🌸
          </Text>
        </TouchableOpacity>

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

        {/* Cute graphic elements - Fixed image order to match Phase 5 pattern */}
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

      {/* Global Bosses Modal */}
      <SimpleBottomSheet
        isVisible={showGlobalBossesModal}
        onClose={() => setShowGlobalBossesModal(false)}
        keepOpen={false} // Allow the modal to be closed at any time, just like Phase 5
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 20, color: '#FFFFFF', lineHeight: 16 }]}>
            🌸 Chefes Globais 🌸
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
                  <Text style={[commonStyles.pixelText, { fontSize: 8, marginBottom: 5, color: '#FFFFFF', lineHeight: 10 }]}>
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
            onPress={() => setShowGlobalBossesModal(false)}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
              🌸 Fechar 🌸
            </Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
