import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam = undefined }) => {
        console.log(pageParam)
        const { data } = await api.get(`/api/images`, {
          params: {
            after: pageParam
          }
        })
        return data
    },
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: response => response?.after ?? null,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map(infos => infos.data).flat()

  }, [data]);


  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return (
      <Loading />
    )
  }
  // TODO RENDER ERROR SCREEN
  if (isError) {
    return (
      <Error />
    )
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={[10, 20]} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {isFetchingNextPage ? <Text my="16">Carregando...</Text> : 
        hasNextPage ? <Button my="16" onClick={() => fetchNextPage()}>Carregar mais</Button>
        : null}
      </Box>
    </>
  );
}
