import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

function IdeaCard({ idea, onDeleteIdea, onUpdateIdea }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: idea.title || '',
    description: idea.description || '',
    category: idea.category || '',
    tags: idea.tags?.join(', ') || '',
    isStarred: idea.isStarred || false,
  });

  const handleDeleteClick = () => {
    onDeleteIdea(idea._id);
  };

  const handleEditOpen = () => {
    setFormData({
      title: idea.title || '',
      description: idea.description || '',
      category: idea.category || '',
      tags: idea.tags?.join(', ') || '',
      isStarred: idea.isStarred || false,
    });

    setIsEditOpen(true);
  };

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

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);

      const payload = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await onUpdateIdea(idea._id, payload);
      setIsEditOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Card className="rounded-2xl border border-primary bg-primary text-primary-foreground shadow-none">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-lg text-primary-foreground">
                {idea.title}
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                {idea.category}
              </CardDescription>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="border border-primary-foreground bg-primary text-primary-foreground shadow-none transition-colors hover:border-foreground hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  Actions
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="border-border bg-card text-card-foreground"
              >
                <DropdownMenuItem onClick={handleEditOpen}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  className="focus:bg-primary focus:text-primary-foreground"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              className={
                idea.isStarred
                  ? 'border border-primary-foreground bg-background text-foreground'
                  : 'border border-primary-foreground bg-primary text-primary-foreground'
              }
            >
              {idea.isStarred ? 'Starred' : 'Idea'}
            </Badge>

            <Badge className="border border-primary-foreground bg-primary text-primary-foreground">
              {idea.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-primary-foreground/85">
            {idea.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {idea.tags?.map((tag) => (
              <Badge
                key={tag}
                className="border border-primary-foreground bg-background text-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="border-border bg-card text-card-foreground sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">
              Edit Idea
            </DialogTitle>
            <DialogDescription className="text-card-foreground/70">
              Update this idea and save your changes.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleEditSubmit}>
            <div className="space-y-2">
              <label
                htmlFor={`edit-title-${idea._id}`}
                className="text-sm font-medium"
              >
                Title
              </label>
              <Input
                id={`edit-title-${idea._id}`}
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border-border bg-background text-foreground placeholder:text-foreground/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`edit-description-${idea._id}`}
                className="text-sm font-medium"
              >
                Description
              </label>
              <Textarea
                id={`edit-description-${idea._id}`}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-32 border-border bg-background text-foreground placeholder:text-foreground/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`edit-category-${idea._id}`}
                className="text-sm font-medium"
              >
                Category
              </label>
              <Input
                id={`edit-category-${idea._id}`}
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border-border bg-background text-foreground placeholder:text-foreground/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`edit-tags-${idea._id}`}
                className="text-sm font-medium"
              >
                Tags
              </label>
              <Input
                id={`edit-tags-${idea._id}`}
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="fun, fantasy, weird"
                className="border-border bg-background text-foreground placeholder:text-foreground/50"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id={`edit-starred-${idea._id}`}
                checked={formData.isStarred}
                onCheckedChange={handleStarredChange}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <label
                htmlFor={`edit-starred-${idea._id}`}
                className="text-sm font-medium leading-none"
              >
                Mark as starred
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="border-border bg-background text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSaving}
                className="border border-primary bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default IdeaCard;
