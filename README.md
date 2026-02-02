# Riksja Travel AI Customer Support Chatbot

An intelligent, friendly chatbot widget designed to help Riksja Travel website visitors through their travel decision-making journey. Built with vanilla JavaScript for easy integration and optimal performance.

## Features

- **Decision Support**: Guides users through destination selection based on preferences
- **Knowledge Base**: Comprehensive information about 15+ destinations across 5 continents
- **Smart Responses**: Handles greetings, FAQs, destination queries, and booking intent
- **Travel Type Filtering**: Family, adventure, romantic, and sustainable travel options
- **Beautiful UI**: Modern, responsive design matching Riksja Travel branding
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dark Mode**: Automatic dark mode support
- **Mobile Optimized**: Responsive design for all device sizes
- **AI Integration Ready**: Optional connection to Claude API for enhanced responses

## Quick Start

### 1. Basic Integration

Add the chatbot to any webpage by including the CSS and JavaScript files:

```html
<!-- Add before </head> -->
<link rel="stylesheet" href="src/chatbot.css">

<!-- Add before </body> -->
<script src="src/knowledge-base.js"></script>
<script src="src/chatbot.js"></script>
```

The chatbot will automatically initialize and appear as a floating button in the bottom-right corner.

### 2. Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:8080 in your browser
```

### 3. Customize Configuration

```javascript
window.riksjaChatbot = new RiksjaChatbot({
    language: 'nl',           // Language: 'nl' or 'en'
    autoOpen: false,          // Auto-open on page load
    typingDelay: 800,         // Typing indicator delay (ms)
    welcomeDelay: 500,        // Welcome message delay (ms)

    // Optional: Enable AI-powered responses
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    apiKey: 'your-api-key'
});
```

## Project Structure

```
riksja-travel-chatbot/
├── index.html              # Demo page
├── package.json            # Project configuration
├── README.md               # Documentation
├── src/
│   ├── chatbot.js          # Main chatbot logic
│   ├── chatbot.css         # Widget styles
│   └── knowledge-base.js   # Destination & company data
└── assets/                 # Images and icons (optional)
```

## Chatbot Capabilities

### Destination Discovery
- Browse destinations by region (Asia, Americas, Europe, Africa, Middle East)
- Filter by travel type (family, adventure, romantic, sustainable)
- Get detailed information including highlights, best travel times, and activities

### Conversation Topics
- **Greetings**: Friendly welcome messages
- **Destinations**: Details about 15+ destinations
- **Travel Types**: Family trips, adventure travel, honeymoons, eco-tourism
- **Pricing**: General price indications and how to get quotes
- **Booking**: Explanation of the booking process
- **Best Time**: When to visit different destinations
- **Contact**: Phone, email, and callback requests
- **FAQs**: Common questions about Riksja Travel

### Quick Start Options
Users can quickly access:
- Destination exploration
- Family trip planning
- Adventure travel options
- General questions/help

## Customization

### Styling

The chatbot uses CSS custom properties for easy theming:

```css
:root {
    --riksja-primary: #1a5f4a;       /* Main green */
    --riksja-primary-light: #2d8b6e;  /* Light green */
    --riksja-accent: #e8a54b;         /* Orange accent */
    /* ... see chatbot.css for all variables */
}
```

### Adding Destinations

Edit `src/knowledge-base.js` to add new destinations:

```javascript
{
    name: "New Destination",
    emoji: "🌍",
    highlights: ["Highlight 1", "Highlight 2"],
    bestTime: "Month - Month",
    duration: "X-Y days",
    suitableFor: ["families", "couples"],
    description: "Description of the destination...",
    familyFriendly: true,
    activities: ["Activity 1", "Activity 2"]
}
```

### Adding FAQ Items

```javascript
{
    question: "Your question here?",
    answer: "Detailed answer to the question..."
}
```

## AI Enhancement (Optional)

For more intelligent, context-aware responses, connect to the Claude API:

```javascript
new RiksjaChatbot({
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    apiKey: 'sk-ant-...'  // Your API key
});
```

**Note**: For production, implement a backend proxy to protect your API key.

## Integration with Riksja Travel Website

### WordPress Integration

```php
// Add to functions.php or custom plugin
function riksja_chatbot_scripts() {
    wp_enqueue_style('riksja-chatbot',
        get_template_directory_uri() . '/chatbot/chatbot.css');
    wp_enqueue_script('riksja-knowledge',
        get_template_directory_uri() . '/chatbot/knowledge-base.js',
        array(), '1.0', true);
    wp_enqueue_script('riksja-chatbot',
        get_template_directory_uri() . '/chatbot/chatbot.js',
        array('riksja-knowledge'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'riksja_chatbot_scripts');
```

### Google Tag Manager

1. Create a Custom HTML tag
2. Paste the CSS in a `<style>` block
3. Paste the JavaScript files in `<script>` blocks
4. Set trigger to "All Pages"

### Direct Script Injection

```html
<!-- Riksja Travel Chatbot -->
<link rel="stylesheet" href="https://your-cdn.com/riksja-chatbot/chatbot.css">
<script src="https://your-cdn.com/riksja-chatbot/knowledge-base.js"></script>
<script src="https://your-cdn.com/riksja-chatbot/chatbot.js"></script>
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome for Android)

## Performance

- **Bundle Size**: ~50KB (unminified CSS + JS)
- **No Dependencies**: Pure vanilla JavaScript
- **Lazy Loading**: Widget loads asynchronously
- **Optimized Animations**: Uses CSS transforms for smooth performance

## Accessibility

- Full keyboard navigation (Tab, Enter, Escape)
- ARIA labels for screen readers
- High contrast color scheme
- Reduced motion support (`prefers-reduced-motion`)
- Focus indicators on all interactive elements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use and modify for your needs.

## Support

For questions about integration or customization:
- Email: info@riksjatravel.nl
- Phone: +31 (0)71 513 12 03

---

Built with love for travelers everywhere.
