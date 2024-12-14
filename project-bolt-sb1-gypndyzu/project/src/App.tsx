import { useState } from 'react';
import { Menu, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Project {
  description: string;
  generalobjective: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem('projects');
    return stored ? JSON.parse(stored) : [];
  });

  const deleteProject = (projectToDelete: Project) => {
    const updatedProjects = projects.filter(p => p !== projectToDelete);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Proyectos Creados</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {projects.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No hay proyectos creados</p>
                  ) : (
                    <ul className="space-y-2">
                      {projects.map((project, index) => (
                        <li key={index} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <span className="text-sm truncate flex-1">{project.description}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProject(project)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Bienvenido a tu Panel de Proyectos
              </h2>
              <p className="text-muted-foreground">
                Gestiona tus proyectos de manera eficiente y organizada
              </p>
              <Button className="mt-4" size="lg">
                <Plus className="mr-2 h-4 w-4" /> Crear Nuevo Proyecto
              </Button>
            </div>
          </Card>

          {/* Projects Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <div className="space-y-2">
                  <h3 className="font-semibold truncate">{project.description}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {project.generalobjective}
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProject(project)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;