
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FFB6C1',      // Light pink like Sakura
  secondary: '#E6E6FA',    // Lavender
  accent: '#FFD700',       // Gold for stars
  background: '#FFF5F8',   // Very soft pink background
  backgroundAlt: '#F0F8FF', // Alice blue
  text: '#4B0082',         // Indigo - softer than black
  grey: '#D3D3D3',         // Light gray
  card: '#FFFFFF',         // White cards
  green: '#98FB98',        // Pale green
  red: '#FFB6C1',          // Light pink
  purple: '#DDA0DD',       // Plum
  orange: '#FFDAB9',       // Peach puff
  yellow: '#FFFFE0',       // Light yellow
  darkText: '#2F2F2F',     // Dark gray instead of black
  blue: '#B0E0E6',         // Powder blue
  mint: '#F0FFF0',         // Honeydew
  coral: '#FFB07A',        // Light salmon
  rose: '#FFE4E1',         // Misty rose
  sky: '#87CEEB',          // Sky blue
  cream: '#FFFACD',        // Lemon chiffon
  sakura: '#FFCCCB',       // Light coral for sakura theme
  library: '#F5F5DC',      // Beige for library
  lab: '#E0FFFF',          // Light cyan for laboratory
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
    borderRadius: 8,
    boxShadow: '3px 3px 0px rgba(47, 47, 47, 0.3)',
    elevation: 4,
  },
  starButton: {
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.darkText,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    margin: 6,
    boxShadow: '2px 2px 0px rgba(47, 47, 47, 0.2)',
    elevation: 3,
  },
  powerUpButton: {
    backgroundColor: colors.blue,
    borderWidth: 2,
    borderColor: colors.darkText,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    margin: 6,
    boxShadow: '2px 2px 0px rgba(47, 47, 47, 0.2)',
    elevation: 3,
  },
  cuteButton: {
    backgroundColor: colors.sakura,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 5,
    boxShadow: '2px 2px 0px rgba(255, 182, 193, 0.4)',
    elevation: 3,
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
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
    fontSize: 10,
    color: colors.darkText,
    fontFamily: 'PressStart2P_400Regular',
    textAlign: 'center',
    lineHeight: 16,
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
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 12,
    padding: 18,
    marginVertical: 8,
    width: '100%',
    boxShadow: '3px 3px 6px rgba(255, 182, 193, 0.3)',
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
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    margin: 12,
    boxShadow: '3px 3px 6px rgba(255, 182, 193, 0.3)',
    elevation: 4,
  },
  star: {
    width: 35,
    height: 35,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.darkText,
    borderRadius: 18,
  },
  sakuraCharacter: {
    width: 120,
    height: 120,
    backgroundColor: colors.rose,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    boxShadow: '4px 4px 8px rgba(255, 182, 193, 0.4)',
    elevation: 5,
  },
  phaseContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 18,
  },
  phaseTitle: {
    fontSize: 16,
    fontFamily: 'PressStart2P_400Regular',
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: 25,
  },
  collectibleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  progressBar: {
    width: '100%',
    height: 24,
    backgroundColor: colors.grey,
    borderWidth: 2,
    borderColor: colors.darkText,
    borderRadius: 12,
    marginVertical: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 10,
  },
  libraryBackground: {
    backgroundColor: colors.library,
    borderWidth: 2,
    borderColor: colors.darkText,
    borderRadius: 15,
    padding: 20,
    margin: 10,
  },
  labBackground: {
    backgroundColor: colors.lab,
    borderWidth: 2,
    borderColor: colors.darkText,
    borderRadius: 15,
    padding: 20,
    margin: 10,
  },
});
