
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Bookmark, Clock, Pause, Play, Share2, SkipBack, SkipForward, Star, Tag, Type } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CATEGORIES, STORIES, getRecommendedStories } from "../components/data/stories";

export default function StoryPlayer() {
  const {storyId} = useParams();
  const [story, setStory] = useState<typeof STORIES[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);
  // const [volume, setVolume] = useState([75]);
  const [fontSize, setFontSize] = useState([18]);
  const [currentTime, setCurrentTime] = useState(0);
  const [recommendations, setRecommendations] = useState<typeof STORIES>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (storyId) {
      const foundStory = STORIES.find(s => s.id === parseInt(storyId));
      if (foundStory) {
        setStory(foundStory);
        setRecommendations(getRecommendedStories(foundStory));
      }
    }
  }, [storyId]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const totalDuration = story ? story.duration * 60 : 600; // Convert minutes to seconds
          const newTime = prev + 1;
          const newProgress = (newTime / totalDuration) * 100;
          setProgress([newProgress]);
          
          if (newTime >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, story]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (newValue: number[]) => {
    const totalDuration = story ? story.duration * 60 : 600;
    const newTime = (newValue[0] / 100) * totalDuration;
    setCurrentTime(newTime);
    setProgress(newValue);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const skipForward = () => {
    if (story) setCurrentTime(prev => Math.min(prev + 30, story.duration * 60));
  };

  const skipBackward = () => {
    setCurrentTime(prev => Math.max(prev - 30, 0));
  };

  if (!story) {
    return (
      <div className="min-h-screen px-6 py-8 flex items-center justify-center">
        <p className="text-white text-xl">Story not found</p>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === story.category);

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to={"/"}>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Stories
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current text-yellow-400' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Story Header */}
            <Card className="bg-white/10 backdrop-blur-sm border-none py-0">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-white text-3xl font-bold mb-3">{story.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{story.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span>4.8</span>
                    </div>
                    {category && (
                      <Badge className={`bg-gradient-to-r ${category.color} text-white border-0`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {category.name}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Audio Controls */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 gap-3">
              <CardContent className="px-6 py-0 w-full flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Progress Bar */}
                <div className="w-full md:!w-[80%]">
                  <Slider
                    value={progress}
                    onValueChange={handleSeek}
                    max={100}
                    step={0.1}
                    className="w-full mb-2"
                  />
                  <div className="flex justify-between text-white/70 text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(story.duration * 60)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={skipBackward}
                  >
                    <SkipBack className="w-6 h-6" />
                  </Button>
                  
                  <Button
                    size="icon"
                    className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 rounded-full shadow-lg"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={skipForward}
                  >
                    <SkipForward className="w-6 h-6" />
                  </Button>
                </div>

                {/* Volume Control */}
                {/* <div className="flex items-center space-x-3">
                  <Volume2 className="w-5 h-5 text-white" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-white text-sm w-12">{volume[0]}%</span>
                </div> */}
              </CardContent>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Type className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Font Size:</span>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    min={14}
                    max={28}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-white text-sm w-12">{fontSize[0]}px</span>
                </div>
              </CardContent>
            </Card>

            {/* Story Text */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              {/* <CardHeader>
                <CardTitle className="text-white">Story Text</CardTitle>
              </CardHeader> */}
              <CardContent>
                <div 
                  className="text-white/90 leading-relaxed whitespace-pre-line"
                  style={{ fontSize: `${fontSize[0]}px` }}
                >
                  {story.story}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Story Info */}
            {/* <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Story Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Duration</span>
                  <span className="text-white font-medium">{story.duration} minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Category</span>
                  <Badge className={`bg-gradient-to-r ${category?.color} text-white border-0`}>
                    {category?.name}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">You Might Also Like</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec) => (
                    <Link key={rec.id} to={`/story/${rec.id}/player`}>
                      <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer">
                        <img 
                          src={rec.image} 
                          alt={rec.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-sm line-clamp-2 mb-1">{rec.title}</h4>
                          <div className="flex items-center text-white/70 text-xs space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>{rec.duration} min</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
