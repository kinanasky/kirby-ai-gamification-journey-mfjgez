
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Nintendo Wii Color Palette
export const colors = {
  // Wii Primary Colors
  wiiBlue: '#4A90E2',        // Wii channel blue
  wiiLightBlue: '#87CEEB',   // Light blue accents
  wiiWhite: '#FFFFFF',       // Pure white
  wiiGray: '#F5F5F5',        // Light gray background
  wiiDarkGray: '#CCCCCC',    // Darker gray for borders
  wiiSilver: '#E8E8E8',      // Silver metallic
  
  // Accent Colors (Wii style)
  wiiGreen: '#7ED321',       // Bright green
  wiiOrange: '#F5A623',      // Warm orange
  wiiRed: '#D0021B',         // Alert red
  wiiPurple: '#9013FE',      // Purple accent
  wiiYellow: '#F8E71C',      // Bright yellow
  
  // Text Colors
  wiiTextDark: '#333333',    // Dark text
  wiiTextLight: '#666666',   // Light text
  wiiTextBlue: '#4A90E2',    // Blue text
  
  // Legacy colors for compatibility
  primary: '#4A90E2',
  secondary: '#87CEEB',
  accent: '#F8E71C',
  background: '#F5F5F5',
  backgroundAlt: '#FFFFFF',
  text: '#333333',
  grey: '#CCCCCC',
  card: '#FFFFFF',
  green: '#7ED321',
  red: '#D0021B',
  purple: '#9013FE',
  orange: '#F5A623',
  yellow: '#F8E71C',
  darkText: '#333333',
  blue: '#4A90E2',
  mint: '#E8F5E8',
  coral: '#FFE4B5',
  rose: '#FFE4E1',
  sky: '#87CEEB',
  cream: '#FFFACD',
};

export const buttonStyles = StyleSheet.create({
  // Wii Channel Style Button
  wiiChannelButton: {
    backgroundColor: colors.wiiWhite,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 5,
    minWidth: 120,
    minHeight: 80,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  
  // Wii Menu Button (smaller)
  wiiMenuButton: {
    backgroundColor: colors.wiiWhite,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  
  // Wii Action Button (colored)
  wiiActionButton: {
    backgroundColor: colors.wiiBlue,
    borderWidth: 1,
    borderColor: colors.wiiBlue,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    boxShadow: '0px 3px 6px rgba(74, 144, 226, 0.3)',
    elevation: 3,
  },
  
  // Legacy buttons for compatibility
  instructionsButton: {
    backgroundColor: colors.wiiWhite,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    borderRadius: 8,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  backButton: {
    backgroundColor: colors.wiiGray,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    borderRadius: 8,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  pixelButton: {
    backgroundColor: colors.wiiWhite,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  starButton: {
    backgroundColor: colors.wiiYellow,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 5,
    boxShadow: '0px 2px 4px rgba(248, 231, 28, 0.3)',
    elevation: 2,
  },
  powerUpButton: {
    backgroundColor: colors.wiiBlue,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 5,
    boxShadow: '0px 2px 4px rgba(74, 144, 226, 0.3)',
    elevation: 2,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.wiiGray,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.wiiGray,
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
  
  // Wii Style Title
  wiiTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.wiiTextDark,
    marginBottom: 15,
    fontFamily: 'Nunito_700Bold',
    letterSpacing: 1,
  },
  
  // Wii Style Subtitle
  wiiSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.wiiTextLight,
    marginBottom: 10,
    fontFamily: 'Nunito_600SemiBold',
  },
  
  // Wii Style Body Text
  wiiText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.wiiTextDark,
    marginBottom: 8,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },
  
  // Wii Channel Grid
  wiiChannelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  
  // Wii Channel Item
  wiiChannelItem: {
    backgroundColor: colors.wiiWhite,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    borderRadius: 12,
    width: 100,
    height: 100,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  
  // Legacy styles for compatibility
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.wiiTextDark,
    marginBottom: 10,
    fontFamily: 'PressStart2P_400Regular',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.wiiTextDark,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },
  pixelText: {
    fontSize: 10,
    color: colors.wiiTextDark,
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
    backgroundColor: colors.wiiWhite,
    borderColor: colors.wiiDarkGray,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.wiiBlue,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: colors.wiiGray,
    padding: 20,
  },
  dialogBox: {
    backgroundColor: colors.wiiWhite,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    borderRadius: 12,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  star: {
    width: 30,
    height: 30,
    backgroundColor: colors.wiiYellow,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    borderRadius: 15,
  },
  sakuraCharacter: {
    width: 100,
    height: 100,
    backgroundColor: colors.wiiWhite,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.wiiDarkGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  phaseContainer: {
    flex: 1,
    backgroundColor: colors.wiiGray,
    padding: 15,
  },
  phaseTitle: {
    fontSize: 16,
    fontFamily: 'PressStart2P_400Regular',
    color: colors.wiiTextDark,
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
    backgroundColor: colors.wiiDarkGray,
    borderWidth: 1,
    borderColor: colors.wiiTextLight,
    borderRadius: 10,
    marginVertical: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.wiiBlue,
    borderRadius: 9,
  },
});
