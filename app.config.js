export default {
  expo: {
    name: "Impulse-app",
    slug: "Impulse-app",
    version: "2.0.0",
    orientation: "portrait",
    icon: "./assets/icons/appLogoIcon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "org.reactjs.native.example.Impluse",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./google-services.json"
    },
    ios: {
      googleServicesFile: process.env.GOOGLE_SERVICES_PLIST || "./GoogleService-Info.plist",
      bundleIdentifier: "org.reactjs.native.example.Impluse",
      supportsTablet: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSCameraUsageDescription: "This app needs access to the camera to take photos.",
        NSPhotoLibraryAddUsageDescription: "We need access to save photos to your camera roll.",
        NSPhotoLibraryUsageDescription: "This app needs access to your photo library to select pictures.",
        NSAppTransportSecurity: {
          NSExceptionDomains: process.env.API_AWS_URL ? {
            [new URL(process.env.API_AWS_URL).hostname]: {
              NSExceptionAllowsInsecureHTTPLoads: true,
              NSExceptionMinimumTLSVersion: "1.0",
              NSExceptionRequiresForwardSecrecy: false,
              NSIncludesSubdomains: true
            }
          } : {}
        }
      }
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-firebase/crashlytics",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
            modular_headers: true
          }
        }
      ],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "4f8ddc48-ae35-499a-9b71-c215c3ec1687"
      },
      API_ENV: process.env.API_ENV,
      API_AWS_URL: process.env.API_AWS_URL,
      API_LOCAL_URL: process.env.API_LOCAL_URL,
      MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN
    },
    owner: "williamwangimpulse"
  }
};
