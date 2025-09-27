
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';

export default function ExplanationScreen() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [sakuraAnimation] = useState(new Animated.Value(0));
  const [petalAnimation] = useState(new Animated.Value(0));
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const sections = [
    {
      title: "O que é Inteligência Artificial?",
      content: "A IA é a capacidade de máquinas realizarem tarefas que normalmente requerem inteligência humana, como aprender, raciocinar e resolver problemas.",
      icon: "🤖",
      color: colors.blue
    },
    {
      title: "IA na Educação",
      content: "Na educação, a IA pode personalizar o aprendizado, identificar dificuldades dos alunos e oferecer suporte adaptado às necessidades individuais.",
      icon: "📚",
      color: colors.green
    },
    {
      title: "O que é Gamificação?",
      content: "Gamificação é o uso de elementos de jogos (pontos, níveis, desafios) em contextos não-lúdicos para aumentar engajamento e motivação.",
      icon: "🎮",
      color: colors.purple
    },
    {
      title: "Gamificação na Educação",
      content: "Na educação, a gamificação torna o aprendizado mais divertido e envolvente, usando recompensas e desafios para motivar os estudantes.",
      icon: "🏆",
      color: colors.accent
    },
    {
      title: "IA + Gamificação",
      content: "Juntas, IA e gamificação criam experiências educacionais personalizadas e envolventes, adaptando-se ao ritmo e estilo de cada aluno.",
      icon: "✨",
      color: colors.coral
    }
  ];

  useEffect(() => {
    // Sakura floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sakuraAnimation, {
          toValue: -10,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(sakuraAnimation, {
          toValue: 0,
          duration: 3000,
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

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      console.log(`Moving to section ${currentSection + 1}`);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      console.log(`Moving to section ${currentSection - 1}`);
    }
  };

  const startGame = () => {
    console.log('Starting game from explanation');
    router.push('/phase1');
  };

  if (!fontsLoaded) {
    return null;
  }

  const currentSectionData = sections[currentSection];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.content}>
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
        <Animated.View 
          style={[
            {
              position: 'absolute',
              top: 50,
              right: 50,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.primary,
              transform: [
                {
                  translateY: petalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 250]
                  })
                }
              ]
            }
          ]}
        />

        {/* Title */}
        <Text style={[commonStyles.title, { fontSize: 14, marginBottom: 20, color: colors.primary }]}>
          Guia de IA e Gamificação
        </Text>

        {/* Sakura Character (replacing Kirby) */}
        <Animated.View 
          style={[
            {
              width: 120,
              height: 120,
              backgroundColor: colors.rose,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              transform: [{ translateY: sakuraAnimation }]
            }
          ]}
        >
          {/* Sakura petals */}
          <Text style={{ fontSize: 50, position: 'absolute' }}>🌸</Text>
          {/* Cute face */}
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.darkText,
            borderRadius: 6,
            position: 'absolute',
            left: 35,
            top: 40,
          }} />
          <View style={{
            width: 12,
            height: 12,
            backgroundColor: colors.darkText,
            borderRadius: 6,
            position: 'absolute',
            right: 35,
            top: 40,
          }} />
          {/* Smile */}
          <View style={{
            width: 20,
            height: 10,
            backgroundColor: colors.darkText,
            borderRadius: 10,
            position: 'absolute',
            bottom: 35,
          }} />
          {/* Blush */}
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.coral,
            borderRadius: 4,
            position: 'absolute',
            left: 20,
            top: 55,
          }} />
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: colors.coral,
            borderRadius: 4,
            position: 'absolute',
            right: 20,
            top: 55,
          }} />
        </Animated.View>

        {/* Progress indicator */}
        <Text style={[commonStyles.pixelText, { marginBottom: 15, color: colors.text }]}>
          {currentSection + 1} de {sections.length}
        </Text>

        {/* Section content */}
        <View style={[commonStyles.card, { backgroundColor: currentSectionData.color, marginBottom: 20 }]}>
          <Text style={[commonStyles.pixelText, { fontSize: 30, marginBottom: 10, textAlign: 'center' }]}>
            {currentSectionData.icon}
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 10, marginBottom: 15, color: colors.darkText }]}>
            {currentSectionData.title}
          </Text>
          <Text style={[commonStyles.pixelText, { fontSize: 8, color: colors.darkText, lineHeight: 14 }]}>
            {currentSectionData.content}
          </Text>
        </View>

        {/* Navigation buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
          <TouchableOpacity
            style={[
              buttonStyles.pixelButton, 
              { 
                backgroundColor: currentSection > 0 ? colors.grey : colors.backgroundAlt,
                opacity: currentSection > 0 ? 1 : 0.5,
                flex: 1,
                marginRight: 10
              }
            ]}
            onPress={prevSection}
            disabled={currentSection === 0}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
              ← Anterior
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              buttonStyles.pixelButton, 
              { 
                backgroundColor: currentSection < sections.length - 1 ? colors.primary : colors.accent,
                flex: 1,
                marginLeft: 10
              }
            ]}
            onPress={currentSection < sections.length - 1 ? nextSection : startGame}
          >
            <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
              {currentSection < sections.length - 1 ? 'Próximo →' : 'Começar Jogo! 🎮'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Back to menu */}
        <TouchableOpacity
          style={[buttonStyles.pixelButton, { backgroundColor: colors.grey }]}
          onPress={() => router.back()}
        >
          <Text style={[commonStyles.pixelText, { color: colors.darkText, fontSize: 8 }]}>
            ← Voltar ao Menu
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
