"use client"

import { useState, useEffect } from 'react'
import { GuessingInterface } from './guessing-interface'
import { NFTImage } from './nft-image'

type Criteria = 'MINT PRICE' | 'MINT DATE' | 'ARTIST NAME' | 'ART NAME'

interface Tag {
  id: string
  criteria: Criteria
  value: string
  isCorrect: boolean
}

const initialTags: Tag[] = [
  { id: 'price-1', criteria: 'MINT PRICE', value: '0.33 ETH', isCorrect: true },
  { id: 'price-2', criteria: 'MINT PRICE', value: '1.50 ETH', isCorrect: false },
  { id: 'price-3', criteria: 'MINT PRICE', value: '0.50 ETH', isCorrect: false },
  { id: 'price-4', criteria: 'MINT PRICE', value: '2.00 ETH', isCorrect: false },
  { id: 'price-5', criteria: 'MINT PRICE', value: '0.80 ETH', isCorrect: false },
  { id: 'date-1', criteria: 'MINT DATE', value: 'Jun 09, 2022', isCorrect: true },
  { id: 'date-2', criteria: 'MINT DATE', value: 'Aug 22, 2023', isCorrect: false },
  { id: 'date-3', criteria: 'MINT DATE', value: 'Apr 01, 2023', isCorrect: false },
  { id: 'date-4', criteria: 'MINT DATE', value: 'Dec 25, 2023', isCorrect: false },
  { id: 'date-5', criteria: 'MINT DATE', value: 'Sep 30, 2023', isCorrect: false },
  { id: 'artist-1', criteria: 'ARTIST NAME', value: '6529er', isCorrect: true },
  { id: 'artist-2', criteria: 'ARTIST NAME', value: 'PixelMaster', isCorrect: false },
  { id: 'artist-3', criteria: 'ARTIST NAME', value: 'NFTCreator', isCorrect: false },
  { id: 'artist-4', criteria: 'ARTIST NAME', value: 'BlockchainArt', isCorrect: false },
  { id: 'artist-5', criteria: 'ARTIST NAME', value: 'CryptoVision', isCorrect: false },
  { id: 'art-1', criteria: 'ART NAME', value: '6529Seizing', isCorrect: true },
  { id: 'art-2', criteria: 'ART NAME', value: 'Digital Revolution', isCorrect: false },
  { id: 'art-3', criteria: 'ART NAME', value: 'Pixel Perfect', isCorrect: false },
  { id: 'art-4', criteria: 'ART NAME', value: 'Meta Vision', isCorrect: false },
  { id: 'art-5', criteria: 'ART NAME', value: 'Crypto Dreams', isCorrect: false },
]

export default function ArtGuesserInterface() {
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Record<Criteria, Tag | null>>({
    'MINT PRICE': null,
    'MINT DATE': null,
    'ARTIST NAME': null,
    'ART NAME': null,
  })
  const [gameState, setGameState] = useState<'playing' | 'submitted' | 'nextRound'>('playing')

  useEffect(() => {
    setTags(initialTags.sort(() => Math.random() - 0.5))
  }, [])

  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tag.criteria]: tag,
    }))
  }

  const handleSubmit = () => {
    if (gameState === 'playing') {
      setGameState('submitted')
    } else if (gameState === 'submitted') {
      setSelectedTags({
        'MINT PRICE': null,
        'MINT DATE': null,
        'ARTIST NAME': null,
        'ART NAME': null,
      })
      setTags(initialTags.sort(() => Math.random() - 0.5))
      setGameState('playing')
    }
  }

  const handleReset = (criteria: Criteria) => {
    const tagToReset = selectedTags[criteria];
    if (tagToReset) {
      setSelectedTags((prev) => ({ ...prev, [criteria]: null }));
      setTags((prevTags) => [
        ...prevTags,
        tagToReset,
        ...initialTags.filter((tag) => tag.criteria === criteria && tag.id !== tagToReset.id)
      ]);
    }
  }

  const handleCriteriaClick = (criteria: Criteria) => {
    if (gameState === 'playing') {
      setSelectedTags((prev) => ({ ...prev, [criteria]: null }))
    }
  }

  return (
    <>
      <NFTImage
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed.jpg-qsehasASB8i3UuExmbheI5b42tQj4Q.jpeg"
        alt="Pixel art NFT with geometric face design"
      />
      <GuessingInterface
        tags={tags}
        selectedTags={selectedTags}
        gameState={gameState}
        onTagClick={handleTagClick}
        onReset={handleReset}
        onCriteriaClick={handleCriteriaClick}
        onSubmit={handleSubmit}
      />
    </>
  )
}

