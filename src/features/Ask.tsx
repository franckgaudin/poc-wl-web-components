import r2wc from "@r2wc/react-to-web-component"

import { useState, useEffect } from "react";
import { Footer, HopperProvider } from "@hopper-ui/components";
import { Header, SearchField, Text, Divider, Flex } from "@hopper-ui/components";
import { Div, UL, LI } from "@hopper-ui/styled-system";

const API_URL = 'https://jsonplaceholder.typicode.com/users';

interface DataItem {
  "id"?: number,
  "name"?: string,
  "username"?: string,
  "email"?: string,
  "address"?: {
    "street"?: string,
    "suite"?: string,
    "city"?: string,
    "zipcode"?: string,
    "geo"?: {
      "lat"?: string,
      "lng"?: string,
    }
  },
  "phone"?: string,
  "website"?: string,
  "company"?: {
    "name"?: string,
    "catchPhrase"?: string,
    "bs"?: string,
  }
}

function AskItem(props: DataItem) {
  const {name, username, email, company} = props;
  return (
    <Flex direction="column" borderRadius="rounded-sm" backgroundColorHover="core_amanita-25" padding="inset-sm">
      <Text>{`${name}, ${username}, ${email}, ${company?.name},`}</Text>
      <Text size="sm" color="neutral-weak">{company?.catchPhrase}</Text>
    </Flex>
  );
}

export function Ask() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<[] | DataItem[]>([]);
  const [results, setResults] = useState<[] | DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (value: string) => {
    setSearch(value);

    const filteredResults = data.filter(item =>
      item?.name?.toLowerCase().includes(value.toLowerCase()) ||
      item?.username?.toLowerCase().includes(value.toLowerCase()) || 
      item?.company?.name?.toLowerCase().includes(value.toLowerCase()) 
    );

    setResults(filteredResults);
  };

  const handleReset = () => {
    setSearch('');
    setResults([]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <HopperProvider>
      <Div border="neutral" borderRadius="rounded-md" backgroundColor="neutral" padding="inset-md" maxWidth="1/3" UNSAFE_margin="auto">
        <Header>
          <SearchField aria-label="widget search" isFluid isClearable placeholder="Ask a question!" value={search} onChange={handleChange} onClear={handleReset}/>
        </Header>
        {results.length > 0 ? 
          <UL display="flex" flexDirection="column" padding="unset" style={{ listStyle: 'none'}}>
            {results.map((item, index) => (
              <LI key={index}>
                <AskItem name={item.name} username={item.username} email={item.email} company={item.company}   />
              </LI>
            ))}
          </UL> 
          : null
        }
        <Divider marginBottom="stack-md" />
        <Footer>
          <Text>
            View <strong>235 more results</strong> using Workleap Serach
          </Text>
        </Footer>
      </Div>
    </HopperProvider>
  );
}

const WcAsk = r2wc(Ask)

export default WcAsk