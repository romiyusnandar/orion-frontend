# Hero Component Documentation

## ✅ Hero Component Selesai!

Komponen Hero premium dengan style flagship product Xiaomi telah berhasil dibuat di `src/components/Hero.astro`.

---

## 🎨 **Fitur Utama:**

### **1. Large Bold Headline**
```
Orion OS.
Pure Performance.
```
- ✅ Font size: **40px → 80px** (responsive)
- ✅ Font weight: **800** (Extra Bold)
- ✅ Gradient accent pada "Pure Performance"

### **2. Sub-headline**
```
Experience Android the way it was meant to be.
Lightweight, Secure, Beautiful.
```

### **3. CTA Buttons**
- ✅ Primary: "Download Now" dengan icon
- ✅ Secondary: "Learn More" dengan border

### **4. Phone Mockup Placeholder**
- ✅ Realistic phone frame dengan notch
- ✅ Floating animation
- ✅ Comment: "Place Phone Mockup Here"

### **5. Scroll Indicator**
- ✅ Animated mouse icon
- ✅ Smooth scroll animation

---

## 🎬 **Animations:**

### **Fade-In Sequence:**
1. Hero content → 1s
2. Headline → 0.2s delay
3. Accent → 0.4s delay
4. Sub-headline → 0.6s delay
5. Buttons → 0.8s delay
6. Mockup → 1s delay
7. Scroll → 1.5s delay

### **Continuous:**
- Phone: Float (6s loop)
- Icon: Pulse (3s loop)
- Scroll: Down (2s loop)

---

## 📱 **Responsive:**

| Size | Headline | Mockup |
|------|----------|--------|
| Mobile | 40px | 280x560px |
| Tablet | 60px | 320x640px |
| Desktop | 80px | 360x720px |

---

## 🚀 **Usage:**

```astro
---
import Hero from "../components/Hero.astro";
---

<Layout>
  <Hero />
</Layout>
```

---

**Hero siap digunakan!** 🎉
