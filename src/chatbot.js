/**
 * Riksja Travel AI Customer Support Chatbot
 *
 * A friendly, intelligent chatbot that helps users through their
 * travel decision-making journey with personalized recommendations.
 */

class RiksjaChatbot {
    constructor(config = {}) {
        this.config = {
            containerId: config.containerId || 'riksja-chatbot-container',
            language: config.language || 'nl',
            apiEndpoint: config.apiEndpoint || null,
            apiKey: config.apiKey || null,
            welcomeDelay: config.welcomeDelay || 500,
            typingDelay: config.typingDelay || 1000,
            autoOpen: config.autoOpen || false,
            ...config
        };

        this.state = {
            isOpen: false,
            messages: [],
            userContext: {
                preferences: {},
                visitedDestinations: [],
                currentFlow: null,
                flowStep: 0
            },
            isTyping: false,
            unreadCount: 0
        };

        this.knowledgeBase = typeof RiksjaKnowledgeBase !== 'undefined' ? RiksjaKnowledgeBase : null;

        this.init();
    }

    init() {
        this.createWidget();
        this.bindEvents();

        if (this.config.autoOpen) {
            setTimeout(() => this.open(), 2000);
        }

        // Show notification badge after delay
        setTimeout(() => {
            this.updateBadge(1);
        }, 3000);
    }

    createWidget() {
        // Create main container
        const container = document.createElement('div');
        container.className = 'riksja-chatbot';
        container.id = this.config.containerId;

        container.innerHTML = `
            <!-- Toggle Button -->
            <button class="riksja-chat-toggle" aria-label="Open chat">
                <svg class="chat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
                    <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
                </svg>
                <svg class="close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                <span class="riksja-badge" style="display: none;">0</span>
            </button>

            <!-- Chat Window -->
            <div class="riksja-chat-window">
                <!-- Header -->
                <div class="riksja-chat-header">
                    <div class="riksja-avatar">🌍</div>
                    <div class="riksja-header-info">
                        <h3>Riksja Reisassistent</h3>
                        <p class="riksja-status">
                            <span class="riksja-status-dot"></span>
                            Online - Klaar om te helpen
                        </p>
                    </div>
                </div>

                <!-- Chat Body -->
                <div class="riksja-chat-body" id="riksja-chat-body">
                    <!-- Welcome Screen -->
                    <div class="riksja-welcome" id="riksja-welcome">
                        <div class="riksja-welcome-icon">✈️</div>
                        <h4>Welkom bij Riksja Travel!</h4>
                        <p>Ik ben uw virtuele reisassistent en help u graag bij het vinden van uw perfecte reis.</p>
                        <div class="riksja-quick-start">
                            <button class="riksja-quick-option" data-action="explore">
                                <span class="icon">🌍</span>
                                <span>Bestemmingen verkennen</span>
                            </button>
                            <button class="riksja-quick-option" data-action="family">
                                <span class="icon">👨‍👩‍👧‍👦</span>
                                <span>Familiereis plannen</span>
                            </button>
                            <button class="riksja-quick-option" data-action="adventure">
                                <span class="icon">🏔️</span>
                                <span>Avontuurlijke reis</span>
                            </button>
                            <button class="riksja-quick-option" data-action="help">
                                <span class="icon">💬</span>
                                <span>Ik heb een vraag</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="riksja-chat-input">
                    <div class="riksja-input-wrapper">
                        <textarea
                            id="riksja-message-input"
                            placeholder="Typ uw bericht..."
                            rows="1"
                            aria-label="Typ uw bericht"
                        ></textarea>
                    </div>
                    <button class="riksja-send-btn" id="riksja-send-btn" aria-label="Verstuur bericht">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(container);

        // Store references
        this.container = container;
        this.chatBody = container.querySelector('#riksja-chat-body');
        this.messageInput = container.querySelector('#riksja-message-input');
        this.sendBtn = container.querySelector('#riksja-send-btn');
        this.toggleBtn = container.querySelector('.riksja-chat-toggle');
        this.badge = container.querySelector('.riksja-badge');
        this.welcomeScreen = container.querySelector('#riksja-welcome');
    }

    bindEvents() {
        // Toggle chat
        this.toggleBtn.addEventListener('click', () => this.toggle());

        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());

        // Enter key to send
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });

        // Quick start options
        this.container.querySelectorAll('.riksja-quick-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickStart(action);
            });
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.state.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.state.isOpen = true;
        this.container.classList.add('open');
        this.updateBadge(0);
        this.messageInput.focus();
    }

    close() {
        this.state.isOpen = false;
        this.container.classList.remove('open');
    }

    updateBadge(count) {
        this.state.unreadCount = count;
        if (count > 0 && !this.state.isOpen) {
            this.badge.textContent = count;
            this.badge.style.display = 'flex';
        } else {
            this.badge.style.display = 'none';
        }
    }

    handleQuickStart(action) {
        // Hide welcome screen
        if (this.welcomeScreen) {
            this.welcomeScreen.style.display = 'none';
        }

        const actions = {
            explore: () => {
                this.addUserMessage('Ik wil graag bestemmingen verkennen');
                this.startDestinationFlow();
            },
            family: () => {
                this.addUserMessage('Ik wil een familiereis plannen');
                this.handleFamilyTravel();
            },
            adventure: () => {
                this.addUserMessage('Ik zoek een avontuurlijke reis');
                this.handleAdventureTravel();
            },
            help: () => {
                this.addUserMessage('Ik heb een vraag');
                this.showHelpOptions();
            }
        };

        if (actions[action]) {
            actions[action]();
        }
    }

    sendMessage() {
        const text = this.messageInput.value.trim();
        if (!text || this.state.isTyping) return;

        // Hide welcome screen
        if (this.welcomeScreen) {
            this.welcomeScreen.style.display = 'none';
        }

        this.addUserMessage(text);
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';

        // Process the message
        this.processUserInput(text);
    }

    addUserMessage(text) {
        const message = {
            type: 'user',
            text: text,
            timestamp: new Date()
        };
        this.state.messages.push(message);
        this.renderMessage(message);
    }

    addBotMessage(text, options = {}) {
        return new Promise((resolve) => {
            this.showTyping();

            setTimeout(() => {
                this.hideTyping();

                const message = {
                    type: 'bot',
                    text: text,
                    timestamp: new Date(),
                    suggestions: options.suggestions || [],
                    cards: options.cards || []
                };
                this.state.messages.push(message);
                this.renderMessage(message, options);
                resolve();
            }, this.config.typingDelay);
        });
    }

    renderMessage(message, options = {}) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `riksja-message ${message.type}`;

        const avatar = message.type === 'bot' ? '🌍' : '👤';
        const time = this.formatTime(message.timestamp);

        messageDiv.innerHTML = `
            <div class="riksja-message-avatar">${avatar}</div>
            <div class="riksja-message-content">
                <p>${this.formatText(message.text)}</p>
                <span class="riksja-message-time">${time}</span>
            </div>
        `;

        this.chatBody.appendChild(messageDiv);

        // Add destination cards if present
        if (options.cards && options.cards.length > 0) {
            this.renderCards(options.cards);
        }

        // Add suggestions if present
        if (options.suggestions && options.suggestions.length > 0) {
            this.renderSuggestions(options.suggestions);
        }

        this.scrollToBottom();
    }

    renderCards(cards) {
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'riksja-cards-container';
        cardsContainer.style.display = 'flex';
        cardsContainer.style.flexDirection = 'column';
        cardsContainer.style.gap = '10px';
        cardsContainer.style.marginTop = '10px';

        cards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'riksja-destination-card';
            cardDiv.innerHTML = `
                <h4>${card.emoji || '🌍'} ${card.name}</h4>
                <p>${card.description}</p>
                ${card.tags ? `
                    <div class="riksja-destination-tags">
                        ${card.tags.map(tag => `<span class="riksja-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            `;

            cardDiv.addEventListener('click', () => {
                this.addUserMessage(`Vertel me meer over ${card.name}`);
                this.showDestinationDetails(card.name);
            });

            cardsContainer.appendChild(cardDiv);
        });

        this.chatBody.appendChild(cardsContainer);
        this.scrollToBottom();
    }

    renderSuggestions(suggestions) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'riksja-suggestions';

        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.className = 'riksja-suggestion-btn';
            btn.textContent = typeof suggestion === 'string' ? suggestion : suggestion.text;
            btn.addEventListener('click', () => {
                const text = typeof suggestion === 'string' ? suggestion : suggestion.text;
                this.addUserMessage(text);
                suggestionsDiv.remove();
                this.processUserInput(text);
            });
            suggestionsDiv.appendChild(btn);
        });

        this.chatBody.appendChild(suggestionsDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.state.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'riksja-typing';
        typingDiv.id = 'riksja-typing-indicator';
        typingDiv.innerHTML = `
            <div class="riksja-message-avatar">🌍</div>
            <div class="riksja-typing-dots">
                <span class="riksja-typing-dot"></span>
                <span class="riksja-typing-dot"></span>
                <span class="riksja-typing-dot"></span>
            </div>
        `;
        this.chatBody.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        this.state.isTyping = false;
        const typingIndicator = document.getElementById('riksja-typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }

    formatTime(date) {
        return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    }

    formatText(text) {
        // Convert URLs to links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    }

    // ==================
    // AI Response Logic
    // ==================

    async processUserInput(text) {
        const lowerText = text.toLowerCase();

        // Check for greetings
        if (this.isGreeting(lowerText)) {
            return this.handleGreeting();
        }

        // Check for destination queries
        const destination = this.findDestinationInText(lowerText);
        if (destination) {
            return this.showDestinationDetails(destination.name);
        }

        // Check for FAQ matches
        const faqMatch = this.findFAQMatch(lowerText);
        if (faqMatch) {
            return this.addBotMessage(faqMatch.answer, {
                suggestions: ['Nog een vraag', 'Bestemmingen bekijken', 'Contact opnemen']
            });
        }

        // Check for travel type queries
        if (lowerText.includes('familie') || lowerText.includes('kinderen')) {
            return this.handleFamilyTravel();
        }
        if (lowerText.includes('avontuur') || lowerText.includes('actief')) {
            return this.handleAdventureTravel();
        }
        if (lowerText.includes('duurzaam') || lowerText.includes('eco')) {
            return this.handleSustainableTravel();
        }
        if (lowerText.includes('romantisch') || lowerText.includes('honeymoon')) {
            return this.handleRomanticTravel();
        }

        // Check for booking/contact intent
        if (lowerText.includes('boeken') || lowerText.includes('reserveren')) {
            return this.handleBookingIntent();
        }
        if (lowerText.includes('contact') || lowerText.includes('bellen') || lowerText.includes('telefoon')) {
            return this.showContactInfo();
        }

        // Check for price queries
        if (lowerText.includes('prijs') || lowerText.includes('kost') || lowerText.includes('budget')) {
            return this.handlePriceQuery();
        }

        // Check for best time queries
        if (lowerText.includes('beste tijd') || lowerText.includes('wanneer') || lowerText.includes('seizoen')) {
            return this.handleBestTimeQuery();
        }

        // Default response with suggestions
        return this.handleUnknownQuery(text);
    }

    isGreeting(text) {
        const greetings = ['hallo', 'hello', 'hi', 'hey', 'hoi', 'goedemorgen', 'goedemiddag', 'goedeavond', 'dag'];
        return greetings.some(g => text.includes(g));
    }

    async handleGreeting() {
        const greetings = this.knowledgeBase?.greetings?.welcome || [
            "Welkom bij Riksja Travel! Hoe kan ik u helpen?"
        ];
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];

        await this.addBotMessage(greeting, {
            suggestions: ['Bestemmingen verkennen', 'Familiereis', 'Avontuurlijke reis', 'Ik heb een vraag']
        });
    }

    findDestinationInText(text) {
        if (!this.knowledgeBase?.destinations) return null;

        const allDestinations = [
            ...this.knowledgeBase.destinations.asia || [],
            ...this.knowledgeBase.destinations.americas || [],
            ...this.knowledgeBase.destinations.europe || [],
            ...this.knowledgeBase.destinations.middleEast || [],
            ...this.knowledgeBase.destinations.africa || []
        ];

        return allDestinations.find(dest =>
            text.includes(dest.name.toLowerCase())
        );
    }

    findFAQMatch(text) {
        if (!this.knowledgeBase?.faq) return null;

        // Simple keyword matching - in production, use proper NLP
        return this.knowledgeBase.faq.find(faq => {
            const keywords = faq.question.toLowerCase().split(' ')
                .filter(word => word.length > 4);
            return keywords.some(keyword => text.includes(keyword));
        });
    }

    async startDestinationFlow() {
        await this.addBotMessage(
            "Geweldig dat u op zoek bent naar uw volgende bestemming! Laat me u helpen met een paar vragen om de perfecte reis te vinden.",
            { suggestions: [] }
        );

        await this.addBotMessage("In welke regio wilt u graag reizen?", {
            suggestions: ['Azië', 'Zuid-Amerika', 'Afrika', 'Europa', 'Midden-Oosten']
        });
    }

    async handleFamilyTravel() {
        const familyDestinations = this.getFamilyFriendlyDestinations();

        await this.addBotMessage(
            "Fantastisch! Een familiereis is een geweldige manier om samen herinneringen te maken. Onze familiereizen zijn speciaal samengesteld met kortere rijtijden, kindvriendelijke activiteiten en accommodaties waar het hele gezin welkom is.",
            { suggestions: [] }
        );

        await this.addBotMessage("Hier zijn enkele populaire familiebestemmingen:", {
            cards: familyDestinations.slice(0, 3).map(d => ({
                name: d.name,
                emoji: d.emoji,
                description: d.description.substring(0, 100) + '...',
                tags: d.suitableFor.slice(0, 3)
            })),
            suggestions: ['Meer familiebestemmingen', 'Beste tijd voor families', 'Prijsindicatie']
        });
    }

    async handleAdventureTravel() {
        const adventureDestinations = this.getAdventureDestinations();

        await this.addBotMessage(
            "Op zoek naar avontuur? Bij Riksja Travel houden we van actieve reizen vol uitdagingen! Van trekking in de Andes tot wildlife safari's in Afrika - we hebben voor elk wat wils.",
            { suggestions: [] }
        );

        await this.addBotMessage("Dit zijn onze top avontuurlijke bestemmingen:", {
            cards: adventureDestinations.slice(0, 3).map(d => ({
                name: d.name,
                emoji: d.emoji,
                description: d.description.substring(0, 100) + '...',
                tags: d.activities?.slice(0, 3) || []
            })),
            suggestions: ['Meer avontuurlijke reizen', 'Moeilijkheidsgraad', 'Prijzen']
        });
    }

    async handleSustainableTravel() {
        await this.addBotMessage(
            "Duurzaam reizen ligt ons na aan het hart! Als B Corp gecertificeerd bedrijf zetten we ons in voor reizen met een positieve impact. We compenseren CO2, werken met lokale partners en ondersteunen gemeenschapsprojecten.",
            { suggestions: [] }
        );

        const sustainableInfo = this.knowledgeBase?.company?.sustainability;
        if (sustainableInfo) {
            await this.addBotMessage(
                `Onze duurzaamheidsinitiatieven:\n• ${sustainableInfo.initiatives.join('\n• ')}`,
                {
                    suggestions: ['Eco-reizen bekijken', 'Meer over B Corp', 'Bestemmingen']
                }
            );
        }
    }

    async handleRomanticTravel() {
        await this.addBotMessage(
            "Op zoek naar een romantische reis of honeymoon? Wij hebben prachtige bestemmingen met boutique accommodaties, privé ervaringen en onvergetelijke momenten samen.",
            {
                cards: [
                    { name: 'Griekenland', emoji: '🇬🇷', description: 'Eilandhoppen langs idyllische bestemmingen', tags: ['Romantisch', 'Stranden', 'Cultuur'] },
                    { name: 'Sri Lanka', emoji: '🇱🇰', description: 'Van theeplantages tot paradijselijke stranden', tags: ['Boutique hotels', 'Natuur', 'Spa'] },
                    { name: 'Japan', emoji: '🇯🇵', description: 'Perfecte balans van traditie en luxe', tags: ['Ryokans', 'Cultuur', 'Culinair'] }
                ],
                suggestions: ['Honeymoon pakket', 'Prijsindicatie', 'Meer bestemmingen']
            }
        );
    }

    async showDestinationDetails(destinationName) {
        const destination = this.findDestinationByName(destinationName);

        if (!destination) {
            return this.addBotMessage(
                `Ik kon geen informatie vinden over ${destinationName}. Kan ik u helpen met een andere bestemming?`,
                { suggestions: ['Azië', 'Zuid-Amerika', 'Afrika', 'Europa'] }
            );
        }

        await this.addBotMessage(
            `${destination.emoji} **${destination.name}**\n\n${destination.description}\n\n` +
            `**Hoogtepunten:** ${destination.highlights.join(', ')}\n\n` +
            `**Beste reistijd:** ${destination.bestTime}\n\n` +
            `**Reisduur:** ${destination.duration}\n\n` +
            `**Activiteiten:** ${destination.activities?.join(', ') || 'Diverse activiteiten'}`,
            {
                suggestions: ['Prijsindicatie', 'Reisprogramma bekijken', 'Offerte aanvragen', 'Andere bestemmingen']
            }
        );
    }

    findDestinationByName(name) {
        if (!this.knowledgeBase?.destinations) return null;

        const allDestinations = [
            ...this.knowledgeBase.destinations.asia || [],
            ...this.knowledgeBase.destinations.americas || [],
            ...this.knowledgeBase.destinations.europe || [],
            ...this.knowledgeBase.destinations.middleEast || [],
            ...this.knowledgeBase.destinations.africa || []
        ];

        return allDestinations.find(dest =>
            dest.name.toLowerCase() === name.toLowerCase()
        );
    }

    getFamilyFriendlyDestinations() {
        if (!this.knowledgeBase?.destinations) return [];

        const allDestinations = [
            ...this.knowledgeBase.destinations.asia || [],
            ...this.knowledgeBase.destinations.americas || [],
            ...this.knowledgeBase.destinations.europe || [],
            ...this.knowledgeBase.destinations.middleEast || [],
            ...this.knowledgeBase.destinations.africa || []
        ];

        return allDestinations.filter(dest => dest.familyFriendly);
    }

    getAdventureDestinations() {
        if (!this.knowledgeBase?.destinations) return [];

        const allDestinations = [
            ...this.knowledgeBase.destinations.asia || [],
            ...this.knowledgeBase.destinations.americas || [],
            ...this.knowledgeBase.destinations.europe || [],
            ...this.knowledgeBase.destinations.middleEast || [],
            ...this.knowledgeBase.destinations.africa || []
        ];

        return allDestinations.filter(dest =>
            dest.suitableFor?.includes('avonturiers') ||
            dest.activities?.some(a => ['Trekking', 'Hiking', 'Safari', 'Rafting'].includes(a))
        );
    }

    async handleBookingIntent() {
        await this.addBotMessage(
            "Geweldig dat u wilt boeken! Bij Riksja Travel werkt het als volgt:\n\n" +
            "1. U vraagt een vrijblijvende offerte aan\n" +
            "2. Een reisspecialist neemt contact met u op\n" +
            "3. Samen stellen we uw perfecte reis samen\n" +
            "4. Pas als u tevreden bent, boekt u definitief\n\n" +
            "Wilt u een offerte aanvragen of liever gebeld worden?",
            {
                suggestions: ['Offerte aanvragen', 'Bel mij terug', 'Eerst meer informatie']
            }
        );
    }

    async showContactInfo() {
        const company = this.knowledgeBase?.company;
        await this.addBotMessage(
            `U kunt ons bereiken via:\n\n` +
            `📞 Telefoon: ${company?.phone || '+31 (0)71 513 12 03'}\n` +
            `✉️ Email: ${company?.email || 'info@riksjatravel.nl'}\n` +
            `🌐 Website: ${company?.website || 'www.riksjatravel.nl'}\n\n` +
            `Onze reisspecialisten staan voor u klaar op werkdagen van 09:00 tot 17:30.`,
            {
                suggestions: ['Bel mij terug', 'Offerte aanvragen', 'Terug naar bestemmingen']
            }
        );
    }

    async handlePriceQuery() {
        await this.addBotMessage(
            "De prijs van een reis hangt af van verschillende factoren:\n\n" +
            "• Bestemming en reisduur\n" +
            "• Type accommodaties\n" +
            "• Seizoen van reizen\n" +
            "• Activiteiten en excursies\n" +
            "• Wel/geen vluchten inbegrepen\n\n" +
            "**Indicatie:** Onze reizen beginnen vanaf ca. €1.500 per persoon (excl. vlucht) voor kortere reizen tot €5.000+ voor uitgebreide reizen naar verre bestemmingen.\n\n" +
            "Wilt u een specifieke prijsindicatie? Vraag een vrijblijvende offerte aan!",
            {
                suggestions: ['Offerte aanvragen', 'Budget reizen', 'Luxe reizen', 'Bestemmingen']
            }
        );
    }

    async handleBestTimeQuery() {
        await this.addBotMessage(
            "De beste reistijd verschilt per bestemming. Enkele voorbeelden:\n\n" +
            "🌴 **Tropisch Azië** (Sri Lanka, Vietnam): Nov-Apr\n" +
            "🌸 **Japan**: Mrt-Mei (kersenbloesem) of Okt-Nov (herfstkleuren)\n" +
            "🦁 **Afrika Safari's**: Jun-Okt (droog seizoen)\n" +
            "🏔️ **Zuid-Amerika**: Apr-Okt (droog seizoen Andes)\n" +
            "🇬🇷 **Middellandse Zee**: Apr-Jun, Sep-Okt\n\n" +
            "Naar welke bestemming wilt u meer weten?",
            {
                suggestions: ['Sri Lanka', 'Japan', 'Costa Rica', 'Andere bestemming']
            }
        );
    }

    async showHelpOptions() {
        await this.addBotMessage(
            "Ik help u graag! Waar kan ik u mee van dienst zijn?",
            {
                suggestions: [
                    'Hoe boek ik een reis?',
                    'Wat is inbegrepen?',
                    'Reizen met kinderen',
                    'Duurzaam reizen',
                    'Contact opnemen'
                ]
            }
        );
    }

    async handleUnknownQuery(text) {
        // Try to use AI API if configured
        if (this.config.apiEndpoint && this.config.apiKey) {
            try {
                const response = await this.callAIAPI(text);
                if (response) {
                    return this.addBotMessage(response, {
                        suggestions: ['Nog een vraag', 'Bestemmingen', 'Contact']
                    });
                }
            } catch (error) {
                console.error('AI API error:', error);
            }
        }

        // Fallback response
        await this.addBotMessage(
            "Bedankt voor uw vraag! Om u het beste te kunnen helpen, kan ik u doorverbinden met een van onze reisspecialisten. Zij kunnen al uw vragen persoonlijk beantwoorden.\n\n" +
            "In de tussentijd kan ik u ook helpen met:\n" +
            "• Bestemmingen verkennen\n" +
            "• Informatie over onze reizen\n" +
            "• Praktische reisvragen",
            {
                suggestions: ['Bestemmingen bekijken', 'Veelgestelde vragen', 'Contact opnemen']
            }
        );
    }

    // Optional: Call external AI API for complex queries
    async callAIAPI(userMessage) {
        if (!this.config.apiEndpoint || !this.config.apiKey) {
            return null;
        }

        const systemPrompt = `Je bent een vriendelijke reisassistent voor Riksja Travel, een Nederlandse reisorganisatie gespecialiseerd in individuele rondreizen op maat.
        Je helpt klanten met hun reisvragen, geeft advies over bestemmingen, en begeleidt hen in hun besluitvorming.
        Antwoord altijd in het Nederlands, wees behulpzaam en enthousiast over reizen.
        Houd antwoorden beknopt maar informatief.`;

        try {
            const response = await fetch(this.config.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.apiKey}`
                },
                body: JSON.stringify({
                    model: 'claude-3-haiku-20240307',
                    max_tokens: 500,
                    system: systemPrompt,
                    messages: [
                        { role: 'user', content: userMessage }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.content?.[0]?.text || null;
        } catch (error) {
            console.error('AI API call failed:', error);
            return null;
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chatbot with default config
    window.riksjaChatbot = new RiksjaChatbot({
        language: 'nl',
        autoOpen: false,
        typingDelay: 800,
        // Optional: Configure AI API for enhanced responses
        // apiEndpoint: 'https://api.anthropic.com/v1/messages',
        // apiKey: 'your-api-key'
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RiksjaChatbot;
}
