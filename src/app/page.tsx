import Link from "next/link";
import { quizzes } from "@/data/quizzes";
import { Brain, TrendingUp, Target } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20"></div>

        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-32 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Maîtrisez n'importe quel
            <br />
            <span className="text-blue-500">sujet avec Qwizzie</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Une plateforme de quiz intelligente qui s'adapte à votre niveau et
            garantit votre progression constante vers la maîtrise complète.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#quiz"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Commencer gratuitement
              <span className="text-xl">→</span>
            </Link>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Découvrir comment ça marche
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-6xl mx-auto px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Brain className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Adaptation intelligente
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Le système ajuste la difficulté en temps réel selon vos performances
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Progression mesurée
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Suivez votre évolution avec des métriques précises et motivantes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Objectifs personnalisés
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Des défis adaptés pour maintenir votre engagement optimal
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="relative max-w-6xl mx-auto px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Quiz Disponibles
          </h2>
          <p className="text-xl text-gray-600">
            Choisissez un sujet et commencez votre apprentissage
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/quiz/${quiz.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-300 hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                  {quiz.title}
                </h2>
                <p className="text-gray-600 mb-6 flex-grow text-lg leading-relaxed">
                  {quiz.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                    {quiz.questions.length} questions
                  </span>
                  <span className="text-blue-500 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Commencer
                    <span className="text-xl">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
