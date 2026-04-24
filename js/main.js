document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE NAV
    const navToggle = document.getElementById('mobile-nav-toggle');
    const navLinks  = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('expanded', !expanded);
        });
    }

    // 2. MAP (on homepage)
    const mapContainer = document.getElementById('night-city-map');

    if (mapContainer) {
        const infoName   = document.getElementById('info-name');
        const infoDesc   = document.getElementById('info-desc');
        const infoThreat = document.getElementById('info-threat');
        const infoCorp   = document.getElementById('info-corp');

        const districtDb = {
            'City Center':  { desc: 'The corporate heart of Night City. Skyscrapers, neon, and unmatched wealth.',       threat: 'Low (Corp Security)',  corp: 'Arasaka / Militech'    },
            'Watson':       { desc: 'A booming district recovering from an earthquake. Vibrant Kabuki markets.',           threat: 'Moderate',             corp: 'Maelstrom / Various'   },
            'Westbrook':    { desc: 'Wealthy residential and entertainment zone including gleaming Japantown.',             threat: 'Moderate',             corp: 'Tyger Claws / Arasaka' },
            'Santo Domingo':{ desc: 'Industrial heartland. Factories, power plants, and working-class struggle.',          threat: 'High',                 corp: '6th Street / Petrochem'},
            'Heywood':      { desc: 'The biggest bedroom community in NC. Diverse but dangerous.',                         threat: 'Very High',            corp: 'Valentinos / Various'  },
            'Pacifica':     { desc: 'Abandoned resort turned lawless combat zone. Netrunner stronghold.',                  threat: 'Extreme',              corp: 'Voodoo Boys'           }
        };

        const regions = mapContainer.querySelectorAll('.map-region, area');
        regions.forEach(region => {
            const dName = region.getAttribute('data-name') || region.id;
            region.setAttribute('tabindex', '0');
            region.setAttribute('role', 'button');
            region.setAttribute('aria-label', `View ${dName} district info`);

            const activate = () => {
                const data = districtDb[dName];
                if (!data) return;
                infoName.textContent   = dName;
                infoDesc.textContent   = data.desc;
                infoThreat.textContent = data.threat;
                infoCorp.textContent   = data.corp;
            };

            region.addEventListener('click', e => {
                e.preventDefault();
                activate();
            });
            region.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
            });
        });
    }


    // 3. ACCORDIONS
    document.querySelectorAll('.accordion-header').forEach(btn => {
        btn.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            const content  = this.nextElementSibling;
            const icon     = this.querySelector('.toggle-icon');

            this.setAttribute('aria-expanded', String(!expanded));
            content.classList.toggle('expanded', !expanded);
            if (icon) icon.textContent = expanded ? '[+]' : '[-]';
        });
    });


    // 4. LIGHTBOX MODAL
    const modal      = document.getElementById('district-modal');
    if (!modal) return;

    const modalTitle   = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeBtn     = modal.querySelector('.modal-close');

    // District data including character bios
    const districtData = {
        'City Center': {
            lore: 'City Center is the gleaming trophy of Night City — a fortress of corporate power. Arasaka Tower dominates the skyline. Militech runs private security contracts. The streets are clean only because cleaners come at 3am.',
            characters: [
                {
                    name: 'Adam Smasher',
                    img:  'images/adam_smasher.png',
                    bio:  'A full-conversion cyborg and Arasaka\'s most feared enforcer. Once a mercenary, he traded humanity for chrome. Smasher answers only to Saburo Arasaka and delights in the destruction of anything in his path.'
                }
            ]
        },
        'Heywood': {
            lore: 'Heywood is Night City\'s sprawling south-side district — the largest by population. Three distinct sub-districts house communities divided by wealth and gang turf. The Valentinos run the streets with a code of loyalty and violence.',
            characters: [
                {
                    name: 'Jackie Welles',
                    img:  'images/jackie_welles.png',
                    bio:  'A Heywood native and former Valentino. Jackie left the gang life behind to pursue the dream of becoming a legendary mercenary. Loyal to a fault, warm-hearted, and lethal with a pair of pistols.'
                }
            ]
        },
        'Pacifica': {
            lore: 'Pacifica was meant to be a luxury resort. The Unification War killed funding overnight. Today it\'s a crumbling, lawless war zone — the NCPD doesn\'t even bother patrolling. The Voodoo Boys rule here, and the Net runs deep.',
            characters: [
                {
                    name: 'Johnny Silverhand',
                    img:  'images/johnny_silverhand.png',
                    bio:  'Legendary rockerboy and anti-corporate terrorist. Armed with a silver cybernetic arm and a burning hatred for Arasaka, Johnny led the assault on the original Arasaka Tower in 2023. His engram lives on inside a relic chip.'
                }
            ]
        },
        'Santo Domingo': {
            lore: 'The industrial engine of Night City. Power plants, refineries, and factory floors dominate the landscape. The 6th Street gang was founded by veterans who felt abandoned by the government — a patriotic gang running a blue-collar district.',
            characters: [
                {
                    name: 'Morgan Blackhand',
                    img:  'images/morgan_blackhand.png',
                    bio:  'The best solo who ever lived, by most accounts. Cold, professional, and terrifyingly efficient. Blackhand\'s black cybernetic arm is iconic. He disappeared during the Arasaka Tower assault in 2023 — whether he\'s alive is unknown.'
                }
            ]
        },
        'Watson': {
            lore: 'Once a thriving corporate zone, Watson was cut off after an economic collapse. Now it\'s a dense grid of markets, gangs, and opportunity. Kabuki market sells everything legal and otherwise. Maelstrom controls the industrial north.',
            characters: [
                {
                    name: 'V',
                    img:  'images/v.png',
                    bio:  'A rising mercenary living out of Megabuilding H10 in Watson. V came to Night City to make a name, and ended up with a relic chip fusing them with Johnny Silverhand\'s engram. Known throughout the city for pulling off the impossible.'
                }
            ]
        },
        'Westbrook': {
            lore: 'Home to the rich, the beautiful, and the deadly. Japantown\'s neon-soaked streets host Night City\'s best clubs and worst deals. The Tyger Claws dominate through violence draped in tradition. Charter Hill houses the city\'s elite.',
            characters: [
                {
                    name: 'Judy Alvarez',
                    img:  'images/judy_alvarez.png',
                    bio:  'A brilliant braindance technician working out of Lizzie\'s Bar. Judy creates illegal BDs and fights for the rights of the Mox. She\'s fiercely loyal, technically gifted, and not afraid to take the fight directly to the Tyger Claws.'
                }
            ]
        }
    };

    let lastFocused = null;

    function openModal(districtName) {
        const data = districtData[districtName];
        if (!data) return;

        lastFocused = document.activeElement;

        modalTitle.textContent = districtName.toUpperCase() + ' — DISTRICT INTEL';

        let html = `<p class="yellow-text" style="margin-top:0"><strong>&gt;&gt;&gt; LORE EXTRACT &lt;&lt;&lt;</strong></p>`;
        html += `<p>${data.lore}</p>`;
        html += `<hr class="neon-divider">`;
        html += `<p class="yellow-text"><strong>&gt;&gt;&gt; KEY FIGURES &lt;&lt;&lt;</strong></p>`;

        data.characters.forEach(char => {
            html += `
            <div style="overflow:hidden; margin-bottom:20px;">
                <img src="${char.img}" alt="Pixel art portrait of ${char.name}" class="char-portrait">
                <div>
                    <h3 style="color:#FF00FF; margin-top:0;">${char.name}</h3>
                    <p>${char.bio}</p>
                </div>
            </div>`;
        });

        modalContent.innerHTML = html;
        modal.classList.add('active');

        // Focus close button - accessibility
        setTimeout(() => closeBtn.focus(), 50);
    }

    function closeModal() {
        modal.classList.remove('active');
        if (lastFocused) lastFocused.focus();
    }

    // Close button
    closeBtn.addEventListener('click', closeModal);

    // outside click
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    // Esc Action
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Triggers - District carcs
    document.querySelectorAll('[data-district]').forEach(card => {
        const trigger = () => openModal(card.getAttribute('data-district'));
        card.addEventListener('click', trigger);
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
        });
    });

});
