import React, { useState } from 'react';
import { Bell, Clock, CheckCircle, Trophy, AlertTriangle, X, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockNotifications } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function NotificationsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(mockNotifications);

  // Extended mock notifications for demonstration
  const extendedNotifications = [
    ...notifications,
    {
      id: 'notif-004',
      userId: user?.id || 'current-user',
      type: 'deadline' as const,
      title: 'Bid Submission Reminder',
      message: 'Public School Technology Upgrade tender closes in 5 days. Don\'t miss the opportunity!',
      isRead: false,
      createdAt: new Date('2024-01-14T08:00:00Z'),
      relatedEntity: {
        type: 'tender' as const,
        id: 'tender-003'
      }
    },
    {
      id: 'notif-005',
      userId: user?.id || 'current-user',
      type: 'status_change' as const,
      title: 'Evaluation Phase Started',
      message: 'Municipal Road Infrastructure Development has moved to evaluation phase.',
      isRead: true,
      createdAt: new Date('2024-01-13T16:30:00Z'),
      relatedEntity: {
        type: 'tender' as const,
        id: 'tender-001'
      }
    },
    {
      id: 'notif-006',
      userId: user?.id || 'current-user',
      type: 'award' as const,
      title: 'Congratulations! Contract Awarded',
      message: 'Your bid for Hospital Equipment Procurement has been selected as the winner!',
      isRead: false,
      createdAt: new Date('2023-12-15T17:00:00Z'),
      relatedEntity: {
        type: 'bid' as const,
        id: 'bid-003'
      }
    },
    {
      id: 'notif-007',
      userId: user?.id || 'current-user',
      type: 'evaluation' as const,
      title: 'Evaluation Required',
      message: 'Public Transportation Upgrade tender is ready for your evaluation.',
      isRead: user?.role !== 'evaluator',
      createdAt: new Date('2024-01-12T10:15:00Z'),
      relatedEntity: {
        type: 'tender' as const,
        id: 'tender-005'
      }
    },
    {
      id: 'notif-008',
      userId: user?.id || 'current-user',
      type: 'deadline' as const,
      title: 'Reveal Phase Ending Soon',
      message: 'Smart City IoT Implementation bid reveal phase ends in 2 days.',
      isRead: true,
      createdAt: new Date('2024-01-14T12:00:00Z'),
      relatedEntity: {
        type: 'bid' as const,
        id: 'bid-002'
      }
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'status_change': return <Bell className="h-5 w-5 text-blue-500" />;
      case 'evaluation': return <CheckCircle className="h-5 w-5 text-purple-500" />;
      case 'award': return <Trophy className="h-5 w-5 text-amber-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'deadline': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'status_change': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'evaluation': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'award': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
    
    toast({
      title: "Notification marked as read",
      description: "The notification has been updated"
    });
  };

  const markAsUnread = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: false }
          : notif
      )
    );
    
    toast({
      title: "Notification marked as unread",
      description: "The notification has been updated"
    });
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    
    toast({
      title: "Notification deleted",
      description: "The notification has been removed"
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
    
    toast({
      title: "All notifications marked as read",
      description: `${unreadNotifications.length} notifications updated`
    });
  };

  const userNotifications = extendedNotifications.filter(n => n.userId === user?.id || n.userId === 'current-user');
  const unreadNotifications = userNotifications.filter(n => !n.isRead);
  const readNotifications = userNotifications.filter(n => n.isRead);

  const urgentNotifications = userNotifications.filter(n => 
    n.type === 'deadline' || (n.type === 'award' && !n.isRead)
  );

  const NotificationCard = ({ notification }: { notification: any }) => (
    <Card className={`hover:shadow-md transition-shadow ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`}>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {getNotificationIcon(notification.type)}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h4 className={`font-semibold ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {notification.title}
                </h4>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Badge className={getNotificationColor(notification.type)}>
                  {notification.type.replace('_', ' ')}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <p className={`text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
              {notification.message}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {formatDate(notification.createdAt)}
              </span>
              
              <div className="flex space-x-2">
                {notification.relatedEntity && (
                  <Button variant="outline" size="sm">
                    View {notification.relatedEntity.type}
                  </Button>
                )}
                
                {!notification.isRead ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Read
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsUnread(notification.id)}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Mark Unread
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Bell className="h-8 w-8 text-primary" />
            <span>Notifications</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with important tender activities and deadlines
          </p>
        </div>
        
        {unreadNotifications.length > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{userNotifications.length}</div>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary rounded-full" />
              <div>
                <div className="text-2xl font-bold">{unreadNotifications.length}</div>
                <p className="text-xs text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{urgentNotifications.length}</div>
                <p className="text-xs text-muted-foreground">Urgent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">
                  {userNotifications.filter(n => n.type === 'award').length}
                </div>
                <p className="text-xs text-muted-foreground">Awards</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Notifications */}
      {urgentNotifications.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              <span>Urgent Notifications</span>
            </CardTitle>
            <CardDescription className="text-orange-700">
              These notifications require immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {urgentNotifications.slice(0, 3).map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Notification Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All ({userNotifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {userNotifications.length > 0 ? (
            <div className="space-y-4">
              {userNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {unreadNotifications.length > 0 ? (
            <div className="space-y-4">
              {unreadNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  You have no unread notifications.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          {userNotifications.filter(n => n.type === 'deadline').map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </TabsContent>

        <TabsContent value="awards" className="space-y-4">
          {userNotifications.filter(n => n.type === 'award').map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}