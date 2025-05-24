"use client"

import type React from "react"

import { useState } from "react"
import { Settings, User, Bell, Shield, Palette, Save, Moon, Sun, Laptop, Check, Copy, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export function SettingsDashboard() {
  const { theme, setTheme } = useTheme()
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [timezone, setTimezone] = useState("UTC")
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")
  const [accentColor, setAccentColor] = useState("blue")
  const [showApiKey, setShowApiKey] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("30")

  // const handleCopyApiKey = () => {
  //   navigator.clipboard.writeText(apiKey)
  //   toast.success("API Key Copied",{
  //     description: "The API key has been copied to your clipboard.",
  //   })
  // }

  const handleSaveChanges = () => {
    toast.success("Settings Saved", {
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Button className="bg-primary text-primary-foreground" onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                    <SelectItem value="MST">Mountain Standard Time (MST)</SelectItem>
                    <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refresh-interval">Auto-refresh Interval (seconds)</Label>
                <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                  <SelectTrigger id="refresh-interval">
                    <SelectValue placeholder="Select refresh interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Disabled</SelectItem>
                    <SelectItem value="10">10 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-refresh">Auto-refresh Dashboards</Label>
                  <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                </div>
                <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 space-y-6">
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-2 h-24"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-6 w-6" />
                    <span>Light</span>
                    {theme === "light" && <Check className="absolute top-2 right-2 h-4 w-4" />}
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-2 h-24"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-6 w-6" />
                    <span>Dark</span>
                    {theme === "dark" && <Check className="absolute top-2 right-2 h-4 w-4" />}
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-2 h-24"
                    onClick={() => setTheme("system")}
                  >
                    <Laptop className="h-6 w-6" />
                    <span>System</span>
                    {theme === "system" && <Check className="absolute top-2 right-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <RadioGroup
                  defaultValue={accentColor}
                  onValueChange={setAccentColor}
                  className="grid grid-cols-5 gap-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Label
                      htmlFor="accent-blue"
                      className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 border-2 border-transparent data-[state=checked]:border-ring"
                      data-state={accentColor === "blue" ? "checked" : "unchecked"}
                    >
                      {accentColor === "blue" && <Check className="h-4 w-4 text-white" />}
                    </Label>
                    <RadioGroupItem value="blue" id="accent-blue" className="sr-only" />
                    <span className="text-xs">Blue</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Label
                      htmlFor="accent-purple"
                      className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 border-2 border-transparent data-[state=checked]:border-ring"
                      data-state={accentColor === "purple" ? "checked" : "unchecked"}
                    >
                      {accentColor === "purple" && <Check className="h-4 w-4 text-white" />}
                    </Label>
                    <RadioGroupItem value="purple" id="accent-purple" className="sr-only" />
                    <span className="text-xs">Purple</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Label
                      htmlFor="accent-green"
                      className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-green-500 border-2 border-transparent data-[state=checked]:border-ring"
                      data-state={accentColor === "green" ? "checked" : "unchecked"}
                    >
                      {accentColor === "green" && <Check className="h-4 w-4 text-white" />}
                    </Label>
                    <RadioGroupItem value="green" id="accent-green" className="sr-only" />
                    <span className="text-xs">Green</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Label
                      htmlFor="accent-orange"
                      className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 border-2 border-transparent data-[state=checked]:border-ring"
                      data-state={accentColor === "orange" ? "checked" : "unchecked"}
                    >
                      {accentColor === "orange" && <Check className="h-4 w-4 text-white" />}
                    </Label>
                    <RadioGroupItem value="orange" id="accent-orange" className="sr-only" />
                    <span className="text-xs">Orange</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Label
                      htmlFor="accent-red"
                      className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-red-500 border-2 border-transparent data-[state=checked]:border-ring"
                      data-state={accentColor === "red" ? "checked" : "unchecked"}
                    >
                      {accentColor === "red" && <Check className="h-4 w-4 text-white" />}
                    </Label>
                    <RadioGroupItem value="red" id="accent-red" className="sr-only" />
                    <span className="text-xs">Red</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Density</Label>
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm font-normal">UI Density</Label>
                  <Slider defaultValue={[2]} max={3} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Compact</span>
                    <span>Comfortable</span>
                    <span>Spacious</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Animation</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">Show animations and transitions</p>
                  </div>
                  <Switch id="animations" defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>

                <div className="space-y-2">
                  <Label>Alert Severity</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="critical-alerts" defaultChecked />
                      <label
                        htmlFor="critical-alerts"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Critical Alerts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="warning-alerts" defaultChecked />
                      <label
                        htmlFor="warning-alerts"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Warning Alerts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="info-alerts" defaultChecked />
                      <label
                        htmlFor="info-alerts"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Info Alerts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="success-alerts" defaultChecked />
                      <label
                        htmlFor="success-alerts"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Success Alerts
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Event Types</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="system-events" defaultChecked />
                      <label
                        htmlFor="system-events"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        System Events
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="security-events" defaultChecked />
                      <label
                        htmlFor="security-events"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Security Events
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="deployment-events" defaultChecked />
                      <label
                        htmlFor="deployment-events"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Deployment Events
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="user-events" defaultChecked />
                      <label
                        htmlFor="user-events"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        User Events
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="quiet-hours">Quiet Hours</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours-start" className="text-sm">
                      Start Time
                    </Label>
                    <Select defaultValue="22:00">
                      <SelectTrigger id="quiet-hours-start">
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours-end" className="text-sm">
                      End Time
                    </Label>
                    <Select defaultValue="07:00">
                      <SelectTrigger id="quiet-hours-end">
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="05:00">5:00 AM</SelectItem>
                        <SelectItem value="06:00">6:00 AM</SelectItem>
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Only critical alerts will be sent during quiet hours
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and API access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger id="session-timeout">
                      <SelectValue placeholder="Select timeout period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Access</h3>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex">
                    <Input
                      id="api-key"
                      type={showApiKey ? "text" : "password"}
                      // value={apiKey}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-l-none border-l-0"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-l-none border-l-0"
                      // onClick={handleCopyApiKey}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This key grants full access to the API. Keep it secure.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>API Rate Limits</Label>
                  <div className="rounded-md border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Requests per minute</span>
                      <span className="text-sm">1000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Requests per day</span>
                      <span className="text-sm">100,000</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ip-restriction">IP Restriction</Label>
                    <p className="text-sm text-muted-foreground">Limit API access to specific IP addresses</p>
                  </div>
                  <Switch id="ip-restriction" defaultChecked={false} />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="destructive">Regenerate API Key</Button>
                <p className="text-sm text-muted-foreground">
                  Warning: Regenerating your API key will invalidate the current key immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6 space-y-6">
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" defaultValue="DevOps Engineer" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>

                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>

                <Button>Update Password</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connected Accounts</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">GitHub</h4>
                        <p className="text-sm text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Google</h4>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Delete Account</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// This is a placeholder component for the Checkbox since it wasn't imported
function Checkbox({
  id,
  defaultChecked,
  children,
}: { id: string; defaultChecked?: boolean; children?: React.ReactNode }) {
  return (
    <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
      {defaultChecked && <Check className="h-3 w-3" />}
    </div>
  )
}
