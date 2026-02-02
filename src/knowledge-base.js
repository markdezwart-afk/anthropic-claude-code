/**
 * Riksja Travel Knowledge Base
 * Contains all information about destinations, services, and company details
 * for the AI chatbot to provide accurate and helpful responses
 */

const RiksjaKnowledgeBase = {
    // Company Information
    company: {
        name: "Riksja Travel",
        founded: 2000,
        headquarters: "Pompoenweg 9, Leiden, Zuid-Holland, Nederland",
        website: "https://www.riksjatravel.nl",
        phone: "+31 (0)71 513 12 03",
        email: "info@riksjatravel.nl",
        employees: 139,

        description: {
            nl: "Riksja Travel is een Nederlandse reisorganisatie gespecialiseerd in individuele rondreizen op maat. Al meer dan 20 jaar creëren wij unieke reiservaringen naar de mooiste bestemmingen wereldwijd.",
            en: "Riksja Travel is a Dutch travel organization specialized in customized individual tours. For over 20 years, we have been creating unique travel experiences to the most beautiful destinations worldwide."
        },

        uniqueSellingPoints: [
            "Op maat gemaakte individuele rondreizen",
            "Focus op lokale ervaringen en authentieke ontmoetingen",
            "Duurzaam en verantwoord reizen (B Corp gecertificeerd)",
            "Handgeselecteerde, kleinschalige accommodaties",
            "Persoonlijke service en expertise",
            "Lokale partners en gidsen",
            "Reizen buiten de gebaande paden"
        ],

        certifications: [
            {
                name: "B Corp Certified",
                score: 90.0,
                description: "B Corp certificering voor duurzame en maatschappelijk verantwoorde bedrijfsvoering"
            },
            {
                name: "SGR",
                description: "Stichting Garantiefonds Reisgelden - financiële zekerheid"
            },
            {
                name: "ANVR",
                description: "Lid van de ANVR reisbranche organisatie"
            }
        ],

        sustainability: {
            commitment: "Bij Riksja Travel geloven we in reizen die een positieve impact hebben. We werken samen met lokale partners om ervoor te zorgen dat de gemeenschappen die we bezoeken ook profiteren van het toerisme.",
            initiatives: [
                "CO2-compensatie van alle vluchten",
                "Samenwerking met lokale gemeenschappen",
                "Ondersteuning van duurzame projecten",
                "Gebruik van milieuvriendelijke accommodaties",
                "Bevordering van lokale economieën"
            ]
        }
    },

    // Destinations
    destinations: {
        asia: [
            {
                name: "Sri Lanka",
                emoji: "🇱🇰",
                highlights: ["Culturele driehoek", "Theeplantages", "Wildlife safari's", "Stranden", "Ayurveda"],
                bestTime: "December - April (westkust), April - September (oostkust)",
                duration: "10-21 dagen",
                suitableFor: ["families", "koppels", "avonturiers", "cultuurliefhebbers"],
                description: "Ontdek het 'parel van de Indische Oceaan' met zijn oude tempels, groene theeplantages, wilde olifanten en paradijselijke stranden.",
                familyFriendly: true,
                activities: ["Tempelbezoek", "Treintochten", "Safari", "Snorkelen", "Wandelen"]
            },
            {
                name: "Vietnam",
                emoji: "🇻🇳",
                highlights: ["Halong Bay", "Hoi An", "Mekong Delta", "Sapa rijstterrassen", "Ho Chi Minh City"],
                bestTime: "Maart - April, September - November",
                duration: "14-21 dagen",
                suitableFor: ["families", "koppels", "solo reizigers", "foodlovers"],
                description: "Van de mysterieuze karstrotsen in Halong Bay tot de bruisende straatjes van Hanoi - Vietnam biedt een onvergetelijke mix van cultuur, natuur en culinaire hoogstandjes.",
                familyFriendly: true,
                activities: ["Boottochten", "Fietsen", "Kooklessen", "Marktbezoek", "Trekking"]
            },
            {
                name: "Japan",
                emoji: "🇯🇵",
                highlights: ["Tokyo", "Kyoto tempels", "Mount Fuji", "Japanse Alpen", "Traditionele ryokans"],
                bestTime: "Maart - Mei (kersenbloesem), Oktober - November (herfstbladeren)",
                duration: "12-21 dagen",
                suitableFor: ["koppels", "cultuurliefhebbers", "families", "foodies"],
                description: "Ervaar de perfecte balans tussen oud en nieuw in Japan - van serene tempels en traditionele theeceremoniën tot futuristische steden en culinaire perfectie.",
                familyFriendly: true,
                activities: ["Tempelbezoek", "Onsen baden", "Culinaire tours", "Wandelen", "Treinen"]
            },
            {
                name: "Indonesië",
                emoji: "🇮🇩",
                highlights: ["Bali", "Java tempels", "Komodo draken", "Raja Ampat", "Orang-oetans Sumatra"],
                bestTime: "April - Oktober (droog seizoen)",
                duration: "14-28 dagen",
                suitableFor: ["families", "duikers", "avonturiers", "natuurliefhebbers"],
                description: "Met meer dan 17.000 eilanden biedt Indonesië eindeloze mogelijkheden - van de spirituele sfeer van Bali tot de wilde natuur van Sumatra.",
                familyFriendly: true,
                activities: ["Tempelbezoek", "Duiken/snorkelen", "Trekking", "Wildlife", "Culturele workshops"]
            }
        ],

        americas: [
            {
                name: "Costa Rica",
                emoji: "🇨🇷",
                highlights: ["Vulkanen", "Cloud forests", "Wildlife", "Stranden", "Zipline avonturen"],
                bestTime: "December - April (droog seizoen)",
                duration: "12-18 dagen",
                suitableFor: ["families", "avonturiers", "natuurliefhebbers", "koppels"],
                description: "Het perfecte land voor eco-toerisme met een ongelooflijke biodiversiteit, vriendelijke 'Pura Vida' cultuur en avonturen voor alle leeftijden.",
                familyFriendly: true,
                activities: ["Wildlife spotting", "Zipline", "Rafting", "Vulkaan wandelingen", "Snorkelen"]
            },
            {
                name: "Peru",
                emoji: "🇵🇪",
                highlights: ["Machu Picchu", "Cusco", "Sacred Valley", "Titicacameer", "Amazone"],
                bestTime: "April - Oktober (droog seizoen)",
                duration: "14-21 dagen",
                suitableFor: ["avonturiers", "cultuurliefhebbers", "wandelaars", "geschiedenisfans"],
                description: "Loop in de voetsporen van de Inca's naar Machu Picchu, ontdek kleurrijke markten en verblijf bij lokale gemeenschappen rond het Titicacameer.",
                familyFriendly: true,
                activities: ["Inca Trail", "Culturele bezoeken", "Trekkings", "Bootexcursies", "Koken"]
            },
            {
                name: "Bolivia",
                emoji: "🇧🇴",
                highlights: ["Salar de Uyuni", "La Paz", "Titicacameer", "Amazone", "Colonial Sucre"],
                bestTime: "April - November",
                duration: "10-18 dagen",
                suitableFor: ["avonturiers", "fotografen", "backpackers"],
                description: "Ontdek de surreële zoutvlaktes, kleurrijke markten en authentieke Andes-cultuur in dit nog onontdekte juweel van Zuid-Amerika.",
                familyFriendly: false,
                activities: ["Jeep tours", "Trekking", "Culturele bezoeken", "Fotografie"]
            },
            {
                name: "Canada",
                emoji: "🇨🇦",
                highlights: ["Rocky Mountains", "Vancouver", "Banff", "Wildlife", "Indianencultuur"],
                bestTime: "Juni - September (zomer), December - Maart (winter/noorderlicht)",
                duration: "14-21 dagen",
                suitableFor: ["families", "natuurliefhebbers", "road trip fans", "avonturiers"],
                description: "Maak een onvergetelijke roadtrip door de majestueuze Rocky Mountains, spot beren en walvissen, en ervaar de warmte van Canadese gastvrijheid.",
                familyFriendly: true,
                activities: ["Roadtrip", "Hiking", "Wildlife tours", "Kajakken", "Noorderlicht"]
            }
        ],

        europe: [
            {
                name: "Griekenland",
                emoji: "🇬🇷",
                highlights: ["Athene", "Eilandhoppen", "Oude ruïnes", "Stranden", "Mediterrane keuken"],
                bestTime: "April - Juni, September - Oktober",
                duration: "8-14 dagen",
                suitableFor: ["koppels", "families", "cultuurliefhebbers", "strandliefhebbers"],
                description: "Combineer cultuur en ontspanning in de bakermat van de westerse beschaving - van de Akropolis tot idyllische eilanden.",
                familyFriendly: true,
                activities: ["Historische tours", "Eilandhoppen", "Zwemmen", "Culinaire tours", "Wandelen"]
            }
        ],

        middleEast: [
            {
                name: "Jordanië",
                emoji: "🇯🇴",
                highlights: ["Petra", "Wadi Rum", "Dode Zee", "Amman", "Jerash"],
                bestTime: "Maart - Mei, September - November",
                duration: "8-14 dagen",
                suitableFor: ["avonturiers", "geschiedenisfans", "koppels", "fotografen"],
                description: "Wandel door de roze stad Petra, slaap onder de sterren in Wadi Rum en drijf in de Dode Zee - Jordanië is magie.",
                familyFriendly: true,
                activities: ["Petra verkennen", "Woestijnsafari", "Dode Zee", "Culturele bezoeken", "Wandelen"]
            }
        ],

        africa: [
            {
                name: "Zuid-Afrika",
                emoji: "🇿🇦",
                highlights: ["Kaapstad", "Safari Big Five", "Garden Route", "Wijnlanden", "Drakensbergen"],
                bestTime: "September - November, Maart - Mei",
                duration: "14-21 dagen",
                suitableFor: ["families", "koppels", "avonturiers", "wijnliefhebbers"],
                description: "Een wereld in één land - van opwindende safari's tot culinaire hoogstandjes in de wijnlanden en de spectaculaire kust van de Garden Route.",
                familyFriendly: true,
                activities: ["Safari", "Wijnproeverij", "Hiking", "Whale watching", "Roadtrip"]
            },
            {
                name: "Tanzania",
                emoji: "🇹🇿",
                highlights: ["Serengeti", "Ngorongoro", "Kilimanjaro", "Zanzibar", "Great Migration"],
                bestTime: "Juni - Oktober (droog seizoen), Januari - Februari (Great Migration)",
                duration: "10-18 dagen",
                suitableFor: ["wildlife liefhebbers", "avonturiers", "koppels", "fotografen"],
                description: "Beleef de ultieme safari-ervaring in de Serengeti, bewonder de krater van Ngorongoro en ontspan op de paradijselijke stranden van Zanzibar.",
                familyFriendly: true,
                activities: ["Safari", "Trekking", "Strandvakantie", "Snorkelen", "Culturele bezoeken"]
            }
        ]
    },

    // Travel Types
    travelTypes: {
        family: {
            name: "Familiereizen",
            emoji: "👨‍👩‍👧‍👦",
            description: "Speciaal samengestelde reizen voor gezinnen met activiteiten die leuk zijn voor alle leeftijden.",
            features: [
                "Kindvriendelijke accommodaties",
                "Activiteiten voor alle leeftijden",
                "Kortere rijtijden",
                "Flexibele programma's",
                "Kinderkorting beschikbaar"
            ],
            popularDestinations: ["Costa Rica", "Sri Lanka", "Vietnam", "Indonesië", "Canada"]
        },
        adventure: {
            name: "Avontuurlijke Reizen",
            emoji: "🏔️",
            description: "Voor reizigers die op zoek zijn naar uitdaging en unieke ervaringen.",
            features: [
                "Actieve excursies",
                "Trekking en hiking",
                "Off-the-beaten-track routes",
                "Avontuurlijke accommodaties",
                "Lokale gidsen"
            ],
            popularDestinations: ["Peru", "Bolivia", "Tanzania", "Jordanië", "Japan"]
        },
        romantic: {
            name: "Romantische Reizen",
            emoji: "💑",
            description: "Perfecte honeymoon bestemmingen en romantische getaways.",
            features: [
                "Boutique accommodaties",
                "Privé ervaringen",
                "Romantische locaties",
                "Culinaire belevenissen",
                "Spa en wellness"
            ],
            popularDestinations: ["Griekenland", "Japan", "Sri Lanka", "Zuid-Afrika", "Vietnam"]
        },
        sustainable: {
            name: "Duurzaam Reizen",
            emoji: "🌿",
            description: "Reizen met een positieve impact op lokale gemeenschappen en het milieu.",
            features: [
                "Eco-lodges en duurzame accommodaties",
                "CO2-compensatie",
                "Ondersteuning lokale projecten",
                "Kleinschalig toerisme",
                "Authentieke ervaringen"
            ],
            popularDestinations: ["Costa Rica", "Peru", "Sri Lanka", "Indonesië"]
        }
    },

    // FAQ
    faq: [
        {
            question: "Hoe werkt het boeken van een reis bij Riksja Travel?",
            answer: "U kunt online inspiratie opdoen en een reis aanvragen. Vervolgens neemt een van onze reisspecialisten contact met u op om uw wensen te bespreken en een op maat gemaakte reis samen te stellen. Pas als u tevreden bent, boekt u definitief."
        },
        {
            question: "Zijn jullie reizen geschikt voor kinderen?",
            answer: "Ja, wij hebben speciale familiereizen die perfect zijn afgestemd op gezinnen met kinderen. Deze reizen hebben kortere rijtijden, kindvriendelijke activiteiten en accommodaties waar kinderen welkom zijn."
        },
        {
            question: "Kan ik mijn reis aanpassen?",
            answer: "Absoluut! Al onze reizen zijn op maat te maken. U kunt het programma, accommodaties en activiteiten aanpassen aan uw wensen. Onze reisspecialisten helpen u graag bij het samenstellen van uw perfecte reis."
        },
        {
            question: "Wat is inbegrepen in de reisprijs?",
            answer: "Meestal zijn accommodaties, lokaal vervoer, veel maaltijden, excursies en lokale gidsen inbegrepen. Internationale vluchten kunnen apart of als pakket worden geboekt. De exacte details staan bij elke reis vermeld."
        },
        {
            question: "Hoe zit het met duurzaamheid?",
            answer: "Als B Corp gecertificeerd bedrijf zetten we ons in voor duurzaam reizen. We compenseren CO2, werken met lokale partners, ondersteunen gemeenschapsprojecten en kiezen voor milieuvriendelijke accommodaties waar mogelijk."
        },
        {
            question: "Wat als er iets misgaat tijdens mijn reis?",
            answer: "U krijgt voor vertrek een 24/7 noodnummer. Lokaal hebben we partners die u kunnen helpen. Daarnaast zijn we aangesloten bij SGR en ANVR, wat extra zekerheid biedt."
        },
        {
            question: "Wanneer is de beste tijd om te boeken?",
            answer: "We raden aan om minimaal 3-6 maanden van tevoren te boeken, vooral voor populaire bestemmingen en hoogseizoen. Zo hebben we de meeste keus in accommodaties en kunnen we de beste prijs garanderen."
        },
        {
            question: "Regelen jullie ook de vluchten?",
            answer: "Ja, wij kunnen internationale vluchten voor u regelen als onderdeel van uw reispakket. Maar u kunt ook zelf uw vluchten boeken als u dat prefereert."
        }
    ],

    // Conversation Flows for decision support
    decisionFlows: {
        destination: {
            questions: [
                {
                    id: "travel_type",
                    text: "Wat voor soort reis heeft u in gedachten?",
                    options: [
                        { value: "relaxation", label: "Ontspanning & stranden", icon: "🏖️" },
                        { value: "adventure", label: "Avontuur & actief", icon: "🏔️" },
                        { value: "culture", label: "Cultuur & geschiedenis", icon: "🏛️" },
                        { value: "nature", label: "Natuur & wildlife", icon: "🌿" },
                        { value: "family", label: "Familiereis", icon: "👨‍👩‍👧‍👦" }
                    ]
                },
                {
                    id: "duration",
                    text: "Hoelang wilt u op reis?",
                    options: [
                        { value: "short", label: "1-2 weken", icon: "📅" },
                        { value: "medium", label: "2-3 weken", icon: "📅" },
                        { value: "long", label: "3+ weken", icon: "📅" }
                    ]
                },
                {
                    id: "budget",
                    text: "Wat is uw budgetindicatie per persoon?",
                    options: [
                        { value: "budget", label: "€1.500 - €2.500", icon: "💰" },
                        { value: "mid", label: "€2.500 - €4.000", icon: "💰💰" },
                        { value: "luxury", label: "€4.000+", icon: "💰💰💰" }
                    ]
                },
                {
                    id: "climate",
                    text: "Welk klimaat heeft uw voorkeur?",
                    options: [
                        { value: "tropical", label: "Tropisch warm", icon: "☀️" },
                        { value: "moderate", label: "Gematigd", icon: "🌤️" },
                        { value: "varied", label: "Maakt niet uit", icon: "🌈" }
                    ]
                }
            ]
        }
    },

    // Greeting messages
    greetings: {
        welcome: [
            "Welkom bij Riksja Travel! Ik ben uw virtuele reisassistent. Hoe kan ik u helpen bij het plannen van uw droomreis?",
            "Hallo! Fijn dat u bij Riksja Travel bent. Ik help u graag op weg naar uw volgende avontuur. Waar droomt u van?",
            "Goedendag! Als uw persoonlijke reisassistent sta ik klaar om u te helpen met al uw reisvragen. Waar kan ik u mee van dienst zijn?"
        ],
        returning: "Welkom terug! Fijn u weer te zien. Waar kan ik u vandaag mee helpen?"
    },

    // Suggested quick replies
    quickReplies: {
        initial: [
            { text: "Bestemmingen verkennen", icon: "🌍" },
            { text: "Familiereis plannen", icon: "👨‍👩‍👧‍👦" },
            { text: "Avontuurlijke reis", icon: "🏔️" },
            { text: "Duurzaam reizen", icon: "🌿" }
        ],
        destination: [
            { text: "Vertel me meer", icon: "ℹ️" },
            { text: "Beste reistijd?", icon: "📅" },
            { text: "Wat kost dit?", icon: "💰" },
            { text: "Andere bestemming", icon: "🔄" }
        ],
        booking: [
            { text: "Offerte aanvragen", icon: "📋" },
            { text: "Bel mij terug", icon: "📞" },
            { text: "Meer informatie", icon: "ℹ️" }
        ]
    }
};

// Export for use in chatbot
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RiksjaKnowledgeBase;
}
