
import { Button } from "@/components/ui/button";
import { Shield, LineChart, Lock, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Monitoreo Inteligente de Seguridad
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Analiza, visualiza y protege tu infraestructura con nuestra plataforma avanzada de monitoreo de logs en tiempo real.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  <Activity className="w-5 h-5" />
                  Acceder al Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2">
                <Lock className="w-5 h-5" />
                Solicitar Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-primary" />}
              title="Monitoreo en Tiempo Real"
              description="Detecta y responde a incidentes de seguridad al instante con nuestro sistema de monitoreo continuo."
            />
            <FeatureCard
              icon={<LineChart className="w-10 h-10 text-primary" />}
              title="Análisis Avanzado"
              description="Visualiza tendencias y patrones con nuestras herramientas de análisis intuitivas."
            />
            <FeatureCard
              icon={<Activity className="w-10 h-10 text-primary" />}
              title="Alertas Inteligentes"
              description="Recibe notificaciones personalizadas basadas en tus criterios de seguridad específicos."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Comienza a Proteger tu Infraestructura Hoy
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Únete a las empresas que confían en nuestra plataforma para mantener sus sistemas seguros y monitoreados.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gap-2">
              <Shield className="w-5 h-5" />
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-6 rounded-lg bg-card border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
