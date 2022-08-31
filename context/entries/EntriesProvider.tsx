import { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "pending Et enim ad reprehenderit ad do deserunt tempor commodo et ex ex.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "in-progress Officia aliquip commodo sit do esse ullamco nulla eiusmod eiusmod irure exercitation cupidatat labore.",
      status: "in-progress",
      createdAt: Date.now() - 1000,
    },
    {
      _id: uuidv4(),
      description: "finished In culpa cillum elit eiusmod.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

interface EntriesProviderProps {
  children?: JSX.Element;
}

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      createdAt: Date.now(),
      description: description,
      status: "pending",
    };
    dispatch({ type: "[Entry] - Add-Entry", payload: newEntry });
  };
  const updateEntry = (e: Entry) =>
    dispatch({ type: "[Entry] - Entry-Updated", payload: e });

  return (
    <EntriesContext.Provider value={{ ...state, addEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
