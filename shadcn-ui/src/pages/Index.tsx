import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Hand, Sparkles, Eye, Heart, TrendingUp, Calendar, MapPin, User, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface UserInfo {
  name: string;
  age: string;
  dob: string;
  country: string;
  city: string;
  religion: string;
  gender: string;
  phone: string;
}

interface PalmReading {
  lifeLine: string;
  heartLine: string;
  headLine: string;
  fateLine: string;
  loveLife: string;
  career: string;
  health: string;
  wealth: string;
  personality: string;
  futureInsights: string;
}

export default function PalmReadingWebsite() {
  const [step, setStep] = useState(1);
  const [palmImage, setPalmImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    age: '',
    dob: '',
    country: '',
    city: '',
    religion: '',
    gender: '',
    phone: ''
  });
  const [palmReading, setPalmReading] = useState<PalmReading | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Image size should be less than 10MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file');
        return;
      }
      
      setPalmImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('Palm image uploaded successfully!');
    }
  };

  const handleUserInfoChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateUserInfo = () => {
    const required = ['name', 'age', 'dob', 'country', 'city', 'gender'];
    for (const field of required) {
      if (!userInfo[field as keyof UserInfo]) {
        toast.error(`Please fill in your ${field}`);
        return false;
      }
    }
    return true;
  };

  const analyzePalm = async () => {
    if (!palmImage || !validateUserInfo()) {
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate API call - Replace with actual AI API integration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock palm reading results - Replace with actual API response
      const mockReading: PalmReading = {
        lifeLine: `Your life line suggests a ${parseInt(userInfo.age) > 25 ? 'mature and experienced' : 'youthful and energetic'} approach to life. You have strong vitality and a natural resilience that will serve you well throughout your journey.`,
        heartLine: `Your heart line indicates ${userInfo.gender === 'female' ? 'a deeply emotional and intuitive nature' : 'strong emotional intelligence and loyalty'}. You value meaningful relationships and have the capacity for deep, lasting love.`,
        headLine: `The head line reveals excellent analytical abilities and ${userInfo.religion ? 'a spiritual wisdom that guides your decisions' : 'practical intelligence'}. You approach problems with both logic and creativity.`,
        fateLine: `Your fate line suggests that significant opportunities will emerge around your ${Math.floor(parseInt(userInfo.age) / 10) * 10 + 5}th year. Your ${userInfo.country} heritage brings unique advantages to your path.`,
        loveLife: `In matters of the heart, the next ${userInfo.gender === 'female' ? '2-3 years' : '1-2 years'} will bring meaningful connections. Your palm suggests a soulmate connection with someone who shares your ${userInfo.religion || 'values'}.`,
        career: `Professionally, your palm indicates natural talents that align with ${userInfo.city.toLowerCase().includes('new york') ? 'business and finance' : userInfo.city.toLowerCase().includes('los angeles') ? 'creative industries' : 'technology and innovation'}. Success peaks around age ${parseInt(userInfo.age) + 7}.`,
        health: `Your health line shows good overall vitality. Pay attention to ${parseInt(userInfo.age) > 30 ? 'stress management and work-life balance' : 'building healthy habits early'}. Regular exercise will enhance your natural energy.`,
        wealth: `Financial prosperity is indicated through multiple income streams. Your palm suggests major financial improvements within ${Math.floor(Math.random() * 3) + 2} years, particularly through ${userInfo.gender === 'male' ? 'investments or business ventures' : 'creative pursuits or partnerships'}.`,
        personality: `You possess a ${userInfo.religion ? 'spiritually guided' : 'naturally intuitive'} personality with strong ${userInfo.gender === 'female' ? 'empathetic' : 'leadership'} qualities. People are drawn to your authentic nature and positive energy.`,
        futureInsights: `The coming months will bring opportunities for growth, especially around ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}. Trust your instincts when making important decisions about relationships and career moves.`
      };
      
      setPalmReading(mockReading);
      setStep(3);
      toast.success('Palm analysis completed successfully!');
      
    } catch (error) {
      toast.error('Failed to analyze palm. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const restartReading = () => {
    setStep(1);
    setPalmImage(null);
    setImagePreview('');
    setUserInfo({
      name: '',
      age: '',
      dob: '',
      country: '',
      city: '',
      religion: '',
      gender: '',
      phone: ''
    });
    setPalmReading(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hand className="h-8 w-8 text-yellow-400" />
              <h1 className="text-2xl font-bold text-white">Palm Reading AI</h1>
            </div>
            <div className="text-sm text-gray-300">
              Free Online Palmistry Analysis
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {step === 1 && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Unlock Your Destiny with
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                AI Palm Reading
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover your future through the ancient art of palmistry powered by modern AI technology. 
              Upload your palm photo and get instant, accurate predictions about your love life, career, and destiny.
            </p>
          </div>
        )}

        {/* Step 1: Image Upload */}
        {step === 1 && (
          <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-6 w-6 text-yellow-400" />
                Step 1: Upload Your Palm Photo
              </CardTitle>
              <CardDescription className="text-gray-300">
                Take a clear photo of your dominant hand palm facing up in good lighting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-yellow-400/50 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('palm-upload')?.click()}
                >
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Palm preview" 
                        className="max-w-full max-h-64 mx-auto rounded-lg object-contain"
                      />
                      <p className="text-green-400">✓ Palm image uploaded successfully!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Hand className="h-16 w-16 text-yellow-400 mx-auto" />
                      <p className="text-lg">Click here to upload your palm photo</p>
                      <p className="text-sm text-gray-400">Supported formats: JPG, PNG, WEBP (Max 10MB)</p>
                    </div>
                  )}
                </div>
                
                <input
                  id="palm-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {palmImage && (
                  <Button 
                    onClick={() => setStep(2)} 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
                  >
                    Continue to Personal Information
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: User Information */}
        {step === 2 && (
          <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-yellow-400" />
                Step 2: Personal Information
              </CardTitle>
              <CardDescription className="text-gray-300">
                Provide your details for a personalized palm reading analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      value={userInfo.name}
                      onChange={(e) => handleUserInfoChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age" className="text-white">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={userInfo.age}
                      onChange={(e) => handleUserInfoChange('age', e.target.value)}
                      placeholder="Your age"
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dob" className="text-white">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={userInfo.dob}
                      onChange={(e) => handleUserInfoChange('dob', e.target.value)}
                      className="bg-white/10 border-white/30 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="gender" className="text-white">Gender *</Label>
                    <Select value={userInfo.gender} onValueChange={(value) => handleUserInfoChange('gender', value)}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="country" className="text-white">Country *</Label>
                    <Input
                      id="country"
                      value={userInfo.country}
                      onChange={(e) => handleUserInfoChange('country', e.target.value)}
                      placeholder="Your country"
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city" className="text-white">City *</Label>
                    <Input
                      id="city"
                      value={userInfo.city}
                      onChange={(e) => handleUserInfoChange('city', e.target.value)}
                      placeholder="Your city"
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="religion" className="text-white">Religion (Optional)</Label>
                    <Input
                      id="religion"
                      value={userInfo.religion}
                      onChange={(e) => handleUserInfoChange('religion', e.target.value)}
                      placeholder="Your religion"
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                      placeholder="Your phone number"
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setStep(1)} 
                    variant="outline" 
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={analyzePalm} 
                    disabled={isAnalyzing}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    {isAnalyzing ? 'Analyzing Palm...' : 'Get My Palm Reading'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Palm Reading Results */}
        {step === 3 && palmReading && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Personalized Palm Reading
              </h2>
              <p className="text-gray-300 text-lg">
                Hello {userInfo.name}, here's what your palm reveals about your destiny
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Life Line */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    Life Line
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{palmReading.lifeLine}</p>
                </CardContent>
              </Card>

              {/* Heart Line */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-400" />
                    Heart Line
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{palmReading.heartLine}</p>
                </CardContent>
              </Card>

              {/* Head Line */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-400" />
                    Head Line
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{palmReading.headLine}</p>
                </CardContent>
              </Card>

              {/* Fate Line */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Fate Line
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{palmReading.fateLine}</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Predictions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-pink-500/20 to-red-500/20 border-pink-500/30 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-400" />
                    Love Life Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">{palmReading.loveLife}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Career & Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">{palmReading.career}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-400" />
                    Health & Vitality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">{palmReading.health}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-yellow-400" />
                    Wealth & Prosperity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">{palmReading.wealth}</p>
                </CardContent>
              </Card>
            </div>

            {/* Personality & Future Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-400" />
                    Personality Traits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{palmReading.personality}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-indigo-400" />
                    Future Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{palmReading.futureInsights}</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                onClick={restartReading}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3"
              >
                Get Another Reading
              </Button>
            </div>
          </div>
        )}

        {/* Ad Space Placeholders */}
        <div className="mt-12 space-y-6">
          {/* Banner Ad */}
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-2">Advertisement</p>
            <div className="bg-gray-700/50 rounded-lg py-12 px-4">
              <p className="text-gray-500">728 x 90 Banner Ad Space</p>
            </div>
          </div>
          
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6 text-center">
                <p className="text-gray-400 mb-2">Sponsored</p>
                <div className="bg-gray-700/50 rounded-lg py-8 px-4">
                  <p className="text-gray-500">300 x 250 Ad Space</p>
                </div>
              </div>
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6 text-center">
                <p className="text-gray-400 mb-2">Sponsored</p>
                <div className="bg-gray-700/50 rounded-lg py-8 px-4">
                  <p className="text-gray-500">300 x 250 Ad Space</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Palm Reading AI</h3>
              <p className="text-gray-300 text-sm">
                Discover your destiny through AI-powered palm reading and palmistry analysis. 
                Get instant predictions about your future, love life, and career.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• AI-Powered Palm Analysis</li>
                <li>• Instant Predictions</li>
                <li>• Love Life Insights</li>
                <li>• Career Guidance</li>
                <li>• Health & Wealth Predictions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Keywords</h3>
              <p className="text-gray-300 text-sm">
                Palm reading, palmistry, fortune telling, AI palm reader, life predictions, 
                hand analysis, future prediction, online palmistry, destiny reading
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Palm Reading AI. All rights reserved. | For entertainment purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}