# Impulse App

## Architecture

### Overview
- **Frontend**: React Native + Expo
- **Navigation**: Expo Router
- **State Management**: React Context
- **API**: GraphQL (AWS)
- **Auth**: Firebase
- **Photo Storage**: Firebase Storage
- **Chat**: WebSocket + GraphQL subscriptions with Gifted Chat UI

### Project Structure
```
Impulse-app/
├── app/                         # Main application screens (Expo Router)
│   ├── (auth)/                  # Authentication flow screens
│   ├── (tabs)/                  # Main tab navigation screens
│   ├── community/               # Screens for individual communities
│   ├── user/                    # Screens for individual user profiles
│   └── post/                    # Screens for individual posts
├── components/                  # Reusable UI components (kind of a mess right now)
│   ├── screens/                 # Screen-specific components
│   └── ui/                      # Common (smaller?) UI components
├── contexts/                    # React Context providers
│   ├── AuthContext.tsx          # User authentication state
│   ├── DataProviderContext.tsx  # Global data management
│   └── SignupContext.tsx        # User registration flow
├── hooks/                       # GraphQL queries/mutations and WebSocket hooks
├── services/                    # Just GraphQL client setup for now
├── config/                      # Firebase and API configs
├── utils/                       # Various helper functions
└── assets/                      # Images, fonts, and icons
```

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**
- **bun** or **npm**/**yarn**
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Impulse-app
```

### 2. Install Dependencies
```bash
# Using bun
bun install

# Or using npm
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:
```bash
API_ENV=aws
API_AWS_URL=http://18.191.234.29:3000/graphql
API_LOCAL_URL=http://localhost:3000/graphql
```

### 4. Starting the App
```bash
# Start Expo development server
npx expo start

# Run on specific platforms
npx expo run:ios        # iOS Simulator
npx expo run:android    # Android Emulator
```

### 5. Test Account
For quick testing, you can use these credentials:
- **Email**: test@test.com
- **Password**: test1234

## Building for Production

### EAS Build
The project uses EAS Build for production builds:

```bash
# Login to Expo
eas login

# Build for production
eas build --platform ios
eas build --platform android
```

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Apollo GraphQL Documentation](https://www.apollographql.com/docs/)

