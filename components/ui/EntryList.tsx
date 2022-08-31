import { List, Paper } from "@mui/material";
import { EntryCard } from "./";
import { EntryStatus } from "../../interfaces";
import { useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";

interface IEntryListProps {
  status: EntryStatus;
}
export const EntryList: React.FC<IEntryListProps> = ({ status }) => {
  const { entries } = useContext(EntriesContext);
  // BOT memorizar esta variable
  const entriesBystatus = useMemo(
    () => entries.filter((e) => e.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  );

  return (
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        {/* TODO cambiara dependiendo  si estoy haciendo drag o no */}
        <List sx={{ opacity: 1 }}>
          {entriesBystatus.map((e) => (
            <EntryCard key={e._id} entry={e} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
