import { Quiz } from "@/types/quiz";

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
  }
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.id === id);
}
