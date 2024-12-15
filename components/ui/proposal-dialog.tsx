'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProposalDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export function ProposalDialog({ open, onClose, onSubmit }: ProposalDialogProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    onSubmit(email);
    setEmail('');
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Enter Your Email</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="border-2 border-black"
              placeholder="you@example.com"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <Button 
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white border-2 border-black p-6 transform transition-all hover:-translate-y-1"
          >
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}