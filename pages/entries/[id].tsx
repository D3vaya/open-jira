import {
  capitalize,
  Card,
  Grid,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { Layout } from "../../components/layouts";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Entry, EntryStatus } from "../../interfaces";
import { useState, ChangeEvent, useMemo, useContext } from "react";

import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface IEntryPageProps {
  entry: Entry;
}

const EntryPage: React.FC<IEntryPageProps> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const { updateEntry } = useContext(EntriesContext);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChaged = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "...."}>
      <Grid container justifyContent={"center"} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: `}
              subheader={`creada ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt | 0
              )} `}
            />
            <CardContent>
              <TextField
                helperText={isNotValid && `ingrese un valor`}
                onBlur={() => setTouched(true)}
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onTextFieldChanged}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row={true} value={status} onChange={onStatusChaged}>
                  {validStatus.map((e) => (
                    <FormControlLabel
                      key={e}
                      value={e}
                      control={<Radio />}
                      label={capitalize(e)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              {/* RADIO */}
            </CardContent>
            <CardActions>
              <Button
                onClick={onSave}
                startIcon={<SaveIcon />}
                variant="contained"
                fullWidth
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { entry },
  };
};

export default EntryPage;
