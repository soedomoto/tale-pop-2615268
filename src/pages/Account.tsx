
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Heart, Clock, Star, BookOpen, Award } from "lucide-react";
import { STORIES } from "../components/data/stories";

export default function Account() {
  const [userProfile, setUserProfile] = useState({
    name: "Little Dreamer",
    age: "6 years old",
    favoriteCategory: "Fairy Tales",
    bedtime: "8:00 PM",
    storiesRead: 42,
    favoriteStory: "The Enchanted Rose Garden"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to user entity in a real app
  };

  const favoriteStories = STORIES.slice(0, 4);
  const recentStories = STORIES.slice(4, 8);

  const StatCard = ({ icon: Icon, title, value, color }: { icon: typeof User, title: string, value: string | number, color: string }) => (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
      <CardContent className="p-6 text-center">
        <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-white text-2xl font-bold">{value}</h3>
        <p className="text-white/70 text-sm">{title}</p>
      </CardContent>
    </Card>
  );

  const StoryListItem = ({ story }: {story: typeof STORIES[0]}) => (
    <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
      <img 
        src={story.image} 
        alt={story.title}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h4 className="text-white font-semibold">{story.title}</h4>
        <p className="text-white/70 text-sm">{story.duration} minutes</p>
      </div>
      <Heart className="w-5 h-5 text-pink-400 fill-current" />
    </div>
  );

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center shadow-xl">
            <User className="w-12 h-12 text-white" />
          </div>
          {/* <h1 className="text-4xl font-bold text-white mb-2">My Account</h1>
          <p className="text-white/80 text-lg">Your magical story journey</p> */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white text-xl">Profile Information</CardTitle>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  variant="outline"
                  className="border-white/30 hover:text-white hover:bg-white/10"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/80">Name</Label>
                    {isEditing ? (
                      <Input
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    ) : (
                      <p className="text-white text-lg mt-1">{userProfile.name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/80">Age</Label>
                    {isEditing ? (
                      <Input
                        value={userProfile.age}
                        onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    ) : (
                      <p className="text-white text-lg mt-1">{userProfile.age}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/80">Favorite Category</Label>
                    <p className="text-white text-lg mt-1">{userProfile.favoriteCategory}</p>
                  </div>
                  <div>
                    <Label className="text-white/80">Bedtime</Label>
                    {isEditing ? (
                      <Input
                        value={userProfile.bedtime}
                        onChange={(e) => setUserProfile({...userProfile, bedtime: e.target.value})}
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    ) : (
                      <p className="text-white text-lg mt-1">{userProfile.bedtime}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard 
                icon={BookOpen} 
                title="Stories Read" 
                value={userProfile.storiesRead}
                color="bg-gradient-to-r from-blue-400 to-blue-500"
              />
              <StatCard 
                icon={Clock} 
                title="Hours Listened" 
                value="28"
                color="bg-gradient-to-r from-green-400 to-green-500"
              />
              <StatCard 
                icon={Star} 
                title="Favorite Stories" 
                value="12"
                color="bg-gradient-to-r from-yellow-400 to-yellow-500"
              />
              <StatCard 
                icon={Award} 
                title="Achievements" 
                value="5"
                color="bg-gradient-to-r from-purple-400 to-purple-500"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorite Stories */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  <span>Favorite Stories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {favoriteStories.map((story) => (
                  <StoryListItem key={story.id} story={story} />
                ))}
              </CardContent>
            </Card>

            {/* Recent Stories */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Recently Played</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentStories.map((story) => (
                  <div key={story.id} className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{story.title}</h4>
                      <p className="text-white/70 text-sm">{story.duration} minutes</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
