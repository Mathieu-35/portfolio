/* ==========================================================
   TOUS LES TEXTES DU SITE SONT ICI. Modifie ce fichier,
   n'touche pas aux autres sauf si tu sais ce que tu fais.
   ========================================================== */
window.SITE = {
  nom: "RANDRIAMORIA Sahiniaina Mathieu",
  prenom: "Mathieu",
  titre: "Développeur Full-Stack",
  accroche: "Étudiant en informatique, je développe des applications web et mobile. Je cherche une équipe pour mettre mes compétences en pratique.",
  badge: "Disponible pour un stage de 6 mois",
  email: "randriamoria7@gmail.com",
  github: "https://github.com/Mathieu-35",
  linkedin: "https://www.linkedin.com/in/mathieu-randriamoria/",
  localisation: "Antananarivo, Madagascar",
  // Mets true pour afficher ton numéro sur le site (visible de tous, y compris des robots).
  afficherTelephone: false,
  telephone: "+261 34 06 704 36",
  cv: "CV_Mathieu_Randriamoria_Stage.pdf",

  apropos: "Je suis étudiant en 3ème année de Licence en Services Informatiques aux Organisations (SIO) à l'ESMIA, spécialisé en Génie logiciel. Le développement logiciel et la conception d'applications m'intéressent particulièrement. J'ai réalisé trois applications web et mobile, dont deux en autonomie complète. Je cherche un stage pour mettre mes compétences en pratique dans une équipe professionnelle.",

  // Si "code" contient encore des crochets [ ], le bouton s'affiche désactivé : « Code source bientôt disponible ».
  projets: [
    {
      titre: "Smart Parking 2035", date: "Juin 2026",
      contexte: "Projet académique ESMIA INNOVATION · En solo",
      description: "Application web progressive (PWA) de recommandation et de réservation de parkings. Trois espaces distincts : conducteur, gardien et administrateur, avec gestion des utilisateurs, des parkings et des réservations. Contribution au module de recommandation d'itinéraires basé sur les algorithmes Dijkstra et A*.",
      tags: ["FastAPI", "Jinja2", "PostgreSQL", "PWA"],
      code: "[LIEN_GITHUB_SMART_PARKING]",
      image: "smart-parking.jpg", alt: "Tableau de bord administrateur de Smart Parking 2035"
    },
    {
      titre: "Tantsaha Connect", date: "Mars 2026",
      contexte: "Projet académique ESMIA INNOVATION · En solo",
      description: "Application web et mobile dédiée à la mise en relation et au suivi des échanges dans le secteur agricole. Conception de l'interface et de l'expérience utilisateur, intégration d'une API météo.",
      tags: ["React", "React Native", "Node.js"],
      code: "[LIEN_GITHUB_TANTSAHA_CONNECT]",
      image: "tantsaha-connect.jpg", alt: "[À REMPLACER] Capture d'écran de Tantsaha Connect"
    },
    {
      titre: "Agenda Personnel", date: "Mai 2025",
      contexte: "Projet académique ESMIA INNOVATION · En équipe",
      description: "Application web de gestion d'agenda : création, modification, suppression, consultation et recherche d'événements, gestion des rappels. Mon rôle : développement du backend PHP et conception de l'interface responsive.",
      tags: ["PHP", "MySQL", "Bootstrap"],
      code: "[LIEN_GITHUB_AGENDA_PERSONNEL]",
      image: "agenda-personnel.jpg", alt: "[À REMPLACER] Capture d'écran d'Agenda Personnel"
    }
  ],

  competences: [
    ["Langages", ["Python", "Java", "JavaScript", "PHP"]],
    ["Front-end", ["React", "React Native", "HTML5", "CSS3", "Bootstrap"]],
    ["Back-end & Bases de données", ["FastAPI", "Node.js", "SQL", "PostgreSQL", "MySQL"]],
    ["Outils & Modélisation", ["Git", "GitHub", "UML", "Merise", "Figma (autodidacte)"]],
    ["Notions (en cours d'apprentissage)", ["Spring Boot", "Introduction au Data Engineering"]],
    ["Systèmes", ["macOS", "Linux (Debian)", "Windows"]]
  ],

  parcours: [
    { date: "2024 – en cours", titre: "Licence en Services Informatiques aux Organisations (SIO)", lieu: "ESMIA, Antananarivo", detail: "Spécialisation en L3 : Génie logiciel" },
    { date: "2020 – 2021", titre: "Baccalauréat série A2, mention Assez bien", lieu: "Lycée Privé Stella Maris, Toamasina", detail: "" }
  ],
  langues: [["Malagasy", "langue maternelle"], ["Français", "courant"], ["Anglais", "intermédiaire (B1)"]],

  contactTitre: "Vous proposez un stage ? Parlons-en."
};
