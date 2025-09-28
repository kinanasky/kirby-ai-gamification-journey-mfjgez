
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';
import SimpleBottomSheet from '../components/BottomSheet';

export default function Phase2() {
  const router = useRouter();
  const [collectedPowerUps, setCollectedPowerUps] = useState<string[]>([]);
  const [defeatedEnemies, setDefeatedEnemies] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [powerUpAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  const [showPowerUpsModal, setShowPowerUpsModal] = useState(false);
  const [showEnemiesModal, setShowEnemiesModal] = useState(false);
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const powerUps = [
    { id: 'ia', name: '💙 IA', description: 'Absorve dados e cria rotas personalizadas' },
    { id: 'gamificacao', name: '💛 Gamificação', description: 'Aumenta motivação e engajamento' }
  ];

  const enemies = [
    { id: 'livro1', name: '📖 Livro Voador 1' },
    { id: 'livro2', name: '📖 Livro Voador 2' },
    { id: 'livro3', name: '📖 Livro Voador 3' }
  ];

  const messages = [
    "🌸 70s: Tutores inteligentes surgiram!",
    "🌸 80s: Sistemas especialistas evoluíram!",
    "🌸 90s: Agentes autônomos apareceram!",
    "🌸 2010+: Deep Learning revolucionou tudo!",
    "🌸 A Gamificação nos dá Autonomia, Competência e Conexão Social! ✨"
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

    // Power-up glowing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(powerUpAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(powerUpAnimation, {
          toValue: 0.5,
          duration: 1000,
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
  }, [petalAnimation, powerUpAnimation, sakuraAnimation]);

  const collectPowerUp = (powerUpId: string) => {
    if (!collectedPowerUps.includes(powerUpId)) {
      setCollectedPowerUps([...collectedPowerUps, powerUpId]);
      console.log(`Power-up collected: ${powerUpId}`);
    }
  };

  const defeatEnemy = (enemyId: string) => {
    if (!defeatedEnemies.includes(enemyId)) {
      setDefeatedEnemies([...defeatedEnemies, enemyId]);
      if (currentMessage < messages.length - 1) {
        setCurrentMessage(currentMessage + 1);
      }
      console.log(`Enemy defeated: ${enemyId}`);
    }
  };

  const nextPhase = () => {
    console.log('Moving to Phase 3');
    router.push('/phase3');
  };

  const isPhaseComplete = collectedPowerUps.length === 2 && defeatedEnemies.length === 3;
  const isPowerUpsComplete = collectedPowerUps.length === 2;
  const isEnemiesComplete = defeatedEnemies.length === 3;

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
          🌸 Fase 2 - Fundamentação Teórica 🌸
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

        {/* Current Message */}
        <View style={[commonStyles.dialogBox, { marginBottom: 20 }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
            {messages[currentMessage]}
          </Text>
        </View>

        {/* Power-ups Section Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.blue, marginBottom: 15, width: 200 }]}
          onPress={() => setShowPowerUpsModal(true)}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
            🌸 Power-ups Coletáveis 🌸
          </Text>
        </TouchableOpacity>

        {/* Enemies Section Button */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.red, marginBottom: 20, width: 200 }]}
          onPress={() => setShowEnemiesModal(true)}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
            🌸 Inimigos: Livros Voadores 🌸
          </Text>
        </TouchableOpacity>

        {/* Progress */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          🌸 Power-ups: {collectedPowerUps.length}/2 | Inimigos: {defeatedEnemies.length}/3 🌸
        </Text>

        {/* Phase Complete */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 10 }]}>
              🎉 Fase 2 Completa! 🌸
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
          <Text style={{ fontSize: 18 }}>💙</Text>
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
            source={require('../assets/images/fe75fb18-a9af-410c-b9c0-ddf8ba28fcf0.jpeg')}
            style={{ width: 18, height: 18, borderRadius: 9 }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Power-ups Modal */}
      <SimpleBottomSheet
        isVisible={showPowerUpsModal}
        onClose={() => setShowPowerUpsModal(false)}
        keepOpen={!isPowerUpsComplete}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 20, color: '#FFFFFF', lineHeight: 16 }]}>
            🌸 Power-ups Coletáveis 🌸
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20 }}>
            {powerUps.map((powerUp) => (
              <Animated.View
                key={powerUp.id}
                style={[
                  {
                    opacity: collectedPowerUps.includes(powerUp.id) ? 0.3 : powerUpAnimation,
                  }
                ]}
              >
                <TouchableOpacity
                  style={[
                    buttonStyles.powerUpButton,
                    { 
                      backgroundColor: collectedPowerUps.includes(powerUp.id) ? colors.grey : colors.blue,
                      width: 120,
                      height: 80
                    }
                  ]}
                  onPress={() => collectPowerUp(powerUp.id)}
                  disabled={collectedPowerUps.includes(powerUp.id)}
                >
                  <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 5, color: '#FFFFFF', lineHeight: 14 }]}>
                    {powerUp.name}
                  </Text>
                  <Text style={[commonStyles.pixelText, { fontSize: 8, color: '#FFFFFF', lineHeight: 10 }]}>
                    {powerUp.description}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {isPowerUpsComplete && (
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent, marginTop: 10 }]}
              onPress={() => setShowPowerUpsModal(false)}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
                🌸 Fechar 🌸
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SimpleBottomSheet>

      {/* Enemies Modal */}
      <SimpleBottomSheet
        isVisible={showEnemiesModal}
        onClose={() => setShowEnemiesModal(false)}
        keepOpen={!isEnemiesComplete}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={[commonStyles.pixelText, { fontSize: 12, marginBottom: 20, color: '#FFFFFF', lineHeight: 16 }]}>
            🌸 Inimigos: Livros Voadores 🌸
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
            {enemies.map((enemy) => (
              <TouchableOpacity
                key={enemy.id}
                style={[
                  buttonStyles.pixelButton,
                  { 
                    backgroundColor: defeatedEnemies.includes(enemy.id) ? colors.grey : colors.red,
                    margin: 5,
                    width: 100,
                    height: 60
                  }
                ]}
                onPress={() => defeatEnemy(enemy.id)}
                disabled={defeatedEnemies.includes(enemy.id)}
              >
                <Text style={[commonStyles.pixelText, { fontSize: 8, color: '#FFFFFF', lineHeight: 10 }]}>
                  {enemy.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {isEnemiesComplete && (
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent, marginTop: 10 }]}
              onPress={() => setShowEnemiesModal(false)}
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
