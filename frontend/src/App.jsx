import IdeasDashboard from './components/ideas/IdeasDashboard';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <IdeasDashboard />
      <Toaster
        theme="dark"
        richColors
        position="top-right"
        toastOptions={{
          classNames: {
            toast: 'border-border bg-card text-card-foreground',
            description: 'text-card-foreground/80',
            actionButton: 'bg-primary text-primary-foreground',
            cancelButton: 'bg-background text-foreground border border-border',
          },
        }}
      />
    </div>
  );
}

export default App;
