<!-- Animated Banner -->
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=250&section=header&text=XY%20Combinator&fontSize=80&fontAlignY=35&desc=The%20Future%20of%20Video%20Conferencing&descAlignY=55&descAlign=62&fontColor=ffffff&animation=twinkling" alt="XY Combinator Banner" width="100%" />
</div>

<!-- Typing Tagline -->
<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Outfit&weight=800&size=26&duration=4000&pause=1000&color=3ECF8E&center=true&vCenter=true&width=800&lines=Seamless+Peer-to-Peer+Video.;End-to-End+Encrypted+Connections.;Zero+Downloads.+Zero+Friction.;The+World's+Best+Teams+Meet+On+XY." alt="Typing SVG" />
  </a>
</div>

<!-- Badges Row -->
<div align="center">
  <img src="https://img.shields.io/github/license/professyzenith/XY-Combinator?style=for-the-badge&color=111111" alt="License">
  <img src="https://img.shields.io/github/stars/professyzenith/XY-Combinator?style=for-the-badge&color=FFD700" alt="Stars">
  <img src="https://img.shields.io/github/forks/professyzenith/XY-Combinator?style=for-the-badge&color=0055FF" alt="Forks">
  <img src="https://img.shields.io/github/issues/professyzenith/XY-Combinator?style=for-the-badge&color=FF6B6B" alt="Issues">
</div>

<!-- Animated Divider -->
<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="Divider">
</div>

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

<!-- Animated Divider -->
<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="Divider">
</div>

## Features

<table align="center">
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ Instant P2P Rooms</h3>
      <p>Drop a link and join immediately. No native apps, no endless setup wizards. Built for modern browsers using raw WebRTC power.</p>
    </td>
    <td width="50%" align="center">
      <img src="https://img.shields.io/badge/Feature_Showcase-Coming_Soon-111111?style=for-the-badge&logo=youtube&logoColor=3ECF8E" alt="Demo Coming Soon" />
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="https://img.shields.io/badge/Authentication_Demo-Coming_Soon-111111?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Auth Coming Soon" />
    </td>
    <td width="50%" valign="top">
      <h3>🔐 Glassmorphic Auth</h3>
      <p>Beautiful, ambient animated login screens powered by Supabase Google OAuth and seamless magic links.</p>
    </td>
  </tr>
</table>

## Architecture

```mermaid
graph TD;
    Client1["Client Browser"] <-->|"WebRTC P2P Video/Audio"| Client2["Client Browser"];
    Client1 -->|"Signaling (Offer/Answer)"| SupabaseRealtime;
    Client2 -->|"Signaling (Offer/Answer)"| SupabaseRealtime;
    SupabaseRealtime(("Supabase Realtime Channels")) --> DB[("PostgreSQL DB")];
    Client1 -.->|"OAuth / Auth"| SupabaseAuth;
    Client2 -.->|"OAuth / Auth"| SupabaseAuth;
    
    style Client1 fill:#242528,stroke:#3ECF8E,stroke-width:2px,color:#fff
    style Client2 fill:#242528,stroke:#3ECF8E,stroke-width:2px,color:#fff
    style SupabaseRealtime fill:#3ECF8E,stroke:#242528,stroke-width:2px,color:#111
    style DB fill:#000,stroke:#3ECF8E,stroke-width:2px,color:#fff
    style SupabaseAuth fill:#000,stroke:#3ECF8E,stroke-width:2px,color:#fff
```

## Tech Stack

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,supabase,vercel,html,css,git,github,vscode,figma&theme=dark&perline=6" alt="Tech Stack Icons" />
  </a>
</div>

<br/>

**Feature Completion Status:**
- Base Architecture & Routing <br/> <img src="https://img.shields.io/badge/Progress-100%25-3ECF8E?style=for-the-badge" alt="100% Complete" />
- WebRTC P2P Video Engine <br/> <img src="https://img.shields.io/badge/Progress-100%25-3ECF8E?style=for-the-badge" alt="100% Complete" />
- Google OAuth Integration <br/> <img src="https://img.shields.io/badge/Progress-100%25-3ECF8E?style=for-the-badge" alt="100% Complete" />
- Live Chat & Screen Share <br/> <img src="https://img.shields.io/badge/Progress-15%25-FFD700?style=for-the-badge" alt="15% Complete" />

## Setup & Installation

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

## Roadmap

- [x] **P2P Video Core:** Core engine setup.
- [x] **Supabase Auth:** Google Sign-in integration.
- [ ] **Screen Sharing:** High resolution screen casting.
- [ ] **Live Text Chat:** Realtime WebSocket messaging inside rooms.
- [ ] **Cloud Recording:** Instantly record and save to Supabase Storage.

## Contributing

<details>
<summary><b>Want to contribute? Click here!</b></summary>
We welcome contributions! Please open an issue first to discuss what you would like to change.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
</details>

<br/>

<!-- Animated Divider -->
<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="Divider">
</div>

<div align="center">
  <p><b>Built with passion.</b></p>
</div>
