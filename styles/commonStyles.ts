
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FF69B4',      // Pink like Kirby
  secondary: '#87CEEB',    // Sky blue
  accent: '#FFD700',       // Gold for stars
  background: '#E6F3FF',   // Light blue background
  backgroundAlt: '#F0F8FF', // Alice blue
  text: '#2F4F4F',         // Dark slate gray
  grey: '#B0C4DE',         // Light steel blue
  card: '#FFFFFF',         // White cards
  green: '#90EE90',        // Light green
  red: '#FFB6C1',          // Light pink
  purple: '#DDA0DD',       // Plum
  orange: '#FFA500',       // Orange
  yellow: '#FFFF99',       // Light yellow
  darkText: '#000000',     // Black text for light backgrounds
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
  pixelButton: {
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.darkText,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.darkText,
    marginBottom: 10,
    fontFamily: 'PressStart2P_400Regular',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  pixelText: {
    fontSize: 12,
    color: colors.darkText,
    fontFamily: 'PressStart2P_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.darkText,
    borderWidth: 2,
    borderRadius: 0,
    padding: 15,
    marginVertical: 8,
    width: '100%',
    boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
    elevation: 4,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  dialogBox: {
    backgroundColor: colors.card,
    borderWidth: 3,
    borderColor: colors.darkText,
    padding: 15,
    margin: 10,
    boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
  },
  star: {
    width: 30,
    height: 30,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.darkText,
  },
});
