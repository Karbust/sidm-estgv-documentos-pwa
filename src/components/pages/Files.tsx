import { FunctionComponent } from "react";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { humanFileSize } from "../../functions";

type folderType = {
  id: string;
  name: string;
  date: string;
  size: number;
  type: number;
};
type foldersType = folderType[];

const folders: foldersType = [
  {
    id: "0",
    name: "Photos",
    date: "06/11/2021",
    size: 0,
    type: 0,
  },
  {
    id: "1",
    name: "Recipies",
    date: "06/11/2021",
    size: 0,
    type: 0,
  },
  {
    id: "2",
    name: "Work",
    date: "06/11/2021",
    size: 0,
    type: 0,
  },
  {
    id: "3",
    name: "teste.pdf",
    date: "06/11/2021",
    size: 123456789,
    type: 1,
  },
];

const Files: FunctionComponent = () => (
  <div style={{ paddingBottom: "56px", width: "90vw" }}>
    <List>
      {folders.map((value, index) => (
        <div>
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                {value.type ? (
                  <InsertDriveFileOutlinedIcon />
                ) : (
                  <FolderOutlinedIcon />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={value.name}
              secondary={`${humanFileSize(value.size, true)} - ${value.date}`}
            />
          </ListItem>
        </div>
      ))}
    </List>
  </div>
);
export default Files;
