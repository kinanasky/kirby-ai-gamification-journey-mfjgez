
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase7() {
  const router = useRouter();
  const [collectedPieces, setCollectedPieces] = useState<string[]>([]);
  const [portalOpen, setPortalOpen] = useState(false);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [mapAnimation] = useState(new Animated.Value(0));
  const [portalAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const mapPieces = [
    { 
      id: 'infraestrutura', 
      name: '🏗️ Infraestrutura', 
      description: 'Infraestrutura e Acesso Equitativo para todos',
      color: colors.blue
    },
    { 
      id: 'formacao', 
      name: '👩‍🏫 Formação Docente', 
      description: 'Formação Docente continuada e especializada',
      color: colors.green
    },
    { 
      id: 'gamificacao', 
      name: '🎮 Gamificação', 
      description: 'Gamificação Colaborativa e engajante',
      color: colors.purple
    },
    { 
      id: 'ia_personalizada', 
      name: '🤖 IA Personalizada', 
      description: 'IA Personalizada para cada estudante',
      color: colors.accent
    },
    { 
      id: 'integracao', 
      name: '🔗 Integração', 
      description: 'Integração Presencial–Virtual harmoniosa',
      color: colors.orange
    },
    { 
      id: 'etica', 
      name: '⚖️ Ética', 
      description: 'Ética, Privacidade e Cultura respeitadas',
      color: colors.coral
    }
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -20,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(sakuraAnimation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Map magical animation
    Animated.loop(
      Animated.timing(mapAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    if (portalOpen) {
      // Portal opening animation
      Animated.timing(portalAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  }, [portalOpen]);

  const collectPiece = (pieceId: string) => {
    if (!collectedPieces.includes(pieceId)) {
      setCollectedPieces([...collectedPieces, pieceId]);
      console.log(`Map piece collected: ${pieceId}`);
    }
  };

  const openPortal = () => {
    if (collectedPieces.length === mapPieces.length && !portalOpen) {
      setPortalOpen(true);
      console.log('Portal opened!');
    }
  };

  const nextPhase = () => {
    console.log('Moving to Final Phase');
    router.push('/final');
  };

  const isPhaseComplete = collectedPieces.length === mapPieces.length;

  useEffect(() => {
    if (isPhaseComplete) {
      openPortal();
    }
  }, [isPhaseComplete]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={[commonStyles.phaseTitle, { color: colors.accent }]}>
          🌸 Fase 7 - Mapa Mágico 🌸
        </Text>

        {/* Magical Map Environment */}
        <Animated.View 
          style={[
            commonStyles.card, 
            { 
              backgroundColor: colors.cream, 
              marginBottom: 20, 
              width: '95%',
              transform: [
                {
                  scale: mapAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 30, textAlign: 'center', marginBottom: 10 }]}>
            🗺️ ✨ 🌟 ✨ 🗺️
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, textAlign: 'center', color: colors.darkText }]}>
            Mapa das Diretrizes Educacionais
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 6, textAlign: 'center', color: colors.text, marginTop: 5 }]}>
            Modelo Integrado Brasil-Coreia
          </Text>
        </Animated.View>

        {/* Portal (if opened) */}
        {portalOpen && (
          <Animated.View 
            style={[
              {
                width: 150,
                height: 150,
                backgroundColor: colors.sky,
                borderRadius: 75,
                borderWidth: 4,
                borderColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                opacity: portalAnimation,
                transform: [
                  {
                    scale: portalAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={{ fontSize: 50 }}>🌀</Text>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText, marginTop: 5 }]}>
              Portal Final
            </Text>
          </Animated.View>
        )}

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
          🌸 Peças do Mapa: {collectedPieces.length}/6
        </Text>

        {/* Map Pieces */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.accent }]}>
          🌸 Peças das Diretrizes:
        </Text>

        <View style={commonStyles.collectibleGrid}>
          {mapPieces.map((piece) => (
            <TouchableOpacity
              key={piece.id}
              style={[
                buttonStyles.cuteButton,
                { 
                  backgroundColor: collectedPieces.includes(piece.id) ? piece.color : colors.grey,
                  opacity: collectedPieces.includes(piece.id) ? 1 : 0.6,
                  borderColor: colors.accent,
                  width: 130,
                  height: 70,
                  margin: 8
                }
              ]}
              onPress={() => collectPiece(piece.id)}
              disabled={collectedPieces.includes(piece.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText, textAlign: 'center' }]}>
                {piece.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show collected piece descriptions */}
        {collectedPieces.map((pieceId) => {
          const piece = mapPieces.find(p => p.id === pieceId);
          return piece ? (
            <View key={pieceId} style={[commonStyles.dialogBox, { marginVertical: 5, width: '95%', backgroundColor: piece.color }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 7, color: colors.darkText, marginBottom: 5 }]}>
                🌸 {piece.name} Coletado!
              </Text>
              <Text style={[commonStyles.pixelText, { fontSize: 6, color: colors.darkText }]}>
                {piece.description}
              </Text>
            </View>
          ) : null;
        })}

        {/* Complete Map Message */}
        {isPhaseComplete && (
          <View style={[commonStyles.dialogBox, { backgroundColor: colors.cream, marginTop: 15, marginBottom: 15 }]}>
            <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText }]}>
              🌸 Kirby: Todas as peças foram coletadas! O modelo de diretrizes está completo e o portal final foi aberto! Agora podemos integrar IA e Gamificação de forma equilibrada! 💕
            </Text>
          </View>
        )}

        {/* Mission Complete */}
        {portalOpen && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 12 }]}>
              🌸✨ Mapa Completo! Portal Aberto! ✨🌸
            </Text>
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.primary }]}
              onPress={nextPhase}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                🌸 Entrar no Portal Final 🌸
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
