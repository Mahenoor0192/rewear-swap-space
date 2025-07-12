
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, MapPin, Camera, Edit } from 'lucide-react';
import { RootState } from '../store';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    bio: 'Fashion enthusiast who loves sustainable clothing and sharing great finds with the community.'
  });

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Uploading image:', file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-between">
                {t('profile.title')}
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? t('common.cancel') : t('profile.edit')}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={profileData.name} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {profileData.name}
                  </h3>
                  <p className="text-muted-foreground">{t('profile.member')}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold text-foreground">
                        {user?.points || 120}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t('profile.points')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{t('auth.name')}</span>
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{t('auth.email')}</span>
                  </Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{t('auth.phone')}</span>
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{t('auth.address')}</span>
                  </Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">{t('profile.bio')}</Label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    className="w-full min-h-[100px] p-3 border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-4">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {t('common.save')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    {t('common.cancel')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
