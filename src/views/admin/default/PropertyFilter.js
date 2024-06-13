import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Stack,
  Switch,
  FormControl,
  FormLabel
} from "@chakra-ui/react";

const PropertyFilter = ({ onSearch }) => {
  const [keywords, setKeywords] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRooms, setMinRooms] = useState("");
  const [maxRooms, setMaxRooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [hasInternet, setHasInternet] = useState(false);
  const [hasFurniture, setHasFurniture] = useState(false);
  const [sortBy, setSortBy] = useState("date");

  const handleSearch = () => {
    const searchParams = {
      keywords: keywords || null,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      minRooms: minRooms ? parseInt(minRooms, 10) : null,
      maxRooms: maxRooms ? parseInt(maxRooms, 10) : null,
      propertyType: propertyType || null,
      hasInternet: hasInternet || null,
      hasFurniture: hasFurniture || null,
      sortBy: sortBy || "date"
    };

    console.log("Sending search params:", searchParams); // Debugging output

    onSearch(searchParams);
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Input
          placeholder="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <Input
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Input
          placeholder="Min Rooms"
          value={minRooms}
          onChange={(e) => setMinRooms(e.target.value)}
        />
        <Input
          placeholder="Max Rooms"
          value={maxRooms}
          onChange={(e) => setMaxRooms(e.target.value)}
        />
        <Input
          placeholder="Property Type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        />
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="internet-switch" mb="0">
            Has Internet
          </FormLabel>
          <Switch
            id="internet-switch"
            isChecked={hasInternet}
            onChange={(e) => setHasInternet(e.target.checked)}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="furniture-switch" mb="0">
            Has Furniture
          </FormLabel>
          <Switch
            id="furniture-switch"
            isChecked={hasFurniture}
            onChange={(e) => setHasFurniture(e.target.checked)}
          />
        </FormControl>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date Added</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </Select>
        <Button onClick={handleSearch}>Search</Button>
      </Stack>
    </Box>
  );
};

export default PropertyFilter;
