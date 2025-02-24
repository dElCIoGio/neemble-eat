import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {ChevronLeft} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";


const article = {
    id: 1,
    title: "Como aumentar suas vendas em 40% com menu digital",
    excerpt:
        "Descubra como restaurantes em Luanda estão revolucionando sua operação com cardápios digitais e aumentando significativamente seu faturamento.",
    content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <h2>A revolução digital nos restaurantes</h2>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <h2>Resultados comprovados</h2>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  `,
    image: "/placeholder.svg?height=600&width=1200",
    topic: "Casos de Sucesso",
    readTime: "5 min",
    date: "22 Fev 2024",
    author: {
        name: "Ana Silva",
        role: "Especialista em Marketing Digital",
        image: "/placeholder.svg?height=100&width=100",
    },
}

export default function ArticlePage() {
    return (
        <div className="min-h-screen bg-white">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <Link to="/blog">
                    <Button variant="ghost" className="mb-8">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Voltar para o Blog
                    </Button>
                </Link>

                {/* Article Header */}
                <div className="mb-8">
                    <Badge variant="outline" className="mb-4">
                        {article.topic}
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime} de leitura</span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
                    <img src={article.image || "/placeholder.svg"} alt={article.title} className="object-cover" />
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <img
                            src={article.author.image || "/placeholder.svg"}
                            alt={article.author.name}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="font-medium">{article.author.name}</div>
                        <div className="text-sm text-gray-500">{article.author.role}</div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t">
                    <h2 className="text-xl font-bold mb-4">Compartilhe este artigo</h2>
                    <div className="flex gap-2">
                        <Button variant="outline">Facebook</Button>
                        <Button variant="outline">Twitter</Button>
                        <Button variant="outline">LinkedIn</Button>
                    </div>
                </div>
            </article>
        </div>
    )
}