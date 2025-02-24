import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Link} from "react-router-dom";
import {Badge} from "@/components/ui/badge.tsx";


const topics = ["Todos", "Gestão", "Tecnologia", "Marketing", "Tendências", "Casos de Sucesso", "Dicas"]

const articles = [
    {
        id: 1,
        title: "Como aumentar suas vendas em 40% com menu digital",
        excerpt:
            "Descubra como restaurantes em Luanda estão revolucionando sua operação com cardápios digitais e aumentando significativamente seu faturamento.",
        image: "/placeholder.svg?height=400&width=600",
        topic: "Casos de Sucesso",
        readTime: "5 min",
        date: "22 Fev 2024",
        featured: true,
    },
    {
        id: 2,
        title: "5 estratégias de marketing digital para restaurantes",
        excerpt: "Aprenda as melhores práticas de marketing digital para atrair mais clientes para seu restaurante.",
        image: "/placeholder.svg?height=300&width=400",
        topic: "Marketing",
        readTime: "4 min",
        date: "20 Fev 2024",
    },
    {
        id: 3,
        title: "Gestão de estoque: como evitar desperdícios",
        excerpt: "Dicas práticas para otimizar seu controle de estoque e reduzir perdas no seu restaurante.",
        image: "/placeholder.svg?height=300&width=400",
        topic: "Gestão",
        readTime: "6 min",
        date: "18 Fev 2024",
    },
    // Add more articles as needed
]


export default function BlogPage() {

    document.title = "Blog | Neemble Eat"


    const featuredArticle = articles.find((article) => article.featured)
    const regularArticles = articles.filter((article) => !article.featured)

    return (
        <div className="min-h-screen bg-white">
            <section className="bg-gray-50 py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog Neemble Eat</h1>
                        <p className="text-xl text-gray-600">
                            Insights, dicas e histórias de sucesso para impulsionar seu restaurante
                        </p>
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-wrap gap-2">
                            {topics.map((topic, index) => (
                                <Button
                                    key={topic}
                                    variant={index === 0 ? "default" : "outline"}
                                    size="sm"
                                    className={index === 0 ? "bg-[#FF6B35] hover:bg-[#FF5722]" : ""}
                                >
                                    {topic}
                                </Button>
                            ))}
                        </div>
                        <div className="w-full md:w-auto">
                            <Input placeholder="Pesquisar artigos..." className="max-w-xs" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && (
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link to={`/blog/article/${featuredArticle.id}`}>
                            <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl p-6 md:p-8 hover:bg-gray-100 transition-colors">
                                <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                                    <img
                                        src={featuredArticle.image || "/placeholder.svg"}
                                        alt={featuredArticle.title}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <Badge className="bg-[#FF6B35] hover:bg-[#FF5722] text-white">Em Destaque</Badge>
                                    <Badge variant="outline">{featuredArticle.topic}</Badge>
                                    <h2 className="text-3xl font-bold">{featuredArticle.title}</h2>
                                    <p className="text-gray-600">{featuredArticle.excerpt}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span>{featuredArticle.date}</span>
                                        <span>•</span>
                                        <span>{featuredArticle.readTime} de leitura</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Articles Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularArticles.map((article) => (
                            <Link key={article.id} to={`/blog/article/${article.id}`}>
                                <article className="group">
                                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                                        <img
                                            src={article.image || "/placeholder.svg"}
                                            alt={article.title}
                                            className="object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <Badge variant="outline" className="mb-3">
                                        {article.topic}
                                    </Badge>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF6B35]">{article.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span>{article.date}</span>
                                        <span>•</span>
                                        <span>{article.readTime} de leitura</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Receba nossas últimas atualizações</h2>
                    <p className="text-gray-600 mb-6">Inscreva-se para receber dicas exclusivas e novidades do setor</p>
                    <div className="flex gap-2">
                        <Input placeholder="Seu email" type="email" />
                        <Button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white">Inscrever</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}