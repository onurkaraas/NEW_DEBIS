import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#1F2E35', // Green
  secondary: '#30444E', // Gray

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#eff2f5',
  gray: '#BEC1D2',
  green: '#25C685',
  green2: '#40DF9F',
  yellow: '#FFC542',
  red: '#FF575F',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 26,
  h2: 22,
  h3: 18,
  h4: 14,
  body1: 26,
  body2: 22,
  body3: 18,
  body4: 14,

  // app dimensions
  width,
  height,
};
export const SHADOWS = {
  shadow1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 12,
    elevation: 12,
  },
  input: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 12,
    elevation: 5,
  },
};
export const FONTS = {
  largeTitle: {
    fontFamily: "SF-Pro-Display",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "SF-Pro-Display-Bold", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "SF-Pro-Display-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "SF-Pro-Display-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: {
    fontFamily: "SF-Pro-Display-Medium",
    fontSize: SIZES.h4,
    lineHeight: 22,
  },
  body1: {
    fontFamily: "SF-Pro-Display-Medium",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "SF-Pro-Display-Medium",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "SF-Pro-Display-Medium",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "SF-Pro-Display-Medium",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};
export const LAYOUT = {
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  setFlex1: {
    flex: 1,
  },
  marginBottomNavigator: {
    marginBottom: Dimensions.get('window').height * 0.09,
  },
};
const appTheme = {COLORS, SIZES, SHADOWS, FONTS, LAYOUT};

export default appTheme;
