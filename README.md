# RuOK - Hybrid Safety App

RuOK is a mobile personal safety application designed for students living away from home. The app addresses the challenge of balancing **everyday privacy** with **rapid emergency response**, allowing users to stay independent while ensuring trusted contacts can be notified when necessary.

Built with **React Native (Expo)** for the BCOK course (Assignment 3).

---

## Overview

Traditional safety apps often require continuous location tracking, which can feel invasive during normal daily use. RuOK introduces a **hybrid safety model**:

- **Privacy-first during normal commuting**
- **Immediate override during emergencies**
- **Automatic escalation when users become unresponsive**

This approach ensures both **user autonomy** and **fail-safe protection**.

---

## MVP Features

### 1. Smart Check-in

Users can set an estimated travel time (ETA) when heading home.

- Runs silently in the background
- Sends only a simple status update such as **"Heading home"**
- Does **not** continuously track GPS
- Preserves privacy during normal use

### 2. Emergency SOS

Users can instantly trigger emergency mode by:

- Pressing the **hardware button 3 times**
- Tapping the **SOS button on screen**

Once activated, the app immediately:

- Overrides privacy mode
- Shares **live GPS location**
- Starts **audio recording**
- Sends alerts to trusted contacts

### 3. Fail-safe Logic

If the check-in timer expires and the user does not confirm safe arrival, the system automatically escalates to emergency mode.

This protects users in situations where they may be unable to manually trigger SOS.

### 4. Trusted Contacts

Users can maintain a list of trusted contacts who will receive:

- Emergency notifications
- Live location updates
- Alert calls or messages

---

## Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript / JavaScript
- **Package Manager:** npm
- **Version Control:** Git + GitHub
- **Design Prototype:** Figma

---

## Installation

### Prerequisites

Make sure the following tools are installed:

- **Node.js** (LTS version recommended)
- **Expo Go** on your mobile device

### Clone the Repository

```bash
git clone https://github.com/BNATT-RuOK/bcok-mobile-app-assignment3.git
cd bcok-mobile-app-assignment3
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npx expo start
```

### Run on Device

1. Connect your phone and computer to the same Wi-Fi network
2. Open **Expo Go**
3. Scan the QR code from the terminal
4. Wait for the bundle to finish loading

Hot Reload is enabled for real-time development.

---

## Project Resources

- **Landing Page:** [https://bnatt-ruok.github.io/bcok-landing-page-assignment2/](https://bnatt-ruok.github.io/bcok-landing-page-assignment2/)
- **Figma Prototype:** TBD

---

## Git Workflow

### Commit Convention

This project follows the **Conventional Commits** standard.

```bash
<type>[optional scope]: <description>
```

Supported types:

- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation changes
- `style` — formatting only
- `refactor` — code restructuring
- `perf` — performance improvement
- `test` — test updates
- `chore` — tooling and maintenance

Example:

```bash
git commit -m "feat(auth): add login functionality"
```

### Branch Strategy

- `main` — production-ready branch
- `feature/*` — feature development
- `bugfix/*` — bug fixes
- `hotfix/*` — urgent fixes

### Standard Development Flow

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

After implementation:

```bash
git add .
git commit -m "feat(module): add new functionality"
git fetch origin
git rebase origin/main
git push origin feature/your-feature-name
```

Then create a Pull Request into `main`.

After merge:

```bash
git checkout main
git pull origin main
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## Development Quality Controls

The repository includes Git hooks to maintain code quality:

- **pre-commit** — linting and formatting checks
- **commit-msg** — commit message validation

This helps ensure consistency across team collaboration.

---

## Academic Context

This project was developed as part of the **BCOK Assignment 3**, focusing on:

- product thinking
- privacy-aware system design
- fail-safe emergency workflows
- mobile UX for real-world safety scenarios

The solution emphasizes both **technical feasibility** and \*\*human-centered design princ
