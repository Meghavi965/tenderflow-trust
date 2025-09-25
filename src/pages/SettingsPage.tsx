import React, { useState } from 'react';
import { User, Settings, Shield, Bell, Key, FileText, Save, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function SettingsPage() {
  const { user, switchRole } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    phone: '',
    address: '',
    bio: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    backupCodesGenerated: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    tenderDeadlines: true,
    bidStatusUpdates: true,
    evaluationReminders: true,
    awardAnnouncements: true,
    systemMaintenance: true
  });

  const [blockchainSettings, setBlockchainSettings] = useState({
    autoVerify: true,
    gasLimit: '200000',
    preferredNetwork: 'polygon',
    ipfsGateway: 'https://ipfs.io/ipfs/'
  });

  const handleProfileUpdate = async () => {
    try {
      toast({
        title: "Updating Profile",
        description: "Saving your profile information..."
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePasswordChange = async () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match",
        variant: "destructive"
      });
      return;
    }

    if (securitySettings.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }

    try {
      toast({
        title: "Updating Password",
        description: "Changing your password..."
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully",
        variant: "default"
      });

      setSecuritySettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const generateBackupCodes = async () => {
    try {
      toast({
        title: "Generating Backup Codes",
        description: "Creating secure backup codes..."
      });

      // Simulate generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSecuritySettings(prev => ({
        ...prev,
        backupCodesGenerated: true
      }));

      toast({
        title: "Backup Codes Generated",
        description: "Please save these codes in a secure location",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate backup codes",
        variant: "destructive"
      });
    }
  };

  const saveNotificationSettings = async () => {
    try {
      toast({
        title: "Saving Preferences",
        description: "Updating notification settings..."
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Settings Saved",
        description: "Notification preferences updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    }
  };

  const saveBlockchainSettings = async () => {
    try {
      toast({
        title: "Updating Blockchain Settings",
        description: "Configuring blockchain preferences..."
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Settings Updated",
        description: "Blockchain configuration saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blockchain settings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-3">
          <Settings className="h-8 w-8 text-primary" />
          <span>Settings</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, security, and system preferences
        </p>
      </div>

      {/* User Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{user?.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{user?.organization}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Update your personal and organizational details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={profileData.organization}
                    onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter full address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself and your organization..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>User Role</Label>
                <Select value={user?.role} onValueChange={switchRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="bidder">Bidder</SelectItem>
                    <SelectItem value="evaluator">Evaluator</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Changing role will update your dashboard and available actions
                </p>
              </div>

              <Button onClick={handleProfileUpdate}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Password & Security</span>
              </CardTitle>
              <CardDescription>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={securitySettings.currentPassword}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={securitySettings.newPassword}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={securitySettings.confirmPassword}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>

                <Button onClick={handlePasswordChange}>
                  <Key className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Enable 2FA for additional security</p>
                    <p className="text-xs text-muted-foreground">
                      Protects your account with an additional verification step
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: checked }))
                    }
                  />
                </div>

                {securitySettings.twoFactorEnabled && (
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={generateBackupCodes}
                      disabled={securitySettings.backupCodesGenerated}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {securitySettings.backupCodesGenerated ? 'Backup Codes Generated' : 'Generate Backup Codes'}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Backup codes help you regain access if you lose your 2FA device
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about important events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Delivery Methods</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Notification Types</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Tender Deadlines</p>
                    <p className="text-xs text-muted-foreground">Reminders for upcoming bid deadlines</p>
                  </div>
                  <Switch
                    checked={notificationSettings.tenderDeadlines}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, tenderDeadlines: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Bid Status Updates</p>
                    <p className="text-xs text-muted-foreground">Changes to your bid status</p>
                  </div>
                  <Switch
                    checked={notificationSettings.bidStatusUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, bidStatusUpdates: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Evaluation Reminders</p>
                    <p className="text-xs text-muted-foreground">Reminders for pending evaluations</p>
                  </div>
                  <Switch
                    checked={notificationSettings.evaluationReminders}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, evaluationReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Award Announcements</p>
                    <p className="text-xs text-muted-foreground">Notifications when contracts are awarded</p>
                  </div>
                  <Switch
                    checked={notificationSettings.awardAnnouncements}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, awardAnnouncements: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">System Maintenance</p>
                    <p className="text-xs text-muted-foreground">Updates about system maintenance</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemMaintenance}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, systemMaintenance: checked }))
                    }
                  />
                </div>
              </div>

              <Button onClick={saveNotificationSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blockchain Settings */}
        <TabsContent value="blockchain" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Blockchain Configuration</span>
              </CardTitle>
              <CardDescription>
                Configure your blockchain and IPFS preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Auto-verify Transactions</p>
                    <p className="text-xs text-muted-foreground">
                      Automatically verify blockchain transactions
                    </p>
                  </div>
                  <Switch
                    checked={blockchainSettings.autoVerify}
                    onCheckedChange={(checked) => 
                      setBlockchainSettings(prev => ({ ...prev, autoVerify: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="network">Preferred Network</Label>
                  <Select 
                    value={blockchainSettings.preferredNetwork} 
                    onValueChange={(value) => 
                      setBlockchainSettings(prev => ({ ...prev, preferredNetwork: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="polygon">Polygon Mainnet</SelectItem>
                      <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                      <SelectItem value="mumbai">Polygon Mumbai (Testnet)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gasLimit">Gas Limit</Label>
                  <Input
                    id="gasLimit"
                    value={blockchainSettings.gasLimit}
                    onChange={(e) => setBlockchainSettings(prev => ({ ...prev, gasLimit: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum gas to use for transactions
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ipfsGateway">IPFS Gateway</Label>
                  <Input
                    id="ipfsGateway"
                    value={blockchainSettings.ipfsGateway}
                    onChange={(e) => setBlockchainSettings(prev => ({ ...prev, ipfsGateway: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Gateway for accessing IPFS content
                  </p>
                </div>
              </div>

              <Button onClick={saveBlockchainSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}