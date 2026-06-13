document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');

    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking a link (mobile)
    const navLinks = document.querySelectorAll('.toc-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('open');
            }
        });
    });

    // 2. Dark/Light Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;

    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (htmlElement.getAttribute('data-theme') === 'dark') {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    });

    // 3. Copy to Clipboard Functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.nextElementSibling.innerText;
            
            navigator.clipboard.writeText(codeBlock).then(() => {
                const originalText = btn.innerText;
                btn.innerText = 'Copied!';
                btn.style.backgroundColor = 'var(--accent-color)';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = 'var(--sidebar-hover)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // 4. Basic JunOS Syntax Highlighting (Vanilla JS approach)
    // Wrap comments in spans to apply the CSS colors
    const junosBlocks = document.querySelectorAll('.language-junos');
    junosBlocks.forEach(block => {
        let html = block.innerHTML;
        // Basic regex to highlight comments starting with ##
        html = html.replace(/(##.*)/g, '<span style="color: var(--junos-comment);">$1</span>');
        // Basic regex to highlight key networking terms
        html = html.replace(/\b(set|delete|edit|up|down|commit|show|ping)\b/g, '<span style="color: var(--junos-keyword);">$1</span>');
        block.innerHTML = html;
    });
});