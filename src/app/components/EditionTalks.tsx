import { useState, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Tabs,
  Tab,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Box,
  Typography
} from "@material-ui/core";
import { EventEdition } from "../schema";
import TalkList from "./TalkList";
import TalkAccordion from "./TalkAccordion";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    talkAccordion: {
      marginTop: theme.spacing(2)
    }
  })
);

const EditionTalks = ({ edition }: { edition?: EventEdition }) => {
  const [selectedDay, setSelectedDay] = useState(edition.startDate);
  const [track, setTrack] = useState(edition.tracks && edition.tracks[0]);
  const [moreContent, setMoreContent] = useState(false);
  const classes = useStyles({});

  useEffect(() => {
    edition.talks.forEach(talk => {
      if (!["1", "2"].includes(talk.type)) {
        setMoreContent(true);
        return;
      }
    });
  });

  const days = () => {
    const dates: string[] = [];
    if (edition) {
      const dateIterator = new Date(edition.startDate);
      const endDate = new Date(edition.endDate);
      while (dateIterator <= endDate) {
        const dateString = dateIterator.toISOString().slice(0, 10);
        dates.push(dateString);
        dateIterator.setDate(dateIterator.getDate() + 1);
      }
    }
    return dates;
  };

  const filteredTalks = () => {
    return edition.talks.filter(talk => {
      if (selectedDay !== "99")
        if (!track) {
          return talk.date == selectedDay && ["1", "2"].includes(talk.type);
        } else {
          return (
            talk.date == selectedDay &&
            ["1", "2"].includes(talk.type) &&
            talk.track === track
          );
        }
      else return !["1", "2"].includes(talk.type);
    });
  };

  const handleChange = (_: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedDay(newValue);
  };

  const onTrackChange = (event: React.ChangeEvent<unknown>) => {
    setTrack((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Tabs
        value={selectedDay}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
      >
        {days().map((day, index) => (
          <Tab key={index} label={`Day ${index + 1} talks`} value={day} />
        ))}
        {moreContent && <Tab label="More content" value="99" />}
      </Tabs>
      {selectedDay !== "99" ? (
        <>
          <Box marginLeft={2}>
            {edition.tracks && edition.tracks.length > 0 && (
              <FormControl margin="normal" style={{ display: "flex" }}>
                <RadioGroup
                  name="track"
                  value={track}
                  onChange={onTrackChange}
                  row={true}
                >
                  {edition.tracks.map((track, index) => (
                    <FormControlLabel
                      key={index}
                      value={track}
                      control={<Radio />}
                      label={`${track} track`}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText>
                  This conference has {edition.tracks.length} tracks. Please
                  choose one.
                </FormHelperText>
              </FormControl>
            )}
          </Box>
          {filteredTalks().length > 0 ? (
            <TalkList talks={filteredTalks()} />
          ) : (
            <Box m={3}>
              <Typography variant="body1" color="textSecondary" paragraph>
                No talks are available for this day.
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                This probably means that there were only workshops and other
                types of events this day.
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                All non-talk content is available in the{" "}
                <strong>'more content'</strong> tab (if the event organisers
                have made it available).
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <TalkAccordion
          className={classes.talkAccordion}
          talks={filteredTalks()}
        />
      )}
    </>
  );
};

export default EditionTalks;
