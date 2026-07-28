<!-- Banner -->
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=111111&height=300&section=header&text=XY%20Combinator&fontSize=90&fontAlignY=35&desc=The%20Future%20of%20Video%20Conferencing&descAlignY=55&descAlign=62&fontColor=ffffff&animation=fadeIn" alt="XY Combinator Banner" />
</div>

<!-- Typing Tagline -->
<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Outfit&weight=800&size=28&duration=4000&pause=1000&color=3ECF8E&center=true&vCenter=true&width=800&lines=Seamless+Peer-to-Peer+Video.;End-to-End+Encrypted+Connections.;Zero+Downloads.+Zero+Friction.;The+World's+Best+Teams+Meet+On+XY." alt="Typing SVG" />
  </a>
</div>

<!-- Badges Row -->
<div align="center">
  <img src="https://img.shields.io/github/license/professyzenith/XY-Combinator?style=for-the-badge&color=3ECF8E" alt="License">
  <img src="https://img.shields.io/github/stars/professyzenith/XY-Combinator?style=for-the-badge&color=FFD700" alt="Stars">
  <img src="https://img.shields.io/github/forks/professyzenith/XY-Combinator?style=for-the-badge&color=0055FF" alt="Forks">
  <img src="https://img.shields.io/github/issues/professyzenith/XY-Combinator?style=for-the-badge&color=FF6B6B" alt="Issues">
</div>

<!-- Animated Divider -->
<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%">
</div>

## 📑 Table of Contents
- [✨ Features](#-features)
- [🏗 Architecture](#-architecture)
- [💻 Tech Stack](#-tech-stack)
- [🚀 Setup & Installation](#-setup--installation)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📬 Contact](#-contact)

<!-- Animated Divider -->
<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%">
</div>

## ✨ Features

<table align="center">
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ Instant P2P Rooms</h3>
      <p>Drop a link and join immediately. No native apps, no endless setup wizards. Built for modern browsers using raw WebRTC power.</p>
    </td>
    <td width="50%" align="center">
      <!-- Placeholder GIF -->
      <img src="https://i.pinimg.com/originals/c7/2b/30/c72b304c44243bdf4c32b55da6decfdc.gif" width="100%" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" alt="Instant Rooms UI" />
      <br/><i>*(Replace with your screen recording GIF!)*</i>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <!-- Placeholder GIF -->
      <img src="https://i.pinimg.com/originals/a4/96/c2/a496c2b6bc5d7cfe0e0674f6598c38ad.jpg" width="100%" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" alt="Glassmorphic Auth" />
      <br/><i>*(Replace with your screen recording GIF!)*</i>
    </td>
    <td width="50%" valign="top">
      <h3>🔐 Glassmorphic Auth</h3>
      <p>Beautiful, ambient animated login screens powered by Supabase Google OAuth and seamless magic links.</p>
    </td>
  </tr>
</table>

## 🏗 Architecture

```mermaid
graph TD;
    Client1[Client Browser] <-->|WebRTC P2P Video/Audio| Client2[Client Browser];
    Client1 -->|Signaling (Offer/Answer)| SupabaseRealtime;
    Client2 -->|Signaling (Offer/Answer)| SupabaseRealtime;
    SupabaseRealtime((Supabase Realtime Channels)) --> DB[(PostgreSQL DB)];
    Client1 -.->|OAuth / Auth| SupabaseAuth;
    Client2 -.->|OAuth / Auth| SupabaseAuth;
    
    style Client1 fill:#242528,stroke:#3ECF8E,stroke-width:2px,color:#fff
    style Client2 fill:#242528,stroke:#3ECF8E,stroke-width:2px,color:#fff
    style SupabaseRealtime fill:#3ECF8E,stroke:#242528,stroke-width:2px,color:#111
    style DB fill:#000,stroke:#3ECF8E,stroke-width:2px,color:#fff
    style SupabaseAuth fill:#000,stroke:#3ECF8E,stroke-width:2px,color:#fff
```

## 💻 Tech Stack

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,supabase,vercel,html,css,git,github,vscode,figma&theme=dark&perline=6" />
  </a>
</div>

<br/>

**Feature Completion Status:**
- Base Architecture & Routing <br/> <img src="https://progress-bar.dev/100/?scale=100&title=Complete&width=400&color=3ECF8E&suffix=%25"/>
- WebRTC P2P Video Engine <br/> <img src="https://progress-bar.dev/100/?scale=100&title=Complete&width=400&color=3ECF8E&suffix=%25"/>
- Google OAuth Integration <br/> <img src="https://progress-bar.dev/100/?scale=100&title=Complete&width=400&color=3ECF8E&suffix=%25"/>
- Live Chat & Screen Share <br/> <img src="https://progress-bar.dev/15/?scale=100&title=In-Progress&width=400&color=FFD700&suffix=%25"/>

## 🚀 Setup & Installation

<details>
<summary><b>Click to expand setup instructions 🛠️</b></summary>

### 1. Clone the repository
```bash
git clone https://github.com/professyzenith/XY-Combinator.git
cd XY-Combinator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file and add your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Ignite the Engines
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to enter the dashboard.
</details>

## 🗺 Roadmap

- [x] **P2P Video Core:** Core engine setup.
- [x] **Supabase Auth:** Google Sign-in integration.
- [ ] **Screen Sharing:** High resolution screen casting.
- [ ] **Live Text Chat:** Realtime WebSocket messaging inside rooms.
- [ ] **Cloud Recording:** Instantly record and save to Supabase Storage.

## 🤝 Contributing

<details>
<summary><b>Want to contribute? Click here!</b></summary>
We welcome contributions! Please open an issue first to discuss what you would like to change.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
</details>

## 📬 Contact

<div align="center">
  <a href="https://twitter.com/professyzenith"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"></a>
  <a href="https://linkedin.com/in/professyzenith"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="mailto:hello@example.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</div>

<br/>

<!-- Animated Divider -->
<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%">
</div>

## ⭐ Star History

<div align="center">
  <a href="https://star-history.com/#professyzenith/XY-Combinator&Date">
    <img src="https://api.star-history.com/svg?repos=professyzenith/XY-Combinator&type=Date" alt="Star History Chart">
  </a>
</div>

<br/>

<div align="center">
  <!-- Requires GitHub Action setup -->
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/professyzenith/XY-Combinator/output/github-contribution-grid-snake-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/professyzenith/XY-Combinator/output/github-contribution-grid-snake.svg">
    <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/professyzenith/XY-Combinator/output/github-contribution-grid-snake.svg">
  </picture>
  <br/><br/>
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand%20Medium-Light%20Skin%20Tone.png" width="35" />
  <p><b>Built with passion.</b></p>
</div>
