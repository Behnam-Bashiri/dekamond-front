import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card";
import ThemeToggle from "@/components/molecules/theme-toggle";
import LanguageSwitcher from "@/components/molecules/language-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { getStoredUser, clearStoredUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, Mail, Phone } from "lucide-react";
import type { User as UserType } from "@/lib/auth";
import { useTranslation } from "react-i18next";

/**
 * Dashboard component for displaying authenticated user information and actions.
 *
 * - Redirects to the login page if no user is found in storage.
 * - Shows a loading indicator while user data is being loaded.
 * - Displays user profile information, including avatar, full name, email, and phone number.
 * - Provides quick action buttons (currently disabled except for logout).
 * - Handles user logout, clears stored user data, shows a toast notification, and redirects to login.
 *
 * @component
 * @returns {JSX.Element} The rendered dashboard page for authenticated users.
 */
const Dashboard = () => {
  const [user, setUser] = useState<(UserType & { phone: string }) | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate("/");
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    clearStoredUser();
    toast({
      title: t("dashboard.logoutSuccessTitle"),
      description: t("dashboard.logoutSuccessDescription"),
    });
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  const fullName = `${user.name.first} ${user.name.last}`;

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <h1 className="text-lg font-semibold text-foreground">{t("dashboard.title")}</h1>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 dark:text-white dark:bg-gray-900/80"
              >
                <LogOut className="w-4 h-4 " />
                {t("dashboard.logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="text-center pb-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-20 h-20 shadow-elegant">
                  <AvatarImage 
                    src={user.picture.large} 
                    alt={fullName}
                  />
                  <AvatarFallback className="bg-gradient-primary text-foreground text-xl font-semibold">
                    {user.name.first.charAt(0)}{user.name.last.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <CardTitle className="text-2xl mb-2">
                    {t("dashboard.welcomeTitle", { name: fullName })}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {t("dashboard.welcomeDescription")}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* User Information */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                {t("dashboard.userInfo")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.fullName")}</p>
                  <p className="font-medium">{fullName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.email")}</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.phone")}</p>
                  <p className="font-medium" dir="ltr">{user.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">{t("dashboard.quickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start dark:text-black" disabled>
                {t("dashboard.editProfile")}
              </Button>
              <Button variant="outline" className="w-full justify-start dark:text-black" disabled>
                {t("dashboard.accountSettings")}
              </Button>
              <Button variant="outline" className="w-full justify-start dark:text-black" disabled>
                {t("dashboard.support")}
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 ml-2" />
                {t("dashboard.logoutAccount")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
