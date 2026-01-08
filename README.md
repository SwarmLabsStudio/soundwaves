# 40Hz Gamma Therapy - Sound Healing Web Application

A beautiful, calming web application designed for therapeutic 40Hz gamma wave sound sessions with immersive visual experiences.

## 🌟 Features

### Audio Therapy
- **40Hz Gamma Wave Generation**: Pure sine wave at 40Hz frequency using Web Audio API
- **Adjustable Volume**: Smooth volume control with real-time adjustment
- **High-Quality Sound**: Clean, therapeutic audio output

### Visual Experience
- **Full-Screen Calming Visuals**: Animated particles, flowing waves, and gradient orbs
- **Responsive Canvas**: Adapts to any screen size
- **Smooth Animations**: 60fps performance with optimized rendering

### Session Management
- **Flexible Duration**: Choose from preset durations (5, 10, 15, 20, 30, 45, 60 minutes) or set custom time
- **Timer Display**: Large, easy-to-read countdown timer
- **Playback Controls**: Play, pause, and stop functionality
- **Session Protection**: Warns before accidental page closure during active sessions

### User Interface
- **Premium Design**: Modern glassmorphism effects with vibrant gradients
- **Fully Responsive**: Works beautifully on desktop, tablet, and mobile devices
- **Keyboard Shortcuts**: 
  - `Space`: Play/Pause
  - `Escape`: Stop session
- **Accessibility**: ARIA labels and semantic HTML

## 🎯 Purpose

Based on research into 40Hz gamma therapy, this application provides a tool for:
- Enhancing cognitive function and focus
- Supporting healthy sleep patterns
- Promoting relaxation and stress reduction
- Potentially supporting brain health

**Disclaimer**: This application is for wellness purposes only and is not intended to diagnose, treat, cure, or prevent any disease.

## 🚀 Getting Started

### Prerequisites
- Modern web browser with Web Audio API support (Chrome, Firefox, Safari, Edge)
- No installation or build process required

### Running the Application

1. **Simple HTTP Server** (Recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server -p 8000
   ```

2. **Open in Browser**:
   Navigate to `http://localhost:8000`

3. **Or Simply Open**:
   Double-click `index.html` to open directly in your browser

## 📱 Usage

1. **Select Duration**: Choose a preset duration or enter a custom time (1-60 minutes)
2. **Session Starts**: Audio and visuals begin automatically
3. **Control Playback**: Use the bottom controls to play/pause or stop
4. **Adjust Volume**: Use the volume slider to set comfortable audio level
5. **Session Complete**: Application notifies you when the session ends

## 🎨 Design Philosophy

- **Calming Color Palette**: Purples, blues, and teals for a therapeutic atmosphere
- **Smooth Animations**: All transitions and effects use easing for comfort
- **Minimal Distractions**: Clean interface that fades into the background
- **Premium Feel**: Glassmorphism, gradients, and subtle shadows

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, gradients, animations, and responsive design
- **Vanilla JavaScript**: No frameworks or dependencies
- **Web Audio API**: Real-time 40Hz tone generation
- **Canvas API**: Hardware-accelerated visual rendering

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Performance
- Optimized canvas rendering
- Efficient particle system
- Smooth 60fps animations
- Low CPU usage

## 📚 Research Background

This application is inspired by research into 40Hz gamma wave therapy, including studies on:
- Gamma oscillations and cognitive function
- Sound therapy for brain health
- Non-invasive therapeutic interventions

**Reference**: [40 Hz Sound Gamma Therapy Safety & Sleep](https://optoceutics.com/40-hz-sound-gamma-therapy-safety-sleep/)

## 🛠️ Customization

### Modify Frequency
Edit `app.js` line 10:
```javascript
this.frequency = 40; // Change to desired frequency
```

### Adjust Visual Colors
Edit CSS custom properties in `styles.css`:
```css
--accent-purple: #667eea;
--accent-pink: #f093fb;
--accent-blue: #4facfe;
```

### Change Animation Speed
Edit `app.js` wave properties:
```javascript
{ amplitude: 30, frequency: 0.01, speed: 0.02, ... }
```

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⚠️ Health & Safety

- Start with lower volumes and gradually increase
- Take breaks between sessions
- Consult healthcare professionals for medical advice
- Not recommended for individuals with seizure disorders without medical consultation

## 📧 Support

For questions or issues, please open an issue in the repository.

---

**Enjoy your therapeutic sound journey! 🎵✨**
