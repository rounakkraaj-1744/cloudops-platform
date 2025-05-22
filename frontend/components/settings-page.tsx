"use client"

import { useState } from "react"
import { Bell, Check, CreditCard, Globe, Key, Lock, Mail, Moon, Save, Shield, Sun, User, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  return (
    <div className="space-y-6 p-6 w-full max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general">
        <div className="space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="md:w-1/4 lg:w-1/5">
            <TabsList className="flex h-full space-y-1 bg-transparent p-0">
              <TabsTrigger
                value="general"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted"
              >
                <User className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted"
              >
                <Moon className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted"
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted"
              >
                <Users className="mr-2 h-4 w-4" />
                Team
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger
                value="api"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-muted data-[state=active]:bg-muted"
              >
                <Key className="mr-2 h-4 w-4" />
                API
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1">
            <TabsContent value="general" className="space-y-4">
              <Card className="glass shadow-md">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" defaultValue="DevOps Engineer" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} className="bg-accent-blue">
                    {saving ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Saving
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="glass shadow-md">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Select defaultValue="utc">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select defaultValue="mdy">
                        <SelectTrigger id="dateFormat" className="w-[180px]">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} className="bg-accent-blue">
                    {saving ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Saving
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <Card className="glass shadow-md">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of the dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="theme">Theme</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className={`h-8 w-8 ${theme === "light" ? "border-accent-blue text-accent-blue" : ""}`}
                          onClick={() => setTheme("light")}
                        >
                          <Sun className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`h-8 w-8 ${theme === "dark" ? "border-accent-blue text-accent-blue" : ""}`}
                          onClick={() => setTheme("dark")}
                        >
                          <Moon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`h-8 w-8 ${theme === "system" ? "border-accent-blue text-accent-blue" : ""}`}
                          onClick={() => setTheme("system")}
                        >
                          <Globe className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Accent Color</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple"></div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-green"></div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-red"></div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-yellow"></div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">UI Density</h3>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md border border-border/30 bg-secondary/50 p-2">
                          <div className="h-2 w-full rounded-sm bg-muted"></div>
                          <div className="mt-1 h-2 w-full rounded-sm bg-muted"></div>
                          <div className="mt-1 h-2 w-full rounded-sm bg-muted"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="compact" className="text-xs">
                            Compact
                          </Label>
                          <Switch id="compact" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md border border-border/30 bg-secondary/50 p-2">
                          <div className="h-3 w-full rounded-sm bg-muted"></div>
                          <div className="mt-2 h-3 w-full rounded-sm bg-muted"></div>
                          <div className="mt-2 h-3 w-full rounded-sm bg-muted"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="comfortable" className="text-xs">
                            Comfortable
                          </Label>
                          <Switch id="comfortable" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} className="bg-accent-blue">
                    {saving ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Saving
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card className="glass shadow-md">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-alerts" className="font-medium">
                            System Alerts
                          </Label>
                          <p className="text-xs text-muted-foreground">Receive critical system alerts and warnings</p>
                        </div>
                        <Switch id="email-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-deployments" className="font-medium">
                            Deployments
                          </Label>
                          <p className="text-xs text-muted-foreground">Notifications about deployments and releases</p>
                        </div>
                        <Switch id="email-deployments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-security" className="font-medium">
                            Security
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Security alerts and vulnerability notifications
                          </p>
                        </div>
                        <Switch id="email-security" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-reports" className="font-medium">
                            Weekly Reports
                          </Label>
                          <p className="text-xs text-muted-foreground">Weekly summary of system performance</p>
                        </div>
                        <Switch id="email-reports" />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">In-App Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="app-alerts" className="font-medium">
                            System Alerts
                          </Label>
                          <p className="text-xs text-muted-foreground">Receive critical system alerts and warnings</p>
                        </div>
                        <Switch id="app-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="app-deployments" className="font-medium">
                            Deployments
                          </Label>
                          <p className="text-xs text-muted-foreground">Notifications about deployments and releases</p>
                        </div>
                        <Switch id="app-deployments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="app-security" className="font-medium">
                            Security
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Security alerts and vulnerability notifications
                          </p>
                        </div>
                        <Switch id="app-security" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="app-reports" className="font-medium">
                            Weekly Reports
                          </Label>
                          <p className="text-xs text-muted-foreground">Weekly summary of system performance</p>
                        </div>
                        <Switch id="app-reports" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} className="bg-accent-blue">
                    {saving ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Saving
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card className="glass shadow-md">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button variant="outline" className="w-full">
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="2fa" defaultChecked />
                    </div>
                    <div className="rounded-md bg-secondary/50 p-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-accent-green" />
                        <span className="text-sm font-medium">Two-factor authentication is enabled</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Your account is protected with an authenticator app
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      Manage 2FA Settings
                    </Button>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="rounded-md border border-border/30 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Current Session</div>
                            <div className="text-xs text-muted-foreground">Chrome on Windows • 192.168.1.105</div>
                          </div>
                          <Badge variant="outline" className="border-accent-green text-accent-green">
                            Active Now
                          </Badge>
                        </div>
                      </div>
                      <div className="rounded-md border border-border/30 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Safari on MacOS</div>
                            <div className="text-xs text-muted-foreground">Last active: 2 days ago • 10.0.0.15</div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 text-accent-red">
                            Revoke
                          </Button>
                        </div>
                      </div>
                      <div className="rounded-md border border-border/30 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Mobile App</div>
                            <div className="text-xs text-muted-foreground">Last active: 5 days ago • 172.16.254.1</div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 text-accent-red">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full text-accent-red">
                      Revoke All Other Sessions
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} className="bg-accent-blue">
                    {saving ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Saving
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <Card className="glass shadow-md">
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>Manage your team members and their access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Team Members (5)</h3>
                    <Button variant="outline" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      Invite Member
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-md border border-border/30 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-xs text-muted-foreground">john.doe@example.com</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-accent-blue text-accent-blue">
                          Admin
                        </Badge>
                      </div>
                    </div>
                    <div className="rounded-md border border-border/30 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Jane Smith</div>
                            <div className="text-xs text-muted-foreground">jane.smith@example.com</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-accent-purple text-accent-purple">
                          Developer
                        </Badge>
                      </div>
                    </div>
                    <div className="rounded-md border border-border/30 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>BJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Bob Johnson</div>
                            <div className="text-xs text-muted-foreground">bob.johnson@example.com</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-accent-green text-accent-green">
                          Viewer
                        </Badge>
                      </div>
                    </div>
                    <div className="rounded-md border border-border/30 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>AW</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Alice Williams</div>
                            <div className="text-xs text-muted-foreground">alice.williams@example.com</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-accent-purple text-accent-purple">
                          Developer
                        </Badge>
                      </div>
                    </div>
                    <div className="rounded-md border border-border/30 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>CM</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Charlie Miller</div>
                            <div className="text-xs text-muted-foreground">charlie.miller@example.com</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-accent-green text-accent-green">
                          Viewer
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Manage Roles</Button>
                  <Button className="bg-accent-blue">
                    <Users className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <Card className="glass shadow-md">
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your billing information and subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md bg-secondary/50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Current Plan</h3>
                        <div className="text-sm text-muted-foreground">Enterprise Plan</div>
                      </div>
                      <Badge variant="outline" className="border-accent-blue text-accent-blue">
                        Active
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">$499.00 / month</div>
                      <div className="text-sm text-muted-foreground">Next billing date: June 22, 2025</div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        Change Plan
                      </Button>
                      <Button variant="outline" size="sm" className="text-accent-red">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Payment Method</h3>
                    <div className="rounded-md border border-border/30 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-12 items-center justify-center rounded-md bg-secondary/50">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">Visa ending in 4242</div>
                            <div className="text-xs text-muted-foreground">Expires 12/2025</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Billing History</h3>
                    <div className="space-y-3">
                      <div className="rounded-md border border-border/30 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Invoice #INV-1234</div>
                            <div className="text-xs text-muted-foreground">May 22, 2025</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm">$499.00</div>
                            <Button variant="ghost" size="sm" className="h-7">
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border border-border/30 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Invoice #INV-1233</div>
                            <div className="text-xs text-muted-foreground">April 22, 2025</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm">$499.00</div>
                            <Button variant="ghost" size="sm" className="h-7">
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border border-border/30 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Invoice #INV-1232</div>
                            <div className="text-xs text-muted-foreground">March 22, 2025</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm">$499.00</div>
                            <Button variant="ghost" size="sm" className="h-7">
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <Card className="glass shadow-md">
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys for programmatic access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Your API Keys</h3>
                    <Button variant="outline" size="sm">
                      <Key className="mr-2 h-4 w-4" />
                      Generate New Key
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-md border border-border/30 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Production Key</div>
                          <div className="text-xs text-muted-foreground">Created on May 10, 2025</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-accent-green text-accent-green">
                            Active
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-7 text-accent-red">
                            Revoke
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Input value="••••••••••••••••••••••••••••••" readOnly className="font-mono text-xs" />
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md border border-border/30 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Development Key</div>
                          <div className="text-xs text-muted-foreground">Created on April 15, 2025</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-accent-green text-accent-green">
                            Active
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-7 text-accent-red">
                            Revoke
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Input value="••••••••••••••••••••••••••••••" readOnly className="font-mono text-xs" />
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md border border-border/30 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Testing Key</div>
                          <div className="text-xs text-muted-foreground">Created on March 5, 2025</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-accent-yellow text-accent-yellow">
                            Revoked
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Input value="••••••••••••••••••••••••••••••" readOnly className="font-mono text-xs" disabled />
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-xs text-muted-foreground">
                    API keys provide full access to your account. Keep them secure!
                  </div>
                  <Button className="bg-accent-blue">
                    <Key className="mr-2 h-4 w-4" />
                    Generate New Key
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
