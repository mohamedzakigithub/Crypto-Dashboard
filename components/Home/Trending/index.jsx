import { useState, useEffect, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  HStack,
  VStack,
  Button,
  Spinner,
  Center,
  Box,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchPrices = async ({ queryKey }) => {
  const [_key, { page }] = queryKey;

  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=100&page=${page}&sparkline=false`
  );
  return data;
};

export default function index() {
  const [page, setPage] = useState(1);
  const filterRef = useRef();
  const [filteredCoins, setFilteredCoins] = useState([]);
  const { data, error, isLoading } = useQuery(
    ["prices", { page }],
    fetchPrices
  );

  const previousPage = () => {
    filterRef.current.value = null;
    setPage(page - 1);
  };

  const nextPage = () => {
    filterRef.current.value = null;
    setPage(page + 1);
  };

  const filterCoins = (e) => {
    const filter = e.target.value.toLowerCase();

    if (filter) {
      let searchResults = data.filter(
        (item) =>
          item.symbol.toLowerCase().includes(filter) ||
          item.name.toLowerCase().includes(filter)
      );
      setFilteredCoins(searchResults);
    } else {
      setFilteredCoins(data);
    }
  };

  useEffect(() => {
    if (data) {
      setFilteredCoins(data);
    }
  }, [data]);

  if (error) {
    return (
      <VStack
        align="center"
        justify="center"
        w="full"
        h="300px"
        border="4px"
        borderColor="red"
        borderRadius="lg"
        my={5}
        p={2}
      >
        <Text as="h2">An error occured while fetching data.</Text>
        <Text>{error.message}</Text>
      </VStack>
    );
  }

  return (
    <VStack>
      <Box
        w="full"
        h="100px"
        border="4px"
        borderColor="blue.500"
        borderRadius="lg"
        my={5}
        p={2}
      >
        <Text fontSize="lg">
          This tab displayes a table listing trending cryptocurrencies based on
          trading volume with symbol, name, market cap, trading volume and
          current price. The table displays 100 rows per page. Click on the
          previous or next button to navigate to another page. Type in the text
          input below to filter displayed coins in the page by symbol or coin
          name.
        </Text>
      </Box>
      <HStack my={5} spacing={5} w="full">
        <Input
          placeholder="Filter displayed coins by symbol or name."
          colorScheme="blue"
          variant="filled"
          size="lg"
          onChange={filterCoins}
          ref={filterRef}
        />
        <Spacer />
        <HStack w="30%">
          <Button
            disabled={page === 1}
            onClick={previousPage}
            colorScheme="blue"
          >
            Prev
          </Button>
          <Text>Page {page}</Text>
          <Button
            disabled={data ? data.length < 100 : false}
            onClick={nextPage}
            colorScheme="blue"
          >
            Next
          </Button>
        </HStack>
      </HStack>
      {isLoading ? (
        <Center h="300px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : filteredCoins < 1 ? (
        <Center h="300px">
          <Text>No coins match this search.</Text>
        </Center>
      ) : (
        <Table variant="striped" colorScheme="cyan" size="sm">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Symbol</Th>
              <Th>Name</Th>
              <Th>Market Cap</Th>
              <Th>Trading Volume</Th>
              <Th isNumeric>Price</Th>
            </Tr>
          </Thead>
          <Tbody h="100%">
            {filteredCoins.map((coin, i) => (
              <Tr key={coin.symbol}>
                <Td w="5%">{i + 1}</Td>
                <Td>
                  <HStack>
                    <Image src={coin.image} top={0} left={0} h="30px" />
                    <Text>{coin.symbol}</Text>
                  </HStack>
                </Td>
                <Td>{coin.name}</Td>
                <Td>{coin.market_cap}</Td>
                <Td>{coin.total_volume}</Td>
                <Td isNumeric>{`$${coin.current_price}`}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </VStack>
  );
}
