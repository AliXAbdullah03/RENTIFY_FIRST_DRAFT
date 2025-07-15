
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { conversations as allConversations } from '@/lib/mock-data';
import type { Conversation, Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Send, Search, ArrowLeft, MoreVertical } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';


export default function InboxPage() {
  const { user, role, isAuthenticated } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    } else if (isAuthenticated && role) {
      // In a real app, you'd fetch this based on the user's ID.
      // For this demo, we'll just show all conversations.
      setConversations(allConversations);
      if (allConversations.length > 0) {
        setSelectedConversation(allConversations[0]);
        setMessages(allConversations[0].messages);
      }
    }
  }, [isAuthenticated, role, router]);
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages(conversation.messages);
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: role === 'owner' ? selectedConversation.owner.id : selectedConversation.renter.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };
  
  if (isAuthenticated === null || !user) {
    return (
       <div className="container mx-auto max-w-7xl">
         <div className="h-[calc(100vh-12rem)] border rounded-lg flex">
            <div className="w-1/3 border-r p-4 space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
            <div className="w-2/3 flex flex-col">
                <div className="p-4 border-b"> <Skeleton className="h-12 w-1/2" /></div>
                <div className="flex-grow p-4 space-y-4">
                    <Skeleton className="h-12 w-3/4 self-start" />
                    <Skeleton className="h-12 w-3/4 self-end" />
                    <Skeleton className="h-12 w-3/4 self-start" />
                </div>
                <div className="p-4 border-t"><Skeleton className="h-10 w-full" /></div>
            </div>
         </div>
       </div>
    );
  }
  
  const conversationListView = (
      <div className={cn("border-r flex-col", isMobile && !selectedConversation ? "flex w-full" : "hidden md:flex md:w-1/3 xl:w-1/4")}>
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Inbox</h2>
           <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10"/>
           </div>
        </div>
        <ScrollArea className="flex-grow">
          {conversations.map(convo => (
            <div
              key={convo.id}
              className={cn(
                "p-4 cursor-pointer hover:bg-accent flex gap-4 items-center",
                selectedConversation?.id === convo.id && "bg-accent"
              )}
              onClick={() => handleSelectConversation(convo)}
            >
              <Avatar className="h-12 w-12">
                 <AvatarImage src={role === 'owner' ? convo.renter.avatar : convo.owner.avatar} data-ai-hint="person face" />
                 <AvatarFallback>{(role === 'owner' ? convo.renter.name : convo.owner.name).charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow truncate">
                <p className="font-semibold">{role === 'owner' ? convo.renter.name : convo.owner.name}</p>
                <p className="text-sm text-muted-foreground truncate">{convo.property.title}</p>
                <p className="text-sm text-muted-foreground truncate">{convo.messages[convo.messages.length - 1].text}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
  );
  
  const messageView = (
       <div className={cn("flex-col", isMobile && selectedConversation ? "flex w-full" : "hidden md:flex md:w-2/3 xl:w-3/4")}>
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {isMobile && <Button variant="ghost" size="icon" onClick={() => setSelectedConversation(null)}><ArrowLeft/></Button>}
                  <Avatar>
                    <AvatarImage src={role === 'owner' ? selectedConversation.renter.avatar : selectedConversation.owner.avatar} data-ai-hint="person face" />
                    <AvatarFallback>{(role === 'owner' ? selectedConversation.renter.name : selectedConversation.owner.name).charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{role === 'owner' ? selectedConversation.renter.name : selectedConversation.owner.name}</p>
                    <p className="text-sm text-muted-foreground">Regarding: {selectedConversation.property.title}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-2">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden hidden lg:block">
                        <Image src={selectedConversation.property.image} alt={selectedConversation.property.title} fill className="object-cover" data-ai-hint="apartment exterior" />
                    </div>
                    <Button variant="ghost" size="icon"><MoreVertical/></Button>
                 </div>
              </div>

              <ScrollArea className="flex-grow p-4 space-y-4 bg-muted/20">
                 {messages.map(msg => {
                    const isSender = (role === 'owner' && msg.senderId.startsWith('owner')) || (role === 'renter' && msg.senderId.startsWith('renter'));
                    return (
                        <div key={msg.id} className={cn("flex mb-4", isSender ? "justify-end" : "justify-start")}>
                           <div className={cn("rounded-lg px-4 py-2 max-w-md", isSender ? "bg-primary text-primary-foreground" : "bg-card border")}>
                             {msg.text}
                           </div>
                        </div>
                    )
                 })}
              </ScrollArea>

              <div className="p-4 border-t bg-card">
                 <form className="flex gap-2" onSubmit={handleSendMessage}>
                    <Input 
                        placeholder="Type your message..." 
                        className="flex-grow"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit"><Send className="h-5 w-5"/></Button>
                 </form>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-muted-foreground">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
  );

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="h-[calc(100vh-12rem)] border rounded-lg flex overflow-hidden">
        {conversationListView}
        <Separator orientation="vertical" className={cn(isMobile && "hidden")}/>
        {messageView}
      </div>
    </div>
  );
}

