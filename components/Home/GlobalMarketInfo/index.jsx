import { useState, useEffect, useRef } from "react";
import { Text, VStack, Spinner, Center, Box, Heading } from "@chakra-ui/react";
import { ResponsivePieCanvas } from "@nivo/pie";
import { useQuery } from "react-query";
import axios from "axios";

const fetchPrices = async () => {
  const { data } = await axios.get("https://api.coingecko.com/api/v3/global");
  return data;
};

export default function Index() {
  const [chartData, setChartData] = useState();
  const { data, error, isLoading } = useQuery(
    ["globalMarketInfo"],
    fetchPrices
  );

  useEffect(() => {
    if (data) {
      const chartData = [];
      const percentages = data.data.market_cap_percentage;
      for (const key in percentages) {
        chartData.push({ id: key, value: percentages[key].toFixed(2) });
      }
      setChartData(chartData);
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
      ) : (
        <Box
          w="full"
          h="600px"
          border="4px"
          borderColor="blue.500"
          borderRadius="lg"
          my={5}
          p={2}
        >
          <Heading size="md" textAlign="center">
            Market cap shares
          </Heading>
          <ResponsivePieCanvas
            data={chartData}
            isInteractive={false}
            enableRadialLabels={false}
            sliceLabelsSkipAngle={1}
            margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
            innerRadius={0.55}
            padAngle={0.7}
            cornerRadius={5}
            colors={{ scheme: "category10" }}
            borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
          />
        </Box>
      )}
    </VStack>
  );
}
