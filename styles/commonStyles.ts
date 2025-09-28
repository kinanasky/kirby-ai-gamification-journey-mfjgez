
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FFB6C1',      // Light pink like sakura
  secondary: '#E6E6FA',    // Lavender
  accent: '#FFD700',       // Gold for stars
  background: '#FFF5F8',   // Very soft pink background
  backgroundAlt: '#FFF0F5', // Lavender blush
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
  coral: '#F0E68C',        // Khaki
  rose: '#FFE4E1',         // Misty rose
  sky: '#87CEEB',          // Sky blue
  cream: '#FFFACD',        // Lemon chiffon
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
    borderWidth: 2,
    borderColor: colors.darkText,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  starButton: {
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.darkText,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 5,
    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 1,
  },
  powerUpButton: {
    backgroundColor: colors.blue,
    borderWidth: 2,
    borderColor: colors.darkText,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 5,
    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 1,
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
    borderColor: colors.darkText,
    borderWidth: 2,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    width: '100%',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
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
    borderRadius: 8,
    padding: 15,
    margin: 10,
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  star: {
    width: 30,
    height: 30,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.darkText,
    borderRadius: 15,
  },
  sakuraCharacter: {
    width: 100,
    height: 100,
    backgroundColor: colors.rose,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  phaseContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 15,
  },
  phaseTitle: {
    fontSize: 16,
    fontFamily: 'PressStart2P_400Regular',
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: 20,
  },
  collectibleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: colors.grey,
    borderWidth: 2,
    borderColor: colors.darkText,
    borderRadius: 10,
    marginVertical: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 8,
  },
});
