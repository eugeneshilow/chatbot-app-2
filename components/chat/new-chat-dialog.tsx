"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface NewChatDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string) => void
  isLoading?: boolean
}

export function NewChatDialog({ isOpen, onClose, onCreate, isLoading }: NewChatDialogProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onCreate(name.trim())
    setName("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl md:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-semibold">New Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6 pt-4">
          <Input
            placeholder="Enter chat name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="rounded-lg border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/50 focus-visible:ring-zinc-500"
          />
          <div className="flex justify-end gap-2 md:gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="rounded-lg border-zinc-200 dark:border-zinc-800"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!name.trim() || isLoading}
              className="rounded-lg bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Create Chat
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 