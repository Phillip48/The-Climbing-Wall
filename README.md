# The Climbing Wall

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.0.0-blue.svg" />
  <img alt="Platform" src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg" />
  <img alt="Built with Expo" src="https://img.shields.io/badge/built%20with-Expo-000020.svg?logo=expo" />
  <img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
</p>

A mobile app for climbers to track projects, log sends, plan training sessions, and analyze progression — all stored locally on your device with no account or cloud required.

[**Try the live demo →**](https://theclimbingwall.phillippereira.com)

---

## Features

### Projects & Sends
- Log climbing projects with grade, wall type, hold type, attempt count, session count, and notes
- Attach video recordings and auto-generated thumbnails to any climb
- Mark a project as sent to automatically convert it to a send and update your max grade
- Track warmup climbs separately so they don't skew your stats

### Training Log
- Record training sessions by type: Max Strength, Power Endurance, Endurance, Technique, or Off-Wall Conditioning
- Choose from a curated drill list per session type (4x4s, ARC Training, Limit Bouldering, Quiet Feet, and more)
- Add notes per session to track what worked

### Stats & Progression
- Personal bests for bouldering (V-scale) and top rope (5.x) updated automatically
- Send totals, attempt counts, and project completion rate
- Grade trend graph across the last 3 months
- Heatmap showing days climbed

### Climbing Diary
- Daily diary entries linked to the sends logged that day
- Browse back through any date to review what you climbed

### AI Coaching *(optional)*
- **Session Coach** — recommends a session focus and drill based on your recent logs
- **Progression Insights** — analyzes your grade trend, wall type bias, and completion rate to give honest feedback
- Powered by your own API key (Anthropic Claude, OpenAI, or Groq) — no key is stored by the app beyond your device
- Beginners automatically receive volume-first advice rather than advanced drill recommendations

### Privacy First
- All data lives in a local SQLite database on your device
- No account required, no cloud sync, no data leaves your phone (except optional AI calls using your own key)
- Export and restore your database manually at any time

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native via [Expo](https://expo.dev) (SDK 51) |
| Navigation | [expo-router](https://expo.github.io/router) (file-based) |
| Database | SQLite via [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) |
| Styling | [NativeWind](https://www.nativewind.dev) (Tailwind CSS for RN) |
| Media | expo-image-picker, expo-video, expo-video-thumbnails |
| AI (optional) | Anthropic Claude, OpenAI, Groq |

---

## Running Locally

**Prerequisites:** Node.js 18+, Expo CLI, iOS Simulator or Android Emulator (or the Expo Go app on a physical device).

```bash
# Install dependencies
npm install

# Start the dev server
npm start

# Run on a specific platform
npm run ios
npm run android
```

To run on a physical device, scan the QR code in the terminal with the [Expo Go](https://expo.dev/go) app.

---

## Author

**Phillip Pereira**
- GitHub: [@Phillip48](https://github.com/Phillip48)
- Website: [theclimbingwall.phillippereira.com](https://theclimbingwall.phillippereira.com)
