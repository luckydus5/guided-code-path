import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Share2, Copy, Eye, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileTab {
  id: string;
  name: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python';
  content: string;
  isActive: boolean;
}

interface SharedProject {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  files: FileTab[];
  language: string;
  difficulty: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: Date;
  isPublic: boolean;
}

interface ProjectSharingProps {
  projectTitle: string;
  projectFiles: FileTab[];
  language: string;
  difficulty: string;
  projectId: string;
}

export const ProjectSharing: React.FC<ProjectSharingProps> = ({
  projectTitle,
  projectFiles,
  language,
  difficulty,
  projectId
}) => {
  const { toast } = useToast();
  const [shareUrl, setShareUrl] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const generateShareableLink = async () => {
    setIsSharing(true);
    
    try {
      // Simulate API call to create shareable project
      const shareableProject: SharedProject = {
        id: Date.now().toString(),
        title: projectTitle,
        description: description || `A ${difficulty} ${language} project`,
        author: 'Anonymous', // Replace with actual user
        files: projectFiles,
        language,
        difficulty,
        views: 0,
        likes: 0,
        comments: 0,
        tags,
        createdAt: new Date(),
        isPublic: true
      };

      // Save to localStorage for demo (in real app, save to backend)
      const existingShares = JSON.parse(localStorage.getItem('sharedProjects') || '[]');
      existingShares.push(shareableProject);
      localStorage.setItem('sharedProjects', JSON.stringify(existingShares));

      const url = `${window.location.origin}/shared/${shareableProject.id}`;
      setShareUrl(url);
      
      toast({
        title: "Project Shared!",
        description: "Your project has been shared successfully.",
      });
    } catch (error) {
      toast({
        title: "Sharing Failed",
        description: "Could not share your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Copied!",
        description: "Share link copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const shareToSocial = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const text = `Check out my ${language} project: ${projectTitle}`;
    const url = shareUrl;
    
    let shareLink = '';
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Share2 className="h-5 w-5" />
          <span>Share Your Project</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!shareUrl ? (
          <>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Project Description (Optional)
              </label>
              <Input
                placeholder="Describe your project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Tags (Optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
            
            <Button
              onClick={generateShareableLink}
              disabled={isSharing}
              className="w-full"
            >
              {isSharing ? 'Creating Share Link...' : 'Create Share Link'}
            </Button>
          </>
        ) : (
          <>
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono break-all mr-2">{shareUrl}</span>
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => shareToSocial('twitter')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Twitter
              </Button>
              <Button
                onClick={() => shareToSocial('linkedin')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                LinkedIn
              </Button>
              <Button
                onClick={() => shareToSocial('facebook')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Facebook
              </Button>
            </div>
            
            <Button
              onClick={() => window.open(shareUrl, '_blank')}
              variant="default"
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Shared Project
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
