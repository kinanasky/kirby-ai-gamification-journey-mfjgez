
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function Phase7() {
  const router = useRouter();
  const [collectedPieces, setCollectedPieces] = useState<string[]>([]);
  const [portalOpen, setPortalOpen] = useState(false);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [pieceAnimation] = useState(new Animated.Value(0));
  const [portalAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const mapPieces = [
    { 
      id: 'infraestrutura', 
      name: '🏗️ Infraestrutura e Acesso Equitativo',
      description: 'Garantir acesso universal à tecnologia'
    },
    { 
      id: 'formacao', 
      name: '👩‍🏫 Formação Docente',
      description: 'Capacitar professores para usar IA'
    },
    { 
      id: 'gamificacao', 
      name: '🎮 Gamificação Colaborativa',
      description: 'Jogos que promovem cooperação'
    },
    { 
      id: 'ia_personalizada', 
      name: '🤖 IA Personalizada',
      description: 'Adaptação às necessidades individuais'
    },
    { 
      id: 'integracao', 
      name: '🔄 Integração Presencial–Virtual',
      description: 'Combinar ensino físico e digital'
    },
    { 
      id: 'etica', 
      name: '⚖️ Ética, Privacidade e Cultura',
      description: 'Proteger dados e respeitar culturas'
    }
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

    // Piece glowing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pieceAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pieceAnimation, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Portal animation
    if (portalOpen) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(portalAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(portalAnimation, {
            toValue: 0.7,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    // Petal falling animation
    Animated.loop(
      Animated.timing(petalAnimation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, [portalOpen]);

  const collectPiece = (pieceId: string) => {
    if (!collectedPieces.includes(pieceId)) {
      const newCollected = [...collectedPieces, pieceId];
      setCollectedPieces(newCollected);
      console.log(`Map piece collected: ${pieceId}`);
      
      if (newCollected.length === 6) {
        setPortalOpen(true);
      }
    }
  };

  const openPortal = () => {
    console.log('Opening final portal');
    router.push('/final');
  };

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
          🌸 Fase 7 - Mapa Mágico 🌸
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
            🌸 Missão: Colete todas as 6 peças do mapa para abrir o portal final! ✨
          </Text>
        </View>

        {/* Map Pieces */}
        <Text style={[commonStyles.pixelText, { fontSize: 10, marginBottom: 15, color: colors.text }]}>
          🌸 Peças do Mapa: {collectedPieces.length}/6 🌸
        </Text>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
          {mapPieces.map((piece) => (
            <Animated.View
              key={piece.id}
              style={[
                {
                  opacity: collectedPieces.includes(piece.id) ? 0.3 : pieceAnimation,
                  margin: 5
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  buttonStyles.pixelButton,
                  { 
                    backgroundColor: collectedPieces.includes(piece.id) ? colors.grey : colors.accent,
                    width: 110,
                    height: 80
                  }
                ]}
                onPress={() => collectPiece(piece.id)}
                disabled={collectedPieces.includes(piece.id)}
              >
                <Text style={[commonStyles.pixelText, { fontSize: 7, marginBottom: 3, color: colors.darkText }]}>
                  {piece.name}
                </Text>
                <Text style={[commonStyles.pixelText, { fontSize: 5, color: colors.darkText }]}>
                  {piece.description}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Portal */}
        {portalOpen && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={[commonStyles.pixelText, { color: colors.accent, marginBottom: 15, fontSize: 10 }]}>
              🎉 Todas as peças coletadas! 🌸
            </Text>
            
            <Animated.View style={{
              width: 120,
              height: 120,
              backgroundColor: colors.purple,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              opacity: portalAnimation
            }}>
              <Text style={{ fontSize: 60 }}>🌀</Text>
              <Text style={[commonStyles.pixelText, { fontSize: 6, color: colors.darkText }]}>
                Portal Final
              </Text>
            </Animated.View>
            
            <TouchableOpacity
              style={[buttonStyles.pixelButton, { backgroundColor: colors.purple }]}
              onPress={openPortal}
            >
              <Text style={[commonStyles.pixelText, { color: colors.darkText }]}>
                🌸 Entrar no Portal 🌸
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
          <Text style={{ fontSize: 18 }}>🗺️</Text>
          <Text style={{ fontSize: 12 }}>✨</Text>
          <Text style={{ fontSize: 15 }}>🌸</Text>
        </View>

        {/* Cute graphic elements */}
        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', width: '100%' }}>
          <Image 
            source={require('../assets/images/fe75fb18-a9af-410c-b9c0-ddf8ba28fcf0.jpeg')}
            style={{ width: 20, height: 20, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Image 
            source={require('../assets/images/a0ec4a2b-45d2-467b-b1a1-dd085aff862a.jpeg')}
            style={{ width: 18, height: 18, borderRadius: 9 }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
