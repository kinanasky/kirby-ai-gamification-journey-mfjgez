
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated, Image, PanResponder } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { 
  useFonts as useNunitoFonts, 
  Nunito_400Regular, 
  Nunito_600SemiBold, 
  Nunito_700Bold 
} from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import WiiCursor from '../components/WiiCursor';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function MainScreen() {
  const router = useRouter();
  const [channelAnimation] = useState(new Animated.Value(0));
  const [sparkleAnimation] = useState(new Animated.Value(0));
  const [floatAnimation] = useState(new Animated.Value(0));
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  let [nunitoFontsLoaded] = useNunitoFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  // Pan responder for cursor tracking
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      setCursorPosition({ x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY });
      setShowCursor(true);
    },
    onPanResponderMove: (evt) => {
      setCursorPosition({ x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY });
    },
    onPanResponderRelease: () => {
      setShowCursor(false);
    },
  });

  useEffect(() => {
    if (fontsLoaded && nunitoFontsLoaded) {
      SplashScreen.hideAsync();
      
      // Start channel hover animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(channelAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(channelAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Start sparkle animation
      Animated.loop(
        Animated.timing(sparkleAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ).start();

      // Start floating animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnimation, {
            toValue: -5,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnimation, {
            toValue: 5,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [fontsLoaded, nunitoFontsLoaded, channelAnimation, sparkleAnimation, floatAnimation]);

  const handleStartAdventure = () => {
    console.log('Starting adventure!');
    router.push('/phase1');
  };

  const handleGuide = () => {
    console.log('Opening guide!');
    router.push('/explanation');
  };

  if (!fontsLoaded || !nunitoFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View {...panResponder.panHandlers} style={{ flex: 1, width: '100%' }}>
        <WiiCursor x={cursorPosition.x} y={cursorPosition.y} visible={showCursor} />
        
        <ScrollView contentContainerStyle={commonStyles.content}>
          {/* Wii-style floating elements */}
          <Animated.View 
            style={[
              {
                position: 'absolute',
                top: 60,
                left: 40,
                width: 12,
                height: 12,
                backgroundColor: colors.wiiBlue,
                borderRadius: 6,
                opacity: sparkleAnimation,
              }
            ]}
          />
          <Animated.View 
            style={[
              {
                position: 'absolute',
                top: 100,
                right: 60,
                width: 10,
                height: 10,
                backgroundColor: colors.wiiYellow,
                borderRadius: 5,
                opacity: sparkleAnimation,
              }
            ]}
          />
          <Animated.View 
            style={[
              {
                position: 'absolute',
                top: 140,
                left: 80,
                width: 8,
                height: 8,
                backgroundColor: colors.wiiGreen,
                borderRadius: 4,
                opacity: sparkleAnimation,
              }
            ]}
          />

          {/* Wii-style Title */}
          <Animated.View 
            style={[
              { alignItems: 'center', marginBottom: 30 },
              { transform: [{ translateY: floatAnimation }] }
            ]}
          >
            <Text style={[commonStyles.wiiTitle, { fontSize: 22, marginBottom: 5 }]}>
              Ana's DreamLand
            </Text>
            <Text style={[commonStyles.wiiSubtitle, { fontSize: 12, color: colors.wiiTextLight }]}>
              A Jornada da IA e Gamificação Brasil–Coreia
            </Text>
          </Animated.View>

          {/* Ana Carla Character - Wii Style */}
          <Animated.View 
            style={[
              {
                marginBottom: 25,
                alignItems: 'center',
                transform: [{ translateY: floatAnimation }]
              }
            ]}
          >
            <View style={[commonStyles.sakuraCharacter, { width: 120, height: 120 }]}>
              <Image 
                source={require('../assets/images/1eb82ef6-1309-4eb9-ae29-33ce88661c60.png')}
                style={{ width: 110, height: 110, borderRadius: 55 }}
                resizeMode="cover"
              />
            </View>
            
            {/* Wii-style sparkles around character */}
            <Animated.View style={[
              {
                position: 'absolute',
                top: 10,
                left: 10,
                width: 6,
                height: 6,
                backgroundColor: colors.wiiYellow,
                borderRadius: 3,
                opacity: sparkleAnimation,
              }
            ]} />
            <Animated.View style={[
              {
                position: 'absolute',
                top: 15,
                right: 15,
                width: 8,
                height: 8,
                backgroundColor: colors.wiiBlue,
                borderRadius: 4,
                opacity: sparkleAnimation,
              }
            ]} />
            <Animated.View style={[
              {
                position: 'absolute',
                bottom: 10,
                left: 20,
                width: 5,
                height: 5,
                backgroundColor: colors.wiiGreen,
                borderRadius: 2.5,
                opacity: sparkleAnimation,
              }
            ]} />
            <Animated.View style={[
              {
                position: 'absolute',
                bottom: 15,
                right: 10,
                width: 7,
                height: 7,
                backgroundColor: colors.wiiOrange,
                borderRadius: 3.5,
                opacity: sparkleAnimation,
              }
            ]} />
          </Animated.View>

          {/* Wii-style Dialog Box */}
          <View style={[commonStyles.dialogBox, { marginBottom: 30 }]}>
            <Text style={[commonStyles.wiiText, { marginBottom: 8, fontSize: 13 }]}>
              🎮 Olá, aventureiro(a)! Bem-vindo ao mundo da pesquisa sobre Inteligência Artificial e Gamificação na Educação.
            </Text>
            <Text style={[commonStyles.wiiText, { fontSize: 13, color: colors.wiiTextLight }]}>
              Vamos desbloquear juntos o próximo nível? ✨
            </Text>
          </View>

          {/* Wii Channel Style Menu */}
          <View style={commonStyles.wiiChannelGrid}>
            {/* Start Adventure Channel */}
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      scale: channelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05]
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity
                style={[buttonStyles.wiiChannelButton, { backgroundColor: colors.wiiBlue }]}
                onPress={handleStartAdventure}
              >
                <Text style={{ fontSize: 30, marginBottom: 5 }}>🚀</Text>
                <Text style={[commonStyles.wiiText, { color: colors.wiiWhite, fontSize: 11, fontWeight: '600' }]}>
                  Iniciar
                </Text>
                <Text style={[commonStyles.wiiText, { color: colors.wiiWhite, fontSize: 11, fontWeight: '600' }]}>
                  Aventura
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Guide Channel */}
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      scale: channelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05]
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity
                style={[buttonStyles.wiiChannelButton, { backgroundColor: colors.wiiGreen }]}
                onPress={handleGuide}
              >
                <Text style={{ fontSize: 30, marginBottom: 5 }}>📚</Text>
                <Text style={[commonStyles.wiiText, { color: colors.wiiWhite, fontSize: 11, fontWeight: '600' }]}>
                  Guia IA &
                </Text>
                <Text style={[commonStyles.wiiText, { color: colors.wiiWhite, fontSize: 11, fontWeight: '600' }]}>
                  Gamificação
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Settings Channel (placeholder) */}
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      scale: channelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05]
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity
                style={[buttonStyles.wiiChannelButton, { backgroundColor: colors.wiiOrange }]}
                onPress={() => console.log('Settings channel')}
              >
                <Text style={{ fontSize: 30, marginBottom: 5 }}>⚙️</Text>
                <Text style={[commonStyles.wiiText, { color: colors.wiiWhite, fontSize: 11, fontWeight: '600' }]}>
                  Configurações
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Credits Channel (placeholder) */}
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      scale: channelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05]
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity
                style={[buttonStyles.wiiChannelButton, { backgroundColor: colors.wiiPurple }]}
                onPress={() => router.push('/final')}
              >
                <Text style={{ fontSize: 30, marginBottom: 5 }}>🏆</Text>
                <Text style={[commonStyles.wiiText, { color: colors.wiiWhite, fontSize: 11, fontWeight: '600' }]}>
                  Créditos
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Wii-style decorative bottom bar */}
          <View style={{ 
            flexDirection: 'row', 
            marginTop: 30, 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: colors.wiiWhite,
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: colors.wiiDarkGray,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            elevation: 2,
          }}>
            <View style={{ 
              width: 8, 
              height: 8, 
              backgroundColor: colors.wiiBlue, 
              borderRadius: 4, 
              marginHorizontal: 5 
            }} />
            <View style={{ 
              width: 8, 
              height: 8, 
              backgroundColor: colors.wiiGreen, 
              borderRadius: 4, 
              marginHorizontal: 5 
            }} />
            <View style={{ 
              width: 8, 
              height: 8, 
              backgroundColor: colors.wiiYellow, 
              borderRadius: 4, 
              marginHorizontal: 5 
            }} />
            <View style={{ 
              width: 8, 
              height: 8, 
              backgroundColor: colors.wiiOrange, 
              borderRadius: 4, 
              marginHorizontal: 5 
            }} />
            <View style={{ 
              width: 8, 
              height: 8, 
              backgroundColor: colors.wiiRed, 
              borderRadius: 4, 
              marginHorizontal: 5 
            }} />
          </View>

          {/* Wii-style footer text */}
          <Text style={[commonStyles.wiiText, { 
            marginTop: 20, 
            fontSize: 10, 
            color: colors.wiiTextLight,
            fontStyle: 'italic' 
          }]}>
            Powered by Nintendo Wii Style Interface
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
