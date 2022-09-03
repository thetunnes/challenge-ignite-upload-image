import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const [imageUrl, setImageUrl] = useState('')
  const { isOpen, onClose, onOpen} = useDisclosure()
  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  function openModalImage(imgUrl: string) {
    onOpen()
    setImageUrl(imgUrl)
  }
  return (
    <>
      {/* TODO CARD GRID */}
      {cards ? (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={[20, 40]}>
          {cards.map((card: Card) => (
            <Card key={card.id} data={card} viewImage={() => openModalImage(card.url)} />
          ))}
        </SimpleGrid>
      ) : null}
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl}/>
    </>
  );
}
