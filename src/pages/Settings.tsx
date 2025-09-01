/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Bell, Moon, Shield, Type, Volume2 } from "lucide-react";
import { useState, type PropsWithChildren } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    autoplay: true,
    nightMode: true,
    notifications: true,
    volume: [75],
    fontSize: [16],
    bedtimeReminder: true,
    bedtimeHour: "20:00",
    theme: "starry",
    parentalControls: false,
    autoStop: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingCard = ({ icon: Icon, title, children }: PropsWithChildren<{ icon: typeof Moon, title: string }>) => (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-orange-400 to-pink-500">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/80 text-lg">Customize your Tale Pop experience</p>
        </div>

        <div className="grid gap-6">
          {/* Audio Settings */}
          <SettingCard icon={Volume2} title="Audio & Playback">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Autoplay Next Story</Label>
                <Switch
                  checked={settings.autoplay}
                  onCheckedChange={(checked) => updateSetting('autoplay', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Volume</Label>
                <Slider
                  value={settings.volume}
                  onValueChange={(value) => updateSetting('volume', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-white/60 text-sm">{settings.volume[0]}%</p>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-white">Auto-stop after story ends</Label>
                <Switch
                  checked={settings.autoStop}
                  onCheckedChange={(checked) => updateSetting('autoStop', checked)}
                />
              </div>
            </div>
          </SettingCard>

          {/* Display Settings */}
          <SettingCard icon={Type} title="Display & Reading">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Font Size</Label>
                <Slider
                  value={settings.fontSize}
                  onValueChange={(value) => updateSetting('fontSize', value)}
                  min={12}
                  max={24}
                  step={1}
                  className="w-full"
                />
                <p className="text-white/60 text-sm">{settings.fontSize[0]}px</p>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starry">Starry Night</SelectItem>
                    <SelectItem value="sunset">Warm Sunset</SelectItem>
                    <SelectItem value="forest">Enchanted Forest</SelectItem>
                    <SelectItem value="ocean">Ocean Dreams</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-white">Night Mode</Label>
                <Switch
                  checked={settings.nightMode}
                  onCheckedChange={(checked) => updateSetting('nightMode', checked)}
                />
              </div>
            </div>
          </SettingCard>

          {/* Bedtime Settings */}
          <SettingCard icon={Moon} title="Bedtime & Schedule">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Bedtime Reminder</Label>
                <Switch
                  checked={settings.bedtimeReminder}
                  onCheckedChange={(checked) => updateSetting('bedtimeReminder', checked)}
                />
              </div>

              {settings.bedtimeReminder && (
                <div className="space-y-2">
                  <Label className="text-white">Bedtime Hour</Label>
                  <Select value={settings.bedtimeHour} onValueChange={(value) => updateSetting('bedtimeHour', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="19:00">7:00 PM</SelectItem>
                      <SelectItem value="19:30">7:30 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                      <SelectItem value="20:30">8:30 PM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </SettingCard>

          {/* Notifications */}
          <SettingCard icon={Bell} title="Notifications">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Push Notifications</Label>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting('notifications', checked)}
                />
              </div>

              <div className="text-white/70 text-sm">
                Get notified about new stories, bedtime reminders, and special events
              </div>
            </div>
          </SettingCard>

          {/* Parental Controls */}
          <SettingCard icon={Shield} title="Parental Controls">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Enable Parental Controls</Label>
                <Switch
                  checked={settings.parentalControls}
                  onCheckedChange={(checked) => updateSetting('parentalControls', checked)}
                />
              </div>

              <div className="text-white/70 text-sm">
                Control story content, time limits, and access to certain features
              </div>

              {settings.parentalControls && (
                <Button className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white">
                  Configure Parental Settings
                </Button>
              )}
            </div>
          </SettingCard>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white px-12 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}