import Link from "next/link";
import { quizzes } from "@/data/quizzes";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Quizzie
          </h1>
          <p className="text-xl text-gray-600">
            Testez vos connaissances avec nos quiz interactifs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/quiz/${quiz.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 hover:border-indigo-400"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {quiz.title}
                </h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  {quiz.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{quiz.questions.length} questions</span>
                  <span className="text-indigo-600 font-semibold">
                    Commencer →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
