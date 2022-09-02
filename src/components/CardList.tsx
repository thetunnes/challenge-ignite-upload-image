import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
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

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  console.log(cards)
  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid column={3} spacing={40}>
        {cards ? cards.map(card => (
          <Card data={card} />
        )) : null}
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
