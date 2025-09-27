
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase7() {
  const router = useRouter();
  const [collectedPieces, setCollectedPieces] = useState<string[]>([]);
  const [kirbyAnimation] = useState(new Animated.Value(0));
  const [mapAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const mapPieces = [
    { 
      id: 'infraestrutura', 
      name: '🏗️ Infraestrutura', 
      description: 'Infraestrutura e Acesso Equitativo - Garantir conectividade e dispositivos para todos',
      color: colors.blue
    },
    { 
      id: 'formacao', 
      name: '👨‍🏫 Formação', 
      description: 'Formação Docente - Capacitação contínua em tecnologias educacionais',
      color: colors.green
    },
    { 
      id: 'gamificacao', 
      name: '🎮 Gamificação', 
      description: 'Gamificação Colaborativa - Elementos de jogo que promovem cooperação',
      color: colors.purple
    },
    { 
      id: 'ia_personalizada', 
      name: '🤖 IA Personalizada', 
      description: 'IA Personalizada - Adaptação às necessidades individuais dos estudantes',
      color: colors.accent
    },
    { 
      id: 'integracao', 
      name: '🔄 Integração', 
      description: 'Integração Presencial–Virtual - Hibridização eficaz dos ambientes',
      color: colors.coral
    },
    { 
      id: 'etica', 
      name: '⚖️ Ética', 
      description: 'Ética, Privacidade e Cultura - Respeito aos valores e proteção de dados',
      color: colors.red
    }
  ];

  useEffect(() => {
    // Kirby floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(kirbyAnimation, {
          toValue: -6,
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

    // Map magical glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(mapAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(mapAnimation, {
          toValue: 0.3,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const collectPiece = (pieceId: string) => {
    if (!collectedPieces.includes(pieceId)) {
      setCollectedPieces([...collectedPieces, pieceId]);
      console.log(`Map piece collected: ${pieceId}`);
    }
  };

  const openPortal = () => {
    console.log('Opening final portal');
    router.push('/final');
  };

  const isPhaseComplete = collectedPieces.length === mapPieces.length;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.phaseContainer}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {/* Phase Title */}
        <Text style={commonStyles.phaseTitle}>
          Fase 7 - Mapa Mágico
        </Text>

        {/* Magical Map Display */}
        <Animated.View 
          style={[
            {
              width: 200,
              height: 150,
              backgroundColor: colors.cream,
              borderWidth: 3,
              borderColor: colors.darkText,
              borderRadius: 15,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: mapAnimation
            }
          ]}
        >
          <Text style={[commonStyles.pixelText, { fontSize: 20 }]}>🗺️</Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, marginTop: 10 }]}>
            Modelo de Diretrizes
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 6, marginTop: 5 }]}>
            {collectedPieces.length}/6 peças
          </Text>
        </Animated.View>

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
          Peças do Mapa: {collectedPieces.length}/{mapPieces.length}
        </Text>

        <View style={commonStyles.progressBar}>
          <View 
            style={[
              commonStyles.progressFill, 
              { width: `${(collectedPieces.length / mapPieces.length) * 100}%` }
            ]} 
          />
        </View>

        {/* Map Pieces */}
        <Text style={[commonStyles.pixelText, { marginTop: 20, marginBottom: 15, color: colors.text }]}>
          Diretrizes para Coletar:
        </Text>

        {mapPieces.map((piece, index) => (
          <View key={piece.id} style={{ width: '100%', alignItems: 'center', marginVertical: 8 }}>
            <TouchableOpacity
              style={[
                buttonStyles.pixelButton,
                { 
                  backgroundColor: collectedPieces.includes(piece.id) ? colors.grey : piece.color,
                  opacity: collectedPieces.includes(piece.id) ? 0.6 : 1,
                  width: '90%'
                }
              ]}
              onPress={() => collectPiece(piece.id)}
              disabled={collectedPieces.includes(piece.id)}
            >
              <Text style={[commonStyles.pixelText, { fontSize: 9, color: colors.darkText }]}>
                {index + 1}. {piece.name} {collectedPieces.includes(piece.id) ? '✓' : ''}
              </Text>
            </TouchableOpacity>
            
            {collectedPieces.includes(piece.id) && (
              <View style={[commonStyles.dialogBox, { marginTop: 5, width: '90%' }]}>
                <Text style={[commonStyles.pixelText, { fontSize: 7 }]}>
                  {piece.description}
                </Text>
              </View>
            )}
          </View>
        ))}

        {/* Portal Opening */}
        {isPhaseComplete && (
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <View style={[commonStyles.dialogBox, { marginBottom: 15 }]}>
              <Text style={[commonStyles.pixelText, { fontSize: 8 }]}>
                🌟 O mapa está completo! O portal final se abriu! 🌟
              </Text>
            </View>
            
            <View style={{
              width: 120,
              height: 120,
              backgroundColor: colors.accent,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: colors.darkText,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 15
            }}>
              <Text style={[commonStyles.pixelText, { fontSize: 30 }]}>🌀</Text>
              <Text style={[commonStyles.pixelText, { fontSize: 6 }]}>Portal Final</Text>
            </View>
            
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.accent }]}
              onPress={openPortal}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                ✨ Entrar no Portal ✨
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
