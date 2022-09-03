import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Box,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay 
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px' 
      />
      <ModalContent w="max-content" maxW="900" maxH="600" bgColor="pGray.900">
        <ModalBody>
          <Image 
            src={imgUrl}
            alt={'Um Teste'}
            objectFit="contain"
            w="max"
            maxH={500}
            mx="auto"
          />
        </ModalBody>
        <ModalFooter bgColor="pGray.800">
          <Link target="_blank" href={imgUrl}>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
