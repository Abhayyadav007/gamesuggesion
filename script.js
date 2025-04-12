class ChatBot {
    constructor() {
        this.messages = document.getElementById('messages');
        this.form = document.getElementById('chat-form');
        this.input = document.getElementById('user-input');

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.scrollToBottom();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const userInput = this.input.value.trim();
        if (!userInput) return;

        // Add user message
        this.addMessage('user', userInput);
        this.input.value = '';
        this.input.disabled = true;

        // Show loading state
        const loadingDiv = this.addLoading();

        try {
            // Simulate API call with longer delay for more realistic feel
            await new Promise(resolve => setTimeout(resolve, 1500));

            const response = this.generateResponse(userInput);
            this.addMessage('assistant', response);
        } catch (error) {
            console.error('Error:', error);
            this.addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        } finally {
            loadingDiv.remove();
            this.input.disabled = false;
            this.input.focus();
        }
    }

    addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${this.escapeHtml(content)}
            </div>
        `;
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message assistant';
        loadingDiv.innerHTML = `
            <div class="message-content loading">
                <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
            </div>
        `;
        this.messages.appendChild(loadingDiv);
        this.scrollToBottom();
        return loadingDiv;
    }

    generateResponse(userInput) {
        const games = {
            'csgo': `For CS:GO, here are some top skin recommendations:

1. AK-47:
   - Asiimov (Factory New)
   - Wild Lotus
   - X-Ray
   - Gold Arabesque
   - Panthera onca

2. M4A4:
   - Howl
   - Neo-Noir
   - The Emperor
   - Cyber Security
   - Spider Lily

3. AWP:
   - Dragon Lore
   - Gungnir
   - Wild Fire
   - The Prince
   - Chromatic Aberration

4. Knife options:
   - Butterfly Knife | Doppler
   - Karambit | Fade
   - M9 Bayonet | Crimson Web
   - Skeleton Knife | Case Hardened`,

            'valorant': `For Valorant, here are the most sought-after skin collections:

1. Phantom:
   - Protocol 781-A
   - Ion
   - Oni
   - Recon
   - Ruination

2. Vandal:
   - Prime
   - Reaver
   - Glitchpop
   - Champions 2021
   - RGX 11z Pro

3. Operator:
   - Origin
   - Ion
   - Reaver
   - Sentinel of Light
   - Protocol 781-A

4. Melee:
   - RGX 11z Pro Blade
   - Champions 2022 Karambit
   - Reaver Karambit
   - Prime 2.0 Karambit
   - Celestial Fan`,

            'fortnite': `For Fortnite, here are the most popular skin collections:

1. Iconic Series:
   - Galaxy
   - Ikonik
   - Glow
   - Wonder
   - Honor Guard

2. Gaming Legends:
   - Master Chief
   - Kratos
   - Aloy
   - Lara Croft
   - Chris Redfield

3. Icon Series:
   - Ninja
   - TheGrefg
   - Loserfruit
   - Lachlan
   - Bugha

4. Superhero Collaborations:
   - Spider-Man
   - Batman Zero
   - Black Widow
   - Superman
   - Wonder Woman`,

            'apex': `For Apex Legends, here are the best legendary skins:

1. Wraith:
   - Void Specialist
   - Quarantine 722
   - Airship Assassin
   - Protector of the Void
   - Marble Goddess

2. Pathfinder:
   - War Machine
   - Model P
   - Memoir Noir
   - SRVN MRVN
   - Elegant Mechanics

3. Octane:
   - Red Shift
   - Jade Tiger
   - Laughing Fool
   - Fast Fashion
   - El Tigre`,

            'dota2': `For Dota 2, here are some of the most valuable cosmetic items:

1. Arcanas:
   - Demon Eater (Shadow Fiend)
   - Fractal Horns (Terrorblade)
   - Great Sage's Reckoning (Monkey King)
   - Bladeform Legacy (Juggernaut)
   - Manifold Paradox (Phantom Assassin)

2. Immortal Items:
   - Golden Baby Roshan
   - Alpine Stalker's Set
   - Dragon Claw Hook
   - Ethereal Flames War Dog
   - Golden Gravelmaw`,

            'rocketleague': `For Rocket League, here are the most popular items:

1. Black Market Decals:
   - Mainframe
   - Dissolver
   - Interstellar
   - Fire God
   - Heatwave

2. Wheels:
   - Titanium White Zomba
   - Black Dieci
   - Titanium White Apex
   - Black Tunica
   - Cristianos`,

            'pubg': `For PUBG, here are some of the most valuable skins:

1. Weapon Skins:
   - Gold Plate - Kar98k
   - Dragon Lore - AWM
   - Glory - AKM
   - Elegant - M416
   - Glacier - M416

2. Character Outfits:
   - PUBG 1.0 Trenchcoat
   - Target Practice Set
   - Gold Plate Set
   - Leopard Print Set
   - Survivalist Set`
        };

        const lowercaseInput = userInput.toLowerCase();

        // Check for exact game matches first
        for (const [game, response] of Object.entries(games)) {
            if (lowercaseInput.includes(game)) {
                return response;
            }
        }

        // Check for partial matches or similar terms
        if (lowercaseInput.includes('skin') || lowercaseInput.includes('cosmetic')) {
            return `I can help you find skins for these popular games:

1. CS:GO - Weapon skins and knives
2. Valorant - Gun skins and melee weapons
3. Fortnite - Character skins and accessories
4. Apex Legends - Legend skins and weapons
5. Dota 2 - Hero cosmetics and arcanas
6. Rocket League - Car decals and items
7. PUBG - Weapon and character skins

Which game would you like to know more about?`;
        }

        return `I see you're interested in "${userInput}". I can provide detailed skin recommendations for these games:

- CS:GO
- Valorant
- Fortnite
- Apex Legends
- Dota 2
- Rocket League
- PUBG

Please specify which game you're interested in, and I'll show you the best skins available!`;
    }

    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});