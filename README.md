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
├── components/                  # Reusable UI components
│   ├── screens/                 # Full-screen components for each page in routing
│   ├── features/                # Feature-specific components
│   └── ui/                      # UI components (being migrated)
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

Copy the environment template and configure your local environment:
```bash
cp env.example .env
```

The `.env` file should contain:
```env
# API Configuration (all required - no defaults)
API_ENV=aws
API_AWS_URL=http://18.191.234.29:3000/graphql
API_LOCAL_URL=http://localhost:3000/graphql

# Mixpanel Configuration (private - required)
MIXPANEL_TOKEN=431de022b60e0c270c405468c11ac4f3

# Google Services Files (for local development)
GOOGLE_SERVICES_JSON=./google-services.json
GOOGLE_SERVICES_PLIST=./GoogleService-Info.plist
```

**Important**: All environment variables are required. The app will not work without proper configuration. API URLs and Mixpanel token are kept private for security reasons and are not exposed in the app bundle.

**Note**: The values shown above are examples. You must obtain the actual values from the project maintainer.

### 4. Firebase Configuration

**Important**: You need to obtain the Firebase configuration files from the project maintainer:

- `GoogleService-Info.plist` (for iOS)
- `google-services.json` (for Android)

These files contain sensitive API keys and are not committed to the repository for security reasons.

**To get these files:**
1. Contact the project maintainer
2. Or download them from the Firebase console (if you have access to the project)
3. Place them in the root directory of the project

**Note**: The Firebase project ID is `quizdemov1` with bundle ID `org.reactjs.native.example.Impluse`.

### 5. Starting the App

**For local development (no EAS required):**
```bash
# Start Expo development server
npx expo start

# Run on specific platforms
npx expo run:ios --device        # iOS Device
npx expo run:ios                 # iOS Simulator
npx expo run:android             # Android Emulator
```

**Note**: For local development, you only need the `.env` file and GoogleService-Info files. EAS is only required for production builds.

### 6. Test Account
For quick testing, you can use these credentials:
- **Email**: test@test.com
- **Password**: test1234

## Building for Production

### EAS Build Setup
The project uses EAS Build for production builds. **Note**: EAS is only required for production builds, not local development.

**Setup for EAS builds:**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for production
eas build --platform ios
eas build --platform android
```

**Environment Variables for EAS:**
The project uses EAS secrets for sensitive configuration during builds. The following environment variables are configured in EAS:
- `GOOGLE_SERVICES_JSON` - Android Firebase configuration
- `GOOGLE_SERVICES_PLIST` - iOS Firebase configuration
- `API_ENV` - API environment (private)
- `API_AWS_URL` - AWS API endpoint (private)
- `API_LOCAL_URL` - Local API endpoint (private)
- `MIXPANEL_TOKEN` - Mixpanel analytics token (private)

**Note**: EAS secrets are managed by the project maintainer and are automatically injected during builds. Private variables are not exposed in the app bundle for security.

## Git Workflow

### Branching Strategy
- `main` - Production-ready code
- `feature-development` - Integration branch for features
- `individual-feature-name` - Individual feature branches

### Development Process
**IMPORTANT: Always start by switching to the right branch and pulling latest changes**

**Note**: Replace `[branch-name]` with the actual branch you're working on.

1. Switch to the branch you're working on and pull latest:
   ```bash
   git checkout [branch-name]
   git pull origin [branch-name]
   ```
cl
2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "your commit message"
   git push origin [branch-name]
   ```

### Basic Workflow Git Commands
```bash
# See all available branches
git branch -a

# Switch branches
git checkout branch-name

# Pull latest changes
git pull origin branch-name

# Stage and commit changes
git add .
git commit -m "your message"

# Push to remote
git push origin branch-name
```

### Other Git Commands
```bash
# See what files you've changed
git status

# See what changes you made
git diff

# Undo changes to a specific file (if you mess up)
git checkout -- filename.tsx

# Create and switch to new branch
git checkout -b feature/new-feature

# Stash changes temporarily
git stash
git stash pop
```

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Apollo GraphQL Documentation](https://www.apollographql.com/docs/)

