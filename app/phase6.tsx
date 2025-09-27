
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase6() {
  const router = useRouter();
  const [defeatedBosses, setDefeatedBosses] = useState<string[]>([]);
  const [currentBoss, setCurrentBoss] = useState<string | null>(null);
  const [showNPCDialogs, setShowNPCDialogs] = useState(false);
  const [kirbyAnimation] = useState(new Animated.Value(0));
  const [brasilAnimation] = useState(new Animated.Value(0));
  const [koreaAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const globalBosses = [
    { 
      id: 'saturacao', 
      name: '📱 Saturação Digital', 
      description: 'O excesso de tecnologia pode causar fadiga e resistência',
      color: colors.red
    },
    { 
      id: 'vulnerabilidade', 
      name: '🏚️ Vulnerabilidade Social', 
      description: 'Desigualdades de acesso e oportunidades educacionais',
      color: colors.orange
    },
    { 
      id: 'medo', 
      name: '😰 Medo da IA', 
      description: 'Receios sobre substituição e perda de controle humano',
      color: colors.purple
    }
  ];

  const npcs = [
    { 
      id: 'leon', 
      name: 'Leon', 
      dialog: 'A IA pode monitorar emoções e detectar sinais de estresse em tempo real!'
    },
    { 
      id: 'chen', 
      name: 'Chen', 
      dialog: 'Ela age de forma preventiva, oferecendo suporte antes que problemas se agravem!'
    },
    { 
      id: 'kim', 
      name: 'Kim & Kim', 
      dialog: 'Mas precisamos de transparência e formação contínua para educadores e estudantes!'
    }
  ];

  useEffect(() => {
    // Kirby floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(kirbyAnimation, {
          toValue: -4,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(kirbyAnimation, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Brasil and Korea cooperation animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(brasilAnimation, {
          toValue: 10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(brasilAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(koreaAnimation, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(koreaAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const challengeBoss = (bossId: string) => {
    setCurrentBoss(bossId);
    console.log(`Challenging global boss: ${bossId}`);
  };

  const defeatBoss = () => {
    if (currentBoss && !defeatedBosses.includes(currentBoss)) {
      setDefeatedBosses([...defeatedBosses, currentBoss]);
      console.log(`Global boss defeated: ${currentBoss}`);
      setCurrentBoss(null);
      
      if (defeatedBosses.length + 1 === globalBosses.length) {
        setShowNPCDialogs(true);
      }
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 7');
    router.push('/phase7');
  };

  const isPhaseComplete = defeatedBosses.length === globalBosses.length && showNPCDialogs;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          Fase 6 - Batalha Cooperativa
        </Text>

        {/* Cooperation Display */}
        <View style={{
          width: '100%',
          height: 120,
          backgroundColor: colors.mint,
          borderWidth: 2,
          borderColor: colors.darkText,
          borderRadius: 10,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20
        }}>
          {/* Brasil */}
          <Animated.View 
            style={[
              {
                width: 60,
                height: 60,
                backgroundColor: colors.green,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: colors.darkText,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20
              },
              { transform: [{ translateX: brasilAnimation }] }
            ]}
          >
            <Text style={[commonStyles.pixelText, { fontSize: 16 }]}>🇧🇷</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 6 }]}>Brasil</Text>
          </Animated.View>

          {/* Cooperation Symbol */}
          <Text style={[commonStyles.pixelText, { fontSize: 20, color: colors.accent }]}>🤝</Text>

          {/* Coreia */}
          <Animated.View 
            style={[
              {
                width: 60,
                height: 60,
                backgroundColor: colors.blue,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: colors.darkText,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 20
              },
              { transform: [{ translateX: koreaAnimation }] }
            ]}
          >
            <Text style={[commonStyles.pixelText, { fontSize: 16 }]}>🇰🇷</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 6 }]}>Coreia</Text>
          </Animated.View>
        </View>

        {/* Kirby Character */}
        <Animated.View 
          style={[
            commonStyles.kirbyCharacter,
            { 
              width: 80,
              height: 80,
              transform: [{ translateY: kirbyAnimation }] 
            }
          ]}
        >
          {/* Eyes */}
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.darkText,
            borderRadius: 6,
            position: 'absolute',
            left: 18,
            top: 22,
          }} />
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.darkText,
            borderRadius: 6,
            position: 'absolute',
            right: 18,
            top: 22,
          }} />
          {/* Mouth */}
          <View style={{
            width: 8,
            height: 4,
            backgroundColor: colors.darkText,
            borderRadius: 4,
            position: 'absolute',
            bottom: 26,
          }} />
          {/* Cheeks */}
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.red,
            borderRadius: 4,
            position: 'absolute',
            left: 8,
            top: 34,
          }} />
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.red,
            borderRadius: 4,
            position: 'absolute',
            right: 8,
            top: 34,
          }} />
        </Animated.View>

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          Chefes Globais Derrotados: {defeatedBosses.length}/{globalBosses.length}
        </Text>

        {/* Global Bosses */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          Desafios Universais:
        </Text>

        {globalBosses.map((boss) => (
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
              <Text style={[commonStyles.pixelText, { fontSize: 9, color: colors.card }]}>
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
              Brasil e Coreia lutam juntos contra: {globalBosses.find(b => b.id === currentBoss)?.name}
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.red }]}
              onPress={defeatBoss}
            >
              <Text style={[commonStyles.pixelText, { color: colors.card }]}>
                ⚔️ Atacar Juntos
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* NPC Dialogs */}
        {showNPCDialogs && (
          <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15 }]}>
              Especialistas Falam:
            </Text>
            
            {npcs.map((npc) => (
              <View key={npc.id} style={[commonStyles.dialogBox, { marginVertical: 5, width: '90%' }]}>
                <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.text, marginBottom: 5 }]}>
                  {npc.name}:
                </Text>
                <Text style={[commonStyles.pixelText, { fontSize: 7 }]}>
                  {npc.dialog}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Mission Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15 }]}>
              🎉 Cooperação Vitoriosa! 🎉
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
