
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock, Filter, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CATEGORIES, getStoriesByCategory, STORIES } from "../components/data/stories";

export default function Category() {
  const { categoryId } = useParams();;
  const [stories, setStories] = useState<typeof STORIES>([]);
  const [filteredStories, setFilteredStories] = useState<typeof STORIES>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [category, setCategory] = useState<typeof CATEGORIES[0] | null | undefined>(null);

  useEffect(() => {
    if (categoryId) {
      const cat = CATEGORIES.find(c => c.id === categoryId);
      const categoryStories = getStoriesByCategory(categoryId);
      setCategory(cat);
      setStories(categoryStories);
      setFilteredStories(categoryStories);
    }
  }, [categoryId]);

  useEffect(() => {
    let sorted = [...stories];
    switch (sortBy) {
      case 'newest':
        sorted = stories.slice().reverse();
        break;
      case 'shortest':
        sorted.sort((a, b) => a.duration - b.duration);
        break;
      case 'longest':
        sorted.sort((a, b) => b.duration - a.duration);
        break;
      case 'popular':
        // In a real app, this would sort by actual popularity metrics
        sorted = stories.slice().sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    setFilteredStories(sorted);
  }, [sortBy, stories]);

  if (!category) {
    return (
      <div className="min-h-screen px-6 py-8 flex items-center justify-center">
        <p className="text-white text-xl">Category not found</p>
      </div>
    );
  }

  const StoryCard = ({ story }: { story: typeof STORIES[0] }) => (
    <Link to={`/story/${story.id}/player`}>
      <Card className="group hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 overflow-hidden h-full pt-0">
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
        <CardContent className="p-4">
          <p className="text-white/70 text-sm line-clamp-2">{story.story.substring(0, 120)}...</p>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to={"/"}>
            <Button variant="ghost" className="text-white hover:bg-white/10 mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-4xl shadow-xl`}>
            {category.icon}
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
          <p className="text-white/80 text-lg mb-6">
            Discover {stories.length} magical {category.name.toLowerCase()} stories
          </p>
        </div>

        {/* Filter and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Sort by:</span>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="shortest">Shortest First</SelectItem>
              <SelectItem value="longest">Longest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {filteredStories.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-12 text-center">
            <p className="text-white/80 text-lg">No stories found in this category yet.</p>
            <Link to={"/"}>
              <Button className="mt-4 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white">
                Explore Other Categories
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
