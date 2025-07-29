import {
  JosefinSans_100Thin,
  JosefinSans_200ExtraLight,
  JosefinSans_300Light,
  JosefinSans_400Regular,
  JosefinSans_500Medium,
  JosefinSans_600SemiBold,
  JosefinSans_700Bold,
  JosefinSans_100Thin_Italic,
  JosefinSans_200ExtraLight_Italic,
  JosefinSans_300Light_Italic,
  JosefinSans_400Regular_Italic,
  JosefinSans_500Medium_Italic,
  JosefinSans_600SemiBold_Italic,
  JosefinSans_700Bold_Italic,
} from '@expo-google-fonts/josefin-sans';

export const josefinSansFonts = {
  JosefinSans_100Thin,
  JosefinSans_200ExtraLight,
  JosefinSans_300Light,
  JosefinSans_400Regular,
  JosefinSans_500Medium,
  JosefinSans_600SemiBold,
  JosefinSans_700Bold,
  JosefinSans_100Thin_Italic,
  JosefinSans_200ExtraLight_Italic,
  JosefinSans_300Light_Italic,
  JosefinSans_400Regular_Italic,
  JosefinSans_500Medium_Italic,
  JosefinSans_600SemiBold_Italic,
  JosefinSans_700Bold_Italic,
};

export const fonts = {
  thin: "JosefinSans_100Thin",
  extraLight: "JosefinSans_200ExtraLight",
  light: "JosefinSans_300Light",
  regular: "JosefinSans_400Regular",
  medium: "JosefinSans_500Medium",
  semiBold: "JosefinSans_600SemiBold",
  bold: "JosefinSans_700Bold",
  thinItalic: "JosefinSans_100Thin_Italic",
  extraLightItalic: "JosefinSans_200ExtraLight_Italic",
  lightItalic: "JosefinSans_300Light_Italic",
  regularItalic: "JosefinSans_400Regular_Italic",
  mediumItalic: "JosefinSans_500Medium_Italic",
  semiBoldItalic: "JosefinSans_600SemiBold_Italic",
  boldItalic: "JosefinSans_700Bold_Italic",
};

export const getFontStyle = (
  weight: 'thin' | 'extraLight' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' = 'medium',
  italic = false
) => {
  const fontMap = {
    thin: italic ? fonts.thinItalic : fonts.thin,
    extraLight: italic ? fonts.extraLightItalic : fonts.extraLight,
    light: italic ? fonts.lightItalic : fonts.light,
    regular: italic ? fonts.regularItalic : fonts.regular,
    medium: italic ? fonts.mediumItalic : fonts.medium,
    semiBold: italic ? fonts.semiBoldItalic : fonts.semiBold,
    bold: italic ? fonts.boldItalic : fonts.bold,
  };

  return {
    fontFamily: fontMap[weight],
  };
};
