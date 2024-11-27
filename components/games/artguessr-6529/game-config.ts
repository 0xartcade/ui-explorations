export const GAME_CONFIG = {
    questions: [
      {
        id: 'TOTAL SUPPLY',
        label: 'Total Supply',
        color: '#4CAF50',
        dataField: 'supply',
        answersField: 'supplies'
      },
      {
        id: 'SEASON',
        label: 'Season',
        color: '#2196F3',
        dataField: 'season',
        answersField: 'seasons'
      },
      {
        id: 'ARTIST NAME',
        label: 'Artist Name',
        color: '#FF9800',
        dataField: 'artist',
        answersField: 'artists'
      },
      {
        id: 'ART NAME',
        label: 'Art Name',
        color: '#E91E63',
        dataField: 'title',
        answersField: 'titles'
      }
    ]
  } as const
  
  export type Question = typeof GAME_CONFIG.questions[number]
  export type QuestionId = Question['id']
  
  // Helper functions
  export function getQuestionColor(id: QuestionId): string {
    return GAME_CONFIG.questions.find(q => q.id === id)?.color || '#000000'
  }
  
  export function getQuestionLabel(id: QuestionId): string {
    return GAME_CONFIG.questions.find(q => q.id === id)?.label || id
  }