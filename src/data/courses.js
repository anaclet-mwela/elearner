export const courses = [
    {
        id: 'windows-11',
        title: {
            en: 'Windows 11 Basics',
            fr: 'Les Bases de Windows 11'
        },
        description: {
            en: 'Learn to navigate the desktop, start menu, and manage files in the latest Windows.',
            fr: 'Apprenez à naviguer sur le bureau, le menu Démarrer et à gérer les fichiers dans le dernier Windows.'
        },
        icon: '🪟',
        color: '#0078d4',
        price: 19.99,
        lessons: [
            {
                id: 'navigating-desktop',
                title: {
                    en: 'Navigating the Desktop',
                    fr: 'Naviguer sur le Bureau'
                },
                description: {
                    en: 'Master the fundamentals of the Windows 11 desktop interface',
                    fr: 'Maîtrisez les fondamentaux de l\'interface du bureau Windows 11'
                },
                duration: {
                    en: '5-10 minutes',
                    fr: '5-10 minutes'
                },
                isLocked: false,
                steps: [
                    {
                        id: 0,
                        type: 'overview',
                        title: {
                            en: 'Navigating the Desktop',
                            fr: 'Naviguer sur le Bureau'
                        },
                        content: {
                            en: 'Welcome to your first lesson! In this lesson, you\'ll learn how to navigate the Windows 11 desktop and use its essential features.',
                            fr: 'Bienvenue dans votre première leçon ! Dans cette leçon, vous apprendrez à naviguer sur le bureau Windows 11 et à utiliser ses fonctionnalités essentielles.'
                        },
                        objectives: {
                            en: [
                                'Locate and use the Start button',
                                'Open the Start menu',
                                'Access system settings',
                                'Understand the taskbar layout'
                            ],
                            fr: [
                                'Localiser et utiliser le bouton Démarrer',
                                'Ouvrir le menu Démarrer',
                                'Accéder aux paramètres système',
                                'Comprendre la disposition de la barre des tâches'
                            ]
                        }
                    },
                    {
                        id: 1,
                        type: 'interactive',
                        instruction: {
                            en: 'Click the Start button',
                            fr: 'Cliquez sur le bouton Démarrer'
                        },
                        beforeExplanation: {
                            en: 'The Start button is the Windows logo icon located at the bottom-left corner of your screen on the taskbar. It\'s one of the most important buttons in Windows, giving you access to all your applications, files, and settings. The button glows when you hover over it.',
                            fr: 'Le bouton Démarrer est l\'icône du logo Windows située dans le coin inférieur gauche de votre écran sur la barre des tâches. C\'est l\'un des boutons les plus importants de Windows, vous donnant accès à toutes vos applications, fichiers et paramètres. Le bouton brille lorsque vous le survolez.'
                        },
                        afterExplanation: {
                            en: 'Excellent! You\'ve opened the Start menu. This menu is divided into two main sections: "Pinned" apps (your most-used applications) at the top, and "Recommended" items (recently opened files and apps) at the bottom. At the very bottom, you\'ll find the power button and your user profile.',
                            fr: 'Excellent ! Vous avez ouvert le menu Démarrer. Ce menu est divisé en deux sections principales : les applications "Épinglées" (vos applications les plus utilisées) en haut, et les éléments "Recommandés" (fichiers et applications récemment ouverts) en bas. Tout en bas, vous trouverez le bouton d\'alimentation et votre profil utilisateur.'
                        },
                        action: 'click',
                        targetId: 'start-button',
                    },
                    {
                        id: 2,
                        type: 'interactive',
                        instruction: {
                            en: 'Click on the Settings icon',
                            fr: 'Cliquez sur l\'icône Paramètres'
                        },
                        beforeExplanation: {
                            en: 'Now that the Start menu is open, look for the gray gear icon labeled "Settings". The Settings app allows you to customize almost every aspect of Windows, from your wallpaper to your internet connection.',
                            fr: 'Maintenant que le menu Démarrer est ouvert, recherchez l\'icône d\'engrenage grise intitulée "Paramètres". L\'application Paramètres vous permet de personnaliser presque tous les aspects de Windows, de votre fond d\'écran à votre connexion Internet.'
                        },
                        afterExplanation: {
                            en: 'Perfect! You\'ve launched the Settings app. Notice the sidebar on the left with different categories like System, Bluetooth, and Personalization. We\'ll explore these in more detail in future lessons.',
                            fr: 'Parfait ! Vous avez lancé l\'application Paramètres. Remarquez la barre latérale à gauche avec différentes catégories comme Système, Bluetooth et Personalisation. Nous les explorerons plus en détail dans les futures leçons.'
                        },
                        action: 'click',
                        targetId: 'settings-app',
                    },
                    {
                        id: 3,
                        type: 'interactive',
                        instruction: {
                            en: 'Close the Settings window',
                            fr: 'Fermez la fenêtre Paramètres'
                        },
                        beforeExplanation: {
                            en: 'The Settings window is now open. To close any application in Windows, you usually click the X button in the top-right corner of the window.',
                            fr: 'La fenêtre Paramètres est maintenant ouverte. Pour fermer n\'importe quelle application dans Windows, vous cliquez généralement sur le bouton X dans le coin supérieur droit de la fenêtre.'
                        },
                        afterExplanation: {
                            en: 'Great job! You now know how to open applications from the Start menu and close them correctly. That concludes your first lesson!',
                            fr: 'Excellent travail ! Vous savez maintenant comment ouvrir des applications depuis le menu Démarrer et les fermer correctement. Ceci conclut votre première leçon !'
                        },
                        action: 'click',
                        targetId: 'close-settings',
                    },
                    {
                        id: 4,
                        type: 'quiz',
                        title: {
                            en: 'Knowledge Check',
                            fr: 'Quiz de Connaissances'
                        },
                        questions: [
                            {
                                id: 'q1',
                                text: {
                                    en: 'Which button opens the Start menu?',
                                    fr: 'Quel bouton ouvre le menu Démarrer ?'
                                },
                                options: [
                                    { id: 'a', text: { en: 'The Windows icon', fr: 'L\'icône Windows' }, isCorrect: true },
                                    { id: 'b', text: { en: 'The Recycle Bin', fr: 'La Corbeille' }, isCorrect: false },
                                    { id: 'c', text: { en: 'The folder icon', fr: 'L\'icône de dossier' }, isCorrect: false }
                                ]
                            },
                            {
                                id: 'q2',
                                text: {
                                    en: 'How do you close an application window?',
                                    fr: 'Comment fermer une fenêtre d\'application ?'
                                },
                                options: [
                                    { id: 'a', text: { en: 'Click inside the window', fr: 'Cliquez à l\'intérieur de la fenêtre' }, isCorrect: false },
                                    { id: 'b', text: { en: 'Click the X in the top-right', fr: 'Cliquez sur le X en haut à droite' }, isCorrect: true },
                                    { id: 'c', text: { en: 'Turn off the screen', fr: 'Éteignez l\'écran' }, isCorrect: false }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'managing-files',
                title: 'Managing Files & Folders',
                description: 'Learn to organize, create, and navigate files using File Explorer',
                duration: '10-15 minutes',
                isLocked: true,
                steps: [
                    {
                        id: 0,
                        type: 'overview',
                        title: 'Managing Files & Folders',
                        content: 'In this lesson, you\'ll master File Explorer, the essential tool for managing all your documents, photos, and files on your computer.',
                        objectives: [
                            'Open File Explorer',
                            'Navigate between folders',
                            'Create new folders',
                            'Understand the file system structure'
                        ]
                    }
                ]
            },
            {
                id: 'customizing-windows',
                title: 'Customizing Windows',
                description: 'Personalize your desktop with themes, wallpapers, and colors',
                duration: '8-12 minutes',
                isLocked: true,
                steps: [
                    {
                        id: 0,
                        type: 'overview',
                        title: 'Customizing Windows',
                        content: 'Make Windows 11 truly yours by learning how to customize its appearance and behavior.',
                        objectives: [
                            'Change desktop wallpaper',
                            'Apply color themes',
                            'Adjust taskbar settings',
                            'Configure dark mode'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'word',
        title: 'Microsoft Word',
        description: 'Master document creation, formatting, and layout tools.',
        icon: '📄',
        color: '#2b579a',
        price: 29.99,
        lessons: [
            {
                id: 'word-getting-started',
                title: { en: 'Getting Started with Word', fr: 'Débuter avec Word' },
                description: { en: 'Create your first document and learn the interface.', fr: 'Créez votre premier document et découvrez l\'interface.' },
                duration: { en: '5-8 minutes', fr: '5-8 minutes' },
                isLocked: false,
                steps: [
                    {
                        id: 0,
                        type: 'overview',
                        title: { en: 'Welcome to Word', fr: 'Bienvenue dans Word' },
                        content: {
                            en: 'Microsoft Word is the world standard for word processing. In this lesson, you will learn how to create a new document and start typing.',
                            fr: 'Microsoft Word est la norme mondiale pour le traitement de texte. Dans cette leçon, vous apprendrez à créer un nouveau document et à commencer à taper.'
                        },
                        objectives: {
                            en: ['Create a blank document', 'Type text on the page', 'Understand the layout'],
                            fr: ['Créer un document vierge', 'Taper du texte sur la page', 'Comprendre la mise en page']
                        }
                    },
                    {
                        id: 1,
                        type: 'interactive',
                        instruction: { en: 'Click "Blank document" to start.', fr: 'Cliquez sur "Document vierge" pour commencer.' },
                        beforeExplanation: {
                            en: 'When you open Word, you start on the Home screen. Here you can access recent files or create new ones using templates.',
                            fr: 'Lorsque vous ouvrez Word, vous démarrez sur l\'écran d\'accueil. Ici, vous pouvez accéder aux fichiers récents ou en créer de nouveaux à l\'aide de modèles.'
                        },
                        afterExplanation: {
                            en: 'Great! You have opened the main Editor. The large white area is your paper, and the bar at the top is called the Ribbon.',
                            fr: 'Super ! Vous avez ouvert l\'éditeur principal. La grande zone blanche est votre papier et la barre en haut s\'appelle le Ruban.'
                        },
                        action: 'click',
                        targetId: 'word-blank-doc'
                    },
                    {
                        id: 2,
                        type: 'interactive',
                        instruction: { en: 'Click on the white page to type.', fr: 'Cliquez sur la page blanche pour écrire.' },
                        beforeExplanation: {
                            en: 'To start writing, simply click where you want the text to appear. The blinking line is your cursor.',
                            fr: 'Pour commencer à écrire, cliquez simplement là où vous voulez que le texte apparaisse. La ligne clignotante est votre curseur.'
                        },
                        afterExplanation: {
                            en: 'Excellent! You have typed your first text. Word automatically handles line wrapping and basic layout for you.',
                            fr: 'Excellent ! Vous avez tapé votre premier texte. Word gère automatiquement les retours à la ligne et la mise en page de base pour vous.'
                        },
                        action: 'click',
                        targetId: 'word-document'
                    },
                    {
                        id: 3,
                        type: 'quiz',
                        title: { en: 'Knowledge Check', fr: 'Quiz' },
                        questions: [
                            {
                                id: 'q1',
                                text: { en: 'What is the top bar called?', fr: 'Comment s\'appelle la barre supérieure ?' },
                                options: [
                                    { id: 'a', text: { en: ' The Ribbon', fr: 'Le Ruban' }, isCorrect: true },
                                    { id: 'b', text: { en: 'The Shoelace', fr: 'Le Lacet' }, isCorrect: false }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'word-formatting',
                title: { en: 'Basic Formatting', fr: 'Mise en forme de base' },
                description: { en: 'Make your text pop with Bold and Alignment.', fr: 'Mettez votre texte en valeur avec Gras et Alignement.' },
                duration: { en: '5-10 minutes', fr: '5-10 minutes' },
                isLocked: true,
                steps: [
                    {
                        id: 0,
                        type: 'overview',
                        title: { en: 'Basic Formatting', fr: 'Mise en forme de base' },
                        content: {
                            en: 'Plain text is boring. Learn how to style your document using the Ribbon commands like Bold and Align.',
                            fr: 'Le texte brut est ennuyeux. Apprenez à styliser votre document à l\'aide des commandes du Ruban comme Gras et Aligner.'
                        },
                        objectives: { en: ['Select text', 'Apply Bold style', 'Center align text'], fr: ['Sélectionner du texte', 'Appliquer le style Gras', 'Centrer le texte'] }
                    },
                    {
                        id: 1,
                        type: 'interactive',
                        instruction: { en: 'Click "Blank document" to start.', fr: 'Cliquez sur "Document vierge" pour commencer.' },
                        beforeExplanation: null, // Skip explanation if user knows
                        afterExplanation: null,
                        action: 'click',
                        targetId: 'word-blank-doc'
                    },
                    {
                        id: 2,
                        type: 'interactive',
                        instruction: { en: 'Click the document to type text.', fr: 'Cliquez sur le document pour taper du texte.' },
                        afterExplanation: null,
                        action: 'click',
                        targetId: 'word-document'
                    },
                    {
                        id: 3,
                        type: 'interactive',
                        instruction: { en: 'Click the text "My First Document" to select it.', fr: 'Cliquez sur le texte "My First Document" pour le sélectionner.' },
                        beforeExplanation: {
                            en: 'Before you can change how text looks, you must select it. Usually you drag your mouse, but here just click the text.',
                            fr: 'Avant de pouvoir modifier l\'apparence du texte, vous devez le sélectionner. Habituellement, vous faites glisser votre souris, mais ici, cliquez simplement sur le texte.'
                        },
                        afterExplanation: { en: 'Text selected! Note the blue highlight.', fr: 'Texte sélectionné ! Notez la surbrillance bleue.' },
                        action: 'click',
                        targetId: 'word-text'
                    },
                    {
                        id: 4,
                        type: 'interactive',
                        instruction: { en: 'Click the "B" icon to make it Bold.', fr: 'Cliquez sur l\'icône "B" pour le mettre en gras.' },
                        afterExplanation: { en: 'Bold moved! The text is now thicker and stands out.', fr: 'Mouvement audacieux ! Le texte est maintenant plus épais et ressort.' },
                        action: 'click',
                        targetId: 'word-bold-btn'
                    },
                    {
                        id: 5,
                        type: 'interactive',
                        instruction: { en: 'Click the Center Align icon.', fr: 'Cliquez sur l\'icône Aligner au centre.' },
                        afterExplanation: { en: 'Perfectly centered. Titles look best when centered.', fr: 'Parfaitement centré. Les titres sont mieux centrés.' },
                        action: 'click',
                        targetId: 'word-align-center'
                    },
                    {
                        id: 6,
                        type: 'quiz',
                        title: { en: 'Knowledge Check', fr: 'Quiz' },
                        questions: [
                            {
                                id: 'q1',
                                text: { en: 'What must you do before formatting text?', fr: 'Que devez-vous faire avant de formater du texte ?' },
                                options: [
                                    { id: 'a', text: { en: 'Select it', fr: 'Le sélectionner' }, isCorrect: true },
                                    { id: 'b', text: { en: 'Ask it nicely', fr: 'Lui demander gentiment' }, isCorrect: false }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'excel',
        title: 'Microsoft Excel',
        description: 'Learn spreadsheets, formulas, and data visualization.',
        icon: '📊',
        color: '#217346',
        price: 29.99,
        lessons: []
    },
    {
        id: 'powerpoint',
        title: 'Microsoft PowerPoint',
        description: 'Create stunning presentations with slides, animations, and transitions.',
        icon: '📽️',
        color: '#d24726',
        price: 29.99,
        lessons: []
    }
];

export const packages = [
    {
        id: 'office-bundle',
        title: 'Bureautique Package',
        description: 'Master the entire Microsoft Office suite: Word, Excel, and PowerPoint.',
        price: 69.99,
        courseIds: ['word', 'excel', 'powerpoint'],
        icon: '💼',
        color: '#2b579a'
    }
];
