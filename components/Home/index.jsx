import {
  Heading,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
} from "@chakra-ui/react";
import CryptoList from "./CryptoList";
import Trending from "./Trending";
import GlobalMarketInfo from "./GlobalMarketInfo";

import { FaBitcoin, FaGlobeAmericas } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";

export default function Index() {
  return (
    <Container maxW="container.lg" minH="100vh" p={0}>
      <Heading textAlign="center" p={10}>
        Crypto Dashboard
      </Heading>
      <Tabs isFitted variant="unstyled" isLazy id="1" size="lg">
        <TabList>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            <Icon as={FaBitcoin} mr={2} />
            All Cryptocurrencies
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            <Icon as={IoMdTrendingUp} mr={2} />
            Trending
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            <Icon as={FaGlobeAmericas} mr={2} />
            Global Market Info
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <CryptoList />
          </TabPanel>
          <TabPanel>
            <Trending />
          </TabPanel>
          <TabPanel>
            <GlobalMarketInfo />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
