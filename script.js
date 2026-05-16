/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Staggered Entrance Animation for Cards
    const cards = document.querySelectorAll('#cards-container > *');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 * (index + 1)}s`;
    });

    // 2. Parallax Effect for Background Blobs
    const blobs = document.querySelectorAll('.bg-accent-blue\\/10, .bg-accent-purple\\/10, .bg-accent-cyan\\/5');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // 3. vCard Generation Logic
    const vcardData = {
        name: "N AMARNADH REDDY",
        role: "Founder & CRO",
        phone: "9542710588",
        email: "its.amarnadh123@gmail.com",
        linkedin: "https://www.linkedin.com/in/n-amarnadh-reddy/",
        website: "https://trovofi.in"
    };

    function downloadVCard() {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${vcardData.name}
ORG:${vcardData.role}
TEL;TYPE=CELL:${vcardData.phone}
EMAIL;TYPE=INTERNET:${vcardData.email}
URL:${vcardData.website}
X-SOCIALPROFILE;TYPE=linkedin:${vcardData.linkedin}
END:VCARD`;

        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${vcardData.name.replace(/\s+/g, '_')}.vcf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
        // Add a small haptic-like visual feedback
        const btn = document.getElementById('vcard-btn') || document.getElementById('fab-btn');
        btn.classList.add('scale-90');
        setTimeout(() => btn.classList.remove('scale-90'), 200);
    }

    const vcardBtn = document.getElementById('vcard-btn');
    const fabBtn = document.getElementById('fab-btn');

    if (vcardBtn) vcardBtn.addEventListener('click', downloadVCard);
    if (fabBtn) fabBtn.addEventListener('click', downloadVCard);

    // 4. Click State Logic (img 2 vs img 3 feeling)
    const cardItems = document.querySelectorAll('.card-item');
    cardItems.forEach(card => {
        card.addEventListener('click', (e) => {
            // Toggle a "clicked" state visually
            const inner = card.querySelector('div');
            inner.classList.add('bg-white', 'text-[#FF0080]');
            inner.classList.remove('bg-[#FF0080]', 'text-white');
            
            setTimeout(() => {
                inner.classList.remove('bg-white', 'text-[#FF0080]');
                inner.classList.add('bg-[#FF0080]', 'text-white');
            }, 500);
        });
    });
});
