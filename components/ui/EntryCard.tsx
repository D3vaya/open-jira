import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { DragEvent, useContext } from "react";
import { UIContext } from "../../context/ui";
import { Entry } from "../../interfaces";
import { dateFunctions } from "../../utils";

interface IEntryCardPrps {
  entry: Entry;
}
export const EntryCard: React.FC<IEntryCardPrps> = ({ entry }) => {
  const router = useRouter();
  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", entry._id);
    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };
  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "clex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt | 0)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
