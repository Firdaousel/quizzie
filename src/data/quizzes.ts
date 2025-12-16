import { Quiz } from "@/types/quiz";
import { getAllQuizzes } from "@/lib/quizStorage";

export const quizzes: Quiz[] = [
  {
    id: "retail",
    title: "Retail",
    description: "Testez vos connaissances sur le secteur du retail",
    questions: [
      {
        id: "r1",
        text: "Qu'est-ce que le merchandising ?",
        options: [
          "La gestion des stocks",
          "L'art de présenter les produits pour optimiser les ventes",
          "Le service après-vente",
          "La comptabilité d'un magasin"
        ],
        correctAnswer: 1
      },
      {
        id: "r2",
        text: "Que signifie l'acronyme PLV ?",
        options: [
          "Publicité sur Lieu de Vente",
          "Prix Libre de Vente",
          "Promotion Limitée en Valeur",
          "Plan de Livraison Validé"
        ],
        correctAnswer: 0
      },
      {
        id: "r3",
        text: "Quel est l'objectif principal du facing en rayon ?",
        options: [
          "Augmenter le prix des produits",
          "Maximiser la visibilité des produits",
          "Réduire les coûts de stockage",
          "Faciliter l'inventaire"
        ],
        correctAnswer: 1
      },
      {
        id: "r4",
        text: "Qu'est-ce qu'un taux de transformation en retail ?",
        options: [
          "Le pourcentage de visiteurs qui effectuent un achat",
          "Le taux de change d'une devise",
          "La marge bénéficiaire d'un produit",
          "Le taux de rotation des stocks"
        ],
        correctAnswer: 0
      },
      {
        id: "r5",
        text: "Que désigne le terme 'Cross-selling' ?",
        options: [
          "Vendre des produits défectueux",
          "Vendre à l'international",
          "Vendre des produits complémentaires",
          "Vendre en ligne et en magasin"
        ],
        correctAnswer: 2
      },
      {
        id: "r6",
        text: "Qu'est-ce que le ROPO ?",
        options: [
          "Research Online, Purchase Offline",
          "Retail Optimization Process Online",
          "Return of Product Order",
          "Retail Online Purchase Option"
        ],
        correctAnswer: 0
      },
      {
        id: "r7",
        text: "Quelle est la définition du taux de démarque ?",
        options: [
          "Le pourcentage de produits vendus",
          "La perte de valeur des stocks (vols, casse, obsolescence)",
          "Le taux de satisfaction client",
          "La marge commerciale moyenne"
        ],
        correctAnswer: 1
      },
      {
        id: "r8",
        text: "Que signifie le terme 'Up-selling' ?",
        options: [
          "Vendre des produits en promotion",
          "Vendre plus cher qu'un concurrent",
          "Proposer un produit de gamme supérieure",
          "Augmenter les prix régulièrement"
        ],
        correctAnswer: 2
      },
      {
        id: "r9",
        text: "Qu'est-ce qu'un planogramme ?",
        options: [
          "Un planning des employés",
          "Un schéma d'implantation des produits en rayon",
          "Un plan de marketing annuel",
          "Un programme de fidélisation"
        ],
        correctAnswer: 1
      },
      {
        id: "r10",
        text: "Que désigne le 'panier moyen' ?",
        options: [
          "Le prix moyen d'un produit",
          "Le montant moyen dépensé par client",
          "Le nombre moyen de produits achetés",
          "Le temps moyen passé en magasin"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "thailande",
    title: "Thaïlande",
    description: "Testez vos connaissances sur la culture et l'histoire de la Thaïlande",
    questions: [
      {
        id: "t1",
        text: "Quelle est la capitale de la Thaïlande ?",
        options: [
          "Phuket",
          "Bangkok",
          "Chiang Mai",
          "Pattaya"
        ],
        correctAnswer: 1
      },
      {
        id: "t2",
        text: "Quelle est la monnaie officielle de la Thaïlande ?",
        options: [
          "Le Dong",
          "Le Yen",
          "Le Baht",
          "Le Ringgit"
        ],
        correctAnswer: 2
      },
      {
        id: "t3",
        text: "Comment s'appelle le célèbre temple de Bangkok avec un Bouddha couché de 46 mètres ?",
        options: [
          "Wat Arun",
          "Wat Phra Kaew",
          "Wat Pho",
          "Wat Saket"
        ],
        correctAnswer: 2
      },
      {
        id: "t4",
        text: "Quel est le nom traditionnel de la Thaïlande ?",
        options: [
          "Siam",
          "Indochine",
          "Birmanie",
          "Khmer"
        ],
        correctAnswer: 0
      },
      {
        id: "t5",
        text: "Quelle fête thaïlandaise célèbre le Nouvel An avec des batailles d'eau ?",
        options: [
          "Loy Krathong",
          "Songkran",
          "Visakha Bucha",
          "Makha Bucha"
        ],
        correctAnswer: 1
      },
      {
        id: "t6",
        text: "Quel sport de combat est originaire de Thaïlande ?",
        options: [
          "Le Karaté",
          "Le Judo",
          "Le Muay Thai",
          "Le Taekwondo"
        ],
        correctAnswer: 2
      },
      {
        id: "t7",
        text: "Quelle est la religion majoritaire en Thaïlande ?",
        options: [
          "L'Hindouisme",
          "L'Islam",
          "Le Christianisme",
          "Le Bouddhisme"
        ],
        correctAnswer: 3
      },
      {
        id: "t8",
        text: "Comment appelle-t-on les taxi-moto à trois roues typiques de Thaïlande ?",
        options: [
          "Rickshaw",
          "Tuk-tuk",
          "Songthaew",
          "Samlor"
        ],
        correctAnswer: 1
      },
      {
        id: "t9",
        text: "Quelle île thaïlandaise est célèbre pour ses plages paradisiaques et sa vie nocturne ?",
        options: [
          "Koh Samui",
          "Koh Lanta",
          "Phuket",
          "Koh Tao"
        ],
        correctAnswer: 2
      },
      {
        id: "t10",
        text: "Quel plat thaïlandais est un sauté de nouilles de riz ?",
        options: [
          "Tom Yum",
          "Pad Thai",
          "Som Tam",
          "Massaman"
        ],
        correctAnswer: 1
      },
      {
        id: "t11",
        text: "Qui est l'actuel roi de Thaïlande (depuis 2016) ?",
        options: [
          "Bhumibol Adulyadej",
          "Maha Vajiralongkorn",
          "Chulalongkorn",
          "Prajadhipok"
        ],
        correctAnswer: 1
      },
      {
        id: "t12",
        text: "Quelle ville du nord de la Thaïlande est connue pour ses temples et sa vieille ville ?",
        options: [
          "Chiang Rai",
          "Sukhothai",
          "Chiang Mai",
          "Ayutthaya"
        ],
        correctAnswer: 2
      }
    ]
  }
];

export function getQuizById(id: string): Quiz | undefined {
  const allQuizzes = getAllQuizzes();
  return allQuizzes.find(quiz => quiz.id === id);
}
