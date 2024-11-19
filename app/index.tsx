import { searchAnime } from "@/api/search";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [data, setData] = useState<AnimeResponse | null>(null);

  const handleSearch = async () => {
    const data = await searchAnime("one piece");
    setData(data);
  }

  return (
    <View>
      <Text className="p-5" >hello world</Text>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}
