import { Box, Button, Container, Flex, Input, Text, useDisclosure, VStack, SimpleGrid, useColorModeValue, IconButton, Tag, TagLabel, TagCloseButton, useColorMode, Menu, MenuButton, MenuItem, MenuList, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash, FaPencilAlt, FaPlus, FaPalette, FaTag } from "react-icons/fa";

const Note = ({ note, onDelete, onEdit, onColorChange, onAddLabel }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editText, setEditText] = useState(note.text);
  const [label, setLabel] = useState("");

  const handleEdit = () => {
    onEdit(note.id, editText);
    onClose();
  };

  const handleLabel = () => {
    onAddLabel(note.id, label);
    setLabel("");
  };

  return (
    <Box p={4} bg={note.color} borderRadius="lg">
      <Text mb={2}>{note.text}</Text>
      {note.labels.map(label => (
        <Tag size="sm" key={label} variant="solid" borderRadius="full">
          <TagLabel>{label}</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
      <Flex justifyContent="space-between" mt={2}>
        <IconButton icon={<FaPencilAlt />} onClick={onOpen} aria-label="Edit note" />
        <IconButton icon={<FaTrash />} onClick={() => onDelete(note.id)} aria-label="Delete note" />
        <Menu>
          <MenuButton as={IconButton} icon={<FaPalette />} aria-label="Change color" />
          <MenuList>
            <MenuItem onClick={() => onColorChange(note.id, 'yellow.100')}>Yellow</MenuItem>
            <MenuItem onClick={() => onColorChange(note.id, 'green.100')}>Green</MenuItem>
            <MenuItem onClick={() => onColorChange(note.id, 'blue.100')}>Blue</MenuItem>
          </MenuList>
        </Menu>
        <IconButton icon={<FaTag />} onClick={() => setLabel(prompt("Enter label:"))} aria-label="Add label" />
      </Flex>
      {isOpen && (
        <Box mt={4}>
          <Input value={editText} onChange={(e) => setEditText(e.target.value)} placeholder="Edit note" />
          <Button mt={2} onClick={handleEdit}>Save</Button>
        </Box>
      )}
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const { colorMode } = useColorMode();

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: input,
      color: colorMode === 'dark' ? 'gray.700' : 'gray.100',
      labels: [],
    };
    setNotes([...notes, newNote]);
    setInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id, text) => {
    setNotes(notes.map(note => note.id === id ? { ...note, text } : note));
  };

  const changeNoteColor = (id, color) => {
    setNotes(notes.map(note => note.id === id ? { ...note, color } : note));
  };

  const addLabelToNote = (id, label) => {
    setNotes(notes.map(note => note.id === id ? { ...note, labels: [...note.labels, label] } : note));
  };

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={4}>
        <Input placeholder="Add a new note" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNote}>Add Note</Button>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {notes.map(note => (
            <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} onColorChange={changeNoteColor} onAddLabel={addLabelToNote} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;