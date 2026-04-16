import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

function IdeaForm({ onCreateIdea, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    isStarred: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStarredChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      isStarred: Boolean(checked),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    await onCreateIdea(payload);

    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      isStarred: false,
    });
  };

  return (
    <Card className="rounded-2xl border-border bg-card text-card-foreground shadow-none">
      <CardHeader>
        <CardTitle className="text-card-foreground">Create Idea</CardTitle>
        <CardDescription className="text-card-foreground/70">
          Jot down something worth building later.
        </CardDescription>
      </CardHeader>

      <Separator className="bg-border" />

      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-card-foreground"
            >
              Title
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Habit tracker for dragons"
              value={formData.title}
              onChange={handleChange}
              className="border-border bg-background text-foreground placeholder:text-foreground/50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-card-foreground"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Track flying practice, treasure inventory, and village scorching."
              className="min-h-32 border-border bg-background text-foreground placeholder:text-foreground/50"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-card-foreground"
            >
              Category
            </label>
            <Input
              id="category"
              name="category"
              type="text"
              placeholder="fun, tools, fantasy"
              value={formData.category}
              onChange={handleChange}
              className="border-border bg-background text-foreground placeholder:text-foreground/50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="tags"
              className="text-sm font-medium text-card-foreground"
            >
              Tags
            </label>
            <Input
              id="tags"
              name="tags"
              type="text"
              placeholder="fun, fantasy, weird"
              value={formData.tags}
              onChange={handleChange}
              className="border-border bg-background text-foreground placeholder:text-foreground/50"
            />
            <p className="text-xs text-card-foreground/70">
              Separate tags with commas.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="isStarred"
              checked={formData.isStarred}
              onCheckedChange={handleStarredChange}
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <label
              htmlFor="isStarred"
              className="text-sm font-medium leading-none text-card-foreground"
            >
              Mark as starred
            </label>
          </div>

          <Button
            type="submit"
            className="w-full border border-primary bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Idea'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default IdeaForm;
