import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import IdeaCard from './IdeaCard';
import IdeaForm from './IdeaForm';
import { Separator } from '@/components/ui/separator';
import { getIdeas, createIdea, updateIdea, deleteIdea } from '../../lib/api';

function IdeasDashboard() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getIdeas();
        setIdeas(data);
      } catch (err) {
        setError(err.message || 'Something went wrong while loading ideas.');
      } finally {
        setIsLoading(false);
      }
    };

    loadIdeas();
  }, []);

  const handleCreateIdea = async (formData) => {
    try {
      setIsSubmitting(true);

      const newIdea = await createIdea(formData);
      setIdeas((prevIdeas) => [newIdea, ...prevIdeas]);

      toast.success('Idea created successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to create idea');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateIdea = async (ideaId, updatedFields) => {
    try {
      const updatedIdea = await updateIdea(ideaId, updatedFields);

      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) => (idea._id === ideaId ? updatedIdea : idea)),
      );

      toast.success('Idea updated successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to update idea');
      throw err;
    }
  };

  const handleDeleteIdea = async (ideaId) => {
    try {
      await deleteIdea(ideaId);

      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea._id !== ideaId));

      toast.success('Idea deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete idea');
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground">
            Creative Launch Pad
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Ideas Dashboard
          </h1>
          <p className="max-w-2xl text-base text-foreground/80">
            Capture strange, fun, and promising ideas before they disappear.
          </p>
        </header>

        <Separator className="mb-8 bg-border" />

        <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div>
            <IdeaForm
              onCreateIdea={handleCreateIdea}
              isSubmitting={isSubmitting}
            />
          </div>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Saved Ideas
                </h2>
                <p className="text-sm text-foreground/70">
                  A running list of experiments, products, and weird concepts.
                </p>
              </div>

              <div className="rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-card-foreground">
                {ideas.length} ideas
              </div>
            </div>

            {isLoading ? (
              <div className="rounded-2xl border border-border bg-card p-8 text-center text-card-foreground/70">
                Loading ideas...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-border bg-primary p-8 text-center text-primary-foreground">
                {error}
              </div>
            ) : ideas.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-card-foreground/70">
                No ideas yet. Add your first one.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {ideas.map((idea) => (
                  <IdeaCard
                    key={idea._id}
                    idea={idea}
                    onDeleteIdea={handleDeleteIdea}
                    onUpdateIdea={handleUpdateIdea}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default IdeasDashboard;
