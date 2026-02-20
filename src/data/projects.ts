export interface Project {
    id: string;
    title: string;
    category: string;
    img: string;
    tags: string[];
    description: string;
    shortDescription: string;
    techStack: string[];
    fullContent: string;
    client?: string;
    year?: string;
    role?: string;
}

export const projects: Project[] = [
    {
        id: 'eco-sphere-dashboard',
        title: 'EcoSphere Dashboard',
        category: 'Web Development',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070',
        tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        shortDescription: 'Modern environmental tracking dashboard with real-time data visualization and predictive analytics.',
        description: 'A comprehensive solution for monitoring environmental metrics, featuring a sleek, glassmorphic UI and optimized performance for high-volume data streams.',
        techStack: ['Next.js 14', 'TypeScript', 'Highcharts', 'Supabase', 'Framer Motion'],
        fullContent: 'EcoSphere Dashboard was commissioned by a leading environmental NGO to track global carbon offsets and local air quality metrics. The challenge was to present complex data in an intuitive way. We implemented a custom-built WebGL background and used real-time socket connections to ensure data accuracy. The resulting platform saw a 40% increase in user engagement for their data reporting tools.',
        client: 'EcoWatch Global',
        year: '2024',
        role: 'Lead Full-Stack Developer'
    },
    {
        id: 'quantum-pay-app',
        title: 'QuantumPay Mobile',
        category: 'App Solutions',
        img: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232',
        tags: ['React Native', 'Node.js', 'PostgreSQL'],
        shortDescription: 'Zero-fee cross-border payment application using blockchain technology for near-instant settlements.',
        description: 'A secure and lightning-fast mobile wallet that simplifies international transfers while maintaining strict bank-grade security protocols.',
        techStack: ['React Native', 'Expo', 'Web3.js', 'Node.js', 'Stripe API'],
        fullContent: 'QuantumPay aimed to disrupt the expensive remittance market. By leveraging distributed ledger technology, we reduced transaction costs to nearly zero. The app features biometric authentication, multi-currency support, and a conversational interface for managing transfers. Within six months of launch, QuantumPay processed over $50M in transactions across 12 countries.',
        client: 'Quantum Fintech',
        year: '2023',
        role: 'Mobile Lead'
    },
    {
        id: 'nova-security-audit',
        title: 'Nova Guard System',
        category: 'Cyber Security',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070',
        tags: ['Python', 'Docker', 'AWS'],
        shortDescription: 'Automated penetration testing and vulnerability management platform for enterprise cloud infrastructure.',
        description: 'An advanced security suite that provides 24/7 monitoring and threat detection, with automated remediation for common security misconfigurations.',
        techStack: ['Python', 'Go', 'Kubernetes', 'ELK Stack', 'HashiCorp Vault'],
        fullContent: 'Nova Guard was designed to bridge the gap between development speed and security compliance. Using automated scanning engines and behavioral analysis, we provided a system that identifies zero-day vulnerabilities before they can be exploited. The platform integrates directly into CI/CD pipelines, flagging security risks in real-time.',
        client: 'Nova Solutions Inc.',
        year: '2024',
        role: 'Security Architect'
    },
    {
        id: 'apex-ai-advisor',
        title: 'Apex AI Advisor',
        category: 'AI Integration',
        img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074',
        tags: ['PyTorch', 'OpenAI', 'FastAPI'],
        shortDescription: 'Generative AI assistant for financial advisors, automating market analysis and personalized reporting.',
        description: 'A custom LLM implementation that analyzes thousands of market data points to provide actionable insights tailored to specific client portfolios.',
        techStack: ['Python', 'FastAPI', 'OpenAI API', 'LangChain', 'Pinecone'],
        fullContent: 'The Apex AI Advisor was built to handle the information overload facing modern financial planners. We fine-tuned a large language model on historical financial data and current market news to generate compliant, personalized client communications. This tool reduced the time spent on administrative tasks by 60% for advisor teams.',
        client: 'Apex Wealth Management',
        year: '2024',
        role: 'AI Engineer'
    },
    {
        id: 'cyber-pulse-rebrand',
        title: 'Cyber Pulse Identity',
        category: 'Digital Strategy',
        img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070',
        tags: ['Figma', 'Strategy', 'Branding'],
        shortDescription: 'Complete digital transformation and brand revitalization for a legacy technology company.',
        description: 'A strategic overhaul of market positioning, visual identity, and digital presence to appeal to a younger, developer-centric audience.',
        techStack: ['Figma', 'Adobe Creative Suite', 'Google Analytics', 'HubSpot'],
        fullContent: 'Cyber Pulse had an incredible product but a dated image. Our strategy involved a ground-up redesign of their visual language—introducing dark modes, vibrant accents, and high-fidelity animations. We also restructured their content strategy to focus on technical depth and community engagement, resulting in a 120% increase in developer signups.',
        client: 'Cyber Pulse Systems',
        year: '2023',
        role: 'Creative Director'
    },
    {
        id: 'zenith-ecom-platform',
        title: 'Zenith Marketplace',
        category: 'Web Development',
        img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070',
        tags: ['Next.js', 'Shopify', 'Three.js'],
        shortDescription: 'High-end e-commerce platform with 3D product previews and localized shopping experiences.',
        description: 'A luxury shopping experience that combines high-performance web tech with immersive 3D product interactions for global artisans.',
        techStack: ['Next.js', 'GraphQL', 'Shopify Storefront API', 'Three.js'],
        fullContent: 'Zenith Marketplace needed to bridge the gap between the physical and digital shopping experience. We implemented 3D product viewing using Three.js, allowing customers to inspect artisanal goods from every angle. Integrated with a global logistics API, the platform handles multi-currency and multi-language support seamlessly across four continents.',
        client: 'Zenith Collective',
        year: '2024',
        role: 'Front-end Architect'
    }
];
