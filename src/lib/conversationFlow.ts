// lib/conversationFlow.ts

export type ChatStep = {
  id: string;
  question: string;
  type: 'choice' | 'text' | 'contact';
  options?: string[];
  nextStepId?: string;
  isEnd?: boolean;
};

export const conversationFlow: Record<string, ChatStep> = {
  'step-1': {
    id: 'step-1',
    question: 'When did the accident occur?',
    type: 'choice',
    options: ['Within the last 24 hours', 'In the last 30 days', 'In the last year', 'Over a year ago'],
    nextStepId: 'step-2'
  },
  'step-2': {
    id: 'step-2',
    question: 'Were you injured in the accident?',
    type: 'choice',
    options: ['Yes, serious injuries', 'Yes, minor injuries', 'No injuries', 'Not sure yet'],
    nextStepId: 'step-3'
  },
  'step-3': {
    id: 'step-3',
    question: 'Did the accident involve a commercial truck or 18-wheeler?',
    type: 'choice',
    options: ['Yes', 'No', 'Not sure'],
    nextStepId: 'step-4'
  },
  'step-4': {
    id: 'step-4',
    question: 'What state did the accident happen in?',
    type: 'text',
    nextStepId: 'step-5'
  },
  'step-5': {
    id: 'step-5',
    question: 'Would you like a lawyer to review your case for free?',
    type: 'choice',
    options: ['Yes, please', 'No, thanks'],
  },
  'contact-info': {
    id: 'contact-info',
    question: 'Great. Please provide your contact details for the free case review.',
    type: 'contact',
    isEnd: true
  }
};

export const firstStepId = 'step-1';
