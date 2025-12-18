---
title: "Installation Guide for Ginkgo"
description: "Learn how to install Orion OS on your device with this easy-to-follow step-by-step guide."
pubDate: 2025-12-15
author: "Hirokixd"
authorImage: "https://i.ibb.co.com/X3wQXyb/hiro.jpg"
image: "/images/posts/flash_orionos_for_ginkgo.png"
tags: ["tutorial", "installation", "guide"]
---

# Complete Installation Guide for Orion OS

Welcome to the comprehensive installation guide for Orion OS on **Xiaomi Redmi Note 8 (Ginkgo)**. This guide provides a step-by-step approach to ensure a smooth transition to Orion OS.

---

## Choosing Your Variant

Orion OS offers two distinct variants tailored to your needs. Choose the one that best fits your workflow:

| Feature | GApps Variant | Vanilla Variant |
| :--- | :--- | :--- |
| **Google Services** | Pre-installed (GMS) | Not included |
| **Play Store** | Ready to use | Manual install required |
| **Privacy** | Standard | Maximum control |

> **Pro Tip:** If you're a privacy enthusiast, go with **Vanilla**. If you rely on the Play Store and Google sync, **GApps** is your best bet.

---

## Installation Steps

### Step 1: Prepare & Wipe
Clean your device partitions to avoid conflicts.

1. **Boot into Recovery:**
   - Turn off your device.
   - Press and hold `Volume Up + Power`.
2. **Execute Clean Wipe:**
   - Go to `Wipe` → `Advanced Wipe` (TWRP) or `Custom Wipe` (OrangeFox).
   - Select: **System, Vendor, Dalvik, Cache, and Data**.
   - Swipe to confirm.

> **Warning:** This step completely erases your apps and settings. Ensure your backup is safe!

---

### Step 2: Flash Firmware
Firmware ensures hardware compatibility.

1. Navigate to **Install**.
2. Select the latest `firmware-ginkgo-xxx.zip`.
3. Swipe to flash.
4. **Important:** Do not reboot yet.

---

### Step 3: Flash Orion OS ROM
The core of your new experience.

1. Stay in the **Install** menu.
2. Select your chosen ROM file:
   - `OrionOS-16.0-Ozone-ginkgo-Official-GApps-xxx.zip`
   - `OrionOS-16.0-Ozone-ginkgo-Official-Vanilla-xxx.zip`
3. Swipe to flash and wait (2-5 minutes).

---

### Step 4: Add Google Apps (Optional)
*Skip this if you flashed the GApps variant, proceed directly to [Step 6: Format Data](#step-6-format-data).*

If you chose the Vanilla variant but still want minimal Google services:
1. Select your GApps package (e.g., **NikGApps** or **MindTheGapps**).
2. Swipe to flash.

---

### Step 5: Root & Customization (Optional)
For power users who need Magisk or a custom kernel.

- **For Magisk:** Flash the `Magisk-vX.X.zip` file.
- **For Kernel:** Flash your preferred custom kernel zip.

---

### Step 6: Format Data
This is the most critical step to prevent bootloops.

1. Go to **Wipe** menu.
2. Tap **Format Data** (not just Wipe Data).
3. Type `yes` to confirm.
4. Wait for it to finish.

---

### Step 7: Final Reboot
You're almost there!

1. Go to **Reboot** → **System**.
2. **Initial Boot:** The first boot can take 5-10 minutes.
3. **Setup:** Follow the on-screen instructions to set up your new OS.

---

## Quick Links

- **Main Downloads:** [Orion OS Devices](https://orionos.tech/devices/ginkgo)
- **Firmware Archive:** [Xiaomi Firmware Updater](https://xmfirmwareupdater.com/archive/firmware/ginkgo/)
- **Magisk Root:** [Official GitHub](https://github.com/topjohnwu/Magisk)

### Join the Community
Stay updated and get help from fellow users:

- [Telegram Channel](https://t.me/OrionOS_prjkt)

---

Enjoy your new, blazing-fast experience with **Orion OS**! 💙

