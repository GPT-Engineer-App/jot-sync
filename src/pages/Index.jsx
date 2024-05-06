import { Box, Button, Container, Flex, Input, Text, useDisclosure, VStack, SimpleGrid, useColorModeValue, IconButton, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";

const Note = ({ note, onDelete, onEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editText, setEditText] = useState(note.text);

  const handleEdit = () => {
    onEdit(note.id, editText);
    onClose();
  };

  return (
    <Box p={4} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="lg">
      <Text mb={2}>{note.text}</Text>
      <Flex justifyContent="space-between">
        <IconButton icon={<FaPencilAlt />} onClick={onOpen} aria-label="Edit note" />
        <IconButton icon={<FaTrash />} onClick={() => onDelete(note.id)} aria-label="Delete note" />
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

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: input,
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

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={4}>
        <Input placeholder="Add a new note" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNote}>Add Note</Button>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {notes.map(note => (
            <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;