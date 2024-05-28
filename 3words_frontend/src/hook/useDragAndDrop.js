import deepCopyObj from "../util/deepCopyObj";

import { useState, useEffect, useContext } from "react";

import AuthContext from "../store/AuthContext";

const useDragAndDrop = (wordsProposalId) => {
  const [writing, setWriting] = useState({
    first: { word: null, text: null },
    second: { word: null, text: null },
    third: { word: null, text: null },
    opened: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchWriting = async () => {
      setIsLoading(true);
      const response = await fetch(
        import.meta.env.VITE_SERVER_HOST + "/write/" + wordsProposalId,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
      const responseData = await response.json();

      setWriting({
        first: {
          id: responseData.data.first.word,
          word: responseData.data.first.word,
          text: responseData.data.first.text,
        },
        second: {
          id: responseData.data.second.word,
          word: responseData.data.second.word,
          text: responseData.data.second.text,
        },
        third: {
          id: responseData.data.third.word,
          word: responseData.data.third.word,
          text: responseData.data.third.text,
        },
        opened: responseData.data.opened,
      });
      setIsLoading(false);
    };
    fetchWriting();
  }, []);

  let draggableId = "";
  let droppableId = "";

  const dragStartHandler = (event) => {
    event.dataTransfer.dropEffect = "move";
    draggableId = event.currentTarget.id;
  };

  const dragEnterHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const dropHandler = (event) => {
    event.preventDefault();

    droppableId = event.currentTarget.id;

    setWriting((prev) => {
      const reorderedWords = deepCopyObj(prev);

      let draggableKeyName;
      let droppableKeyName;

      for (const k in prev) {
        if (prev[k].word === draggableId) {
          draggableKeyName = k;
        }

        if (prev[k].word === droppableId) {
          droppableKeyName = k;
        }
      }

      reorderedWords[draggableKeyName] = prev[droppableKeyName];
      reorderedWords[droppableKeyName] = prev[draggableKeyName];

      return reorderedWords;
    });
  };

  return {
    writing,
    setWriting,
    isLoading,
    setIsLoading,
    draggableAttributes: { draggable: true, onDragStart: dragStartHandler },
    droppableAttributes: {
      onDragEnter: dragEnterHandler,
      onDragOver: dragOverHandler,
      onDrop: dropHandler,
    },
  };
};

export default useDragAndDrop;
