const fs = require('fs');
const path = require('path');

module.exports = {
  async prebuildAsync(options) {
    console.log(' Starting pre-build hook...');
    console.log('📱 Platform:', options.platform);
    
    // Only run for iOS builds
    if (options.platform !== 'ios') {
      console.log('⏭️  Skipping for non-iOS platform');
      return;
    }
    
    // Check for the EAS environment variable first
    const easGoogleServicesPath = process.env.GOOGLE_SERVICES_IOS;
    
    let sourcePath;
    if (easGoogleServicesPath && fs.existsSync(easGoogleServicesPath)) {
      console.log('📁 Using EAS environment variable path:', easGoogleServicesPath);
      sourcePath = easGoogleServicesPath;
    } else {
      // Fallback to local file
      sourcePath = path.join(__dirname, '..', 'GoogleService-Info.plist');
      console.log('📁 Using local file path:', sourcePath);
    }
    
    // Multiple possible target paths
    const targetPaths = [
      path.join(__dirname, '..', 'ios', 'Impulseapp', 'GoogleService-Info.plist'),
      path.join(__dirname, '..', 'ios', 'GoogleService-Info.plist'),
      path.join(__dirname, '..', 'ios', 'Impulseapp.xcodeproj', 'GoogleService-Info.plist')
    ];
    
    console.log('📁 Source path:', sourcePath);
    
    if (fs.existsSync(sourcePath)) {
      console.log('✅ Source file exists');
      
      // Read and verify the source file content
      const sourceContent = fs.readFileSync(sourcePath, 'utf8');
      if (sourceContent.includes('GOOGLE_APP_ID')) {
        console.log('✅ Source file contains GOOGLE_APP_ID');
        
        // Extract and log the GOOGLE_APP_ID for debugging
        const match = sourceContent.match(/<key>GOOGLE_APP_ID<\/key>\s*<string>([^<]+)<\/string>/);
        if (match) {
          console.log('🔑 GOOGLE_APP_ID found:', match[1]);
        }
      } else {
        console.error('❌ Source file does not contain GOOGLE_APP_ID');
        process.exit(1);
      }
      
      // Copy to all target paths
      targetPaths.forEach(targetPath => {
        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
          console.log('📁 Creating target directory:', targetDir);
          fs.mkdirSync(targetDir, { recursive: true });
        }
        
        fs.copyFileSync(sourcePath, targetPath);
        console.log('✅ Copied to:', targetPath);
        
        // Verify the copy worked
        if (fs.existsSync(targetPath)) {
          const targetContent = fs.readFileSync(targetPath, 'utf8');
          if (targetContent.includes('GOOGLE_APP_ID')) {
            console.log('✅ Verified copy contains GOOGLE_APP_ID');
          } else {
            console.error('❌ Copy does not contain GOOGLE_APP_ID');
          }
        } else {
          console.error('❌ Copy failed for:', targetPath);
        }
      });
      
    } else {
      console.error('❌ GoogleService-Info.plist not found');
      console.error('❌ Checked paths:');
      if (easGoogleServicesPath) {
        console.error('   - EAS env var:', easGoogleServicesPath);
      }
      console.error('   - Local file:', sourcePath);
      process.exit(1);
    }
  }
};
