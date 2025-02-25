import { Button } from "@/components/ui/button";
import { Shield, LineChart, Lock, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import RegistroForm from "@/components/RegistroForm";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
                Monitoreo Inteligente de Seguridad
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                Analiza, visualiza y protege tu infraestructura con nuestra plataforma avanzada de monitoreo de logs en tiempo real.
              </p>
              <div className="flex gap-4">
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
            <div className="relative">
              <RegistroForm />
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
              image="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80"
            />
            <FeatureCard
              icon={<LineChart className="w-10 h-10 text-primary" />}
              title="Análisis Avanzado"
              description="Visualiza tendencias y patrones con nuestras herramientas de análisis intuitivas."
              image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
            />
            <FeatureCard
              icon={<Activity className="w-10 h-10 text-primary" />}
              title="Alertas Inteligentes"
              description="Recibe notificaciones personalizadas basadas en tus criterios de seguridad específicos."
              image="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-background/90"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
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

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  image 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="group p-6 rounded-lg bg-card border hover:border-primary/50 transition-all">
      <div className="mb-4 overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
