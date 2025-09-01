
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Play, Search, Settings, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, STORIES, searchStories } from "../components/data/stories";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof STORIES>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [featuredStories] = useState(STORIES.slice(0, 6));

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const results = searchStories(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const CategoryCard = ({ category }: { category: typeof CATEGORIES[0] }) => (
    <Link to={`category/${category.id}`}>
      <Card className="group hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
        <CardContent className="p-6 text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
            {category.icon}
          </div>
          <h3 className="text-white font-semibold text-lg">{category.name}</h3>
          <p className="text-white/70 text-sm mt-1">
            {STORIES.filter(s => s.category === category.id).length} stories
          </p>
        </CardContent>
      </Card>
    </Link>
  );

  const StoryCard = ({ story }: { story: typeof STORIES[0] }) => (
    <Link to={`/story/${story.id}/player`}>
      <Card className="group hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 overflow-hidden py-0">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{story.title}</h3>
            <div className="flex items-center text-white/80 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{story.duration} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-current" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <Button size="icon" className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <Play className="w-5 h-5 text-white" />
          </Button>
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b10811e36_talepopicon.png"
                  alt="Tale Pop"
                  className="w-15 h-15 md:w-20 md:h-20 rounded-full shadow-lg"
                />
                <h1 className="hidden md:block text-3xl font-bold text-white bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text">
                  TALE POP
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to={"/account"}>
                <Button className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <User className="w-5 h-5" />
                  <span className="hidden md:block">My Account</span>
                </Button>
              </Link>
              <Link to={"/settings"}>
                <Button variant="outline" className="border-white/30 hover:bg-white/10 px-8 py-3 rounded-full text-lg font-semibold backdrop-blur-sm">
                  <Settings className="w-5 h-5" />
                  <span className="hidden md:block">Settings</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for magical stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/60 rounded-full focus:bg-white/20 focus:border-white/40 transition-all duration-300"
            />
          </div>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.slice(0, 6).map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            ) : (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-center">
                <p className="text-white/80 text-lg">No stories found. Try a different search term!</p>
              </Card>
            )}
          </div>
        )}

        {!isSearching && (
          <>
            {/* Categories */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Choose Your Adventure</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {CATEGORIES.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* Featured Stories */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Featured Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Popular Tonight</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STORIES.slice(6, 10).map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
