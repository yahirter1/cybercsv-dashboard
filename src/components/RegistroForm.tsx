
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";

interface FormData {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistroForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Las contraseñas no coinciden",
      });
      return;
    }

    // Aquí iría la lógica de registro
    console.log("Datos del formulario:", formData);
    toast({
      title: "Registro exitoso",
      description: "Tu cuenta ha sido creada correctamente",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg border">
      <div className="flex items-center justify-center mb-6">
        <Shield className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        Crear una cuenta
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        <div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        <Button type="submit" className="w-full" size="lg">
          Registrarse
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <a href="#" className="text-primary hover:underline">
          Iniciar sesión
        </a>
      </p>
    </div>
  );
};

export default RegistroForm;
