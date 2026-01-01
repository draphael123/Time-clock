# Firebase Setup for Live Chat

The live chat feature uses Firebase Realtime Database for real-time messaging. Follow these steps to set it up:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `world-clock-chat` (or any name you prefer)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Realtime Database

1. In your Firebase project, go to **Build** → **Realtime Database**
2. Click "Create Database"
3. Choose a location (select closest to your users)
4. Start in **Test Mode** (for development)
5. Click "Enable"

## Step 3: Set Database Rules

1. Go to **Realtime Database** → **Rules** tab
2. Replace the rules with:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": true,
      ".indexOn": ["timestamp"]
    }
  }
}
```

3. Click "Publish"

**Note:** These rules allow anyone to read/write. For production, you should add authentication.

## Step 4: Get Your Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web icon** (`</>`)
4. Register your app (nickname: "World Clock Chat")
5. Copy the Firebase configuration object

## Step 5: Add Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Step 6: Add to Vercel (for Production)

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add each variable from `.env.local`
4. Redeploy your site

## Alternative: Use Without Firebase

The chat will work in "offline mode" using localStorage if Firebase is not configured. However, this means:
- Messages only appear for the current user
- No real-time updates
- Messages are stored locally only

## Security Notes

For production, consider:
1. Adding Firebase Authentication
2. Restricting database rules based on authentication
3. Adding message moderation
4. Limiting message length and rate

## Testing

1. Open your website in two different browsers/incognito windows
2. Enter different usernames
3. Send messages from both windows
4. You should see messages appear in real-time in both windows!

## Troubleshooting

- **"Firebase not initialized"**: Check that environment variables are set correctly
- **Messages not appearing**: Check Firebase console for errors, verify database rules
- **Connection issues**: Ensure database is in the correct region and rules allow read/write

